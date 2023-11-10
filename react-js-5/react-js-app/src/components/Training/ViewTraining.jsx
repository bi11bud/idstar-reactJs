import React, { useState, useEffect } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row, Col,
} from 'reactstrap';
import moment from "moment"
import Swal from "sweetalert2";

export default function ViewAccount(props) {

    const [modalView, setModalView] = useState(false);

    function handleModalView() {
        setModalView(!modalView);
    }

    const { item } = props.data;
    const teacher = item.pengajar;
    const theme = item.tema
    const cdate = moment(item.created_date).format('YYYY-MM-DD HH:mm:ss')
    const mdate = moment(item.updated_date).format('YYYY-MM-DD HH:mm:ss')

    var [EmployeesTraining, setEmployeesTraining] = useState([]);

    useEffect(() => {

        const headers = {
            'Content-Type': 'application/json',
        };

        const requestOptions = {
            method: 'GET',
            headers: headers
        };

        fetch("http://localhost:9090/api/v1/karyawan-training/list?page=0&size=10", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === '200') {
                    setEmployeesTraining(data.data.content)
                }
            })
            .catch((error) => {
                failedAlert(error);
            });
    }, []);

    function failedAlert(text) {
        Swal.fire({
            title: 'Failed',
            icon: 'error',
            text: text,
            timer: 3000
        });
    };

    return (
        <>
            <Button color="info" outline onClick={handleModalView} className="mr-3">
                View
            </Button>
            <Modal isOpen={modalView} toggle={handleModalView}>
                <ModalHeader className='modal-header'>Detail Training</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>Teacher</Col>
                        <Col>{teacher}</Col>
                    </Row>
                    <Row>
                        <Col>Theme</Col>
                        <Col>{theme}</Col>
                    </Row>
                    <Row>
                        <Col>Create Date</Col>
                        <Col>{cdate}</Col>
                    </Row>
                    <Row>
                        <Col>Modify Date</Col>
                        <Col>{mdate}</Col>
                    </Row>
                    <Row>
                        <Col>List Employee</Col>
                        <Col>
                            {

                                EmployeesTraining.map((empTrain) => {
                                    if (empTrain.training.id === item.id) {
                                        const emp = empTrain.karyawan
                                        const empDetail = empTrain.karyawan.karyawanDetail
                                        return (
                                            <tr key={empTrain.id}>
                                                <td>- {emp.name} - {empDetail.nik}</td>
                                            </tr>
                                        )
                                    }
                                    else {
                                        return ""
                                    }
                                })
                            }
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="light" outline onClick={handleModalView} className="modal-button">
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}