module.exports = function sendcheckoutEmail(ctx, product, user, amount) {
  // you can get all the additional data needed by using the provided one plus ctx
  return ctx.sendMail('checkout-email', { to: user.email, subject: '[PetOrg] Compra' }, { user, product , amount });
};
