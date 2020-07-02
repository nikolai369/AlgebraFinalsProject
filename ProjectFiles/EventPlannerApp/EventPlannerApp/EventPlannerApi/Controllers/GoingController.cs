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
    public class GoingController : ApiController
    {
        private EventPlannerDBEntities db = new EventPlannerDBEntities();

        // GET: api/Going
        public IEnumerable<Going> GetGoing()
        {
            return db.Going.Include(u => u.User).Include(e => e.Event).ToList();
        }

        // GET: api/Going/5
        [ResponseType(typeof(Going))]
        public IHttpActionResult GetGoing(int id)
        {
            Going going = db.Going.Find(id);
            if (going == null)
            {
                return NotFound();
            }

            return Ok(going);
        }

        // PUT: api/Going/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutGoing(int id, Going going)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != going.GoingID)
            {
                return BadRequest();
            }

            db.Entry(going).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GoingExists(id))
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

        // POST: api/Going
        [ResponseType(typeof(Going))]
        public IHttpActionResult PostGoing(Going going)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Going.Add(going);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = going.GoingID }, going);
        }

        // DELETE: api/Going/5
        [ResponseType(typeof(Going))]
        public IHttpActionResult DeleteGoing(int id)
        {
            Going going = db.Going.Find(id);
            if (going == null)
            {
                return NotFound();
            }

            db.Going.Remove(going);
            db.SaveChanges();

            return Ok(going);
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