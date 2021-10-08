const KoaRouter = require('koa-router');
const { filtered } = require('../methods');
const { apiGuardCoord } = require('../guards');

const router = new KoaRouter();

const PERMITTED_FIELDS = [
    'title',
    'content',
    'date',
    'photo',
];  

const COORDINATOR_PERMITTED_PARAMETERS = [
    'name',
    'email',
];

const JOB_PERMITTED_PARAMETERS = [
    'name',
    'description',
];

router.param('id', async (id, ctx, next) => {
    const newsitem = await ctx.orm.newsitem.findByPk(id, { include:  [{ model: ctx.orm.coordinator, attributes: COORDINATOR_PERMITTED_PARAMETERS, 
        include: [{ model: ctx.orm.job, attributes: JOB_PERMITTED_PARAMETERS }]}]});
    if (!newsitem) ctx.throw(404);
    ctx.state.newsitem = newsitem;
    return next();
  });
  
router.get('newsitems', '/', async (ctx) => {
  const newsitems = await ctx.orm.newsitem.findAll({ attributes: PERMITTED_FIELDS,
    include:  [{ model: ctx.orm.coordinator, attributes: COORDINATOR_PERMITTED_PARAMETERS, 
                include: [{ model: ctx.orm.job, attributes: JOB_PERMITTED_PARAMETERS }]}] });
  ctx.body = { newsitems };
});

router.get('newsitem', '/:id', async (ctx) => {
    const { newsitem } = ctx.state;
    permittedFields = [...PERMITTED_FIELDS];
    permittedFields.push('coordinator')
    const filterednewsitem = filtered(newsitem.dataValues, permittedFields);
    ctx.body = { newsitem: filterednewsitem };
});

router.post('newsitem-create', '/', apiGuardCoord, async (ctx) => {
  const newsitem = ctx.orm.newsitem.build(ctx.request.body);
  try {
    await newsitem.save({fields: PERMITTED_FIELDS});
    ctx.body = { "message": "Noticia creado exitosamente!", "success": "true" };
  } catch (error) {
    ctx.body = { "error": error, "success": "false"};
  }
});

router.patch('newsitem-update', '/:id', apiGuardCoord, async (ctx) => {
  const { newsitem } = ctx.state;
  try {
    await newsitem.update(ctx.request.body, { fields: PERMITTED_FIELDS });
    ctx.body = { "message": "Noticia editada exitosamente", "success": "true" };
  } catch (error) {
    ctx.body = { error, "success": "false" };
  }
});

router.delete('newsitem-delete', '/:id', apiGuardCoord, async (ctx) => {
  const { newsitem } = ctx.state;
  try{
    await newsitem.destroy();
    ctx.body = { "message": "Noticia eliminada exitosamente", "success": "true" };
  } catch (error){
    ctx.body = { error, "success": "false" };
  }
});

module.exports = router;
