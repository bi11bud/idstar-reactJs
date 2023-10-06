import { Table, NavDropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';
import AddEmployee from "../components/Employee/AddEmployee"
import ViewEmployee from "../components/Employee/ViewEmployee"
import EditEmployee from "../components/Employee/EditEmployee"
import DeleteEmployee from "../components/Employee/DeleteEmployee"
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const EmployeePage = () => {

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

    var [Employees, setEmployees] = useState([]);

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
                <h2>List Employee</h2>

                <div className="btn-add">

                    <AddEmployee updateListData={updateListData}/>
                </div>

                <br />
                <Table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>NIK</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Employees && Employees.length > 0
                                ? Employees.map((item, index) => {
                                    const data = { item , updateListData}
                                    const status = item.status.toLowerCase() === "active" ? "Active" : "Inactive"

                                    return (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.karyawanDetail.nik}</td>
                                            <td>{item.address}</td>
                                            <td>{status}</td>
                                            <td>
                                                <ViewEmployee employee={data} />&nbsp;
                                                <EditEmployee employee={data} />&nbsp;
                                                <DeleteEmployee employee={data} />
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

}

export default EmployeePage