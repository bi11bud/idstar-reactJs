import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row, Col,
} from 'reactstrap';
import EmployeesTraining from "../../Entity/EmployeeTraining";
import Employees from "../../Entity/Employee";
import EmployeesDetail from "../../Entity/EmployeeDetail";

export default function ViewAccount(props) {

    const [modalView, setModalView] = useState(false);

    function handleModalView() {
        setModalView(!modalView);
    }

    const { item } = props.data;
    const teacher = item.teacher;
    const theme = item.theme
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
                                    if (empTrain.trainingId === item.id) {
                                        const emp = Employees.find((d) => d.id === empTrain.employeeId);
                                        const empDetail = EmployeesDetail.find((d) => d.id === emp.detail);
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