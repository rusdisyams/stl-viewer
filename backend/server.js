const Koa = require('koa')
const Router = require('koa-router')
const json = require('koa-json')
const serve = require('koa-static')
const mount = require('koa-mount')
//const cors = require('koa-cors')
const models = require('./data/models')

const app = new Koa()

const router = new Router()

const static_pages = new Koa()

static_pages.use(serve(__dirname + '/../frontend/build')) //serve the build directory

async function index(ctx) {
  // ctx.set('Access-Control-Allow-Origin', '*')
  // ctx.set(
  //   'Access-Control-Allow-Headers',
  //   'Origin, X-Requested-With, Content-Type, Accept'
  // )
  // ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
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

//router.get('/', index)

//app.use(json())
app.use(router.routes())
app.use(router.allowedMethods())

app.use(mount('/', static_pages))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}!`))
