const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Fn = Sequelize.fn;
const Col = Sequelize.col;

const { Device, Record } = require('../../models/');

// @Route POST api/record
// @Desc  Register new record of data
router.post('/', async (req, res) => {

  try {
    const deviceExist = await Device.findOne({ where: { id: req.body.deviceId } })

    if (!deviceExist) await Device.create({ id: req.body.deviceId })

    const newRecord = new Record({ ...req.body, recordId: Date.now() })
    await newRecord.save()

    res.json(newRecord)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }

})

// @Route GET api/record
// @Desc  Get all available records
router.get('/', async (req, res) => {
  const allRecord = await Record.findAll({ include: [Device] })

  res.json(allRecord)
})

// @Route GET api/record/lastrecord
// @Desc  Get last record of each device id
router.get('/lastrecord', async (req, res) => {
  try {
    const lastRecordById = await Record.findAll({
      attributes: ['deviceId', [Fn('MAX', Col('recordid')), 'lastRecord']],
      group: ['deviceId']
    })
    const lastRecordIds = lastRecordById.map(record => record.dataValues.lastRecord);

    const records = await Record.findAll({
      where: {
        recordid: {
          [Op.in]: lastRecordIds
        }
      },
      include: [Device],
      order: [
        ['deviceId', 'ASC'],

      ],
    })

    res.json(records);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

// @Route GET api/record/:deviceid/:hours
// @Desc  Get record data by device ID on the last :hours hours
router.get('/:deviceId/:hours', async (req, res) => {
  try {
    const { deviceId, hours } = req.params
    const records = await Record.findAll({
      where: {
        [Op.and]: [
          {
            deviceId: deviceId,
            recordDate: {
              [Op.gte]: new Date(new Date() - hours * 60 * 60 * 1000)
            }
          }
        ]
      },
      include: [Device]
    });

    res.json(records)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

module.exports = router