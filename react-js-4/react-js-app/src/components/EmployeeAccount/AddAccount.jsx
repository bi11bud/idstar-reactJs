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
    Input,
    Form,
} from 'reactstrap';
import Forms from 'react-bootstrap/Form';
export default function AddAccount({updateListData}) {

    const navigate = useNavigate();

    const [modalAdd, setModalAdd] = useState(false);
    const [empId, setEmpId] = useState();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [accountNo, setAccountNo] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');

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
                nama: name,
                jenis: type,
                norek: accountNo,
                alamat: selectedEmployee.address,
                karyawan: {
                    id: empId
                }
            }

            const headers = {
                'Content-Type': 'application/json',
            };

            const requestOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestData)
            };

            fetch("http://localhost:9090/api/v1/rekening/save", requestOptions)
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

                        setName('')
                        setType('')
                        setAccountNo('')
                        setEmpId('')

                        navigate('/account');
                        setModalAdd(!modalAdd);
                        updateListData();
                        Swal.fire({
                            title: 'Success',
                            icon: 'success',
                            text: 'Success Add New Account ',
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

        if (!empId) {
            alertFailAdd('Please select the employee')
            return false;
        }

        if (!name.trim()) {
            alertFailAdd('Name cannot be empty')
            return false;
        }

        if (!type.trim()) {
            alertFailAdd('Type cannot be empty')
            return false;
        }

        if (!accountNo.trim()) {
            alertFailAdd('Account No cannot be empty')
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

    var [Employees, setEmployees] = useState([]);

    useEffect(() => {

        const headers = {
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

            <Button color="light" className="modal-button " outline onClick={handleModalAdd}>
                Add new Data
            </Button>

            <Modal isOpen={modalAdd} toggle={handleModalAdd}>
                <ModalHeader className='modal-header'>Add New Account</ModalHeader>
                <ModalBody>
                    <Form>
                        <br />
                        <Row>
                            <Col>Employee</Col>
                            <Forms.Select
                                aria-label="Default select example"
                                id="empId"
                                value={empId}
                                onChange={(e) => {
                                    const selectedEmployeeId = e.target.value;
                                    setEmpId(e.target.value)
                                    setSelectedEmployee(Employees.find((d) => d.id.toString() === selectedEmployeeId.toString()));
                                }}
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
                            <Col>Name</Col>
                            <Input value={name} onChange={(e) => setName(e.target.value)}
                                type="text" id="name" required placeholder="name"></Input>
                        </Row>
                        <br />
                        <Row>
                            <Col>Type</Col>
                            <Input value={type} onChange={(e) => setType(e.target.value)}
                                type="text" id="type" required placeholder="type"></Input>
                        </Row>
                        <br />
                        <Row>
                            <Col>Account No</Col>
                            <Input value={accountNo} onChange={(e) => setAccountNo(e.target.value)}
                                type="text" id="accountNo" required placeholder="account no"></Input>
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