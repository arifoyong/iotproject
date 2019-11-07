const config = require('config');
const axios = require('axios');
const SENSOR_CONFIG = config.get("SENSOR_CONFIG");

// PARAMS
URL = "http://localhost:5000/api/sensordata/"
sensorData = '030301FF012605320C90052A11AF052C'

// ############################################

const calcData = (data) => {
  hexVal = data.substr(0, 4)
  scale = SENSOR_CONFIG["Scale"][data.substr(4, 2)]
  unit = SENSOR_CONFIG["Unit"][data.substr(6, 2)]
  value = parseInt(hexVal, 16) * parseFloat(scale)

  return { value: value.toFixed(2), unit: unit }
}

data = {
  id: parseInt(sensorData.substr(0, 6)),
  batt: calcData(sensorData.substr(8, 8)).value,
  temp: calcData(sensorData.substr(16, 8)).value,
  humi: calcData(sensorData.substr(24, 8)).value
}

axios.post(URL, data)
  .then((response) => {
    console.log(response.status, response.statusText);
  }, (error) => {
    console.log(error.message);
  });
