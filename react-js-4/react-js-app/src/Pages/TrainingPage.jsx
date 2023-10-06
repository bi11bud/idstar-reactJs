import { useNavigate } from 'react-router-dom';
import { NavDropdown } from "react-bootstrap";
import { Table } from 'react-bootstrap';
import AddTraining from "../components/Training/AddTraining"
import ViewTraining from "../components/Training/ViewTraining"
import EditTraining from "../components/Training/EditTraining"
import DeleteTraining from "../components/Training/DeleteTraining"
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const TrainingPage = () => {

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

    var [Training, setTraining] = useState([]);

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
                <h2>List Training</h2>

                <div className="btn-add">

                    <AddTraining updateListData={updateListData}/>
                </div>

                <br />
                <Table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Teacher</th>
                            <th>Theme</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Training && Training.length > 0
                                ? Training.map((item, index) => {
                                    const data = { item, updateListData }
                                    return (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.pengajar}</td>
                                            <td>{item.tema}</td>
                                            <td>
                                                <ViewTraining data={data} />&nbsp;
                                                <EditTraining data={data} />&nbsp;
                                                <DeleteTraining data={data} />
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

export default TrainingPage;