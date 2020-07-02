using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EventPlannerApp.Models
{
    public class User
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public User()
        {
            this.Event = new HashSet<Event>();
            this.Going = new HashSet<Going>();
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
        [DisplayName("Confirm Password")]
        public string ConfirmPassword { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Nullable<int> Age { get; set; }
        public string IBAN { get; set; }
        public string Info { get; set; }
        public Nullable<bool> AdminUser { get; set; }
        public Nullable<int> IDCreditCard { get; set; }
        public Nullable<int> IDAvailableFunds { get; set; }

        public  AvailableFunds AvailableFunds { get; set; }
        public  CreditCard CreditCard { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public  ICollection<Event> Event { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public  ICollection<Going> Going { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public  ICollection<Transaction> Transaction { get; set; }

        public string LoginErrorMessage { get; set; }
    }
}