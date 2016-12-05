'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Accessrights', {
    infoid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    accessright:{ 
      type: DataTypes.ENUM('none','limited','all'),
	  defaultValue: 'none',
      allowNull: false
    },
    personid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
}
