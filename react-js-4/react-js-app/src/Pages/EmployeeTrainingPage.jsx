import { Table, NavDropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';
import AddEmployeeTraining from "../components/EmployeeTraining/AddEmployeeTraining"
import ViewEmployeeTraining from "../components/EmployeeTraining/ViewEmployeeTraining"
import EditEmployeeTraining from "../components/EmployeeTraining/EditEmployeeTraining"
import DeleteEmployeeTraining from "../components/EmployeeTraining/DeleteEmployeeTraining"
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const EmployeeTrainingPage = () => {

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

    var [EmployeesTraining, setEmployeesTraining] = useState([]);

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

        fetch("http://localhost:9090/api/v1/karyawan-training/list?page=0&size=10", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === '200') {
                    setEmployeesTraining(data.data.content)
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
                <h2>Employee Training</h2>

                <div className="btn-add">

                    <AddEmployeeTraining updateListData={updateListData}/>
                </div>

                <br />
                <Table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Nik</th>
                            <th>Training</th>
                            <th>Teacher</th>
                            <th>Training Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            EmployeesTraining && EmployeesTraining.length > 0
                                ? EmployeesTraining.map((item, index) => {
                                    const emp = item.karyawan
                                    const empDetail = item.karyawan.karyawanDetail
                                    const train = item.training
                                    const data = { item, emp, empDetail, train, updateListData }
                                    return (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{emp.name}</td>
                                            <td>{empDetail.nik}</td>
                                            <td>{train.tema}</td>
                                            <td>{train.pengajar}</td>
                                            <td>{item.training_date}</td>
                                            <td>
                                                <ViewEmployeeTraining employee={data} />&nbsp;
                                                <EditEmployeeTraining employee={data} />&nbsp;
                                                <DeleteEmployeeTraining employee={data} />
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

export default EmployeeTrainingPage;