(function() {
  try {
    var saved = localStorage.getItem("yylx-theme");
    if (saved === "dark") {
      document.documentElement.classList.add("yylx-dark");
    }
  } catch (e) {}
})();

require(["gitbook", "jquery"], function(gitbook, $) {
  function rootUrl() {
    var base = gitbook.state && gitbook.state.basePath ? gitbook.state.basePath : ".";
    return base === "." ? "./" : base + "/";
  }

  function currentTheme() {
    return document.documentElement.classList.contains("yylx-dark") ? "dark" : "light";
  }

  var SUN_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 3v1.6M12 19.4V21M4.6 4.6l1.13 1.13M18.27 18.27 19.4 19.4M3 12h1.6M19.4 12H21M4.6 19.4l1.13-1.13M18.27 5.73 19.4 4.6"/></svg>';
  var MOON_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 13.5A8 8 0 1 1 10.5 3.5a6.5 6.5 0 0 0 10 10z"/></svg>';

  function themeIcon(theme) {
    return theme === "dark" ? MOON_SVG : SUN_SVG;
  }

  function applyTheme(theme) {
    var root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("yylx-dark");
    } else {
      root.classList.remove("yylx-dark");
    }
    try {
      localStorage.setItem("yylx-theme", theme);
    } catch (e) {}
    $(".yylx-theme-toggle").html(themeIcon(theme));
  }

  function ensureTopbar() {
    var $book = $(".book");
    var $topbar = $(".yylx-topbar");

    if (!$topbar.length) {
      var theme = currentTheme();
      $topbar = $(
        '<header class="yylx-topbar">' +
          '<button type="button" class="yylx-mobile-menu" aria-label="打开目录"><span></span><span></span><span></span></button>' +
          '<a class="yylx-brand" href="' + rootUrl() + '" aria-label="鱼鱼连线 文档首页">' +
            '<img class="yylx-brand-mark" src="https://yylx.io/logo.svg" alt="鱼鱼连线" />' +
            '<span class="yylx-brand-name">鱼鱼连线</span>' +
          '</a>' +
          '<div class="yylx-topbar-search"></div>' +
          '<nav class="yylx-topnav" aria-label="快捷入口">' +
            '<a href="https://yylx.io" target="_blank" rel="noopener">控制台</a>' +
            '<button type="button" class="yylx-theme-toggle" aria-label="切换浅色/暗色主题">' + themeIcon(theme) + '</button>' +
          '</nav>' +
        '</header>'
      );
      $book.prepend($topbar);
      $topbar.find(".yylx-mobile-menu").on("click", function() {
        $book.toggleClass("with-summary");
      });
      $topbar.on("click", ".yylx-theme-toggle", function() {
        applyTheme(currentTheme() === "dark" ? "light" : "dark");
      });
    } else {
      $topbar.find(".yylx-theme-toggle").html(themeIcon(currentTheme()));
    }

    var $search = $("#book-search-input");
    if ($search.length) {
      $search.appendTo($topbar.find(".yylx-topbar-search"));
      var $input = $search.find("input");
      $input.attr("placeholder", "Search...");
      if (!$search.find(".yylx-search-icon").length) {
        $search.prepend('<span class="yylx-search-icon" aria-hidden="true"></span>');
      }
      if (!$search.find(".yylx-search-key").length) {
        $search.append('<span class="yylx-search-key" aria-hidden="true">⌘K</span>');
      }
    }
  }

  function ensurePageToc() {
    $(".yylx-page-toc").remove();

    var $section = $(".markdown-section");
    if (!$section.length) return;

    var headings = $section.find("h2, h3").filter(function() {
      return $(this).text().trim().length > 0;
    });

    if (!headings.length) return;

    var $toc = $(
      '<aside class="yylx-page-toc" aria-label="On this page">' +
        '<div class="yylx-page-toc-title"><span aria-hidden="true"></span>On this page</div>' +
        '<nav></nav>' +
      '</aside>'
    );
    var $nav = $toc.find("nav");

    headings.each(function(index) {
      var heading = this;
      var $heading = $(heading);
      var id = heading.id || "section-" + index;
      heading.id = id;

      $("<a></a>")
        .addClass("toc-" + heading.tagName.toLowerCase())
        .attr("href", "#" + id)
        .text($heading.text())
        .appendTo($nav);
    });

    $(".book-body").append($toc);

    var links = $toc.find("a").toArray();
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        links.forEach(function(link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
      });
    }, {
      root: document.querySelector(".body-inner"),
      rootMargin: "-18% 0px -72% 0px",
      threshold: 0
    });

    headings.each(function() {
      observer.observe(this);
    });

    if (links[0]) {
      links[0].classList.add("active");
    }
  }

  function decorateCallouts() {
    $(".markdown-section blockquote").each(function() {
      var $quote = $(this);
      if ($quote.hasClass("yylx-callout")) return;

      var text = $quote.text().trim();
      var match = text.match(/^\[!(TIP|NOTE|INFO|WARNING)\]\s*/i);
      var type = match ? match[1].toLowerCase() : "tip";

      if (match) {
        var marker = match[0];
        var first = $quote.find("p").first();
        first.html(first.html().replace(marker, ""));
      }

      $quote.addClass("yylx-callout yylx-callout-" + type);
      $quote.prepend('<span class="yylx-callout-icon" aria-hidden="true"></span>');
    });
  }

  function addCodeCopyButtons() {
    $(".markdown-section pre").each(function() {
      var $pre = $(this);
      if ($pre.find(".yylx-copy-code").length) return;

      var $button = $('<button type="button" class="yylx-copy-code">Copy</button>');
      $button.on("click", function() {
        var code = $pre.find("code").text();
        navigator.clipboard.writeText(code).then(function() {
          $button.text("Copied");
          setTimeout(function() {
            $button.text("Copy");
          }, 1400);
        });
      });
      $pre.append($button);
    });
  }

  function enhancePage() {
    ensureTopbar();
    ensurePageToc();
    decorateCallouts();
    addCodeCopyButtons();
  }

  gitbook.events.on("page.change", enhancePage);
  $(enhancePage);
});
