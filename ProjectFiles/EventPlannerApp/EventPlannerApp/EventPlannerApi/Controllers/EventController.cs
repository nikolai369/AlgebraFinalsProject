using EventPlannerApi.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace EventPlannerApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "GET, POST, DELETE")]
    public class EventController : ApiController
    {
        private EventPlannerDBEntities db = new EventPlannerDBEntities();

        // GET: api/Event
        [Route("api/event/all")]
        public IHttpActionResult GetAllEvents()
        {
            IList<EventViewModel> events = null;
            using (db)
            {
                events = db.Event
                    .Include("Location")
                    .Include("Ticket")
                    .Select(e => new EventViewModel()
                    {
                        EventID = e.EventID,
                        Title = e.Title,
                        Starting = e.Starting,
                        Ending = e.Ending,
                        Info = e.Info,
                        Location = e.Location,
                        Ticket = e.Ticket

                    }).ToList<EventViewModel>();
            }
            if (events.Count() == 0)
            {
                return NotFound();
            }
            return Ok(events);
        }

        //GET: api/Event/5
        [Route("api/event/id")]
        public IHttpActionResult GetEvent(int id)
        {
            EventViewModel eventModel = null;

            using (db)
            {
                eventModel = db.Event
                    .Include("Location")
                    .Include("Ticket")
                    .Include("Going")
                    .Where(e => e.EventID == id)
                    .Select(e => new EventViewModel()
                    {
                        EventID = e.EventID,
                        Title = e.Title,
                        Starting = e.Starting,
                        Ending = e.Ending,
                        Info = e.Info,
                        Location = e.Location,
                        Ticket = e.Ticket,
                        NumberOfGoing = e.Going.Count // number of going (number of id's in going table where EventID = id) to the event

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
        [Route("api/event/userid")]
        public IHttpActionResult GetEventByUserID(UserViewModel user)
        {
            IList<EventViewModel> eventModel = null;

            using (db)
            {
                eventModel = db.Event
                    .Include("Location")
                    .Include("Ticket")
                    .Include("Going")
                    .Where(e => e.IDUser == user.UserID)
                    .Select(e => new EventViewModel()
                    {
                        EventID = e.EventID,
                        Title = e.Title,
                        Starting = e.Starting,
                        Ending = e.Ending,
                        Info = e.Info,
                        Location = e.Location,
                        Ticket = e.Ticket,
                        NumberOfGoing = e.Going.Count // number of going (number of id's in going table where EventID = id) to the event

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
        [ResponseType(typeof(void))]
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
                    existingEvent.Info = @event.Info;
                    existingEvent.Location = @event.Location;
                    existingEvent.Ticket = @event.Ticket;

                    db.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
            }

            return Ok();
        }

        // POST: api/Event
        [ResponseType(typeof(Event))]
        public IHttpActionResult PostNewEvent([FromBody]EventViewModel eventModel)
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
                    Info = eventModel.Info,
                    Location = eventModel.Location,
                    Ticket = eventModel.Ticket
                    
                });

                db.SaveChanges();
            }

            return Ok();
        }

        // DELETE: api/Event/5
        //[ResponseType(typeof(Event))]
        [HttpDelete]
        [Route("api/event/delete/{id}")]
        public IHttpActionResult DeleteEvent(int id)
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
                    new SqlParameter("@eventid", id
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