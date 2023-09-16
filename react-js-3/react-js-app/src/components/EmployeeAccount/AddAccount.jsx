import React, { useState } from 'react';
import EmployeesAccount from "../../Entity/EmployeeAccount";
import Employees from '../../Entity/Employee';
import EmployeesDetail from '../../Entity/EmployeeDetail';
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
import Forms from 'react-bootstrap/Form';
export default function AddAccount() {

    const navigate = useNavigate();

    const [modalAdd, setModalAdd] = useState(false);
    const [empId, setEmpId] = useState();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [accountNo, setAccountNo] = useState('');

    function handleModalAdd() {
        setModalAdd(!modalAdd);
    }

    function submitAdd() {

        if (validateData()) {

            let ids = uuid();
            let date = new Date();
            const currentDate = moment(date).format('DD-MM-YYYY HH:mm:ss')

            EmployeesAccount.push({
                id: ids,
                name: name,
                type: type,
                accountNo: accountNo,
                cdate: currentDate,
                mdate: currentDate,
                ddate: '',
                employeeId: empId
            })

            setName('')
            setType('')
            setAccountNo('')
            setEmpId('')

            navigate('/account');

            setModalAdd(!modalAdd);
            Swal.fire({
                title: 'Success',
                icon: 'success',
                text: 'Success Add New Account ',
                timer: 3000
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
                                onChange={(e) => setEmpId(e.target.value)}
                                required>
                                <option value="">Select an employee</option>
                                {
                                    Employees.map((employee) => {
                                    const empDetail = EmployeesDetail.find((d) => d.id === employee.detail)
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