import esbuild from "esbuild"
import { promises as fs } from "fs"
import { minify } from "html-minifier"
import markdownIt from "markdown-it"
import markdownItVideo from "markdown-it-video"
import markdownItLinkAttributes from "markdown-it-link-attributes"
import moment from "moment"
import { PurgeCSS } from "purgecss"

/**
 * @param {import('@11ty/eleventy').UserConfig} eleventyConfig 
 */
export default function (eleventyConfig) {

  const isDevelopment = process.env.NODE_ENV !== "production"

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy({ "src/misc/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "src/misc/.nojekyll": ".nojekyll" });
  eleventyConfig.addPassthroughCopy({ "src/misc/robots.txt": "robots.txt" });

  eleventyConfig.addShortcode("toisodate", function (date) {
    return moment(date).format("YYYY-MM-DD");
  });


  // Configure markdown
  const markdownLib = markdownIt({
    html: true
  })
    .use(markdownItVideo, {
      youtube: { width: 640, height: 390 },
      vimeo: { width: 500, height: 281 },
      vine: { width: 600, height: 600, embed: 'simple' },
      prezi: { width: 550, height: 400 }
    })
    .use(markdownItLinkAttributes, {
      attrs: {
        target: "_blank"
      }
    });

  eleventyConfig.setLibrary("md", markdownLib);

  if (!isDevelopment) {
    // HTML minifier
    eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
      if (outputPath && outputPath.endsWith(".html")) {
        return minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        });
      }

      return content;
    });
  }

  eleventyConfig.on('afterBuild', async () => {
    await esbuild.build({
      entryPoints: ['src/css/overrides.css', 'src/css/styles.css', 'src/js/scripts.js'],
      outdir: '_site',
      minify: !isDevelopment,
      sourcemap: isDevelopment
    })

    if (!isDevelopment) {
      console.log('Purging CSS...')

      const purgeResult = await new PurgeCSS().purge({
        content: ["./_site/**/*.html"],
        css: ["./_site/**/*.css"],
        safelist: ["navbar-shrink"]
      })
      await Promise.all(purgeResult.map(res => {
        console.log('Overwriting purged file', res.file)
        fs.writeFile(res.file, res.css)
      }))
    }
  })
  return {
    dir: {
      input: "src",
      output: "_site",

      includes: "includes",
      data: "data"
    }
  }
}
