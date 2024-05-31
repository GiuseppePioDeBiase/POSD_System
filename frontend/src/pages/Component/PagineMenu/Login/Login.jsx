import { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import PropTypes from 'prop-types';
function Login(props) {
    const navigate = useNavigate();
    const [loginForm, setloginForm] = useState({
      email: "",
      password: ""
    })

    function logMeIn(event) {
        event.preventDefault()
       axios({
        method: "POST",
        url:"http://127.0.0.1:5000/api/login",
        data:{
          email: loginForm.email,
          password: loginForm.password
         }
      })
      .then((response) => {
      navigate("/ProfiloUR");
      props.setToken(response.data.token)

      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })

      setloginForm(({
        email: "",
        password: ""}))


    }

    function handleChange(event) { 
      const {value, name} = event.target
      setloginForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
      <div className="flex flex-row justify-center items-center  w-screen h-screen bg-white dark:bg-gray-800">
        <h1>Login</h1>
          <form className="login">
            <input onChange={handleChange} 
                  type="email"
                  name="email" 
                  placeholder="Email" 
                  value={loginForm.email} />
            <input onChange={handleChange} 
                  type="password"
                  name="password" 
                  placeholder="Password" 
                  value={loginForm.password} />
          <button onClick={logMeIn}>Submit</button>
        </form>
      </div>
    );
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
};
export default Login;