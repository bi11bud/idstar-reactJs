import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

export default function DeleteEmployee(props) {

  const navigate = useNavigate();

  const { item, updateListData } = props.employee;

  function handleDelete() {

    alertLoading();

    var valid = true

    const authToken = localStorage.getItem('authToken');

    const headers = {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    };

    //check Employee Account

    var requestOptions = {
      method: 'GET',
      headers: headers
    };

    fetch("http://localhost:9090/api/v1/rekening/list?page=0&size=10", requestOptions)
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
        else if (data.status === '200') {
          var Account = data.data.content

          Account.forEach(acc => {
            if (acc.karyawan.id === item.id) {
              valid = false;
              failedAlert("Please Delete Employee's Account First!");
              navigate('/employee');
            }
          });
        }
      })
      .catch((error) => {
        failedAlert(error);
      });

    //check Employee Training
    if (valid) {
      fetch("http://localhost:9090/api/v1/karyawan-training/list?page=0&size=10", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === '200') {
            var EmployeesTraining = data.data.content
            EmployeesTraining.forEach(empTrain => {
              if (empTrain.karyawan.id === item.id) {
                valid = false;
                failedAlert("Please Delete Employee's Training First!");
                navigate('/employee');
              }
            });
          }
        })
        .catch((error) => {
          failedAlert(error);
        });
    }

    requestOptions = {
      method: 'DELETE',
      headers: headers
    };

    if (valid) {
      fetch("http://localhost:9090/api/v1/karyawan/delete/" + item.id, requestOptions)
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

            navigate('/employee');
            updateListData();
            Swal.fire({
              title: 'Success',
              icon: 'success',
              text: 'Successfully delete Employee ',
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
    }

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

  function failedAlert(text) {
    Swal.fire({
      title: 'Failed',
      icon: 'error',
      text: text,
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