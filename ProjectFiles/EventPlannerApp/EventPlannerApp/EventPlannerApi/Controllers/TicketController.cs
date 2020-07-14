using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using EventPlannerApi.Models;

namespace EventPlannerApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "GET,POST")]
    public class TicketController : ApiController
    {
        private EventPlannerDBEntities db = new EventPlannerDBEntities();

        // GET: api/Ticket

        [HttpGet]
        [Route("api/ticket/all")]
        public IHttpActionResult GetTicket()
        {
            IList<TicketViewModel> ticket = null;
            using (db)
            {
                ticket = db.Ticket
                    .Include("Event")
                    .Select(t => new TicketViewModel()
                    {
                        TicketID = t.TicketID,
                        PriceInKunas = t.PriceInKunas,
                        Info = t.Info,
                        Event = t.Event
                    }).ToList<TicketViewModel>();
            }
            if (ticket.Count() == 0)
            {
                return NotFound();
            }
            return Ok(ticket);
        }

        // GET: api/Ticket/5
        
        [ResponseType(typeof(Ticket))]
        [Route("api/ticket/{id}")]
        public IHttpActionResult GetTicketById(int id)
        {
            TicketViewModel ticket = null;

            using (db)
            {
                ticket = db.Ticket
                    .Where(t => t.TicketID == id)
                    .Include("Event")
                    .Select(t => new TicketViewModel()
                    {
                        PriceInKunas = t.PriceInKunas,
                        Info = t.Info,
                        Event = t.Event

                    }).FirstOrDefault<TicketViewModel>();

                if (ticket == null)
                {
                    return NotFound();
                }

                return Ok(ticket);
            }
        }

        // PUT: api/Ticket/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTicket(TicketViewModel ticket)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (db)
            {
                var existingTicket = db.Ticket.Where(u => u.TicketID == ticket.TicketID)
                                                        .FirstOrDefault<Ticket>();

                if (existingTicket != null)
                {
                    existingTicket.PriceInKunas = ticket.PriceInKunas;
                    existingTicket.Info = ticket.Info;


                    db.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
            }

            return Ok();
        }

        // POST: api/Ticket
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult PostTicket(TicketViewModel ticket)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            using (db)
            {
                db.Ticket.Add(new Ticket()
                {
                    TicketID = ticket.TicketID,
                    PriceInKunas = ticket.PriceInKunas,
                    Info = ticket.Info

                });

                db.SaveChanges();
            }

            return Ok();
        }

        // DELETE: api/Ticket/5
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult DeleteTicket(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid student id");

            using (db)
            {
                var ticket = db.Ticket
                    .Where(u => u.TicketID == id)
                    .FirstOrDefault();

                db.Entry(ticket).State = System.Data.Entity.EntityState.Deleted;
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

        private bool TicketExists(int id)
        {
            return db.Ticket.Count(e => e.TicketID == id) > 0;
        }
    }
}