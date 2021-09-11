const htmlmin = require("html-minifier");
const markdownIt = require("markdown-it");

const markdownItVideo = require("markdown-it-video", {
  youtube: { width: 640, height: 390 },
  vimeo: { width: 500, height: 281 },
  vine: { width: 600, height: 600, embed: 'simple' },
  prezi: { width: 550, height: 400 }
});


module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy({ "src/data/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "src/data/.nojekyll": ".nojekyll" });



  // Configure markdown
  const markdownLib = markdownIt({
    html: true
  }).use(markdownItVideo);
  eleventyConfig.setLibrary("md", markdownLib);


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


  return {
    dir: {
      input: "src",
      output: "_site",

      includes: "includes",
      data: "data"
    }
  }
};
