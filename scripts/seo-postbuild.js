const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const SITE_URL = "https://docs.yylx.io";
const SITE_NAME = "鱼鱼连线 YYLX.IO 文档中心";
const OG_IMAGE = "https://yylx.io/og.png";
const OUT_DIR = path.join(__dirname, "..", "_book");

const pages = [
  {
    file: "index.html",
    source: "README.md",
    title: "鱼鱼连线 AI 中转站介绍文档",
    description:
      "鱼鱼连线 YYLX.IO 文档中心介绍 AI 中转站的接入方式、API Key 创建、Base URL 配置、模型选择、计费入口和客户端使用流程，适合 Claude Code、Codex、Cursor、Cherry Studio 等工具用户快速完成配置、验证调用并排查常见错误，减少接入踩坑。",
    keywords: ["AI 中转站", "YYLX.IO", "API Key", "OpenAI 兼容接口"]
  },
  {
    file: "access/overview.html",
    source: "access/overview.md",
    title: "鱼鱼连线 AI 中转站接入概览",
    description:
      "鱼鱼连线 AI 中转站接入概览说明 Base URL、API Key、模型名称、OpenAI 兼容接口和 Anthropic 兼容接口之间的关系，帮助首次接入的开发者判断控制台、代码项目、Claude Code、Codex 或其他客户端工具中各项配置应该怎样填写，并完成首次请求验证。",
    keywords: ["AI 中转站接入", "Base URL", "OpenAI 兼容接口", "Anthropic API"]
  },
  {
    file: "access/create-api-key.html",
    source: "access/create-api-key.md",
    title: "鱼鱼连线 API Key 创建教程",
    description:
      "鱼鱼连线 API Key 创建教程说明如何在控制台生成、命名、复制、保存和测试密钥，并建议按 Claude Code、Codex、Cursor、Cherry Studio 等工具或项目拆分管理，方便追踪余额消耗、定位异常调用、轮换失效密钥并降低 Key 泄露风险，适合团队和个人长期使用。",
    keywords: ["API Key 创建", "AI API Key", "YYLX API Key"]
  },
  {
    file: "access/cc-switch.html",
    source: "access/cc-switch.md",
    title: "CC Switch 接入鱼鱼连线教程",
    description:
      "CC Switch 接入鱼鱼连线教程介绍如何一键导入或手动添加 YYLX.IO Provider，集中管理 Claude Code、Codex、Gemini CLI 等 AI CLI 工具的 Base URL、API Key、模型名称和切换配置，适合需要多工具统一路由、快速切换模型和减少重复配置的开发者。",
    keywords: ["CC Switch", "Claude Code Provider", "Codex Provider", "AI CLI 配置"]
  },
  {
    file: "access/claude-code.html",
    source: "access/claude-code.md",
    title: "Claude Code 接入鱼鱼连线 AI 中转站教程",
    description:
      "Claude Code 接入鱼鱼连线 AI 中转站教程，说明 ANTHROPIC_BASE_URL、ANTHROPIC_AUTH_TOKEN、默认模型和 settings.json 应该如何配置，并覆盖模型切换、连接验证、API Key 管理、请求失败、网络异常、余额消耗和常见错误排查。",
    keywords: ["Claude Code 中转站", "Claude Code API 配置", "ANTHROPIC_BASE_URL"]
  },
  {
    file: "access/claude-desktop.html",
    source: "access/claude-desktop.md",
    title: "Claude Desktop 接入鱼鱼连线教程",
    description:
      "Claude Desktop 接入鱼鱼连线教程说明第三方 Provider 或 Gateway 的配置思路，演示在 macOS 和 Windows 中填写 API Key、服务地址、模型名称和连接参数，通过 YYLX.IO 使用兼容模型服务，并排查鉴权失败、模型不可用和常见连接问题。",
    keywords: ["Claude Desktop Gateway", "Claude Desktop Provider", "Claude Desktop 中转"]
  },
  {
    file: "access/codex.html",
    source: "access/codex.md",
    title: "Codex CLI 接入鱼鱼连线 AI 中转站教程",
    description:
      "Codex CLI 接入鱼鱼连线 AI 中转站教程，说明如何在 config.toml 中配置自定义 Provider、base_url、YYLX_API_KEY 和模型名称，并给出启动验证、常见报错、网络失败、模型路由、auto review 权限和配置检查方法，帮助开发者稳定运行 Codex。",
    keywords: ["Codex CLI 中转", "Codex API 配置", "Codex Provider", "config.toml"]
  },
  {
    file: "access/codex-plus-plus.html",
    source: "access/codex-plus-plus.md",
    title: "Codex++ 接入鱼鱼连线 AI 中转站教程",
    description:
      "Codex++ 接入鱼鱼连线 AI 中转站教程，说明如何下载安装 Codex++ 管理工具、添加 YYLX Provider、填写 Base URL、API Key、Responses API 协议、拉取模型列表、测试连接并确认请求进入 yylx.io 使用记录，避免和官方 Codex CLI 配置混淆。",
    keywords: ["Codex++", "CodexPlusPlus", "Codex 桌面端", "AI 中转站", "Responses API"]
  },
  {
    file: "access/cursor.html",
    source: "access/cursor.md",
    title: "Cursor 接入鱼鱼连线 AI 中转站教程",
    description:
      "Cursor 接入鱼鱼连线 AI 中转站教程，说明如何配置 OpenAI 兼容接口、API Key、Override OpenAI Base URL 和模型名称，并提供 Verify 失败、模型不可用、网络异常、余额消耗、请求超时和客户端配置排查建议，适合把 Cursor 接到统一网关。",
    keywords: ["Cursor Claude API", "Cursor OpenAI Base URL", "Cursor API Key"]
  },
  {
    file: "access/cherry-studio.html",
    source: "access/cherry-studio.md",
    title: "Cherry Studio 接入鱼鱼连线教程",
    description:
      "Cherry Studio 接入鱼鱼连线教程介绍如何添加 YYLX.IO OpenAI 兼容 Provider，填写 API 地址、API Key、模型名称和测试参数，完成连接验证，并处理 401、404、模型列表为空、请求失败、余额不足和多模型切换等常见问题，适合桌面客户端用户。",
    keywords: ["Cherry Studio Provider", "Cherry Studio API", "OpenAI 兼容 Provider"]
  },
  {
    file: "faq.html",
    source: "faq.md",
    title: "鱼鱼连线 AI 中转站 常见问题",
    description:
      "鱼鱼连线 AI 中转站常见问题整理 Base URL、API Key、模型名称、余额消耗、401、403、404、429、503、协议不匹配、响应慢、模型不可用和 Key 泄露等问题，帮助用户快速定位配置、网络、账户或调用错误并完成修复，减少接入和使用中断，适合排查调用失败。",
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

function sourceLastmod(page) {
  try {
    const sourcePath = path.join(__dirname, "..", page.source);
    const lastmod = execFileSync("git", ["log", "-1", "--format=%cs", "--", sourcePath], {
      cwd: path.join(__dirname, ".."),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) return lastmod;
  } catch (_) {
    // If git metadata is unavailable during a build, omit lastmod instead of inventing it.
  }
  return "";
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

function textContent(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();
}

function normalizeH1s(html) {
  let keptPrimaryH1 = false;

  return html.replace(/<h1\b([^>]*)>([\s\S]*?)<\/h1>/gi, (match, attrs, content) => {
    const text = textContent(content);
    const isSearchTitle = /\bsearch-results-title\b/.test(attrs);
    const shouldKeep = !keptPrimaryH1 && text && !isSearchTitle;

    if (shouldKeep) {
      keptPrimaryH1 = true;
      return match;
    }

    return `<h2${attrs}>${content}</h2>`;
  });
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

  html = html
    .replace(/<title>[\s\S]*?<\/title>/i, `${tags}\n        <title>${escapeHtml(page.title)}</title>`);
  html = normalizeH1s(html);
  fs.writeFileSync(filePath, html);
}

function writeSitemap() {
  const urls = pages
    .map((page) => {
      const lastmod = sourceLastmod(page);
      return `  <url>
    <loc>${pageUrl(page)}</loc>
${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ""}    <changefreq>${page.file === "index.html" ? "weekly" : "monthly"}</changefreq>
    <priority>${page.file === "index.html" ? "1.0" : "0.8"}</priority>
  </url>`;
    })
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
