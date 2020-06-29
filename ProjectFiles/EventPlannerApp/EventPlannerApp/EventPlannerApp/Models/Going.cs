using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventPlannerApp.Models
{
    public class Going
    {
        public int GoingID { get; set; }
        public Nullable<int> IDUser { get; set; }
        public Nullable<int> IDEvent { get; set; }

        public virtual Event Event { get; set; }
        public virtual User User { get; set; }
    }
}