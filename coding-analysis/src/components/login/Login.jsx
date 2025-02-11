import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../mycontext/Mycontext';
import Swal from 'sweetalert2'; 
const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { userloginstatus, setuserloginstatus, username, setusername } = useContext(MyContext);

  async function fun(user) {
    try {
      const response = await fetch('http://localhost:3300/user-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: user }),
      });
      const k = await response.json();
      if (k.payload !== null) {
        console.log(k);
        setuserloginstatus(true);
        setusername(user.username);
        console.log(user.username);
        navigate('/');
        Swal.fire({
          title: 'Login Success',
          text: 'You have successfully logged in!',
          icon: 'success',
          showConfirmButton: false, 
          timer: 1900
        });
      } else {
        Swal.fire({
          title: 'Login Failure',
          text: 'Incorrect username or password.',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <div className='login'>
        <div className='login-page'>
          <h1 className='login-head'>Sign in</h1>
          <form onSubmit={handleSubmit(fun)}>
            <input
              type="text"
              name="username"
              placeholder='Username'
              className='input'
              {...register("username")}
            />
            <input
              type="password"
              name="password"
              placeholder='Password'
              className='input'
              {...register("password")}
            />
            <button className='login-button' type='submit'>Submit</button>
          </form>
          <p className='sign-up'>Don't have an account? 
            <Link to='/register' className='link-login'>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;







     