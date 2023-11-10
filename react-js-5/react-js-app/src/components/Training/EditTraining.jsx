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

export default function EditAccount(props) {

  const navigate = useNavigate();

  const { item, updateListData } = props.data;
  const [teacher, setTeacher] = useState(item.pengajar);
  const [theme, setTheme] = useState(item.tema);

  const [modalEdit, setModalEdit] = useState(false);

  function handleModalEdit() {
    setModalEdit(!modalEdit);
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
        tema: theme,
        pengajar: teacher
      };

      const authToken = localStorage.getItem('authToken');

      const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };

      const requestOptions = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(requestData)
      };

      fetch("http://localhost:9090/api/v1/training/update", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.error === 'invalid_token') {
            navigate('/');
            Swal.fire({
              title: 'Failed',
              icon: 'warning',
              text: "Token is not valid, try to login again",
              timer: 3000
            });
          }
          else if (data.status !== '200') {
            Swal.fire({
              title: 'Failed',
              icon: 'error',
              text: data.message,
              timer: 3000
            });
          } else {

            navigate('/training');
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

    if (!teacher.trim()) {
      alertFailEdit('Account Name cannot be empty')
      return false;
    }

    if (!theme.trim()) {
      alertFailEdit('Type cannot be empty')
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
        <ModalHeader className='modal-header'>Edit Training</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col>Teacher</Col>
              <Input value={teacher} onChange={(e) => setTeacher(e.target.value)}
                type="text" id="teacher" required placeholder={teacher}></Input>
            </Row>
            <br />
            <Row>
              <Col>Theme</Col>
              <Input value={theme} onChange={(e) => setTheme(e.target.value)}
                type="text" id="theme" required placeholder={theme}></Input>
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