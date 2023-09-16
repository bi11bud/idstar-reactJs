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
import { useNavigate } from 'react-router-dom';
import EmployeeTraining from '../../Entity/EmployeeTraining';
import moment from "moment";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

export default function EditEmployeeTraining(props) {

  const navigate = useNavigate();

  const { item, emp, empDetail, train } = props.employee;
  const [trainingDate, setTrainingDate] = useState(item.trainingDate);

  const [modalEdit, setModalEdit] = useState(false);

  function handleModalEdit() {
    setModalEdit(!modalEdit);
  }

  function onChangeTrainingDate(e){
    setTrainingDate(e._d)
  }

  const submitEdit = () => {

    if (validateData()) {

      const currentDate = moment(new Date()).format('DD-MM-YYYY HH:mm:ss')

      EmployeeTraining.forEach((empTrain) => {
        if (empTrain.id.toString() === item.id.toString()) {
          empTrain.trainingDate = moment(trainingDate).format('DD-MM-YYYY')
          empTrain.mdate = currentDate
        }
      })

      navigate('/employee-training');

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

    if (!trainingDate) {
      alertFailEdit('Training Date cannot be empty')
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
        <ModalHeader className='modal-header'>Edit Employee Training</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col>Employee</Col>
              <Input value={`${emp.name} - ${empDetail.nik}`} disabled
                type="text" id="employeeId"></Input>
            </Row>
            <br />
            <Row>
              <Col>Training</Col>
              <Input value={`${train.teacher} - ${train.theme}`} disabled
                type="text" id="trainId"></Input>
            </Row>
            <br />
            <Row>
              <Col>Training Date</Col>
              <Datetime
                locale="en"
                timeFormat={false}
                dateFormat="DD-MM-YYYY"
                initialValue={moment(new Date())
                  .format("DD-MM-YYYY")}
                value={trainingDate}
                onChange={(e) => {
                  onChangeTrainingDate(e);
                }}
                inputProps={{ placeholder: "Training Date", readOnly: true }}
                className="w-100 me-1"
              />
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