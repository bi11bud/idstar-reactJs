import { Table, NavDropdown } from "react-bootstrap";
import Employees from "../Entity/Employee";
import EmployeesDetail from "../Entity/EmployeeDetail";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';
import AddEmployee from "../components/Employee/AddEmployee"
import ViewEmployee from "../components/Employee/ViewEmployee"
import EditEmployee from "../components/Employee/EditEmployee"
import DeleteEmployee from "../components/Employee/DeleteEmployee"

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

                    <AddEmployee />
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
                                    const detail = EmployeesDetail.find((d) => d.id === item.detail);
                                    const data = { item, detail }

                                    return (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{detail.nik}</td>
                                            <td>{item.address}</td>
                                            <td>{item.status}</td>
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