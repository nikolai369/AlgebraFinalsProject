using Dapper;
using EventPlannerApi.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Device.Location;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace EventPlannerApi.Controllers
{
    [EnableCors(origins: "*", headers: "Content-Type", methods: "GET, POST, PUT, DELETE")]
    public class EventController : ApiController
    {
        private EventPlannerDBEntities db = new EventPlannerDBEntities();
        //Configuration configuration = Configuration.EnableCors();
        
        // GET: api/Event
        [Route("api/event/all")]
        public IHttpActionResult GetAllEvents()
        {
            IList<EventViewModel> events = null;
            DateTime dateStr = DateTime.Now;
            using (db)
            {
                events = db.Event
                    .Include("Location")
                    .Include("Ticket")
                    //.Where(e => e.Starting >= dateStr)
                    .Select(e => new EventViewModel()
                    {
                        EventID = e.EventID,
                        Title = e.Title,
                        Starting = e.Starting,
                        Ending = e.Ending,
                        Adresse = e.Adresse,
                        IDUser = e.IDUser,
                        longitude = e.longitude,
                        latitude = e.latitude,
                        Ticket = e.Ticket

                    }).ToList<EventViewModel>();
            }
            if (events.Count() == 0)
            {
                return NotFound();
            }
            return Ok(events);
        }


        
        [HttpPost]
        [Route("api/event/near_me")]
        public IHttpActionResult PostNearEvent(Test location)
        {

            string latitude2 = location.latitude;
            string longitude2 = location.longitude;
            //string longitude2 = longitude.ToString();
            //string latitude2 = latitude.ToString();
            //string longitude = "15.95117";
            //string latitude = "45.81258";
            var cs = ConfigurationManager.ConnectionStrings["EventPlannerDBEntities"].ConnectionString;
            List<EventViewModel> events = new List<EventViewModel>();
            string offset = "0.5";
            //var datetime = DateTime.Now;
            string datetime = DateTime.Now.ToString("yyyy/MM/dd hh:mm:ss.ff");
            //var datetime = "2020-11-11 19:00:00.00";
            string near_me = string.Format("select e.* from [Event] as e where e.longitude < {0} + {1} and e.latitude < {2} + {3} and e.longitude > {4} - {5} and e.latitude > {6} - {7} and e.Starting >= '{8}' order by e.Starting desc", longitude2, offset, latitude2, offset, longitude2, offset, latitude2, offset, datetime);
            using (SqlConnection conn = new SqlConnection("data source=DESKTOP-VKPMS9H;initial catalog=EventPlannerDB;integrated security=True;multipleactiveresultsets=True"))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand(near_me, conn))
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

                            events.Add(_event);                        }
                    }
                }
                conn.Close();


                return Ok(events);
            }
        }


        //GET: api/Event/5
        [Route("api/event/idevent")]
        [HttpPost]
        public IHttpActionResult PostEvent(EventViewModel idevent)
        {
            EventViewModel eventModel = null;
            bool am_going = true;
            GoingViewModel am_i_going = new GoingViewModel();

            string num_of_going = string.Format("select IDUser from Going where IDEvent = {0}", idevent.EventID);
            int count = 0;
            EventViewModel e = new EventViewModel();
            using (SqlConnection conn = new SqlConnection("data source=DESKTOP-VKPMS9H;initial catalog=EventPlannerDB;integrated security=True;multipleactiveresultsets=True"))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand(num_of_going, conn))
                {
                    using (var rd = cmd.ExecuteReader())
                    {
                        while (rd.Read())
                        {
                            count++;
                        }
                    }
                }
                conn.Close();
            }
            using (db)
            {
                IList<GoingViewModel> goings = null;
                goings = db.Going
                    .Where(t => t.IDEvent == idevent.EventID && t.IDUser == idevent.IDUser)
                    .Include("Event")
                    .Select(t => new GoingViewModel()
                    {
                        IDUser = t.IDUser,
                        IDEvent = t.IDEvent

                    }).ToList<GoingViewModel>();

                if (!goings.Any())
                {
                    am_going = false;
                }

                eventModel = db.Event
                    .Include("Location")
                    .Include("Ticket")
                    .Include("Going")
                    .Where(ev => ev.EventID == idevent.EventID)
                    .Select(ev => new EventViewModel()
                    {
                        EventID = ev.EventID,
                        Title = ev.Title,
                        Starting = ev.Starting,
                        Ending = ev.Ending,
                        Ticket = ev.Ticket,
                        Adresse = ev.Adresse,
                        latitude = ev.latitude,
                        longitude = ev.longitude,
                        NumberOfGoing = count,
                        IsLoginUserGoing = am_going,
                        IDUser = ev.IDUser

                    }).FirstOrDefault<EventViewModel>();
            }

            //User user = db.User.Find(id);

            if (eventModel == null)
            {
                return NotFound();
            }

            return Ok(eventModel);
        }


        [ResponseType(typeof(Event))]
        [Route("api/event")]
        public IHttpActionResult GetEventByUserID(int id)
        {
            IList<EventViewModel> eventModel = null;
            using (db)
            {
                eventModel = db.Event
                    .Include("Location")
                    .Include("Ticket")
                    .Include("Going")
                    .Where(e => e.IDUser ==id)
                    .Select(e => new EventViewModel()
                    {
                        EventID = e.EventID,
                        Title = e.Title,
                        Starting = e.Starting,
                        Ending = e.Ending,
                        Adresse = e.Adresse,
                        IDUser = e.IDUser,
                        longitude = e.longitude,
                        latitude = e.latitude,
                        Ticket = e.Ticket

                    }).ToList<EventViewModel>();
            }

            //User user = db.User.Find(id);

            if (eventModel == null)
            {
                return NotFound();
            }

            return Ok(eventModel);
        }


        // PUT: api/Event/5
        [Route("api/event/update")]
        public IHttpActionResult PutEvent(EventViewModel @event)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (db)
            {
                var existingEvent = db.Event.Where(e => e.EventID == @event.EventID)
                                                        .FirstOrDefault<Event>();



                if (existingEvent != null)
                {
                    existingEvent.Title = @event.Title;
                    existingEvent.Starting = @event.Starting;
                    existingEvent.Ending = @event.Ending;
                    existingEvent.Adresse = @event.Adresse;
                    existingEvent.longitude = @event.longitude;
                    existingEvent.latitude = @event.latitude;

                    db.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
            }

            return Ok();
        }

        //POST: api/Event
        [ResponseType(typeof(Event))]
        [Route("api/event/create")]
        public IHttpActionResult PostNewEvent(EventViewModel eventModel)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");


            using (db)
            {

                db.Event.Add(new Event()
                {
                    Title = eventModel.Title,
                    Starting = eventModel.Starting,
                    Ending = eventModel.Ending,
                    IDUser = eventModel.IDUser,
                    IDTicket = 1,
                    Adresse = eventModel.Adresse,
                    latitude = eventModel.latitude,
                    longitude = eventModel.longitude

                });

                db.SaveChanges();
            }

            return Ok();
        }

        // DELETE: api/Event/5
        //[ResponseType(typeof(Event))]
        [HttpDelete]
        [Route("api/event/delete")]
        public IHttpActionResult DeleteEvent(EventViewModel _event)
        {
            //if (id <= 0)
            //    return BadRequest("Not a valid student id");

            //using (db)
            //{
            //    var eventModel = db.Event
            //        .Where(e => e.EventID == id)
            //        .FirstOrDefault();

            //    db.Entry(eventModel).State = System.Data.Entity.EntityState.Deleted;
            //    db.SaveChanges();
            //}
            
            using (db)
            {
                db.Database.ExecuteSqlCommand(
                    "Exec delete_event @eventid",
                    new SqlParameter("@eventid", _event.EventID
                    ));
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

        private bool EventExists(int id)
        {
            return db.Event.Count(e => e.EventID == id) > 0;
        }
    }
}