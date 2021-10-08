const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('product-cart', '/', async (ctx) => {
  await ctx.render('cart/main', {});
});

module.exports = router;
