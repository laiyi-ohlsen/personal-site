const markdownIt = require("markdown-it");
const clean = require("eleventy-plugin-clean");
const Image = require("@11ty/eleventy-img")
const path = require('path')  
const fs = require('fs')

module.exports = function(eleventyConfig) {
  	// --- START, eleventy-img
	// Resized copies go to /img/ with content-hashed names, so they can be cached forever (see src/_headers)
	const imageOptions = {
		widths: [400, 800, 1600],
		formats: ["webp", "auto"],
		urlPath: "/img/",
		outputDir: "public/img/",
		filenameFormat: function (id, src, width, format, options) {
			const extension = path.extname(src)
			const name = path.basename(src, extension)
			return `${name}-${id}-${width}w.${format}`
		}
	}

	// Every <img src="/assets/images/..."> (markdown images, Art grid, carousels, blog thumbnails) gets
	// resized copies plus a srcset, so browsers download a size that fits instead of the original.
	// Lightbox links to originals are pointed at the largest resized copy.
	const defaultSizes = "(max-width: 900px) 100vw, 600px"
	const localImage = (url) => {
		if (!/^\/assets\/images\/.+\.(jpe?g|png)$/i.test(url)) return null
		const file = "./src" + decodeURI(url)
		return fs.existsSync(file) ? file : null
	}
	const resize = (file) => Image(file, imageOptions)
	const parseAttrs = (tag) => Object.fromEntries(
		[...tag.matchAll(/\s([\w-]+)(?:=(?:"([^"]*)"|'([^']*)'))?/g)].map((m) => [m[1], m[2] ?? m[3] ?? ""])
	)

	eleventyConfig.addTransform("responsiveImages", async function (content) {
		if (!(this.page.outputPath || "").endsWith(".html")) return content
		const firstImg = (content.match(/<img\b[^>]*>/) || [])[0]
		const replacements = new Map()

		for (const [tag] of content.matchAll(/<img\b[^>]*>/g)) {
			const attrs = parseAttrs(tag)
			const file = !attrs.srcset && localImage(attrs.src)
			if (!file || replacements.has(tag)) continue
			const metadata = await resize(file)
			const fallback = Object.keys(metadata).find((f) => f !== "webp")
			const middle = metadata[fallback][Math.min(1, metadata[fallback].length - 1)]
			const out = {
				...attrs,
				src: middle.url,
				srcset: metadata.webp.map((m) => m.srcset).join(", "),
				sizes: attrs.sizes || defaultSizes,
				width: attrs.width || middle.width,
				height: attrs.height || middle.height,
				decoding: "async",
			}
			// The page's first image is usually the main visible one: fetch it right away, lazy-load the rest
			if (!attrs.loading) {
				if (tag === firstImg) out.fetchpriority = "high"
				else out.loading = "lazy"
			}
			replacements.set(tag, "<img " + Object.entries(out).map(([k, v]) => `${k}="${v}"`).join(" ") + ">")
		}

		for (const [tag, href] of content.matchAll(/<a\b[^>]*\shref="([^"]+)"[^>]*>/g)) {
			const file = localImage(href)
			if (!file || replacements.has(tag)) continue
			const largest = (await resize(file)).webp.at(-1)
			replacements.set(tag, tag.replace(`href="${href}"`, `href="${largest.url}"`))
		}

		for (const [from, to] of replacements) content = content.split(from).join(to)
		return content
	})
	// --- END, eleventy-img

    // CSS 
    eleventyConfig.addPassthroughCopy("./src/style.css");

    // Cloudflare Pages response headers (caching)
    eleventyConfig.addPassthroughCopy("./src/_headers");

    eleventyConfig.addPassthroughCopy("./src/assets");

    // Vendor files (only what the Art pages load)
    eleventyConfig.addPassthroughCopy({
        "./node_modules/jquery/dist/jquery.min.js": "vendor/jquery/jquery.min.js",
        "./node_modules/lightbox2/dist/js/lightbox.min.js": "vendor/lightbox2/js/lightbox.min.js",
        "./node_modules/lightbox2/dist/css/lightbox.min.css": "vendor/lightbox2/css/lightbox.min.css",
        "./node_modules/lightbox2/dist/images": "vendor/lightbox2/images"
    });

    // Render markdown from front matter fields (e.g. description, info)
    const md = markdownIt({ html: true, linkify: true });
    eleventyConfig.addFilter("markdown", (content) => {
        return md.render(content || "");
    });

    // Sort projects by year (newest first), then by optional `order` field
    eleventyConfig.addFilter("sortProjects", (projects) => {
        return [...projects].sort((a, b) =>
            (b.data.year - a.data.year) || ((a.data.order || 0) - (b.data.order || 0)) ||
            a.data.title.localeCompare(b.data.title)
        );
    });

    // Blog filters
    // ISO date filter (yyyy-mm-dd)
    eleventyConfig.addFilter("dateISO", (dateObj) => {
        return new Date(dateObj).toISOString().split("T")[0];
    });

    // Extract image src values from HTML content
    eleventyConfig.addFilter("extractImages", (content) => {
        const matches = [...(content || "").matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/g)];
        return matches.map(m => m[1]);
    });

    // Remove <img> tags (and wrapping <p> tags) from HTML content
    eleventyConfig.addFilter("removeImages", (content) => {
        return (content || "").replace(/<p>\s*<img[^>]*>\s*<\/p>/g, "").replace(/<img[^>]*>/g, "");
    });

    // clean up plugin
    eleventyConfig.addPlugin(clean);
    // clean.updateFileRecord(outputPath)

    return {
        dir: {
            input: "src",
            output: "public"
        }  
    }
}