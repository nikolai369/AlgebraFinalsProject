﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventPlannerApi.Models
{
    public class CustomModels
    {
        public List<EventViewModel> Events { get; set; }
        public List<LocationViewModel> Locations { get; set; }
    }
}