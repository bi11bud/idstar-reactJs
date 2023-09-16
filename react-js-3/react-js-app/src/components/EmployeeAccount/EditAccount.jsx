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
} from 'reactstrap';
import Swal from "sweetalert2";
import EmployeesAccount from '../../Entity/EmployeeAccount';
import EmployeesDetail from '../../Entity/EmployeeDetail';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'

export default function EditAccount(props) {

  const navigate = useNavigate();

  const { item, detail } = props.employee;
  const empDetail = EmployeesDetail.find((d) => d.id.toString() === detail.detail.toString());
  const [accountName, setAccountName] = useState(item.name);
  const [accountNo, setAccountNo] = useState(item.accountNo);
  const [type, setType] = useState(item.type);

  const [modalEdit, setModalEdit] = useState(false);

  function handleModalEdit() {
    setModalEdit(!modalEdit);
  }

  const submitEdit = () => {

    if (validateData()) {

      const currentDate = moment(new Date()).format('DD-MM-YYYY HH:mm:ss')

      EmployeesAccount.forEach((acc) => {
        if (acc.id.toString() === item.id.toString() && acc.employeeId.toString() === detail.id.toString()) {
          acc.name = accountName
          acc.type = type
          acc.accountNo = accountNo
          acc.mdate = currentDate
        }
      })

      navigate('/account');

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

    if (!accountName.trim()) {
      alertFailEdit('Account Name cannot be empty')
      return false;
    }

    if (!type.trim()) {
      alertFailEdit('Type cannot be empty')
      return false;
    }

    if (!accountNo.trim()) {
      alertFailEdit('Account No cannot be empty')
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
        <ModalHeader className='modal-header'>Edit Account</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col>Name</Col>
              <Input value={detail.name} disabled
                type="text" id="name"></Input>
            </Row>
            <br />
            <Row>
              <Col>NIK</Col>
              <Input value={empDetail.nik} disabled
                type="text" id="nik"></Input>
            </Row>
            <br />
            <Row>
              <Col>Account Name</Col>
              <Input value={accountName} onChange={(e) => setAccountName(e.target.value)}
                type="text" id="accountName" required placeholder={accountName}></Input>
            </Row>
            <br />
            <Row>
              <Col>Type</Col>
              <Input value={type} onChange={(e) => setType(e.target.value)}
                type="text" id="type" required placeholder={type}></Input>
            </Row>
            <br />
            <Row>
              <Col>Account No</Col>
              <Input value={accountNo} onChange={(e) => setAccountNo(e.target.value)}
                type="text" id="accountNo" required placeholder={accountNo}></Input>
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