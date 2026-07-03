module.exports = {
  book: {
    assets: "./assets",
    js: ["theme.js"]
  },
  hooks: {
    // Ensure SEO metadata is injected no matter which build command runs
    // (the Cloudflare Pages build only executes `honkit build`).
    finish: function () {
      try {
        const script = require.resolve("../../scripts/seo-postbuild.js");
        delete require.cache[script];
        require(script);
        console.log("yylx-theme: SEO postbuild applied");
      } catch (err) {
        // `honkit serve` builds into a temp dir without _book; skip quietly.
        console.warn("yylx-theme: SEO postbuild skipped:", err.message);
      }
    }
  }
};
