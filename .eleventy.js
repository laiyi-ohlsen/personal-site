const lodash = require("lodash");
const clean = require("eleventy-plugin-clean");
const Image = require("@11ty/eleventy-img")
const path = require('path')  
const slugify = require("slugify");

module.exports = function(eleventyConfig) {
  	// --- START, eleventy-img
	function imageShortcode(src, alt, sizes="(min-width: 1024px) 100vw, 50vw") {
		console.log(`Generating image(s) from:  ${src}`)
		let options = {
			widths: [600, 900],
			formats: ["webp", "jpeg"],
			urlPath: "/assets/images/",
			outputDir: "public/assets/images/",
			filenameFormat: function (id, src, width, format, options) {
				const extension = path.extname(src)
				const name = path.basename(src, extension)
        const x = `${name}-${width}w.${format}`
				return x
			}
		}

		// generate images
		Image(src, options)

		let imageAttributes = {
			alt,
			sizes,
			loading: "lazy",
			decoding: "async",
		}
		// get metadata
		metadata = Image.statsSync(src, options)
		return Image.generateHTML(metadata, imageAttributes)
	}
	eleventyConfig.addShortcode("image", imageShortcode)
	// --- END, eleventy-img

    // CSS 
    eleventyConfig.addPassthroughCopy("./src/style.css");

    eleventyConfig.addPassthroughCopy("./src/assets");

    // Vendor files
    eleventyConfig.addPassthroughCopy({
        "./node_modules/lightbox2/dist": "vendor/lightbox2"
    });
    eleventyConfig.addPassthroughCopy({
        "./node_modules/jquery/dist": "vendor/jquery"
    });

    // clean up plugin
    eleventyConfig.addPlugin(clean);
    // clean.updateFileRecord(outputPath)

    // clean types
    eleventyConfig.addFilter("include", (arr, path, value) => {
        value = lodash.deburr(value).toLowerCase();
        
        return arr.filter((item) => {
          let pathValue = lodash.get(item, path);
          pathValue = lodash.deburr(pathValue).toLowerCase();
          return pathValue.includes(value);
        });
    });

    // slug filter
    eleventyConfig.addNunjucksFilter("slug", str => slugify(str, { lower: true, strict: true }));
    
    return {
        dir: {
            input: "src",
            output: "public"
        }  
    }
}