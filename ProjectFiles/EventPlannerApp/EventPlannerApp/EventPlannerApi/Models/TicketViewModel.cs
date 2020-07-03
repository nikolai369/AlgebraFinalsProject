using System;
using System.Collections.Generic;

namespace EventPlannerApi.Models
{
    public class TicketViewModel
    {
        public int TicketID { get; set; }
        public Nullable<int> PriceInKunas { get; set; }
        public string Info { get; set; }

        
        public ICollection<Event> Event { get; set; }
        
        public ICollection<Transaction> Transaction { get; set; }
    }
}