// One clip per thumbnail in src/assets/images/dance (thumbnails are committed; videos live in R2).
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "../assets/images/dance");

module.exports = fs.readdirSync(dir)
    .filter((f) => f.endsWith(".png"))
    .sort()
    .map((f) => path.basename(f, ".png"));
