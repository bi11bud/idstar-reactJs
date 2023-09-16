import { Table, NavDropdown } from "react-bootstrap";
import Employees from "../Entity/Employee";
import EmployeesAccount from "../Entity/EmployeeAccount";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';
import AddAccount from "../components/EmployeeAccount/AddAccount"
import ViewAccount from "../components/EmployeeAccount/ViewAccount"
import EditAccount from "../components/EmployeeAccount/EditAccount"
import DeleteAccount from "../components/EmployeeAccount/DeleteAccount"

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

    function trainingPage(){
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
                <h2>List Account</h2>

                <div className="btn-add">

                    <AddAccount />
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
                            EmployeesAccount && EmployeesAccount.length > 0
                                ? EmployeesAccount.map((item, index) => {
                                    const detail = Employees.find((d) => d.id.toString() === item.employeeId.toString());
                                    const data = { item, detail }
                                    return (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{detail.name}</td>
                                            <td>{item.name}</td>
                                            <td>{item.type}</td>
                                            <td>{item.accountNo}</td>
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