import React, { useState } from 'react';
import Training from '../../Entity/Training';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from "uuid"
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
import moment from "moment";

export default function AddTraining() {

    const navigate = useNavigate();

    const [modalAdd, setModalAdd] = useState(false);
    const [teacher, setTeacher] = useState();
    const [theme, setTheme] = useState('');

    function handleModalAdd() {
        setModalAdd(!modalAdd);
    }

    function submitAdd() {

        if (validateData()) {

            let ids = uuid();
            let date = new Date();
            const currentDate = moment(date).format('DD-MM-YYYY HH:mm:ss')

            Training.push({
                id: ids,
                teacher: teacher,
                theme: theme,
                cdate: currentDate,
                mdate: currentDate,
                ddate: ''
            })

            setTeacher('')
            setTheme('')

            navigate('/training');

            setModalAdd(!modalAdd);
            Swal.fire({
                title: 'Success',
                icon: 'success',
                text: 'Success Add New Training ',
                timer: 3000
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