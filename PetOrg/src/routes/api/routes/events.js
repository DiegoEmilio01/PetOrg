const KoaRouter = require('koa-router');
const { filtered } = require('../methods');
const { apiGuardCoord } = require('../guards');

const router = new KoaRouter();

const PERMITTED_FIELDS = [
  'name',
  'location',
  'start_hour',
  'end_hour',
  'description',
  'date'
];

router.param('id', async (id, ctx, next) => {
    const event = await ctx.orm.event.findByPk(id);
    if (!event) ctx.throw(404);
    ctx.state.event = event;
    return next();
  });
  
router.get('events', '/', async (ctx) => {
  const events = await ctx.orm.event.findAll({ attributes: PERMITTED_FIELDS });
  ctx.body = { events };
});

router.get('event', '/:id', async (ctx) => {
    let { event } = ctx.state;
    const filteredEvent = filtered(event.dataValues, PERMITTED_FIELDS);
    ctx.body = { event: filteredEvent };
});

router.post('event-create', '/', apiGuardCoord, async (ctx) => {
  const event = ctx.orm.event.build(ctx.request.body);
  try {
    await event.save({fields: PERMITTED_FIELDS});
    ctx.body = { "message": "Evento creado exitosamente!", "success": "true" };
  } catch (error) {
    ctx.body = { "error": error, "success": "false"};
  }
});

router.patch('event-update', '/:id', apiGuardCoord, async (ctx) => {
  const { event } = ctx.state;
  try {
    await event.update(ctx.request.body, { fields: PERMITTED_FIELDS });
    ctx.body = { "message": "Evento editado exitosamente", "success": "true" };
  } catch (error) {
    ctx.body = { error, "success": "false" };
  }
});

router.delete('event-delete', '/:id', apiGuardCoord, async (ctx) => {
  const { event } = ctx.state;
  try{
    await event.destroy();
    ctx.body = { "message": "Evento eliminado exitosamente", "success": "true" };
  } catch (error){
    ctx.body = { error, "success": "false" };
  }
});

module.exports = router;
