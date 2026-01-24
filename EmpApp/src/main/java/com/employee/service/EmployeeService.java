package com.employee.service;


import org.springframework.data.domain.Page;

import com.employee.entities.Employee;

public interface EmployeeService {

	public Employee addEmployee(Employee e);
	
	public Page<Employee> getAllEmps(int page,int size);
	
	public boolean deleteEmp(Integer id);
	
	public Employee getEmpById(Integer id);
	
	public Employee editEmp(Integer id, Employee e);
	
	public Page<Employee> searchEmployees(String keyword,int page,int size);
}
