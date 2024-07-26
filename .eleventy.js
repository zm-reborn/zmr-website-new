const htmlmin = require("html-minifier");
const markdownIt = require("markdown-it");
const moment = require("moment");

const markdownItVideo = require("markdown-it-video", {
  youtube: { width: 640, height: 390 },
  vimeo: { width: 500, height: 281 },
  vine: { width: 600, height: 600, embed: 'simple' },
  prezi: { width: 550, height: 400 }
});

const markdownItLinkAttributes = require("markdown-it-link-attributes");

const purgeCssPlugin = require("eleventy-plugin-purgecss");

/**
 * @param {import('@11ty/eleventy').UserConfig} eleventyConfig 
 */
module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy({ "src/misc/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "src/misc/.nojekyll": ".nojekyll" });
  eleventyConfig.addPassthroughCopy({ "src/misc/robots.txt": "robots.txt" });

  eleventyConfig.addShortcode("toisodate", function(date) {
    return moment(date).format("YYYY-MM-DD");
  });


  // Configure markdown
  const markdownLib = markdownIt({
    html: true
  })
    .use(markdownItVideo)
    .use(markdownItLinkAttributes, {
      attrs: {
        target: "_blank"
      }
    });

  eleventyConfig.setLibrary("md", markdownLib);

  if (process.env.NODE_ENV !== "development") {
    // HTML minifier
    eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
      // Eleventy 1.0+: use this.inputPath and this.outputPath instead
      if (outputPath && outputPath.endsWith(".html")) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        });
        return minified;
      }

      return content;
    });

    // Purge unused CSS.
    eleventyConfig.addPlugin(purgeCssPlugin, {
      config: "./purgecss.config.js",
      quiet: false
    });
  }

  return {
    dir: {
      input: "src",
      output: "_site",

      includes: "includes",
      data: "data"
    }
  }
};
