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
    
    public partial class Event
    {
        public int EventID { get; set; }
        public string EventName { get; set; }
        public Nullable<System.DateTime> DateOfEvent { get; set; }
        public Nullable<System.TimeSpan> TimeOfStart { get; set; }
        public Nullable<System.TimeSpan> TimeOfEnd { get; set; }
        public string Info { get; set; }
        public Nullable<int> IDLocation { get; set; }
        public Nullable<int> IDEventHost { get; set; }
        public Nullable<int> IDPlaceOfEvent { get; set; }
        public Nullable<int> IDEventStatistics { get; set; }
        public Nullable<int> IDTicket { get; set; }
    
        public virtual EventHost EventHost { get; set; }
        public virtual EventStatistics EventStatistics { get; set; }
        public virtual Location Location { get; set; }
        public virtual PlaceOfEvent PlaceOfEvent { get; set; }
        public virtual Ticket Ticket { get; set; }
    }
}
