//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EventPlannerApi.Models
{
    using System;
    
    public partial class near_me_Result
    {
        public int EventID { get; set; }
        public string Title { get; set; }
        public Nullable<System.DateTime> Starting { get; set; }
        public Nullable<System.DateTime> Ending { get; set; }
        public string Info { get; set; }
        public Nullable<int> IDUser { get; set; }
        public Nullable<int> IDLocation { get; set; }
        public Nullable<int> IDTicket { get; set; }
        public string City { get; set; }
        public string Adresse { get; set; }
        public Nullable<decimal> latitude { get; set; }
        public Nullable<decimal> longitude { get; set; }
    }
}
