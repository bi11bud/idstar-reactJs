import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row, Col,
} from 'reactstrap';

export default function ViewEmployeeTraining(props) {

    const [modalView, setModalView] = useState(false);

    function handleModalView() {
        setModalView(!modalView);
    }

    const { item, emp, empDetail, train } = props.employee;
    const name = emp.name
    const nik = empDetail.nik
    const trainingDate = item.trainingDate
    const theme = train.theme
    const teacher = train.teacher
    const cdate = item.cdate
    const mdate = item.mdate

    return (
        <>
            <Button color="info" outline onClick={handleModalView} className="mr-3">
                View
            </Button>
            <Modal isOpen={modalView} toggle={handleModalView}>
                <ModalHeader className='modal-header'>Detail Employee Training</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>Name</Col>
                        <Col>{name}</Col>
                    </Row>
                    <Row>
                        <Col>NIK</Col>
                        <Col>{nik}</Col>
                    </Row>
                    <Row>
                        <Col>Training Date</Col>
                        <Col>{trainingDate}</Col>
                    </Row>
                    <Row>
                        <Col>Theme</Col>
                        <Col>{theme}</Col>
                    </Row>
                    <Row>
                        <Col>Teacher</Col>
                        <Col>{teacher}</Col>
                    </Row>
                    <Row>
                        <Col>Create Date</Col>
                        <Col>{cdate}</Col>
                    </Row>
                    <Row>
                        <Col>Modify Date</Col>
                        <Col>{mdate}</Col>
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