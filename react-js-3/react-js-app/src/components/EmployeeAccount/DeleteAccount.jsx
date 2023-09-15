import Swal from "sweetalert2";
import EmployeesAccount from '../../Entity/EmployeeAccount';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

export default function DeleteAccount(props) {

    const navigate = useNavigate();

    const { item } = props.employee;

    function handleDelete() {

        var indexAccount = EmployeesAccount.map(function (e) {
            return e.id;
        }).indexOf(item.id);

        EmployeesAccount.splice(indexAccount, 1);

        navigate('/account');

        Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Successfully delete Account ',
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