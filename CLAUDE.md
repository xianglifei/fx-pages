# fx-pages

## Research HTML filenames — auto-English rule

Whenever the user asks to commit / push / deploy the project, BEFORE staging,
check every `research/*.html` filename. If any filename contains non-ASCII
characters (e.g. Chinese), rename it to a pure-English slug **automatically**
— do not wait to be asked to translate.

Rules for the rename:
- Translate the title into a descriptive English slug: lowercase, hyphen-
  separated. Use the entity's official English name when known
  (e.g. 达势股份 → `dpc-dash`, 美股七姐妹 → `us-magnificent-seven-performance`).
- Preserve the trailing `-YYYYMMDD` date suffix exactly.
- Keep the `.html` extension.
- Use `git mv` if the file is already tracked, otherwise `mv`.
- Mention any renames in the commit message.

A filename is non-compliant if it contains any character outside ASCII
(a quick check: `ls research/*.html | grep -P '[^\x00-\x7F]'`).

## Deploy workflow

- Routine authorized deploys commit and push directly to `main` — no feature
  branches.
- Before pushing, run `node scripts/check-research-pages.js` to enforce the
  research page layout guardrail (body padding/margin must stay 0). Fix any
  violations before committing rather than skipping the check.

## 线上地址

- 主域名：<https://feixing.io>
- www 域名：<https://www.feixing.io>（已添加到 Cloudflare Pages，DNS / 证书 / 验证可能需要异步生效）
- Cloudflare Pages 默认域名：<https://fx-pages.pages.dev>
- GitHub 仓库：<https://github.com/xianglifei/fx-pages>

## 部署方式（Cloudflare Pages）

本项目托管在 GitHub，并通过 Cloudflare Pages 自动部署。推荐的 Pages 配置：

```text
Project name: fx-pages
Git provider: GitHub
Repository: xianglifei/fx-pages
Production branch: main
Build command: 留空
Build output directory: / 或 .
Root directory: /
Custom domain: feixing.io, www.feixing.io
```

发布流程：本地修改静态文件 → `git commit` → `git push origin main` → Cloudflare Pages 自动从 `main` 触发 Production 部署。

## 本地预览

直接用浏览器打开 `index.html`，或用任意静态文件服务器：

```bash
python3 -m http.server 8000
```

访问 `http://localhost:8000`。

## 研究报告页面规范

`functions/research/_middleware.js` 会给 `research/` 目录下的 HTML 子页面自动注入统一顶部导航条。导航条作为 `<body>` 的第一个子元素插入，因此研究子页面需遵守：

- `body` 只放全局字体、背景色、文字色等基础样式。
- `body` 的 `margin` 和 `padding` 必须保持为 `0`。
- 页面正文留白放在 `.container`、`.page`、`.report` 等内部容器上。
- 新增或修改研究报告后运行 `node scripts/check-research-pages.js`，防止页面自身 `body` 间距把注入导航条推开。

## 维护说明

- 线上主站以 `https://feixing.io` 为准。
- GitHub 仓库的 homepage 应保持为 `https://feixing.io`。
- 如需严格把 `www.feixing.io` 跳转到 `https://feixing.io`，在 Cloudflare Dashboard 配置 Redirect Rule 或 Bulk Redirect。
