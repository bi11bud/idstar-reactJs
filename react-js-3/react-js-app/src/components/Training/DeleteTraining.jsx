import Swal from "sweetalert2";
import Training from '../../Entity/Training';
import EmployeeTraining from '../../Entity/EmployeeTraining';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

export default function DeleteTraining(props) {

    const navigate = useNavigate();

    const { item } = props.data;

    function handleDelete() {

        var indexAccount = Training.map(function (e) {
            return e.id;
        }).indexOf(item.id);


        //delete Training
        Training.splice(indexAccount, 1);

        //delete Employee Training
        for (let i = EmployeeTraining.length - 1; i >= 0; i--) {
            if (EmployeeTraining[i].trainingId === item.id) {
                EmployeeTraining.splice(i, 1);
            }
        }

        navigate('/training');

        Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Successfully delete Training ',
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