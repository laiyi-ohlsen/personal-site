// Videos are too large for git/Pages, so production builds load them from the R2 bucket.
// `npm start` (eleventy --serve) keeps serving them locally from src/assets.
const isServe = process.env.ELEVENTY_RUN_MODE === "serve" || process.env.ELEVENTY_RUN_MODE === "watch";

module.exports = {
    url: process.env.MEDIA_URL || (isServe ? "/assets" : "https://media.laiyiohlsen.com")
};
