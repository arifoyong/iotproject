const express = require('express');
const router = express.Router();

const { Device } = require('../../models');

// @Route POST api/device
// @Desc  Register new device by id
router.post('/', async (req, res) => {
  try {
    const deviceExist = Device.findOne({ id: req.body.id })
    if (!deviceExist) {
      return res.status(400).json({ errors: [{ msg: 'Device is available' }] })
    }

    const newDevice = new Device(req.body)
    await newDevice.save()
    res.json(newDevice)
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server error")
  }
});

// @Route GET api/device
// @Desc  Get all available devices
router.get('/', async (req, res) => {
  const devices = await Device.findAll()
  if (!devices) {
    return res.status(400).json({ errors: [{ msg: 'No device available' }] })
  }

  res.json(devices)
});

// @Route GET api/device/:id
// @Desc  Get one device
router.get('/:id', async (req, res) => {

  const device = await Device.findOne({ where: { id: req.params.id } })
  if (!device) {
    return res.status(400).json({ errors: [{ msg: 'No device available' }] })
  }

  res.json(device)
});

// @Route PUT api/device
// @Desc UPDATE device information
router.put('/', async (req, res) => {
  console.log("executing put")
  console.log(req.body)
  try {
    const device = await Device.findOne({
      where: {
        id: req.body.id
      }
    })

    if (!device) res.status(400).json({ errors: [{ msg: 'Device not available' }] })

    const newDevice = { ...device.dataValues, ...req.body }
    await device.update(newDevice)

    res.json(newDevice)
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server error")
  }
});

module.exports = router
