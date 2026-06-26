# 飞行无界官网

这是「飞行无界」的静态官网首页，用于展示 AI Native 投资研究机构的品牌介绍。

## 线上地址

- 主域名：<https://feixing.io>
- www 域名：<https://www.feixing.io>（已添加到 Cloudflare Pages，DNS / 证书 / 验证可能需要异步生效）
- Cloudflare Pages 默认域名：<https://fx-pages.pages.dev>
- GitHub 仓库：<https://github.com/xianglifei/fx-pages>

## 项目结构

```text
.
├── index.html       # 官网首页，包含 HTML、CSS 和页面内容
├── research.html    # 研究报告页面，展示飞书社群二维码
├── follow.html      # 关注我们页面，展示公众号 / 小红书入口与联系邮箱
├── resources/       # 静态图片资源，例如二维码图片（页面直接引用的资源优先使用英文文件名）
├── CHANGELOG.md     # 变更记录
└── .gitignore       # 本地忽略文件
```

当前项目是纯静态页面，不需要安装依赖，也不需要构建步骤。

## 部署方式

本项目托管在 GitHub，并通过 Cloudflare Pages 自动部署。

推荐的 Cloudflare Pages 配置：

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

发布流程：

1. 在本地修改 `index.html`、`research.html`、`follow.html` 或其他静态文件。
2. 提交到 Git：

   ```bash
   git add .
   git commit -m "Update site content"
   ```

3. 推送到 GitHub：

   ```bash
   git push origin main
   ```

4. Cloudflare Pages 会自动从 GitHub 的 `main` 分支触发 Production 部署。

## 本地预览

可以直接用浏览器打开 `index.html`，也可以使用任意静态文件服务器预览，例如：

```bash
python3 -m http.server 8000
```

然后访问：

```text
http://localhost:8000
```

## 维护说明

- 线上主站以 `https://feixing.io` 为准。
- GitHub 仓库的 homepage 应保持为 `https://feixing.io`。
- `www.feixing.io` 已添加到 Cloudflare Pages；如需严格跳转到 `https://feixing.io`，建议在 Cloudflare Dashboard 中配置 Redirect Rule 或 Bulk Redirect。
