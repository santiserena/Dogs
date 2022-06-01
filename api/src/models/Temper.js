const {DataTypes} = require ('sequelize');


let contr = 0


module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('temper', {
      name: {
        type: DataTypes.STRING,
      },
      
    },{timestamps: false});
  };