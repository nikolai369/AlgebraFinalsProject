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

        // GET: api/Going/5
        [ResponseType(typeof(Going))]
        public IHttpActionResult GetGoingsByEvent(int id)
        {
            IList<GoingViewModel> goings = null;

            using (db)
            {
                goings = db.Going
                    .Where(t => t.IDEvent == id)
                    .Include("Event")
                    .Select(t => new GoingViewModel()
                    {
                        IDUser = t.IDUser,
                        IDEvent = t.IDEvent

                    }).ToList<GoingViewModel>();

                if (goings.Count() == 0)
                {
                    return NotFound();
                }

                return Ok(goings);
            }
        }

        // PUT: api/Going/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutGoing(GoingViewModel going)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (db)
            {
                var existingGoing = db.Going.Where(u => u.GoingID == going.GoingID)
                                                        .FirstOrDefault<Going>();

                if (existingGoing != null)
                {
                    existingGoing.IDEvent = going.IDEvent;
                    existingGoing.IDUser = going.IDUser;


                    db.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
            }

            return Ok();
        }

        // POST: api/Going
        [ResponseType(typeof(Going))]
        public IHttpActionResult PostGoing(GoingViewModel going)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            using (db)
            {
                db.Going.Add(new Going()
                {
                    GoingID = going.GoingID,
                    IDUser = going.IDUser,
                    IDEvent = going.IDEvent

                });

                db.SaveChanges();
            }

            return Ok();
        }

        // DELETE: api/Going/5
        [ResponseType(typeof(Going))]
        public IHttpActionResult DeleteGoing(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid student id");

            using (db)
            {
                var going = db.Going
                    .Where(u => u.GoingID == id)
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