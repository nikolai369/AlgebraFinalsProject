using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventPlannerApp.Models
{
    public class Transaction
    {
        public int TransactionID { get; set; }
        public Nullable<System.DateTime> TimeOfPurchase { get; set; }
        public string Info { get; set; }
        public Nullable<int> IDTicket { get; set; }
        public Nullable<int> IDUser { get; set; }

        public virtual Ticket Ticket { get; set; }
        public virtual User User { get; set; }
    }
}