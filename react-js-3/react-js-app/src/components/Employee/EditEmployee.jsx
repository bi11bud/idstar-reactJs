import React, { useState } from 'react';
import {
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Row, Col,
  Label
} from 'reactstrap';
import Swal from "sweetalert2";
import Employees from '../../Entity/Employee';
import EmployeesDetail from '../../Entity/EmployeeDetail';
import { useNavigate } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import moment from "moment";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

export default function EditEmployee(props) {

  const navigate = useNavigate();

  const { item, detail } = props.employee;
  const [name, setName] = useState(item.name);
  const [address, setAddress] = useState(item.address);
  const [status, setStatus] = useState(item.status === "Active" ? true : false);
  const [nik, setNik] = useState(detail.nik);
  const [npwp, setNpwp] = useState(detail.npwp);
  const [birthdate, setBirthdate] = useState(item.birthdate);

  const [modalEdit, setModalEdit] = useState(false);

  function handleChange() {
    setStatus(!status);
  };

  function handleModalEdit() {
    setModalEdit(!modalEdit);
  }

  function onChangeBirthDate(e) {
    setBirthdate(e._d)
  }

  const submitEdit = () => {

    let date = new Date();
    const currentDate = moment(date).format('DD-MM-YYYY HH:mm:ss')
    let bdate = moment(birthdate).format('DD-MM-YYYY')

    if (validateData()) {
      var stat = status ? "Active" : "Inactive"
      Employees.forEach((emp) => {
        if (emp.id.toString() === item.id.toString()) {
          emp.name = name
          emp.birthdate = bdate
          emp.address = address
          emp.status = stat
          emp.mdate = currentDate
        }
      })

      EmployeesDetail.forEach((empDetail) => {
        if (empDetail.id.toString() === detail.id.toString()) {
          empDetail.nik = nik
          empDetail.npwp = npwp
          empDetail.mdate = currentDate
        }
      })

      navigate('/employee');

      setModalEdit(!modalEdit);
      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: 'Success Edit ',
        timer: 3000
      });
    }

  }

  function validateData() {

    if (!name.trim()) {
      alertFailEdit('Name cannot be empty')
      return false;
    }

    if (!address.trim()) {
      alertFailEdit('Address cannot be empty')
      return false;
    }

    if (!birthdate) {
      alertFailEdit('Birthdate cannot be empty')
      return false;
    }
    
    if (!nik.trim()) {
      alertFailEdit('NIK cannot be empty')
      return false;
    }

    if (!npwp.trim()) {
      alertFailEdit('NPWP cannot be empty')
      return false;
    }

    return true;

  }

  function alertFailEdit(text) {
    Swal.fire({
      title: 'Failed',
      icon: 'warning',
      text: text,
      timer: 3000
    });
  }


  return (
    <>
      <Button color="secondary" outline onClick={handleModalEdit} className="mr-3">
        Edit
      </Button>
      <Modal isOpen={modalEdit} toggle={handleModalEdit}>
        <ModalHeader className='modal-header'>Edit Employee</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col>Name</Col>
              <Input value={name} onChange={(e) => setName(e.target.value)}
                type="text" id="name" required placeholder={name}></Input>
            </Row>
            <br />
            <Row>
              <Col>Address</Col>
              <Input value={address} onChange={(e) => setAddress(e.target.value)}
                type="text" id="address" required placeholder={address}></Input>
            </Row>
            <br />
            <Row>
              <Col>Birthdate</Col>
              <Datetime
                locale="en"
                timeFormat={false}
                dateFormat="DD-MM-YYYY"
                initialValue={moment(new Date())
                  .format("DD-MM-YYYY")}
                value={birthdate}
                onChange={(e) => {
                  onChangeBirthDate(e);
                }}
                inputProps={{ placeholder: "Birthdate", readOnly: true }}
                className="w-100 me-1"
              />
            </Row>
            <br />
            <Row>
              <Col>NIK</Col>
              <Input value={nik} onChange={(e) => setNik(e.target.value)}
                type="text" id="nik" required placeholder={nik}></Input>
            </Row>
            <br />
            <Row>
              <Col>NPWP</Col>
              <Input value={npwp} onChange={(e) => setNpwp(e.target.value)}
                type="text" id="npwp" required placeholder={npwp}></Input>
            </Row>
            <br />
            <Row>
              <Col>Status</Col>

              <Label><Switch defaultChecked color="secondary" checked={status} onChange={handleChange} name="status" />
                {status ? 'Active' : 'Inactive'}</Label>

            </Row>
          </Form >
        </ModalBody >
        <ModalFooter>
          <Button
            className="modal-button"
            outline
            color="light"
            onClick={submitEdit}
          >
            Submit
          </Button>

          <Button color="secondary" outline onClick={handleModalEdit} >
            Cancel
          </Button>
        </ModalFooter>
      </Modal >
    </>
  )
}