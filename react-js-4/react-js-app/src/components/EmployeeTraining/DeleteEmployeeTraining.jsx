import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

export default function DeleteEmployeeTraining(props) {

    const navigate = useNavigate();

    const { item, updateListData } = props.employee;

    function handleDelete() {

        alertLoading();

        const headers = {
            'Content-Type': 'application/json',
        };

        const requestOptions = {
            method: 'DELETE',
            headers: headers
        };

        fetch("http://localhost:9090/api/v1/karyawan-training/delete/" + item.id, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.status !== '200') {
                    Swal.fire({
                        title: 'Failed',
                        icon: 'error',
                        text: data.message,
                        timer: 3000
                    });
                } else {

                    navigate('/employee-training');
                    updateListData();
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: 'Successfully delete employee training ',
                        timer: 3000
                    });
                }
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Failed',
                    icon: 'error',
                    text: error,
                    timer: 3000
                });
            });

    };

    function alertLoading() {
        Swal.fire({
            imageUrl: "loading.gif",
            title: 'Loading',
            allowOutsideClick: false,
            showCancelButton: false,
            showConfirmButton: false,
        });
    }

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