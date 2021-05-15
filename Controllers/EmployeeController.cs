using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TestAngular.CRUDS;
using TestAngular.Models;

namespace TestAngular.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : Controller
    {
        public List<Employee> eList;

        public EmployeeController()
        {
            //GenerateList();
        }

        [HttpGet]
        public ActionResult<Response> GetEmployees()
        {
            EmployeeDao employee = new EmployeeDao();
            //eList = new List<Employee>();
            //eList = employee.getEmployeeListAsync();


            return new Response()
            {
                data = employee.getEmployeeListAsync(),
                message = "Ok"
            };            
        }

        //[EnableCors("CorsPolicy")]
        [HttpPost("updateEmployee")]
        public ActionResult<Response> UpdateEmployee(object employee)
        {
            Employee emp = JsonConvert.DeserializeObject<Employee>(employee.ToString());
            EmployeeDao employeeDao = new EmployeeDao();

            var result = employeeDao.updateEmployee(emp);

            return new Response()
            {
                data = result,
                message = "Ok"
            };
        }

        [HttpPost("addEmployee")]
        public ActionResult<Response> AddEmployee(object employee)
        {
            Employee emp = JsonConvert.DeserializeObject<Employee>(employee.ToString());
            EmployeeDao employeeDao = new EmployeeDao();

            var result = employeeDao.addEmployee(emp);

            return new Response()
            {
                data = result,
                message = "Ok"
            };
        }

        [HttpGet("deleteEmployee/{id}")]
        public ActionResult<Response> DeletEmloyee(int id)
        {
            //Employee emp = JsonConvert.DeserializeObject<Employee>(employee.ToString());
            EmployeeDao employeeDao = new EmployeeDao();

            var result = employeeDao.deleteEmployee(id);

            return new Response()
            {
                data = result,
                message = "Ok"
            };
        }
    }
}
