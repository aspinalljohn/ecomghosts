module.exports = function (eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/img");

  // ---------- Filters ----------

  // Reading time (assumes ~238 words per minute)
  eleventyConfig.addFilter("readingTime", function (content) {
    if (!content) return "1 min read";
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const minutes = Math.ceil(words / 238);
    return `${minutes} min read`;
  });

  // Word count
  eleventyConfig.addFilter("wordCount", function (content) {
    if (!content) return 0;
    return content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  });

  // Readable date (e.g., "March 16, 2026")
  eleventyConfig.addFilter("readableDate", function (date) {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // ISO date for structured data (e.g., "2026-03-16")
  eleventyConfig.addFilter("isoDate", function (date) {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  });

  // Slug-safe filter
  eleventyConfig.addFilter("slugify", function (str) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  });

  // ---------- Collections ----------

  // Blog posts sorted by date descending
  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/blog/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // ---------- Config ----------

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
