using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventPlannerApi.Models
{
    public class UserHelperModel
    {
        public List<EventViewModel> user_events { get; set; }
        public UserViewModel user { get; set; }
    }
}