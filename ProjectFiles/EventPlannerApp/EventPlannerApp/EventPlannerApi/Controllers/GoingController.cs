using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using EventPlannerApi.Models;

namespace EventPlannerApi.Controllers
{
    [EnableCors(origins: "*", headers: "Content-Type", methods: "GET, POST, DELETE")]
    public class GoingController : ApiController
    {
        private EventPlannerDBEntities db = new EventPlannerDBEntities();

        // GET: api/Going
        [HttpGet]
        [Route("api/going/all")]
        public IHttpActionResult GetGoings()
        {
            IList<GoingViewModel> goings = null;
            using (db)
            {
                goings = db.Going
                    .Include("Event")
                    .Include("User")
                    .Select(t => new GoingViewModel()
                    {
                        IDUser = t.IDUser,
                        IDEvent = t.IDEvent
                    }).ToList<GoingViewModel>();
            }
            if (goings.Count() == 0)
            {
                return NotFound();
            }
            return Ok(goings);
        }




        // POST: api/Going
        [ResponseType(typeof(Going))]
        [HttpPost]
        [Route("api/going/is_going")]
        // adding/removing going on "going" click
        public IHttpActionResult PostGoing(GoingViewModel going)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            using (db)
            {
                var IsAllreadyGoing =
                    from a in db.Going
                    where a.IDUser == going.IDUser && a.IDEvent == going.IDEvent
                    select a.GoingID;

                if (IsAllreadyGoing.Any())
                {
                    var new_going = db.Going
                    .Where(u => u.IDUser == going.IDUser && u.IDEvent == going.IDEvent)
                    .FirstOrDefault();

                    db.Entry(new_going).State = System.Data.Entity.EntityState.Deleted;
                    db.SaveChanges();
                }
                else
                {
                    db.Going.Add(new Going()
                    {
                        IDUser = going.IDUser,
                        IDEvent = going.IDEvent
                    });
                }


                db.SaveChanges();
            }

            return Ok();
        }

        [HttpGet]
        [Route("api/going")]
        //events that user is going to
        public IHttpActionResult GetGoings(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            List<EventViewModel> events = new List<EventViewModel>();
            string my_goings = string.Format("select e.* from Going as g left join [Event] as e on g.IDEvent = e.EventID left join [User] as u on g.IDUser = u.UserID where g.IDUser = {0}", id);

            using (db)
            {
                using (SqlConnection conn = new SqlConnection("data source=DESKTOP-VKPMS9H;initial catalog=EventPlannerDB;integrated security=True;multipleactiveresultsets=True"))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(my_goings, conn))
                    {
                        using (var rd = cmd.ExecuteReader())
                        {
                            while (rd.Read())
                            {
                                var _event = new EventViewModel();
                                _event.EventID = rd.GetInt32(rd.GetOrdinal("EventID"));
                                _event.Title = rd.GetString(rd.GetOrdinal("Title"));
                                _event.Starting = rd.GetDateTime(rd.GetOrdinal("Starting"));
                                _event.Ending = rd.GetDateTime(rd.GetOrdinal("Ending"));
                                _event.Adresse = rd.GetString(rd.GetOrdinal("Adresse"));
                                _event.IDUser = rd.GetInt32(rd.GetOrdinal("IDUser"));
                                _event.longitude = rd.GetDecimal(rd.GetOrdinal("longitude"));
                                _event.latitude = rd.GetDecimal(rd.GetOrdinal("latitude"));

                                events.Add(_event);
                            }
                        }
                    }
                    conn.Close();
                }
            }
            return Ok(events);
        }

        // DELETE: api/Going/5
        [ResponseType(typeof(Going))]
        [Route("api/going/delete")]
        public IHttpActionResult DeleteGoing(GoingViewModel deletegoing)
        {
            using (db)
            {
                var going = db.Going
                    .Where(u => u.IDUser == deletegoing.IDUser && u.IDEvent == deletegoing.IDEvent)
                    .FirstOrDefault();

                db.Entry(going).State = System.Data.Entity.EntityState.Deleted;
                db.SaveChanges();
            }

            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GoingExists(int id)
        {
            return db.Going.Count(e => e.GoingID == id) > 0;
        }
    }
}