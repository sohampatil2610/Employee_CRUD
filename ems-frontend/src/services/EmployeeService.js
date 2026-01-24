import axios from "axios";

const BASE_URL = "http://localhost:8080"

class EmployeeService
{
    addEmployee(employee)
    {
        return axios.post(`${BASE_URL}/addemp`,employee)
    }

    getAllEmps(page=0, size=5)
    {
        return axios.get(`${BASE_URL}/getallemps?page=${page}&size=${size}`)
    }

    getEmpsByKeyword(keyword,page=0,size=5)
    {
        return axios.get(`${BASE_URL}/getallemps/search?keyword=${keyword}&page=${page}&size=${size}`)
    }

    deleteEmp(id)
    {
        return axios.get(`${BASE_URL}/delete?id=${id}`);
    }

    getEmpById(id)
    {
        return axios.get(`${BASE_URL}/getempbyid?id=${id}`)
    }

    editEmp(id,e)
    {
        return axios.put(`${BASE_URL}/editemp?id=${id}`,e);
    }
}

export default new EmployeeService();