using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
            GenerateList();
        }

        [HttpGet]
        public ActionResult<Response> GetEmployees()
        {           
            return new Response()
            {
                data = eList,
                message = "Ok"
            };            
        }

        [HttpPost]
        public ActionResult<Response> AddUpdateEmployee(object employee)
        {
            Employee emp = JsonConvert.DeserializeObject<Employee>(employee.ToString());

            eList.Add(emp);

            return new Response()
            {
                data = eList,
                message = "Ok"
            };
        }

        private List<Employee> GenerateList()
        {
            eList = new List<Employee>();

            Employee employee = new Employee(1, "John Doe", "Address 1", 4625162736, 1);
            eList.Add(employee);

            employee = new Employee(2, "Roger Flynn", "Address 2", 4625122736, 2);
            eList.Add(employee);

            employee = new Employee(3, "Alex Visaramy", "Address 3", 3225122736, 3);
            eList.Add(employee);

            employee = new Employee(4, "Kyle Pitt", "Address 4", 3243122736, 4);
            eList.Add(employee);

            employee = new Employee(5, "Elizabeth James", "Address 5", 3233122736, 5);
            eList.Add(employee);

            employee = new Employee(6, "Shelly Bell", "Address 6", 3233122736, 6);
            eList.Add(employee);

            employee = new Employee(7, "Shelly Bell", "Address 7", 3233122736, 7);
            eList.Add(employee);

            return eList;
        }
    }
}
