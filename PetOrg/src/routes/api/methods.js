exports.filtered = (object, PERMITTED_FIELDS) => {
    return Object.keys(object)
    .filter(key => PERMITTED_FIELDS.includes(key))
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
}