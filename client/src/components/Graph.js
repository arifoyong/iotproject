import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Line from './Line'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const baseSet = {
  label: "",
  borderColor: 'red',
  data: [],
  fill: false,
  borderDash: [10, 5],
  pointRadius: 0,
  borderWidth: 1
}

const makeDataSet = (label, color, data, borderDash, pointRadius, borderWidth) => {
  return { ...baseSet, label: label, borderColor: color, data: data, borderDash: borderDash, pointRadius: pointRadius, borderWidth: borderWidth }
}


function Graph() {
  const { id } = useParams()
  const [data, setData] = useState([])

  const tempData = [
    makeDataSet("temp", "blue", data.map(d => ({ t: d.recordDate, y: d.temp })), [], 3, 2),
    makeDataSet("temp_ucl", "purple", data.map(d => ({ t: d.recordDate, y: d.device.temp_ucl })), [10, 5], 0, 1),
    makeDataSet("temp_lcl", "green", data.map(d => ({ t: d.recordDate, y: d.device.temp_lcl })), [10, 5], 0, 1),
  ]

  const humiData = [
    makeDataSet("humi", "blue", data.map(d => ({ t: d.recordDate, y: d.humi })), [], 3, 2),
    makeDataSet("humi_ucl", "purple", data.map(d => ({ t: d.recordDate, y: d.device.humi_ucl })), [10, 5], 0, 1),
    makeDataSet("humi_lcl", "green", data.map(d => ({ t: d.recordDate, y: d.device.humi_lcl })), [10, 5], 0, 1),
  ]

  useEffect(() => {
    let URI = `/api/record/${id}/24`
    fetch(URI).then(res => res.json())
      .then(json => {
        setData(json)
      })
  }, [id])


  return (
    <Container fluid="false" className="graph-container">
      <Button variant="outline-primary">
        <Link to="/">back</Link>
      </Button>

      <Row >
        <Col md={12} lg={6}>
          <Line title={`Temperature (ID: ${id})`} yLabel="Temperature (deg C)" yMin={10} yMax={40} tempData={tempData} />
        </Col>

        <Col md={12} lg={6}>
          <Line title={`Humidity (ID: ${id})`} yLabel="Humidity (%)" yMin={40} yMax={100} tempData={humiData} />
        </Col>
      </Row>
    </Container>

  )
}

export default Graph