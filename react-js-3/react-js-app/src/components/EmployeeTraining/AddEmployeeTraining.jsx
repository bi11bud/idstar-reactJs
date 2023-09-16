import React, { useState } from 'react';
import Employees from '../../Entity/Employee';
import EmployeesDetail from '../../Entity/EmployeeDetail';
import Training from '../../Entity/Training';
import EmployeeTraining from '../../Entity/EmployeeTraining';
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
    Form,
} from 'reactstrap';
import moment from "moment";
import Forms from 'react-bootstrap/Form';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

export default function AddEmployeeTraining() {

    const navigate = useNavigate();

    const [modalAdd, setModalAdd] = useState(false);
    const [empId, setEmpId] = useState('');
    const [trainingId, setTrainingId] = useState('');
    const [trainingDate, setTrainingDate] = useState(moment());

    function handleModalAdd() {
        setModalAdd(!modalAdd);
    }

    function onChangeTrainingDate(e) { 
        setTrainingDate(e._d)
    }

    function submitAdd() {

        if (validateData()) {

            let ids = uuid();
            let date = new Date();
            const currentDate = moment(date).format('DD-MM-YYYY HH:mm:ss')

            EmployeeTraining.push({
                id: ids,
                employeeId: empId,
                trainingId: trainingId,
                trainingDate: moment(trainingDate).format('DD-MM-YYYY'),
                cdate: currentDate,
                mdate: currentDate,
                ddate: ''
            })

            setEmpId('')
            setTrainingId('')
            setTrainingDate(moment())

            navigate('/employee-training');

            setModalAdd(!modalAdd);
            Swal.fire({
                title: 'Success',
                icon: 'success',
                text: 'Success Add Employee Training',
                timer: 3000
            });
        }
    }

    function validateData() {

        if (!empId) {
            alertFailAdd('Please select the employee')
            return false;
        }

        if (!trainingId) {
            alertFailAdd('Please select the training')
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
                Add new Data
            </Button>

            <Modal isOpen={modalAdd} toggle={handleModalAdd}>
                <ModalHeader className='modal-header'>Add New Employee Training</ModalHeader>
                <ModalBody>
                    <Form>
                        <br />
                        <Row>
                            <Col>Employee</Col>
                            <Forms.Select
                                aria-label="Default select example"
                                id="empId"
                                value={empId}
                                onChange={(e) => setEmpId(e.target.value)}
                                required>
                                <option value="">Select an employee</option>
                                {
                                    Employees.map((employee) => {
                                        const empDetail = EmployeesDetail.find((d) => d.id.toString() === employee.detail.toString())
                                        return (
                                            <option key={employee.id} value={employee.id}>
                                                {employee.name} - {empDetail.nik}
                                            </option>
                                        )
                                    })
                                }
                            </Forms.Select>
                        </Row>
                        <br />
                        <Row>
                            <Col>Training</Col>
                            <Forms.Select
                                aria-label="Default select example"
                                id="empTrainingId"
                                value={trainingId}
                                onChange={(e) => setTrainingId(e.target.value)}
                                required>
                                <option value="">Select the training</option>
                                {
                                    Training.map((training) => {
                                        return (
                                            <option key={training.id} value={training.id}>
                                                {training.theme} - {training.teacher}
                                            </option>
                                        )
                                    })
                                }
                            </Forms.Select>
                        </Row>
                        <br />
                        <Row>
                            <Col>Training Date</Col>
                            <Datetime
                                locale="en"
                                timeFormat={false}
                                dateFormat="DD-MM-YYYY"
                                initialValue={moment(new Date())
                                    .format("DD-MM-YYYY")}
                                value={trainingDate}
                                onChange={(e) => {
                                    onChangeTrainingDate(e);
                                }}
                                inputProps={{ placeholder: "Training Date", readOnly: true }}
                                className="w-100 me-1"
                            />
                        </Row>
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