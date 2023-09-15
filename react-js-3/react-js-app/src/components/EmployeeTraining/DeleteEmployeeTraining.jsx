import Swal from "sweetalert2";
import EmployeeTraining from '../../Entity/EmployeeTraining';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

export default function DeleteEmployeeTraining(props) {

    const navigate = useNavigate();

    const { item } = props.employee;

    function handleDelete() {

        var indexAccount = EmployeeTraining.map(function (e) {
            return e.id;
        }).indexOf(item.id);

        EmployeeTraining.splice(indexAccount, 1);

        navigate('/employee-training');

        Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Successfully delete employee training ',
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