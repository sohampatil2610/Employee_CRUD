import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';

export default function EditEmp() {

  const {id}= useParams();

  const navigate = useNavigate();

  const[emp,setEmp]=useState({
    firstName:"",
    lastName:"",
    email:""
  })

  useEffect(()=>{
    const fetchEmp=async()=>{
      try {
        const response = await EmployeeService.getEmpById(id);
        setEmp(response.data); 
      } catch (error) {
        console.log("Error in fetching data",error);
        
      }
    }
    fetchEmp();
  },[id])

  const handleChange=(e)=>{
    setEmp({
      ...emp,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
        await EmployeeService.editEmp(id,emp);
        navigate("/viewemp")
      } catch (error) {
        alert("Error updating employee. Please try again.")
        console.log(error);
        
      }
  }

  return (
    <div className='container d-flex justify-content-center'>
      <form onSubmit={handleSubmit} className='mt-5 w-50 border p-4 shadow'>
            <h3>Update Employee</h3>
            <label htmlFor="" className='form-label mt-3'>First Name</label>
            <input type="text" 
                name="firstName" 
                value={emp.firstName} 
                onChange={handleChange}
                className='form-control' 
                placeholder='Enter first name'/>

            <label htmlFor="" className='form-label mt-3'>Last Name</label>
            <input type="text" 
                name="lastName" 
                value={emp.lastName} 
                onChange={handleChange}
                className='form-control' 
                placeholder='Enter last name'/>

             <label htmlFor="" className='form-label mt-3'>Email</label>
            <input type="text" 
                  name="email" 
                  value={emp.email} 
                  onChange={handleChange}
                  className='form-control' 
                  placeholder='Enter email'/>

            <button className='btn btn-success mt-4 me-3'>Update</button>
            <Link to='/viewemp' className='btn btn-danger mt-4'>cancel</Link>
      </form>
    </div>  
  )
}
