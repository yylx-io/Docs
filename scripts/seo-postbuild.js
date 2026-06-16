const fs = require("fs");
const path = require("path");

const SITE_URL = "https://docs.yylx.io";
const SITE_NAME = "鱼鱼连线 YYLX.IO 文档中心";
const OG_IMAGE = "https://yylx.io/og.png";
const OUT_DIR = path.join(__dirname, "..", "_book");

const pages = [
  {
    file: "index.html",
    source: "README.md",
    title: "鱼鱼连线 YYLX.IO 文档中心",
    description:
      "鱼鱼连线 YYLX.IO AI 中转站接入文档，提供 API Key 创建、Base URL 配置、模型选择和 Claude Code、Codex、Cursor 等工具接入教程。",
    keywords: ["AI 中转站", "YYLX.IO", "API Key", "OpenAI 兼容接口"]
  },
  {
    file: "access/overview.html",
    source: "access/overview.md",
    title: "AI 中转站接入概览",
    description:
      "了解鱼鱼连线 YYLX.IO 的 Base URL、API Key、模型名称和 OpenAI/Anthropic 兼容接口配置方式，适合首次接入 AI 中转站用户。",
    keywords: ["AI 中转站接入", "Base URL", "OpenAI 兼容接口", "Anthropic API"]
  },
  {
    file: "access/create-api-key.html",
    source: "access/create-api-key.md",
    title: "创建 API Key",
    description:
      "在鱼鱼连线 YYLX.IO 控制台创建、命名、保存和测试 API Key，并按 Claude Code、Codex、Cursor、Cherry Studio 等工具分开管理密钥。",
    keywords: ["API Key 创建", "AI API Key", "YYLX API Key"]
  },
  {
    file: "access/cc-switch.html",
    source: "access/cc-switch.md",
    title: "CC Switch 接入鱼鱼连线",
    description:
      "使用 CC Switch 一键导入或手动添加鱼鱼连线 YYLX.IO Provider，集中管理 Claude Code、Codex、Gemini CLI 等 AI CLI 工具配置。",
    keywords: ["CC Switch", "Claude Code Provider", "Codex Provider", "AI CLI 配置"]
  },
  {
    file: "access/claude-code.html",
    source: "access/claude-code.md",
    title: "Claude Code 接入鱼鱼连线",
    description:
      "Claude Code 使用鱼鱼连线 YYLX.IO AI 中转站的配置教程，包含 ANTHROPIC_BASE_URL、API Key、模型指定和常见错误排查。",
    keywords: ["Claude Code 中转站", "Claude Code API 配置", "ANTHROPIC_BASE_URL"]
  },
  {
    file: "access/claude-desktop.html",
    source: "access/claude-desktop.md",
    title: "Claude Desktop 接入鱼鱼连线",
    description:
      "Claude Desktop 第三方 Provider / Gateway 配置教程，演示在 macOS 和 Windows 中通过鱼鱼连线 YYLX.IO 使用 API Key 接入模型服务。",
    keywords: ["Claude Desktop Gateway", "Claude Desktop Provider", "Claude Desktop 中转"]
  },
  {
    file: "access/codex.html",
    source: "access/codex.md",
    title: "Codex 接入鱼鱼连线",
    description:
      "Codex CLI 配置鱼鱼连线 YYLX.IO 自定义 Provider 的教程，包含 config.toml、base_url、YYLX_API_KEY、模型名称和启动验证步骤。",
    keywords: ["Codex CLI 中转", "Codex API 配置", "Codex Provider", "config.toml"]
  },
  {
    file: "access/cursor.html",
    source: "access/cursor.md",
    title: "Cursor 接入鱼鱼连线",
    description:
      "Cursor 配置鱼鱼连线 YYLX.IO OpenAI 兼容接口的教程，说明 API Key、Override OpenAI Base URL、模型名称和 Verify 失败排查。",
    keywords: ["Cursor Claude API", "Cursor OpenAI Base URL", "Cursor API Key"]
  },
  {
    file: "access/cherry-studio.html",
    source: "access/cherry-studio.md",
    title: "Cherry Studio 接入鱼鱼连线",
    description:
      "Cherry Studio 添加鱼鱼连线 YYLX.IO OpenAI 兼容 Provider 的教程，包含 API 地址、API Key、模型添加、测试连接和常见错误处理。",
    keywords: ["Cherry Studio Provider", "Cherry Studio API", "OpenAI 兼容 Provider"]
  },
  {
    file: "faq.html",
    source: "faq.md",
    title: "鱼鱼连线常见问题",
    description:
      "鱼鱼连线 YYLX.IO 常见问题与排查指南，覆盖 Base URL、API Key、模型名称、401、404、协议不匹配、响应慢和 Key 泄露处理。",
    keywords: ["AI 中转站 FAQ", "API Key 401", "Base URL 404", "模型名称错误"],
    faq: true
  }
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeJsonForHtml(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function pageUrl(page) {
  return `${SITE_URL}/${page.file === "index.html" ? "" : page.file}`;
}

function readSource(page) {
  const sourcePath = path.join(__dirname, "..", page.source);
  return fs.existsSync(sourcePath) ? fs.readFileSync(sourcePath, "utf8") : "";
}

function extractHeadings(markdown, level) {
  const marker = "#".repeat(level);
  return markdown
    .split(/\r?\n/)
    .filter((line) => line.startsWith(`${marker} `))
    .map((line) => line.replace(/^#+\s+/, "").trim())
    .filter(Boolean);
}

function cleanMarkdownText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/^\s*[>|*-]\s*/gm, "")
    .replace(/^\s*\|.*\|\s*$/gm, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractFaqItems(markdown) {
  const lines = markdown.split(/\r?\n/);
  const items = [];
  let current = null;

  lines.forEach((line) => {
    const match = line.match(/^##\s+(.+?)\s*$/);
    if (match) {
      if (current) items.push(current);
      current = { question: match[1].trim(), body: [] };
      return;
    }
    if (current) current.body.push(line);
  });

  if (current) items.push(current);

  return items
    .map((item) => {
      const text = cleanMarkdownText(item.body.join("\n"));
      return {
        question: item.question,
        answer: text.length > 260 ? `${text.slice(0, 257)}...` : text
      };
    })
    .filter((item) => item.question && item.answer);
}

function schemaFor(page) {
  const markdown = readSource(page);
  const graph = [
    {
      "@type": "WebPage",
      "@id": `${pageUrl(page)}#webpage`,
      url: pageUrl(page),
      name: page.title,
      description: page.description,
      isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME
      },
      inLanguage: "zh-Hans"
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl(page)}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "文档首页",
          item: `${SITE_URL}/`
        },
        {
          "@type": "ListItem",
          position: 2,
          name: page.title,
          item: pageUrl(page)
        }
      ]
    }
  ];

  if (page.faq) {
    const questions = extractFaqItems(markdown).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }));
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl(page)}#faq`,
      mainEntity: questions
    });
  } else if (page.file.startsWith("access/")) {
    graph.push({
      "@type": "HowTo",
      "@id": `${pageUrl(page)}#howto`,
      name: page.title,
      description: page.description,
      step: extractHeadings(markdown, 2)
        .slice(0, 8)
        .map((heading, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: heading
        }))
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}

function stripManagedSeo(html) {
  return html
    .replace(/\n?\s*<meta name="description" content="[^"]*"\s*\/?>/gi, "")
    .replace(/\n?\s*<meta name="keywords" content="[^"]*"\s*\/?>/gi, "")
    .replace(/\n?\s*<link rel="canonical" href="[^"]*"\s*\/?>/gi, "")
    .replace(/\n?\s*<meta property="og:[^"]+" content="[^"]*"\s*\/?>/gi, "")
    .replace(/\n?\s*<meta name="twitter:[^"]+" content="[^"]*"\s*\/?>/gi, "")
    .replace(/\n?\s*<script type="application\/ld\+json" data-yylx-seo>[\s\S]*?<\/script>/gi, "");
}

function injectSeo(page) {
  const filePath = path.join(OUT_DIR, page.file);
  if (!fs.existsSync(filePath)) return;

  let html = fs.readFileSync(filePath, "utf8");
  html = stripManagedSeo(html);

  const url = pageUrl(page);
  const tags = [
    `<meta name="description" content="${escapeHtml(page.description)}">`,
    `<meta name="keywords" content="${escapeHtml(page.keywords.join(", "))}">`,
    `<link rel="canonical" href="${escapeHtml(url)}">`,
    `<meta property="og:type" content="article">`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}">`,
    `<meta property="og:title" content="${escapeHtml(page.title)}">`,
    `<meta property="og:description" content="${escapeHtml(page.description)}">`,
    `<meta property="og:url" content="${escapeHtml(url)}">`,
    `<meta property="og:image" content="${escapeHtml(OG_IMAGE)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}">`,
    `<meta name="twitter:image" content="${escapeHtml(OG_IMAGE)}">`,
    `<script type="application/ld+json" data-yylx-seo>${escapeJsonForHtml(schemaFor(page))}</script>`
  ].join("\n        ");

  html = html.replace(/<title>/i, `${tags}\n        <title>`);
  fs.writeFileSync(filePath, html);
}

function writeSitemap() {
  const now = new Date().toISOString();
  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${pageUrl(page)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.file === "index.html" ? "weekly" : "monthly"}</changefreq>
    <priority>${page.file === "index.html" ? "1.0" : "0.8"}</priority>
  </url>`
    )
    .join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  fs.writeFileSync(path.join(OUT_DIR, "sitemap.xml"), sitemap);
}

function writeRobots() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(OUT_DIR, "robots.txt"), robots);
}

if (!fs.existsSync(OUT_DIR)) {
  throw new Error(`Build output not found: ${OUT_DIR}`);
}

pages.forEach(injectSeo);
writeSitemap();
writeRobots();
