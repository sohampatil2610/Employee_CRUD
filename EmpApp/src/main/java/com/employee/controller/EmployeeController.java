package com.employee.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.employee.entities.Employee;
import com.employee.service.EmployeeService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

	@Autowired
	private EmployeeService empserv;
	
	@PostMapping("/addemp")
	public ResponseEntity<Employee> addEmployee(@RequestBody Employee e)
	{
		Employee emp = empserv.addEmployee(e);
		
		if(emp!=null)
			return new ResponseEntity<Employee>(emp,HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping("/getallemps")
	public ResponseEntity<Page<Employee>> getAllEmps(@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "5") int size)
	{
		return new ResponseEntity<Page<Employee>>(empserv.getAllEmps(page,size),HttpStatus.OK);
	}
	
	@GetMapping("/delete")
	public ResponseEntity<Void> deleteEmp(@RequestParam Integer id)
	{
		boolean deleted=empserv.deleteEmp(id);
		
		if(deleted)
			return new ResponseEntity<>(HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/getempbyid")
	public ResponseEntity<Employee> getEmpById(@RequestParam Integer id)
	{
		Employee getemp=empserv.getEmpById(id);
		if(getemp!=null)
			return new ResponseEntity<Employee>(getemp,HttpStatus.OK);
		else
			return new ResponseEntity<Employee>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@PutMapping("/editemp")
	public ResponseEntity<Employee> editEmp(@RequestParam Integer id,@RequestBody Employee e)
	{
		Employee editemp = empserv.editEmp(id, e);
		
		if(editemp!=null)
			return new ResponseEntity<>(editemp,HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/getallemps/search")
	public ResponseEntity<Page<Employee>> searchEmps(
			@RequestParam String keyword,
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "5") int size
			)
	{
		return new ResponseEntity<Page<Employee>>(empserv.searchEmployees(keyword, page, size),HttpStatus.OK);
	}
}
