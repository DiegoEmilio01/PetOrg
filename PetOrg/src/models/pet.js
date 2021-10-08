module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define('pet', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puede estar vacío",
        },
        is: {
          args: [/^[A-zÀ-ú-Z\s]*$/],
          msg: "Solo puede contener letras y espacios",
        },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puede estar vacío",
        },
        isInt: {
          msg: "Debe ser un número entero",
        },
      },
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [['m', 'h']],
      },
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [['S', 'M', 'L']],
      },
    },
    can_sponsor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [[true, false]],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [0, 200],
    },
    animalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    photo: {
      type: DataTypes.STRING,
    },
  }, {});

  pet.associate = function associate(models) {
    pet.belongsTo(models.user);
    pet.belongsToMany(models.user, {
      through: 'sponsorship',
      foreignKey: 'petId',
    });
    pet.belongsTo(models.animal);
  };

  return pet;
};
