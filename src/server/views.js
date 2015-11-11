const basePage = (head, body) => `
<!DOCTYPE html>
<html lang="en">
<head>
  ${head}
</head>
<body>
${body}
</body>
</html>
`

const baseHead = (title, extraHead = '') => `
<meta charset="UTF-8">
${extraHead}
<title>${title}</title>
`

const baseBody = (content) => `
<div id="content">
  ${content}
</div>
<script src="/public/bundle.js"></script>
`

const page = (title, content) => basePage(baseHead(title), baseBody(content))

const errorPage = (errorMsg) => page('Internal server error!', `
<h1>Internal server error</h1>
<pre>${errorMsg}</pre>
`)

export default { basePage, baseHead, baseBody, page, errorPage }
