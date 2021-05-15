using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TestAngular.Models;

namespace TestAngular.CRUDS
{
    public class EmployeeDao
    {
        public EmployeeDao()
        {
        }

        public List<Employee> getEmployeeListAsync()
        {
            using (var rpt = new AngularTestContext())
            {
                try
                {
                    var result = rpt.Employees.ToList();
                    
                    return result;
                }catch(Exception ex)
                {
                    throw ex;
                }
            }
        }

        public Employee addEmployee(Employee employee)
        {
            try
            {
                using (var rpt = new AngularTestContext())
                {
                    rpt.Employees.Add(employee);
                    rpt.SaveChanges();
                    return GetEmployeeById(employee.Id);
                }
            }catch(Exception ex)
            {
                throw ex;
            }
        }

        public Employee updateEmployee(Employee employee)
        {
            try
            {
                using (var rpt = new AngularTestContext())
                {
                    rpt.Update(employee);
                    rpt.SaveChanges();
                    return GetEmployeeById(employee.Id);
                }
            }catch(Exception ex)
            {
                throw ex;
            }
        }

        public bool deleteEmployee(int id)
        {
            try
            {
                using(var rpt = new AngularTestContext())
                {
                    var result = GetEmployeeById(id);
                    rpt.Remove(result);
                    rpt.SaveChanges();
                    return true;
                }
            }catch(Exception ex) {
                throw ex;
            }
        }

        public Employee GetEmployeeById(int id)
        {
            try
            {
                using (var rpt = new AngularTestContext())
                {
                    var result = rpt.Employees.Where(e => e.Id == id).ToList();

                    return result[0];
                }
            }catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
