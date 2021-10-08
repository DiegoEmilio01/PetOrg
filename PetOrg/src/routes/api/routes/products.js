const KoaRouter = require('koa-router');
const { filtered } = require('../methods');
const { apiGuardCoord } = require('../guards');

const router = new KoaRouter();

const PERMITTED_FIELDS = ['id', 'name', 'used', 'price', 'stock', 'description', 'photo']

router.param('id', async (id, ctx, next) => {
    const product = await ctx.orm.product.findByPk(id);
    if (!product) ctx.throw(404);
    ctx.state.product = product;
    return next();
  });
  
router.get('products', '/', async (ctx) => {
  const products = await ctx.orm.product.findAll({ attributes: PERMITTED_FIELDS });
  ctx.body = { products: products.map((product) => {
    product.dataValues.path = ctx.router.url('product', product.id);
    product.dataValues.photoPath = ctx.state.cloudinary.url(product.photo);
    return product
  })};
});

router.get('product', '/:id', async (ctx) => {
    const { product } = ctx.state;
    const filteredProduct = filtered(product.dataValues, PERMITTED_FIELDS);
    ctx.body = { product: filteredProduct };
});

router.post('product-create', '/', apiGuardCoord,  async (ctx) => {
  const product = ctx.orm.product.build(ctx.request.body);
  try {
    await product.save({fields: PERMITTED_FIELDS});
    ctx.body = { "message": "Producto creado exitosamente!", "success": "true" };
  } catch (error) {
    ctx.body = { "error": error, "success": "false"};
  }
});

router.patch('product-update', '/:id', apiGuardCoord, async (ctx) => {
  const { product } = ctx.state;
  try {
    await product.update(ctx.request.body, { fields: PERMITTED_FIELDS });
    ctx.body = { "message": "Producto editado exitosamente", "success": "true" };
  } catch (error) {
    ctx.body = { error, "success": "false" };
  }
});

router.delete('product-delete', '/:id', apiGuardCoord, async (ctx) => {
  const { product } = ctx.state;
  try{
    await product.destroy();
    ctx.body = { "message": "Producto eliminado exitosamente", "success": "true" };
  } catch (error){
    ctx.body = { error, "success": "false" };
  }
});

module.exports = router;
