//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EventPlannerApp.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Review
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Review()
        {
            this.PlaceOfEvent = new HashSet<PlaceOfEvent>();
        }
    
        public int ReviewID { get; set; }
        public string Info { get; set; }
        public Nullable<System.DateTime> DateMade { get; set; }
        public Nullable<double> Score { get; set; }
        public Nullable<int> IDUser { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PlaceOfEvent> PlaceOfEvent { get; set; }
        public virtual User User { get; set; }
    }
}
