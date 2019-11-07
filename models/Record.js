module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('record', {
    recordId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    recordDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    temp: {
      type: DataTypes.FLOAT,
    },
    humi: {
      type: DataTypes.FLOAT,
    },
    batt: {
      type: DataTypes.FLOAT,
    }
  },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  return Record;
}