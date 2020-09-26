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

        public string City { get; set; }
        public string Adresse { get; set; }

        public bool IsLoginUserGoing { get; set; }

        public Nullable<int> IDUser { get; set; }


        public Nullable<decimal> longitude { get; set; }
        public Nullable<decimal> latitude { get; set; }
        public int NumberOfGoing { get; set; }

        public Ticket Ticket { get; set; }
        public  User User { get; set; }
        public ICollection<Going> Going { get; set; }
    }
}