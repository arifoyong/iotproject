import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function MyModal(props) {
  const { show, handleClose, updateData } = props;
  const [dt, setForm] = useState({})

  useEffect(() => {
    let URI = `/api/device/${props.idNo}`
    fetch(URI).then(res => res.json())
      .then(json => {
        setForm(json)
      })
  }, [props.idNo])

  const handleFormChange = e => {
    e.persist()
    if (e.target.name === 'alertActive') {
      setForm(dt => ({ ...dt, [e.target.name]: e.target.checked }))
    } else {
      setForm(dt => ({ ...dt, [e.target.name]: e.target.value }))
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    fetch('/api/device', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dt)
    }).then(response => {
      if (response.ok) {
        updateData()
      } else {
        console.log("Failed to update data")
      }
    })

    handleClose()
  }

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Device Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="deviceId">
                <Form.Label>Device ID</Form.Label>
                <Form.Control disabled type="number" name="id" value={dt.id} onChange={handleFormChange} />
              </Form.Group>
              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" name="location" value={dt.location} onChange={handleFormChange} />
              </Form.Group>
              <Form.Group controlId="alertactive">
                <Form.Check type="checkbox" label="Activate alert" name="alertActive" checked={dt.alertActive} onChange={handleFormChange} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="temp_lcl">
                <Form.Label>Temperature LCL</Form.Label>
                <Form.Control type="number" name="temp_lcl" value={dt.temp_lcl} onChange={handleFormChange} />
              </Form.Group>
              <Form.Group controlId="temp_ucl">
                <Form.Label>Temperature UCL</Form.Label>
                <Form.Control type="number" name="temp_ucl" value={dt.temp_ucl} onChange={handleFormChange} />
              </Form.Group>
              <Form.Group controlId="humi_lcl">
                <Form.Label>Humidity LCL</Form.Label>
                <Form.Control type="number" name="humi_lcl" value={dt.humi_lcl} onChange={handleFormChange} />
              </Form.Group>
              <Form.Group controlId="humi_ucl">
                <Form.Label>Humidity UCL</Form.Label>
                <Form.Control type="number" name="humi_ucl" value={dt.humi_ucl} onChange={handleFormChange} />
              </Form.Group>
              <Form.Group controlId="batt_lcl">
                <Form.Label>Battery LCL</Form.Label>
                <Form.Control type="number" name="batt_lcl" value={dt.batt_lcl} onChange={handleFormChange} />
              </Form.Group>
              <Form.Group controlId="batt_ucl">
                <Form.Label>Battery UCL</Form.Label>
                <Form.Control type="number" name="batt_ucl" value={dt.batt_ucl} onChange={handleFormChange} />
              </Form.Group>
            </Col>
          </Row>


          <ButtonToolbar>
            <Button className="mybtn" variant="primary" type="submit" onClick={handleSubmit}>
              Submit
          </Button>
            <Button className="mybtn" variant="danger" onClick={handleClose}>
              Cancel
          </Button>
          </ButtonToolbar>
        </Form>

      </Modal.Body>

    </Modal>
  );
}

export default MyModal;