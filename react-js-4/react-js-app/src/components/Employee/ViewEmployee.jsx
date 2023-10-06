import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row, Col,
} from 'reactstrap';
import moment from "moment";

export default function ViewEmployee(props) {

    const [modalView, setModalView] = useState(false);

    function handleModalView() {
        setModalView(!modalView);
    }

    const { item } = props.employee;
    const name = item.name
    const address = item.address
    const status = item.status
    const birthdate = moment(item.dob).format('DD-MM-YYYY')
    const nik = item.karyawanDetail.nik
    const npwp = item.karyawanDetail.npwp

    return (
        <>
            <Button color="info" outline onClick={handleModalView} className="mr-3">
                View
            </Button>
            <Modal isOpen={modalView} toggle={handleModalView}>
                <ModalHeader className='modal-header'>Detail Employee</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>Name</Col>
                        <Col>{name}</Col>
                    </Row>
                    <Row>
                        <Col>Address</Col>
                        <Col>{address}</Col>
                    </Row>
                    <Row>
                        <Col>Birthdate</Col>
                        <Col>{birthdate}</Col>
                    </Row>
                    <Row>
                        <Col>NIK</Col>
                        <Col>{nik}</Col>
                    </Row>
                    <Row>
                        <Col>NPWP</Col>
                        <Col>{npwp}</Col>
                    </Row>
                    <Row>
                        <Col>Status</Col>
                        <Col>{status}</Col>
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