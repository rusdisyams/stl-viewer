const Koa = require('koa')
const Router = require('koa-router')
const json = require('koa-json')
const serve = require('koa-static')
const mount = require('koa-mount')
const mime = require('mime-types')
const koaBody = require('koa-body')({ multipart: true, uploadDir: '.' })
const models = require('./data/models')

const app = new Koa()

const router = new Router()

//const static_pages = new Koa()

//static_pages.use(serve(__dirname + '/../frontend/build')) //serve the build directory

async function index(ctx) {
  ctx.response.body = 'Welcome from Server'
}

async function data(ctx) {
  ctx.body = models
}
router.get('/api/models', data)

router.get('/api/models/:id', (ctx) => {
  const model = models.find((m) => m._id === ctx.request.params.id)
  ctx.body = model
})

router.post('/upload', koaBody, async (ctx) => {
  try {
    const data = ctx.request.files.file

    console.log('data:' + data)
    ctx.redirect('/')
  } catch (err) {
    console.log(`error ${err.message}`)
  }
  console.log('get file')
})

app.use(router.routes())
app.use(router.allowedMethods())

//app.use(mount('/', static_pages))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}!`))
