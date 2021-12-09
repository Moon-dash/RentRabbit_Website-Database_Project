import axios, { Axios } from 'axios';

export function InsertTool(data, setErrMsg, navigate) {
    axios.post(`http://localhost:5000/insertTool`, data)
    .then(({ data }) => {
      console.log(data);
      if (data.success) {
        console.log('redirecting...');
        setErrMsg('');
        navigate('/Profile');
      } else {
        setErrMsg(data.message);
      }
    })
    .catch((err) => { throw err })
}

export function Register(data, setErrMsgReg, navigate) {
    axios.post(`http://localhost:5000/register`, data)
    .then(({ data }) => {
      console.log(data);
      if (data.success) {
        console.log('redirecting...');
        setErrMsgReg('');
        navigate('/App');
      } else {
        setErrMsgReg(data.message);
      }
    })
    .catch((err) => { throw err })
}

export function LoginUser(data, setErrMsg, navigate) {
    axios.post(`http://localhost:5000/login`, data)
    .then(({ data }) => {
      if (data.success) {
        console.log('redirecting...');
        setErrMsg('');
        navigate('/App');
      } else if (data.loggedIn) {
        setErrMsg('Already LoggedIn');
      } else {
        setErrMsg(data.message);
      }
    })
    .catch((err) => { throw err })
}

export function InsertFavourite(data) {
  axios.post(`http://localhost:5000/addFav`, data)
    .then(({ data }) => {
      if (data.success) {
        console.log(data);
      } else  {
        console.error();
      }
    })
}


export function DeleteFavourite(data) {
  axios.post(`http://localhost:5000/rmFav`, data)
    .then((response) => {
      if (response.data.success) {
        console.log(response.data);
      } else {
        console.error(response.data.message);
      }
    })
}
export default Axios;
