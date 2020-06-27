using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventPlannerApp.Models
{
    public class Ticket
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Ticket()
        {
            this.Event = new HashSet<Event>();
            this.Transaction = new HashSet<Transaction>();
        }

        public int TicketID { get; set; }
        public Nullable<int> PriceInKunas { get; set; }
        public string Info { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Event> Event { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Transaction> Transaction { get; set; }
    }
}