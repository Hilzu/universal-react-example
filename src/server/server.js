import app from './app'

const port = process.env.PORT || 3000
const host = 'localhost'

const server = app.listen(port, host, () => {
  let { address, port } = server.address()
  console.log(`Listening on http://${address}:${port}`)
})
