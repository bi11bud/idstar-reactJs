import { Table, NavDropdown } from "react-bootstrap";
import Employees from "../Entity/Employee";
import EmployeesDetail from "../Entity/EmployeeDetail";
import EmployeesTraining from "../Entity/EmployeeTraining";
import Training from "../Entity/Training";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';
import AddEmployeeTraining from "../components/EmployeeTraining/AddEmployeeTraining"
import ViewEmployeeTraining from "../components/EmployeeTraining/ViewEmployeeTraining"
import EditEmployeeTraining from "../components/EmployeeTraining/EditEmployeeTraining"
import DeleteEmployeeTraining from "../components/EmployeeTraining/DeleteEmployeeTraining"

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

                    <AddEmployeeTraining />
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
                                    const emp = Employees.find((d) => d.id.toString() === item.employeeId.toString());
                                    const empDetail = EmployeesDetail.find((d) => d.id.toString() === emp.detail.toString());
                                    const train = Training.find((d) => d.id.toString() === item.trainingId.toString());
                                    const data = { item, emp, empDetail, train }
                                    return (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{emp.name}</td>
                                            <td>{empDetail.nik}</td>
                                            <td>{train.theme}</td>
                                            <td>{train.teacher}</td>
                                            <td>{item.trainingDate}</td>
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