import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

export default function DeleteTraining(props) {

    const navigate = useNavigate();

    const { item, updateListData } = props.data;

    function handleDelete() {

        alertLoading();

        const authToken = localStorage.getItem('authToken');

        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        };

        const requestOptions = {
            method: 'DELETE',
            headers: headers
        };


        fetch("http://localhost:9090/api/v1/training/delete/" + item.id, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error === 'invalid_token') {
                    navigate('/');
                    Swal.fire({
                        title: 'Failed',
                        icon: 'warning',
                        text: "Token is not valid, try to login again",
                        timer: 3000
                    });
                }
                else if (data.status !== '200') {
                    failedAlert(data.message);
                } else {

                    navigate('/training');
                    updateListData();
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: 'Successfully delete Training ',
                        timer: 3000
                    });
                }
            })
            .catch((error) => {
                failedAlert(error);
            });

    };

    function failedAlert(text) {
        Swal.fire({
            title: 'Failed',
            icon: 'error',
            text: text,
            timer: 3000
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