module.exports = function sendAdoptEmail(ctx, pet, user) {
  // you can get all the additional data needed by using the provided one plus ctx
  return ctx.sendMail('adopt-email', { to: user.email, subject: '[PetOrg] Adopción' }, { user, pet });
};
