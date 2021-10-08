require('dotenv').config();
const KoaRouter = require('koa-router');
const jwt = require('koa-jwt');
const auth = require('./auth');
const pets = require('./routes/pets');
const sign = require('./routes/sign');
const products = require('./routes/products');
const events = require('./routes/events');
const newsitems = require('./routes/newsitems');
const router = new KoaRouter({ prefix: '/api' });

router.use((ctx, next) => {
  ctx.apiUrl = (...params) => `${ctx.origin}${ctx.router.url(...params)}`;
  return next();
});

router.get('/', async (ctx) => {
  ctx.body = { message: 'API' };
});

router.use('/auth', auth.routes());
router.use('/sign', sign.routes());
router.use('/pets', pets.routes());

router.use(jwt({ secret: process.env.JWT_SECRET, key: 'jwtDecoded' }));

router.use('/newsitems', newsitems.routes());
router.use('/products', products.routes());
router.use('/events', events.routes());

module.exports = router;