const NAV_STYLE = `
<style id="fx-research-nav-style">
  .fx-research-nav {
    position: relative;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    min-height: 64px;
    padding: 14px clamp(18px, 4vw, 48px);
    background: rgba(255, 255, 255, 0.94);
    border-bottom: 1px solid rgba(226, 232, 240, 0.95);
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  }

  .fx-research-nav,
  .fx-research-nav * {
    box-sizing: border-box;
  }

  .fx-research-brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: #1E293B;
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.3px;
    text-decoration: none;
    white-space: nowrap;
  }

  .fx-research-brand-mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    color: #2563EB;
    background: linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(96, 165, 250, 0.18) 100%);
    border: 1px solid rgba(37, 99, 235, 0.16);
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.08);
  }

  .fx-research-brand-mark svg {
    width: 19px;
    height: 19px;
  }

  .fx-research-links {
    display: flex;
    align-items: center;
    gap: clamp(12px, 2.6vw, 28px);
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .fx-research-link {
    color: #64748B;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-decoration: none;
    transition: color 0.2s ease;
    white-space: nowrap;
  }

  .fx-research-link:hover,
  .fx-research-link:focus-visible {
    color: #2563EB;
  }

  @media (max-width: 520px) {
    .fx-research-nav {
      align-items: flex-start;
      flex-direction: column;
      gap: 12px;
      padding: 14px 18px;
    }

    .fx-research-links {
      width: 100%;
      justify-content: flex-start;
    }
  }
</style>
`;

const NAV_HTML = `
<nav class="fx-research-nav" aria-label="研究报告导航">
  <a class="fx-research-brand" href="/" aria-label="返回首页">
    <span class="fx-research-brand-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 12.5L20 4L15.5 20L11.8 13.7L4 12.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
        <path d="M12 13.5L20 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
      </svg>
    </span>
    <span>飞行无界</span>
  </a>
  <div class="fx-research-links">
    <a class="fx-research-link" href="/">返回首页</a>
    <a class="fx-research-link" href="/research">研究报告</a>
    <a class="fx-research-link" href="/follow">关注我们</a>
  </div>
</nav>
`;

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathname = url.pathname.replace(/\/+$/, '');

  if (pathname === '/research' || pathname === '/research.html') {
    return context.next();
  }

  const response = await context.next();
  const contentType = response.headers.get('content-type') || '';

  if (!contentType.includes('text/html')) {
    return response;
  }

  const html = await response.text();
  const withStyle = html.includes('</head>')
    ? html.replace('</head>', `${NAV_STYLE}</head>`)
    : `${NAV_STYLE}${html}`;
  const withNav = withStyle.includes('<body>')
    ? withStyle.replace('<body>', `<body>${NAV_HTML}`)
    : withStyle.replace(/<body([^>]*)>/i, `<body$1>${NAV_HTML}`);

  const headers = new Headers(response.headers);
  headers.delete('content-length');

  return new Response(withNav, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
