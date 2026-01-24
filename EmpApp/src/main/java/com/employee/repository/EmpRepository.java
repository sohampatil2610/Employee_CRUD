package com.employee.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.employee.entities.Employee;

public interface EmpRepository extends JpaRepository<Employee, Integer>{

	@Query("select e from Employee e where lower(e.firstName) like %:keyword% or lower(e.lastName) like %:keyword% or lower(e.email) like %:keyword%")
	Page<Employee> searchEmployees(@Param("keyword") String keyword,Pageable pageable);
}
