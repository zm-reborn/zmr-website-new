module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");


  const markdownIt = require("markdown-it");
  const markdownItVideo = require("markdown-it-video", {
    youtube: { width: 640, height: 390 },
    vimeo: { width: 500, height: 281 },
    vine: { width: 600, height: 600, embed: 'simple' },
    prezi: { width: 550, height: 400 }
  });

  const options = {
    html: true
  };

  const markdownLib = markdownIt(options).use(markdownItVideo);
  eleventyConfig.setLibrary("md", markdownLib);

  return {
    dir: {
      input: "src",
      output: "_site",

      includes: "includes",
      data: "data"
    }
  }
};
