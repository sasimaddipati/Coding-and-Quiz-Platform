import React, { useState } from 'react';
import './Register.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 

const Register = () => {
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();

  const password = watch('password');
  const rePassword = watch('re_password');

  const onSubmit = async (data) => {
    if (password !== rePassword) {
      Swal.fire({
        title: 'Error',
        text: 'Passwords do not match!',
        icon: 'error',
        showConfirmButton: true,
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3300/user-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });

      const result = await response.json();
      Swal.fire({
        title: 'Details Saved',
        text: 'You have successfully saved your details!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1900,
      });
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error',
        text: 'Registration failed!',
        icon: 'error',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className='register-body'>
      <div className='div-res'>
        <form onSubmit={handleSubmit(onSubmit)} className='form-register'>
          <h1 className='register'>Register</h1>

          <div className='form-row'>
            <div className='form-column'>
              <label htmlFor="firstName" className='label-register'>First Name</label>
              <input
                className='input-register'
                type="text"
                {...register('first_name')}
                required
              />

              <label htmlFor="email" className='label-register'>Email</label>
              <input
                className='input-register'
                type="email"
                {...register('email')}
                required
              />

              <label htmlFor="username" className='label-register'>Username</label>
              <input
                className='input-register'
                type="text"
                {...register('username')}
                required
              />
                
              
                  <label htmlFor="rePassword" className='label-register'>Re-enter Password</label>
                  <input
                    className='repassword'
                    type="password"
                    {...register('re_password')}
                    required
                  />
              

              <label className='label-register'>Gender</label>
              <div className='gender-options'>
                <label>
                  <input
                    type="radio"
                    value="male"
                    {...register('gender')}
                    required
                  /> Male
                </label>
                <label>
                  <input
                    type="radio"
                    value="female"
                    {...register('gender')}
                    required
                  /> Female
                </label>
                <label>
                  <input
                    type="radio"
                    value="other"
                    {...register('gender')}
                    required
                  /> Other
                </label>
              </div>
            </div>

            <div className='form-column'>

           


              <label htmlFor="lastName" className='label-register'>Last Name</label>
              <input
                className='input-register'
                type="text"
                {...register('last_name')}
                required
              />

              <label htmlFor="contactNumber" className='label-register'>Contact Number</label>
              <input
                className='input-register'
                type="tel"
                {...register('contact_number')}
                required
              />

                <label htmlFor="password" className='label-register'>Password</label>
                  <input
                    className='password'
                    type="password"
                    {...register('password')}
                    required
                  />

               <label htmlFor="dob" className='label-register'>Date of Birth</label>
              <input
                className='input-register'
                type="date"
                {...register('dob')}
                required
              />

            </div>
          </div>

          <button type="submit" className='button-register'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
