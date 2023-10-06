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
import moment from "moment";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

export default function EditEmployeeTraining(props) {

  const navigate = useNavigate();

  const { item, emp, empDetail, train, updateListData } = props.employee;
  const [trainingDate, setTrainingDate] = useState(moment(item.training_date).format('YYYY-MM-DD HH:mm:ss'));

  const [modalEdit, setModalEdit] = useState(false);

  function handleModalEdit() {
    setModalEdit(!modalEdit);
  }

  function onChangeTrainingDate(e) {
    setTrainingDate(e._d)
  }

  function alertLoading() {
    Swal.fire({
      imageUrl: "loading.gif",
      title: 'Loading',
      allowOutsideClick: false,
      showCancelButton: false,
      showConfirmButton: false,
    });
  }

  const submitEdit = () => {

    alertLoading();

    if (validateData()) {

      const requestData = {
        id: item.id,
        karyawan: {
          id: emp.id
        },
        training: {
          id: train.id
        },
        training_date: moment(trainingDate).format('YYYY-MM-DD HH:mm') + ":00"
      }

      const headers = {
        'Content-Type': 'application/json',
      };

      const requestOptions = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(requestData)
      };

      fetch("http://localhost:9090/api/v1/karyawan-training/update", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status !== '200') {
            Swal.fire({
              title: 'Failed',
              icon: 'error',
              text: data.message,
              timer: 3000
            });
          } else {

            navigate('/employee-training');
            setModalEdit(!modalEdit);
            updateListData();
            Swal.fire({
              title: 'Success',
              icon: 'success',
              text: 'Success Edit ',
              timer: 3000
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            title: 'Failed',
            icon: 'error',
            text: error,
            timer: 3000
          });
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
              <Input value={`${train.pengajar} - ${train.tema}`} disabled
                type="text" id="trainId"></Input>
            </Row>
            <br />
            <Row>
              <Col>Training Date</Col>
              <Datetime
                locale="en"
                timeFormat="HH:mm"
                dateFormat="DD-MM-YYYY"
                initialValue={moment(trainingDate).format("DD-MM-YYYY HH:mm")}
                onChange={(e) => {
                  onChangeTrainingDate(e);
                }}
                inputProps={{ placeholder: "Select Date and Time", readOnly: true }}
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