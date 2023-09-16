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
import Training from '../../Entity/Training';
import { useNavigate } from 'react-router-dom';
import moment from "moment"

export default function EditAccount(props) {

  const navigate = useNavigate();

  const { item } = props.data;
  const [teacher, setTeacher] = useState(item.teacher);
  const [theme, setTheme] = useState(item.theme);

  const [modalEdit, setModalEdit] = useState(false);

  function handleModalEdit() {
    setModalEdit(!modalEdit);
  }

  const submitEdit = () => {

    if (validateData()) {

      const currentDate = moment(new Date()).format('DD-MM-YYYY HH:mm:ss')

      Training.forEach((train) => {
        if (train.id.toString() === item.id.toString()) {
          train.teacher = teacher
          train.theme = theme
          train.mdate = currentDate
        }
      })

      navigate('/training');

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