import fs from "fs"
import path from "path"
import fastify from "fastify"
import fastifyStatic from "fastify-static"
import formBodyPlugin from "fastify-formbody"
import pointOfView from "point-of-view"
import Handlebars from "handlebars"

const app = fastify({ logger: false })
const root = path.dirname(new URL(import.meta.url).pathname)

app.register(fastifyStatic, {
  root: root,
  prefix: "/fledge"
})
app.register(formBodyPlugin)
app.register(pointOfView, {
  engine: {
    handlebars: Handlebars
  }
})

app.get("/fledge/reporting", (request, reply) => {
  const data = {
    date: new Date(),
    query: request.query,
    body: request.body,
  }
  const log = JSON.stringify(data) + '\n'
  fs.writeFileSync("./report.log", log, { flag: 'a' })
  reply.code(201).send("")
})

app.listen(process.env.PORT, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  console.log(`Your app is listening on ${address}`)
  app.log.info(`server listening on ${address}`)
})
