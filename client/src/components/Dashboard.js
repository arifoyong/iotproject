import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const URI = '/api/record/lastrecord'

const formatDate = (dateString) => {
  const d = new Date(dateString)
  const monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ]
  const minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
  return d.getDate() + "-" + monthNames[d.getMonth()] + "-" + d.getFullYear() + " " + d.getHours() + ":" + minutes
}

const displayCard = (dt, index) => {
  return (
    <Col key={index} xs={12} md={6} lg={4}>
      <Card>
        <Link className="btn btn-primary" to={{ pathname: `/graph/${dt.deviceId}` }}>
          <Card.Header>ID: {dt.deviceId} @ {dt.device.location}</Card.Header>
        </Link>
        <Card.Body>
          <Row>
            <Col>
              <Card.Text>Temperature</Card.Text>
              <Card.Text>{dt.temp}&deg;C</Card.Text>
            </Col>
            <Col>
              <Card.Text>Humidity</Card.Text>
              <Card.Text>{dt.humi}%</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text className="last-update-time">
                Last update: {formatDate(dt.recordDate)}
              </Card.Text>

            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>

  )
}

function Dashboard() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(URI).then(res => res.json())
      .then(json => {
        setData(json)
      })
  }, [])

  return (
    <Container>
      <Row>
        {data.map((data, index) => displayCard(data, index))}
      </Row>
    </Container>

  )
}

export default Dashboard