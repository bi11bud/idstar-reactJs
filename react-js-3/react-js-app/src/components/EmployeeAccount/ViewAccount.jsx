import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row, Col,
} from 'reactstrap';
import EmployeesDetail from "../../Entity/EmployeeDetail";

export default function ViewAccount(props) {

    const [modalView, setModalView] = useState(false);

    function handleModalView() {
        setModalView(!modalView);
    }

    const { item, detail } = props.employee;
    const empDetail = EmployeesDetail.find((d) => d.id === detail.detail);
    const name = detail.name
    const nik = empDetail.nik
    const accountName = item.name
    const accountNo = item.accountNo
    const type = item.type
    const cdate = item.cdate
    const mdate = item.mdate

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