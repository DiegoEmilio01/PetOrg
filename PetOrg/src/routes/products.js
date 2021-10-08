const KoaRouter = require('koa-router');
const sendCheckoutEmail = require('../mailers/checkout');
const { guardCoord, guardUser } = require('./guards.js');

const router = new KoaRouter();

const PERMITED_FIELDS = [
  'name',
  'price',
  'stock',
  'used',
  'description',
  'photo',
];
const ORDER_PERMITED_FIELDS = [
  'amount',
  'productId',
  'userId',
  'date',
];
const USER_PERMITTED_FIELDS = [
  'money',
];


router.param('id', async (id, ctx, next) => {
  const product = await ctx.orm.product.findByPk(id);
  if (!product) ctx.throw(404);
  ctx.state.product = product;
  return next();
});

router.get('products', '/', async (ctx) => {
  const products = await ctx.orm.product.findAll();
  await ctx.render('products/index', {
    products,
    productPath: (id) => ctx.router.url('product', id),
    newProductPath: ctx.router.url('products-new'),
    indexPath: ctx.router.url('index'),
  });
});

router.get('products-new', '/new', guardCoord, (ctx) => {
  const product = ctx.orm.product.build();
  return ctx.render('products/new', {
    product,
    createProductPath: ctx.router.url('products-create'),
  });
});

router.post('products-create', '/', guardCoord, async (ctx) => {
  const product = ctx.orm.product.build(ctx.request.body);
  const { cloudinary } = ctx.state;
  try {
    const { photo } = ctx.request.files;
    if (photo.size > 0){
      const uploadedPhoto = await cloudinary.uploader.upload(photo.path);
      product.photo = uploadedPhoto.public_id;
    }
    await product.save({ fields: PERMITED_FIELDS });
    ctx.redirect(ctx.router.url('products'));
  } catch (error) {
    await ctx.render('products/new', {
      product,
      errors: error.errors,
      createProductPath: ctx.router.url('products-create'),
    });
  }
});

router.get('product-edit','/edit/:id', guardCoord, (ctx) => {
  const { product } = ctx.state;
  return ctx.render('products/edit', {
    product,
    productPath: ctx.router.url('product', product.id),
    updateProductPath: ctx.router.url('products-update',product.id),
  });
});

router.post('products-update', '/:id', guardCoord, async (ctx) => {
  const { product, cloudinary } = ctx.state;
  try {
    const { photo } = ctx.request.files;
    if (photo.size > 0){
      const uploadedPhoto = await cloudinary.uploader.upload(photo.path);
      ctx.request.body.photo = uploadedPhoto.public_id;
    }
    await product.update(ctx.request.body, { fields: PERMITED_FIELDS } );
    ctx.redirect(ctx.router.url('product', product.id));
  } catch (error) {
    await ctx.render('products/edit', {
      product,
      errors: error.errors,
      productPath: ctx.router.url('product', product.id),
      updateProductPath: ctx.router.url('products-update', product.id),
    });
  }
});

router.get('product-delete', '/delete/:id', guardCoord, async (ctx) => {
  const { product } = ctx.state;
  await product.destroy();
  const products = await ctx.orm.product.findAll();
  return ctx.render('products/index', {
    products,
    indexPath: ctx.router.url('index'),
    productPath: id => ctx.router.url('product', id),
    newProductPath: ctx.router.url('products-new'),
  });
});

router.get('product', '/:id', (ctx) => {
  const { product } = ctx.state;
  return ctx.render('products/show', {
    product,
    editProductPath: ctx.router.url('product-edit', product.id),
    productsPath: ctx.router.url('products'),
    deleteProductPath: ctx.router.url('product-delete', product.id),
    buyProductPath: ctx.router.url('buy', product.id),
  });
});

router.get('buy', '/buy/:id', guardUser, (ctx) => {
  const { product } = ctx.state;
  const stockArray = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= product.stock; i++) {
    stockArray.push(i);
  }
  return ctx.render('products/buy', {
    product,
    stockArray,
    checkoutPath: ctx.router.url('checkout', product.id),
  });
});

router.post('checkout', '/checkout/:id', guardUser, async (ctx) => {
  const { product } = ctx.state;
  const order = ctx.orm.order.build(ctx.request.body);
  const user = ctx.state.currentUser;
  // eslint-disable-next-line radix
  const previousStock = product.stock;
  // eslint-disable-next-line radix
  const futureStock = product.stock - parseInt(order.amount);
  const previousUserMoney = user.money;
  const futureUserMoney = user.money - (order.amount * product.price);
  const stockArray = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= product.stock; i++) {
    stockArray.push(i);
  }
  try {
    // eslint-disable-next-line radix
    product.stock -= parseInt(order.amount);
    await product.save({ fields: ['stock'] });
  } catch (error) {
    // eslint-disable-next-line radix,no-restricted-globals
    product.stock = (isNaN(product.stock) || product.stock < 0) ? previousStock : futureStock;
    return ctx.render('products/buy', {
      product,
      errors: error.errors,
      checkoutPath: ctx.router.url('checkout', product.id),
      stockArray,
    });
  }
  try {
    user.money = futureUserMoney;
    await user.save({ fields: USER_PERMITTED_FIELDS });
  } catch (error) {
    product.stock += parseInt(order.amount);
    await product.save({ fields: ['stock'] });
    // eslint-disable-next-line radix,no-restricted-globals
    user.money = (isNaN(user.money) || user.money < 0) ? previousUserMoney : futureUserMoney;
    return ctx.render('products/buy', {
      product,
      errors: error.errors,
      checkoutPath: ctx.router.url('checkout', product.id),
      stockArray,
    });
  }
  try {
    await order.save({ fields: ORDER_PERMITED_FIELDS });
    // Send email here
    sendCheckoutEmail(ctx, product, user, order.amount);
    return ctx.redirect(ctx.router.url('product', product.id));
  } catch (error) {
    // eslint-disable-next-line radix
    product.stock += parseInt(order.amount);
    await product.save({ fields: ['stock'] });
    user.money = previousUserMoney;
    await user.save({ fields: USER_PERMITTED_FIELDS });
    return ctx.render('products/buy', {
      product,
      errors: error.errors,
      checkoutPath: ctx.router.url('checkout', product.id),
      stockArray,
    });
  }
});

const buy = async (ctx, user, products, total, date) => {
  if (user.money >= total){
    products.forEach(async (product) => {
      const order = ctx.orm.order.build({ amount: product.quantity, date , userId: user.id, productId: product.product.id });
      const realProduct = await ctx.orm.product.findByPk(product.product.id);
      realProduct.stock -= product.quantity;
      await realProduct.save({ fields: ['stock'] });
      await order.save({ fields: ORDER_PERMITED_FIELDS });
      // Send email here
      sendCheckoutEmail(ctx, product.product, user, order.amount);
      user.money -= product.quantity * product.product.price;
      await user.save({ fields: USER_PERMITTED_FIELDS });

    });
    ctx.body = {message: "success"};
  } else {
    ctx.body = { message: "failed", error: "Saldo insuficiente para realizar la compra."};
  }

  return ctx.body;
}
router.post('buy-cart', '/buy/cart', guardUser, async (ctx) => {
  const { products, date, total } = ctx.request.body;
  const user = ctx.state.currentUser;
  ctx.status = 201;
  const resp = await buy(ctx, user, products, total, date);
  return resp;
});

module.exports = router;
