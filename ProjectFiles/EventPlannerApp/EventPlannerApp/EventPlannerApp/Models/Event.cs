using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventPlannerApp.Models
{
    public class Event
    {
        public int EventID { get; set; }
        public string Title { get; set; }
        public Nullable<System.DateTime> Starting { get; set; }
        public Nullable<System.DateTime> Ending { get; set; }
        public string Info { get; set; }
        public Nullable<int> IDUser { get; set; }
        public Nullable<int> IDLocation { get; set; }
        public Nullable<int> IDTicket { get; set; }

        public virtual Location Location { get; set; }
        public virtual Ticket Ticket { get; set; }
        public virtual User User { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Going> Going { get; set; }
    }
}