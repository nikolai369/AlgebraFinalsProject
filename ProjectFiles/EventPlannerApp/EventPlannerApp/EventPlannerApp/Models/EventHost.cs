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
    
    public partial class EventHost
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public EventHost()
        {
            this.Event = new HashSet<Event>();
            this.PlaceOfEvent = new HashSet<PlaceOfEvent>();
        }
    
        public int EventHostID { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string IBAN { get; set; }
        public string Info { get; set; }
        public Nullable<int> IDAvailableFunds { get; set; }
    
        public virtual AvailableFunds AvailableFunds { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Event> Event { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PlaceOfEvent> PlaceOfEvent { get; set; }
    }
}
