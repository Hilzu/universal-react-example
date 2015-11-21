import he from 'he'

/* eslint-disable standard/object-curly-even-spacing */
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

const baseBody = (content, extraBody = '') => `
<div id="content">${content}</div>
${extraBody}
<script src="/public/bundle.js"></script>
`

const page = (title, content, { extraBody = '' } = {}) =>
  basePage(baseHead(title), baseBody(content, extraBody))

const errorPage = (errorMsg) => page('Internal server error!', `
<h1>Internal server error</h1>
<pre>${errorMsg}</pre>
`)

const script = ({ id = '', content = '', type = '', src = '' } = {}) => `
<script${ifAttr('id', id)}${ifAttr('type', type)}${ifAttr('src', src)}>
  ${he.encode(content)}
</script>
`

export default { basePage, baseHead, baseBody, page, errorPage, script }
/* eslint-enable standard/object-curly-even-spacing */

function ifAttr (name, value) {
  return value ? ` ${name}="${he.encode(value)}"` : ''
}
