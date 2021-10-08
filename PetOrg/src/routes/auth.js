const KoaRouter = require('koa-router');
const axios = require('axios');

const router = new KoaRouter();

router.post('auth-create', '/', async (ctx) => {
  const user = ctx.state.currentUser;
  const { url } = ctx.request.body;
  const requestOptions = {
      email: user.email,
      password: user.password
  };
  try {
    const token = await axios.post(`${url}/api/auth`, requestOptions).then((res) => res.data.token);
    ctx.body = { token };
  } catch (error) {
      ctx.body = { error };
  }
});

module.exports = router;
