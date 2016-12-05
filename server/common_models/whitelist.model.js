'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Whitelist', {
    infoid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    accessid:{ 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    personid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
}
