import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
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

export default function AddEmployeeTraining({ updateListData }) {

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

    function alertLoading() {
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
                karyawan: {
                    id: empId
                },
                training: {
                    id: trainingId
                },
                training_date: moment(trainingDate).format('YYYY-MM-DD HH:mm') + ":00"
            }

            const authToken = localStorage.getItem('authToken');

            const headers = {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            };

            const requestOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestData)
            };

            fetch("http://localhost:9090/api/v1/karyawan-training/save", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error === 'invalid_token') {
                        navigate('/');
                        Swal.fire({
                            title: 'Failed',
                            icon: 'warning',
                            text: "Token is not valid, try to login again",
                            timer: 3000
                        });
                    }
                    else if (data.status !== '200') {
                        Swal.fire({
                            title: 'Failed',
                            icon: 'error',
                            text: data.message,
                            timer: 3000
                        });
                    } else {

                        setEmpId('')
                        setTrainingId('')
                        setTrainingDate(moment())

                        navigate('/employee-training');
                        setModalAdd(!modalAdd);
                        updateListData();
                        Swal.fire({
                            title: 'Success',
                            icon: 'success',
                            text: 'Success Add Employee Training',
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

    var [Employees, setEmployees] = useState([]);

    useEffect(() => {

        const authToken = localStorage.getItem('authToken');

        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        };

        const requestOptions = {
            method: 'GET',
            headers: headers
        };

        fetch("http://localhost:9090/api/v1/karyawan/list?page=0&size=10", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === '200') {
                    setEmployees(data.data.content)
                }
            })
            .catch((error) => {
                failedAlert(error);
            });
    }, []);

    var [Training, setTraining] = useState([]);

    useEffect(() => {

        const authToken = localStorage.getItem('authToken');

        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        };

        const requestOptions = {
            method: 'GET',
            headers: headers
        };

        fetch("http://localhost:9090/api/v1/training/list?page=0&size=10", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === '200') {
                    setTraining(data.data.content)
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
                                        const empDetail = employee.karyawanDetail
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
                                                {training.tema} - {training.pengajar}
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
                                timeFormat="HH:mm"
                                dateFormat="DD-MM-YYYY"
                                initialValue={moment(new Date())
                                    .format("DD-MM-YYYY HH:mm")}
                                value={trainingDate}
                                onChange={(e) => {
                                    onChangeTrainingDate(e);
                                }}
                                inputProps={{ placeholder: "Select Date and Time", readOnly: true }}
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