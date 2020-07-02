using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventPlannerApp.Models
{
    public class Event
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Event()
        {
            this.Going = new HashSet<Going>();
        }

        public int EventID { get; set; }
        public string Title { get; set; }
        public Nullable<System.DateTime> Starting { get; set; }
        public Nullable<System.DateTime> Ending { get; set; }
        public string Info { get; set; }
        public Nullable<int> IDUser { get; set; }
        public Nullable<int> IDLocation { get; set; }
        public Nullable<int> IDTicket { get; set; }

        public  Location Location { get; set; }
        public  Ticket Ticket { get; set; }
        public  User User { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public  ICollection<Going> Going { get; set; }
    }
}