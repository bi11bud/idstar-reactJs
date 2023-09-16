import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import Employees from "../../Entity/Employee";
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
    Label
} from 'reactstrap';
import EmployeeDetail from '../../Entity/EmployeeDetail';
import moment from "moment";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

export default function AddEmployee() {

    const navigate = useNavigate();

    const [modalAdd, setModalAdd] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState(true);
    const [nik, setNik] = useState('');
    const [npwp, setNpwp] = useState('');
    const [birthdate, setBirthdate] = useState(moment());

    function handleModalAdd() {
        setModalAdd(!modalAdd);
    }

    function handleChange() {
        setStatus(!status);
    };

    function onChangeBirthDate(e) {
        setBirthdate(e._d)
    }

    const submitAdd = () => {

        if (validateData()) {

            let ids = uuid();
            let idDetail = uuid();
            let date = new Date();
            const currentDate = moment(date).format('DD-MM-YYYY HH:mm:ss')
            var stat = status ? "Active" : "Inactive"
            let bdate = moment(birthdate).format('DD-MM-YYYY')

            EmployeeDetail.push({
                id: idDetail,
                npwp: npwp,
                nik: nik,
                cdate: currentDate,
                mdate: currentDate,
                ddate: '',
            })

            Employees.push({
                id: ids,
                name: name,
                address: address,
                status: stat,
                birthdate: bdate,
                cdate: currentDate,
                mdate: currentDate,
                ddate: '',
                detail: idDetail
            })

            setName('')
            setAddress('')
            setNik('')
            setNpwp('')
            setStatus(true)
            setBirthdate(moment())

            navigate('/employee');

            setModalAdd(!modalAdd);
            Swal.fire({
                title: 'Success',
                icon: 'success',
                text: 'Success Add New Employee ',
                timer: 3000
            });
        }
    }

    function validateData() {

        if (!name.trim()) {
            alertFailAdd('Name cannot be empty')
            return false;
        }

        if (!address.trim()) {
            alertFailAdd('Address cannot be empty')
            return false;
        }

        if (!birthdate) {
            alertFailAdd('Birthdate cannot be empty')
            return false;
        }

        if (!nik.trim()) {
            alertFailAdd('NIK cannot be empty')
            return false;
        }

        if (!npwp.trim()) {
            alertFailAdd('NPWP cannot be empty')
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
                <ModalHeader className='modal-header'>Add New Employee</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col>Name</Col>
                            <Input value={name} onChange={(e) => setName(e.target.value)}
                                type="text" id="name" required placeholder="name"></Input>
                        </Row>
                        <br />
                        <Row>
                            <Col>Address</Col>
                            <Input value={address} onChange={(e) => setAddress(e.target.value)}
                                type="text" id="address" required placeholder="address"></Input>
                        </Row>
                        <br />
                        <Row>
                            <Col>Birthdate</Col>
                            <Datetime
                                locale="en"
                                timeFormat={false}
                                dateFormat="DD-MM-YYYY"
                                initialValue={moment(new Date())
                                    .format("DD-MM-YYYY")}
                                value={birthdate}
                                onChange={(e) => {
                                    onChangeBirthDate(e);
                                }}
                                inputProps={{ placeholder: "Birthdate", readOnly: true }}
                                className="w-100 me-1"
                            />
                        </Row>
                        <br />
                        <Row>
                            <Col>NIK</Col>
                            <Input value={nik} onChange={(e) => setNik(e.target.value)}
                                type="text" id="nik" required placeholder="nik"></Input>
                        </Row>
                        <br />
                        <Row>
                            <Col>NPWP</Col>
                            <Input value={npwp} onChange={(e) => setNpwp(e.target.value)}
                                type="text" id="npwp" required placeholder="npwp"></Input>
                        </Row>
                        <br />
                        <Row>
                            <Col>Status</Col>
                            <Label><Switch defaultChecked color="secondary" checked={status} onChange={handleChange} name="status" />
                                {status ? 'Active' : 'Inactive'}</Label>
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