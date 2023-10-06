import { Table, NavDropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';
import AddAccount from "../components/EmployeeAccount/AddAccount"
import ViewAccount from "../components/EmployeeAccount/ViewAccount"
import EditAccount from "../components/EmployeeAccount/EditAccount"
import DeleteAccount from "../components/EmployeeAccount/DeleteAccount"
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const AccountPage = () => {

    const navigate = useNavigate();

    function employeePage() {
        navigate('/employee');
    }

    function accountPage() {
        navigate('/account');
    }

    function employeeTrainingPage() {
        navigate('/employee-training');
    }

    function trainingPage() {
        navigate('/training');
    }

    function loginPage() {
        navigate('/');
    }

    var [Account, setAccount] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {

        const headers = {
            'Content-Type': 'application/json',
        };

        const requestOptions = {
            method: 'GET',
            headers: headers
        };

        fetch("http://localhost:9090/api/v1/rekening/list?page=0&size=10", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === '200') {
                    setAccount(data.data.content)
                }
            })
            .catch((error) => {
                failedAlert(error);
            });
    }

    const updateListData = () => {
        fetchData();
    };

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
            <div className="nav-bar">
                <div className="menu">

                    <NavDropdown title="Menu" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={employeePage}>
                            Employee</NavDropdown.Item>
                        <NavDropdown.Item onClick={employeeTrainingPage}>
                            Employee Training
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={accountPage}>
                            Account
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={trainingPage}>
                            Training
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={loginPage}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>

                </div>
            </div>

            <div className="Home">
                <h2>List Account</h2>

                <div className="btn-add">

                    <AddAccount updateListData={updateListData} />
                </div>

                <br />
                <Table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Account Name</th>
                            <th>Type</th>
                            <th>Account No</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Account && Account.length > 0
                                ? Account.map((item, index) => {
                                    const data = { item, updateListData }
                                    return (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.karyawan.name}</td>
                                            <td>{item.nama}</td>
                                            <td>{item.jenis}</td>
                                            <td>{item.norek}</td>
                                            <td>
                                                <ViewAccount employee={data} />&nbsp;
                                                <EditAccount employee={data} />&nbsp;
                                                <DeleteAccount employee={data} />
                                            </td>
                                        </tr>
                                    )
                                })
                                : "No Data Available"
                        }
                    </tbody>
                </Table>
            </div>
        </>
    );

};

export default AccountPage;