import Swal from "sweetalert2";
import Employees from '../../Entity/Employee';
import EmployeesDetail from '../../Entity/EmployeeDetail';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import EmployeesAccount from "../../Entity/EmployeeAccount";
import EmployeeTraining from "../../Entity/EmployeeTraining";

export default function DeleteEmployee(props) {

    const navigate = useNavigate();

    const { item, detail } = props.employee;

    function handleDelete() {

        var indexEmp = Employees.map(function (e) {
            return e.id;
        }).indexOf(item.id);

        var indexEmpDetail = EmployeesDetail.map(function (e) {
            return e.id;
        }).indexOf(detail.id);

        //delete Employee
        Employees.splice(indexEmp, 1);

        //delete Employee Detail
        EmployeesDetail.splice(indexEmpDetail, 1);
        
        //delete Employee Account
        for (let i = EmployeesAccount.length - 1; i >= 0; i--) {
            if (EmployeesAccount[i].employeeId === item.id) {
                EmployeesAccount.splice(i, 1);
            }
        }

        //delete Employee Training
        for (let i = EmployeeTraining.length - 1; i >= 0; i--) {
            if (EmployeeTraining[i].employeeId === item.id) {
                EmployeeTraining.splice(i, 1);
            }
        }

        navigate('/employee');

        Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Successfully delete Employee ',
            timer: 3000
        });

    };

    function alertDelete() {
        Swal.fire({
            title: 'Are you sure to delete it?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete()
            }
        })
    };

    return (
        <>
            <Button color="danger" outline onClick={() => alertDelete()}>Delete</Button>
        </>
    )
}