using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using EventPlannerApi.Models;

namespace EventPlannerApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LocationController : ApiController
    {
        private EventPlannerDBEntities db = new EventPlannerDBEntities();

        // GET: api/Location
        public IHttpActionResult GetLocations()
        {
            IList<LocationViewModel> location = null;
            using (db)
            {
                location = db.Location
                    .Include("Event")
                    .Select(t => new LocationViewModel()
                    {
                        City = t.City,
                        Adresse = t.Adresse,
                        Event = t.Event
                    }).ToList<LocationViewModel>();
            }
            if (location.Count() == 0)
            {
                return NotFound();
            }
            return Ok(location);
        }

        // GET: api/Location/5
        [ResponseType(typeof(Location))]
        public IHttpActionResult GetLocationById(int id)
        {
            LocationViewModel location = null;

            using (db)
            {
                location = db.Location
                    .Where(t => t.LocationID == id)
                    .Include("Event")
                    .Select(t => new LocationViewModel()
                    {
                        City = t.City,
                        Adresse = t.Adresse,
                        Event = t.Event

                    }).FirstOrDefault<LocationViewModel>();

                if (location == null)
                {
                    return NotFound();
                }

                return Ok(location);
            }
        }




        // PUT: api/Location/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLocation(LocationViewModel location)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (db)
            {
                var existingLocation = db.Location.Where(u => u.LocationID == location.LocationID)
                                                        .FirstOrDefault<Location>();

                if (existingLocation != null)
                {
                    existingLocation.City = location.City;
                    existingLocation.Adresse = location.Adresse;


                    db.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
            }

            return Ok();
        }

        // POST: api/Location
        [ResponseType(typeof(Location))]
        public IHttpActionResult PostTicket(LocationViewModel location)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            using (db)
            {
                db.Location.Add(new Location()
                {
                    LocationID = location.LocationID,
                    City = location.City,
                    Adresse = location.Adresse

                });

                db.SaveChanges();
            }

            return Ok();
        }

        // DELETE: api/Location/5
        [ResponseType(typeof(Location))]
        public IHttpActionResult DeleteLocation(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid student id");

            using (db)
            {
                var location = db.Location
                    .Where(u => u.LocationID == id)
                    .FirstOrDefault();

                db.Entry(location).State = System.Data.Entity.EntityState.Deleted;
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

        private bool LocationExists(int id)
        {
            return db.Location.Count(e => e.LocationID == id) > 0;
        }
    }
}