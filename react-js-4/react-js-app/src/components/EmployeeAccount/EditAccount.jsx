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

  const { item, updateListData } = props.employee;
  const detail = item.karyawan;
  const empDetail = item.karyawan.karyawanDetail
  const [accountName, setAccountName] = useState(item.nama);
  const [accountNo, setAccountNo] = useState(item.norek);
  const [type, setType] = useState(item.jenis);

  const [modalEdit, setModalEdit] = useState(false);

  function handleModalEdit() {
    setModalEdit(!modalEdit);
  }

  function alertLoading(){
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
        nama: accountName,
        jenis: type,
        norek: accountNo,
        alamat: detail.address,
        karyawan: {
          id: detail.id
        }
      };

      const headers = {
        'Content-Type': 'application/json',
      };

      const requestOptions = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(requestData)
      };

      fetch("http://localhost:9090/api/v1/rekening/update", requestOptions)
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

            navigate('/account');
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