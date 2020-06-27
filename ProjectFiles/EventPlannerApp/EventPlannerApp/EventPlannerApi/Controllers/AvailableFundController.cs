using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using EventPlannerApi.Models;

namespace EventPlannerApi.Controllers
{
    public class AvailableFundController : ApiController
    {
        private EventPlannerDBEntities1 db = new EventPlannerDBEntities1();

        // GET: api/AvailableFund
        public IQueryable<AvailableFunds> GetAvailableFunds()
        {
            return db.AvailableFunds;
        }

        // GET: api/AvailableFund/5
        [ResponseType(typeof(AvailableFunds))]
        public IHttpActionResult GetAvailableFunds(int id)
        {
            AvailableFunds availableFunds = db.AvailableFunds.Find(id);
            if (availableFunds == null)
            {
                return NotFound();
            }

            return Ok(availableFunds);
        }

        // PUT: api/AvailableFund/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAvailableFunds(int id, AvailableFunds availableFunds)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != availableFunds.AvailableFundsID)
            {
                return BadRequest();
            }

            db.Entry(availableFunds).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AvailableFundsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/AvailableFund
        [ResponseType(typeof(AvailableFunds))]
        public IHttpActionResult PostAvailableFunds(AvailableFunds availableFunds)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AvailableFunds.Add(availableFunds);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = availableFunds.AvailableFundsID }, availableFunds);
        }

        // DELETE: api/AvailableFund/5
        [ResponseType(typeof(AvailableFunds))]
        public IHttpActionResult DeleteAvailableFunds(int id)
        {
            AvailableFunds availableFunds = db.AvailableFunds.Find(id);
            if (availableFunds == null)
            {
                return NotFound();
            }

            db.AvailableFunds.Remove(availableFunds);
            db.SaveChanges();

            return Ok(availableFunds);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AvailableFundsExists(int id)
        {
            return db.AvailableFunds.Count(e => e.AvailableFundsID == id) > 0;
        }
    }
}