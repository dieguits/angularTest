using System;
namespace TestAngular.Models
{
    public class Employee
    {
        public int id { get; set; }
        public string fullName { get; set; }
        public string address { get; set; }
        public Int64 phoneNumber { get; set; }
        public int position { get; set; }

        public Employee(int id, string fullName, string address, Int64 phoneNumber, int position)
        {
            this.id = id;
            this.fullName = fullName;
            this.address = address;
            this.phoneNumber = phoneNumber;
            this.position = position;
        }
    }
}
