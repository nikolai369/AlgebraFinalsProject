﻿using System.Collections.Generic;

namespace EventPlannerApi.Models
{
    public class LocationViewModel
    {
        public int LocationID { get; set; }
        public string City { get; set; }
        public string Adresse { get; set; }

        public virtual ICollection<Event> Event { get; set; }
    }
}