import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import MyModal from './MyModal'

const URI = '/api/device'

function Setting() {
  const [data, setData] = useState([])
  const [targetData, setTargetData] = useState(1)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    setTargetData(e.target.id)
  }

  const updateData = () => {
    fetch(URI).then(res => res.json())
      .then(json => {
        setData(json)
      })
  }

  useEffect(() => {
    updateData()
  }, [])

  const renderRow = (item, index) => {
    return (
      <tr key={index}>
        <th scope="row">{item.id}</th>
        <td>{item.location}</td>
        <td>{item.alertActive ? "True" : "False"}</td>
        <td>{item.temp_lcl}</td>
        <td>{item.temp_ucl}</td>
        <td>{item.humi_lcl}</td>
        <td>{item.humi_ucl}</td>
        <td>{item.batt_lcl}</td>
        <td>{item.batt_ucl}</td>
        <td><Button id={item.id} variant="primary" onClick={handleShow}>Edit</Button></td>
      </tr >
    )
  }

  return (
    <Container className="table-container" fluid="true">
      <Table responsive="md" hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Location</th>
            <th>Alert Active</th>
            <th>Temp LCL</th>
            <th>Temp UCL</th>
            <th>Humi LCL</th>
            <th>Humi UCL</th>
            <th>Batt LCL</th>
            <th>Batt UCL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => renderRow(item, i))}
        </tbody>
      </Table>
      <MyModal show={show} handleClose={handleClose} updateData={updateData} idNo={targetData} />
    </Container>

  )
}

export default Setting
