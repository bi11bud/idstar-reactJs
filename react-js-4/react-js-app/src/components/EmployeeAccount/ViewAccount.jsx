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

export default function ViewAccount(props) {

    const [modalView, setModalView] = useState(false);

    function handleModalView() {
        setModalView(!modalView);
    }

    const { item } = props.employee;
    const empDetail = item.karyawan.karyawanDetail
    const name = item.karyawan.name
    const nik = empDetail.nik
    const accountName = item.nama
    const accountNo = item.norek
    const type = item.jenis
    const cdate = moment(item.created_date).format('YYYY-MM-DD HH:mm:ss')
    const mdate = moment(item.updated_date).format('YYYY-MM-DD HH:mm:ss')

    return (
        <>
            <Button color="info" outline onClick={handleModalView} className="mr-3">
                View
            </Button>
            <Modal isOpen={modalView} toggle={handleModalView}>
                <ModalHeader className='modal-header'>Detail Account</ModalHeader>
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
                        <Col>Account Name</Col>
                        <Col>{accountName}</Col>
                    </Row>
                    <Row>
                        <Col>Type</Col>
                        <Col>{type}</Col>
                    </Row>
                    <Row>
                        <Col>Account No</Col>
                        <Col>{accountNo}</Col>
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