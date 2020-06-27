using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventPlannerApp.Models
{
    public class AvailableFunds
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public AvailableFunds()
        {
            this.User = new HashSet<User>();
        }

        public int AvailableFundsID { get; set; }
        public Nullable<decimal> AvailableMoney { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<User> User { get; set; }
    }
}