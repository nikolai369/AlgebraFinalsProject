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
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;

    public partial class User
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public User()
        {
            this.Review = new HashSet<Review>();
            this.Transaction = new HashSet<Transaction>();
        }
    
        public int UserID { get; set; }
        [Required(ErrorMessage = "Field Required!")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Field Required!")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required(ErrorMessage = "Field Required!")]

        [DataType(DataType.Password)]
        [DisplayName ("Confirm Password")]
        public string ConfirmPassword { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Nullable<int> Age { get; set; }
        public Nullable<int> IDCreditCard { get; set; }
        public Nullable<int> IDAvailableFunds { get; set; }
    
        public virtual AvailableFunds AvailableFunds { get; set; }
        public virtual CreditCard CreditCard { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Review> Review { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Transaction> Transaction { get; set; }


        public string LoginErrorMassage { get; set; }
    }
}
