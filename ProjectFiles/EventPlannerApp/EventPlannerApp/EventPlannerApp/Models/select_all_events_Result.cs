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
    
    public partial class select_all_events_Result
    {
        public string EventName { get; set; }
        public Nullable<System.DateTime> DateOfEvent { get; set; }
        public Nullable<System.TimeSpan> TimeOfStart { get; set; }
        public Nullable<System.TimeSpan> TimeOfEnd { get; set; }
        public string Event_info { get; set; }
        public Nullable<int> NumberOfInterested { get; set; }
        public Nullable<int> NumberOfGoing { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string StreetName { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Event_host_info { get; set; }
        public string PlaceName { get; set; }
        public string Info_about_events_place { get; set; }
        public Nullable<int> PriceInKunas { get; set; }
        public string Ticket_Info { get; set; }
        public string QRCode { get; set; }
    }
}
