using System;

namespace EventPlannerApi.Models
{
    public class GoingViewModel
    {
        public int GoingID { get; set; }
        public Nullable<int> IDUser { get; set; }
        public Nullable<int> IDEvent { get; set; }

        public  EventViewModel Event { get; set; }
        public  UserViewModel User { get; set; }
    }
}