module.exports = (sequelize, DataTypes) => {
  const newsitem = sequelize.define('newsitem', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puede estar vacío",
        },
        len: {
          args: [5, 32],
          msg: "Debe tener un largo de entre 5 y 32 caracteres",
        },
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puede estar vacío",
        },
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puede estar vacío",
        },
        isDate: {
          args: [true],
          msg: "Debe ingresar una fecha válida",
        },
      },
    },
    photo: {
      type: DataTypes.STRING,
    },
  }, {});

  newsitem.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    newsitem.belongsTo(models.coordinator);
  };

  return newsitem;
};
