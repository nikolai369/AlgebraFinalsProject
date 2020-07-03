using System;
using System.Collections.Generic;

namespace EventPlannerApi.Models
{
    public class EventViewModel
    {
        public int EventID { get; set; }
        public string Title { get; set; }
        public Nullable<System.DateTime> Starting { get; set; }
        public Nullable<System.DateTime> Ending { get; set; }
        public string Info { get; set; }

        public int NumberOfGoing { get; set; }

        public Location Location { get; set; }
        public Ticket Ticket { get; set; }
        public  User User { get; set; }
        public ICollection<Going> Going { get; set; }
    }
}