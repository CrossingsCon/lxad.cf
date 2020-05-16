function redirect(links) {
  return async function(ctx) {
    const slug = ctx.request.path.substring(1); // string the `/` off the front
    const link = links.find(el => el.slug === slug);

    if(link) {
      ctx.response.status = 200;
      ctx.response.body = renderLinkPage(link);
    } else {
      ctx.response.status = 404;
      ctx.response.body = render404Page(slug);
    }
  }
}

function renderLinkPage(link) {
  return `<!DOCTYPE html>
<html>
<head><title>Linguistics After Dark | ${link.slug}</title></head>
<body>
  <p>Redirecting you to ${link.href}...</p>
</body>
</html>
`;
}

function render404Page(slug) {
  return `<!DOCTYPE html>
<html>
<head><title>Linguistics After Dark | 404</title></head>
<body>
  <p>Sorry, we don't seem to have a link for ${slug}!</p>
  <p>If you think we ought to, please write to us! You can find our contact info at <a href="https://www.lingusticsafterdark.com/">https://www.lingusticsafterdark.com/</a></p>
</body>
</html>
`;
}

export { redirect };
