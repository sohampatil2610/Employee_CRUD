import React, { useState } from 'react'
import EmployeeService from '../services/EmployeeService';

export default function AddEmployee() {

    const[fdata,setFdata]= useState({
        firstName:"",
        lastName:"",
        email:""
    });

    const inputtxt=(e)=>{
        setFdata({
            ...fdata,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
             const response = await EmployeeService.addEmployee(fdata);

             if (response.status === 200) {
                alert("Employee added successfully!");
                setFdata({
                    firstName:"",
                    lastName:"",
                    email:""
                })
            }
        } catch (error) {
            // Any server error (500) or connection failure
            alert("Something went wrong. Please try again.");
        }

    }

  return (
    <div className='container d-flex justify-content-center'>
      <form onSubmit={handleSubmit} className='mt-5 w-50 border p-4 shadow'>
            <h3>Add Employee</h3>
            <label htmlFor="" className='form-label mt-3'>First Name</label>
            <input type="text" 
                name="firstName" 
                value={fdata.firstName}  
                onChange={inputtxt}
                className='form-control' 
                placeholder='Enter first name'/>

            <label htmlFor="" className='form-label mt-3'>Last Name</label>
            <input type="text" 
                name="lastName" 
                value={fdata.lastName} 
                 onChange={inputtxt}
                className='form-control' 
                placeholder='Enter last name'/>

             <label htmlFor="" className='form-label mt-3'>Email</label>
            <input type="text" 
                name="email" 
                value={fdata.email} 
                 onChange={inputtxt}
                className='form-control' 
                placeholder='Enter email'/>

            <button className='btn btn-success mt-4'>Add</button>
      </form>
    </div>
  )
}
