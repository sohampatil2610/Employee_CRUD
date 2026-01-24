import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';
export default function VIewEmp() {

    const [employees,setEmployees]=useState([]);
    const[search,setSearch]=useState("");
    const[page,setPage]=useState(0);
    const[totalPages,setTotalPages]=useState(0);
    const pageSize=5;

    useEffect(()=>{
      if(search.trim()==="")
      {
          loadEmployees(page);
      }
      else
      {
        searchEmployees(search,page);
      }
      
    },[page,search])

    const loadEmployees=(pageNumber)=>{
      EmployeeService.getAllEmps(pageNumber,pageSize)
      .then((res)=>{
        setEmployees(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err)=>{
        console.log("Error in fetching data",err);
        
      })
    }

    const searchEmployees=(keyword,pageNumber)=>{
        EmployeeService.getEmpsByKeyword(keyword,pageNumber,pageSize)
        .then(res=>{
          setEmployees(res.data.content);
          setTotalPages(res.data.totalPages);
        })
        .catch(err=>console.log("Error in searching records")
        );
    }

    // useEffect(()=>{
    //     EmployeeService.getAllEmps()
    //     .then((res)=>{
    //         setEmployees(res.data);
    //     })
    //     .catch((err)=>{
    //         console.log("error in fetching data",err);
    //     });
    // },[]);

    const deleteEmp=async(id)=>{
        if(window.confirm("Are you sure to delete record"))
        {
             try {
               await EmployeeService.deleteEmp(id);
               if(employees.length===1 && page>0)
               {
                setPage(page-1);
               }
               else
               {
                loadEmployees(page);
               }
             } catch (error) {
                alert("error in deleting record");
                console.log(error);
                
             }
        }
       
    }

 

    const filterEmps = employees.filter((emp)=>
      emp.firstName.toLowerCase().includes(search.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="container">
      <p className="display-5 mt-4 ">All Employee</p>
      <hr />

      <input type="text" 
      name="" 
      className='form-control w-50' 
      value={search}
      onChange={(e)=>setSearch(e.target.value)} 
      placeholder='Search employee'/>

      <table className="table table-bordered mt-4 table-striped">
        <thead className="text-center table-dark">
          <tr>
            <th>Sr.No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {
              filterEmps.length>0 ? (
                filterEmps.map((item, index) => (
            <tr key={index}>
              <td>{index+1+page*5}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>
                <Link to={`/editemp/${item.id}`} className="btn btn-success me-3">
                  Edit
                </Link>
                <button onClick={()=>deleteEmp(item.id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))
              ):(
                <tr>
                  <td colSpan="5" className='text-danger fw-bold'>
                    No records found
                  </td>
                </tr>
              )
          }
        </tbody>
      </table>

        <div className='d-flex justify-content-center mt-5'>
          <button 
            className='btn btn-primary me-2' 
            disabled={page===0} 
            onClick={()=>setPage(page-1)}>
              Previous
          </button>

          <span className='align-self-center'>
            Page {page+1} of {totalPages}
          </span>

          <button
            className='btn btn-primary ms-2'
            disabled={page+1===totalPages}
            onClick={()=>setPage(page+1)}>
            Next
          </button>
        </div>
     
    </div>
  );
}
