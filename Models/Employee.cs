using System;
using System.Collections.Generic;

#nullable disable

namespace TestAngular.Models
{
    public partial class Employee
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public int Position { get; set; }

        public virtual Position PositionNavigation { get; set; }
    }
}
