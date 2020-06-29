﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class EventPlannerDBEntities : DbContext
    {
        public EventPlannerDBEntities()
            : base("name=EventPlannerDBEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<AvailableFunds> AvailableFunds { get; set; }
        public virtual DbSet<CreditCard> CreditCard { get; set; }
        public virtual DbSet<Event> Event { get; set; }
        public virtual DbSet<Going> Going { get; set; }
        public virtual DbSet<Location> Location { get; set; }
        public virtual DbSet<Ticket> Ticket { get; set; }
        public virtual DbSet<Transaction> Transaction { get; set; }
        public virtual DbSet<User> User { get; set; }
    
        public virtual int insert_dummy_data()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("insert_dummy_data");
        }
    }
}
