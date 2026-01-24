package com.employee.service;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.employee.entities.Employee;
import com.employee.repository.EmpRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService{

	@Autowired
	private EmpRepository repo;
	
	@Override
	public Employee addEmployee(Employee e) {
		// TODO Auto-generated method stub
		return repo.save(e);
	}

	@Override
	public Page<Employee> getAllEmps(int page,int size) {
		// TODO Auto-generated method stub
		PageRequest pageable = PageRequest.of(page,size);
		return repo.findAll(pageable);
	}

	@Override
	public boolean deleteEmp(Integer id) {
		// TODO Auto-generated method stub
		if(repo.existsById(id)) {
			repo.deleteById(id);
			return true;
		}
		return false;
	}

	@Override
	public Employee editEmp(Integer id, Employee e) {
		// TODO Auto-generated method stub
		Optional<Employee> existemp = repo.findById(id);
		if(existemp.isPresent())
		{
			Employee employee = existemp.get();
			employee.setFirstName(e.getFirstName());
			employee.setLastName(e.getLastName());
			employee.setEmail(e.getEmail());
			return repo.save(employee);
		}
		return null;
	}

	@Override
	public Employee getEmpById(Integer id) {
		// TODO Auto-generated method stub
		Optional<Employee> byId = repo.findById(id);
		Employee e = byId.get();
		if(e!=null)
			return e;
		return null;
	}

	@Override
	public Page<Employee> searchEmployees(String keyword, int page, int size) {
		// TODO Auto-generated method stub
		return repo.searchEmployees(keyword.toLowerCase(),PageRequest.of(page,size));
	}

}
