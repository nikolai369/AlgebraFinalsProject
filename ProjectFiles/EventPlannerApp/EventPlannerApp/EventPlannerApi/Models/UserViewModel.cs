using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventPlannerApi.Models
{
    public class UserViewModel
    {
        public int UserID { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Nullable<int> Age { get; set; }
        public string IBAN { get; set; }
        public string Info { get; set; }
        public Nullable<bool> AdminUser { get; set; } 

        public  AvailableFundsViewModel AvailableFunds { get; set; }
        public  CreditCardViewModel CreditCard { get; set; }
        public  ICollection<EventViewModel> Event { get; set; }
        public  ICollection<GoingViewModel> Going { get; set; }
        public  ICollection<TransactionViewModel> Transaction { get; set; }
    }
}