import React, { useState } from 'react';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row, Col,
    Input,
    Form,
} from 'reactstrap';

export default function AddTraining({updateListData}) {

    const navigate = useNavigate();

    const [modalAdd, setModalAdd] = useState(false);
    const [teacher, setTeacher] = useState();
    const [theme, setTheme] = useState('');

    function handleModalAdd() {
        setModalAdd(!modalAdd);
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

    function submitAdd() {

        alertLoading();

        if (validateData()) {

            const requestData = {
                tema: theme,
                pengajar: teacher
            }

            const headers = {
                'Content-Type': 'application/json',
            };

            const requestOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestData)
            };

            fetch("http://localhost:9090/api/v1/training/save", requestOptions)
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

                        setTeacher('')
                        setTheme('')

                        navigate('/training');
                        setModalAdd(!modalAdd);
                        updateListData();
                        Swal.fire({
                            title: 'Success',
                            icon: 'success',
                            text: 'Success Add New Training ',
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
            alertFailAdd('Name cannot be empty')
            return false;
        }

        if (!theme.trim()) {
            alertFailAdd('Type cannot be empty')
            return false;
        }

        return true;

    }

    function alertFailAdd(text) {
        Swal.fire({
            title: 'Failed',
            icon: 'warning',
            text: text,
            timer: 3000
        });
    }

    return (
        <>

            <Button color="light" className="modal-button " outline onClick={handleModalAdd}>
                Add new Training
            </Button>

            <Modal isOpen={modalAdd} toggle={handleModalAdd}>
                <ModalHeader className='modal-header'>Add New Account</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col>Teacher</Col>
                            <Input value={teacher} onChange={(e) => setTeacher(e.target.value)}
                                type="text" id="teacher" required placeholder="teacher"></Input>
                        </Row>
                        <br />
                        <Row>
                            <Col>Theme</Col>
                            <Input value={theme} onChange={(e) => setTheme(e.target.value)}
                                type="text" id="theme" required placeholder="theme"></Input>
                        </Row>
                        <br />
                    </Form >
                </ModalBody >
                <ModalFooter>
                    <Button
                        className="modal-button"
                        outline
                        color="light"
                        onClick={submitAdd}
                    >
                        Submit
                    </Button>
                    <Button color="secondary" outline onClick={handleModalAdd}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal >
        </>
    )
}