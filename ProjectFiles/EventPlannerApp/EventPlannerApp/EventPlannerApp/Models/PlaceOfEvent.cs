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
    
    public partial class PlaceOfEvent
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public PlaceOfEvent()
        {
            this.Event = new HashSet<Event>();
        }
    
        public int PlaceOfEventID { get; set; }
        public string PlaceName { get; set; }
        public string Info { get; set; }
        public Nullable<int> IDReview { get; set; }
        public Nullable<int> IDEventHost { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Event> Event { get; set; }
        public virtual EventHost EventHost { get; set; }
        public virtual Review Review { get; set; }
    }
}
