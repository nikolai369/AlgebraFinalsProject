using System;

namespace EventPlannerApi.Models
{
    public class TransactionViewModel
    {
        public int TransactionID { get; set; }
        public Nullable<System.DateTime> TimeOfPurchase { get; set; }
        public string Info { get; set; }
        public Nullable<int> IDTicket { get; set; }
        public Nullable<int> IDUser { get; set; }

        public  TicketViewModel Ticket { get; set; }
        public  UserViewModel User { get; set; }
    }
}