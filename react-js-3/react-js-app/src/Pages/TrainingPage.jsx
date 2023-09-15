import { useNavigate } from 'react-router-dom';
import { NavDropdown } from "react-bootstrap";
import Training from "../Entity/Training";
import { Table } from 'react-bootstrap';
import AddTraining from "../components/Training/AddTraining"
import ViewTraining from "../components/Training/ViewTraining"
import EditTraining from "../components/Training/EditTraining"
import DeleteTraining from "../components/Training/DeleteTraining"

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

                    <AddTraining />
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
                                    const data = {item}
                                    return (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.teacher}</td>
                                            <td>{item.theme}</td>
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