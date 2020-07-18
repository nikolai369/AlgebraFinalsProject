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
    public class AvailableFundController : ApiController
    {
        private EventPlannerDBEntities db = new EventPlannerDBEntities();

        // GET: api/AvailableFund
        public IHttpActionResult GetAvailableFunds()
        {
            IList<AvailableFundsViewModel> availableFunds = null;
            using (db)
            {
                availableFunds = db.AvailableFunds
                    .Include("User")
                    .Select(t => new AvailableFundsViewModel()
                    {
                        AvailableMoney = t.AvailableMoney
                    }).ToList<AvailableFundsViewModel>();
            }
            if (availableFunds.Count() == 0)
            {
                return NotFound();
            }
            return Ok(availableFunds);
        }

        // GET: api/AvailableFund/5
        [ResponseType(typeof(AvailableFunds))]
        public IHttpActionResult GetAvailableFundsByUserID(int id)
        {
            IList<AvailableFundsViewModel> funds = null;

            using (db)
            {
                funds = db.AvailableFunds
                    .Where(t => t.AvailableFundsID == id)
                    .Include("User")
                    .Select(t => new AvailableFundsViewModel()
                    {
                        AvailableMoney = t.AvailableMoney

                    }).ToList<AvailableFundsViewModel>();

                if (funds.Count() == 0)
                {
                    return NotFound();
                }

                return Ok(funds);
            }
        }

        // PUT: api/AvailableFund/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAvailableFunds(AvailableFundsViewModel funds)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (db)
            {
                var existingFunds = db.AvailableFunds.Where(u => u.AvailableFundsID == funds.AvailableFundsID)
                                                        .FirstOrDefault<AvailableFunds>();

                if (existingFunds != null)
                {
                    existingFunds.AvailableMoney = funds.AvailableMoney;
                    db.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
            }

            return Ok();
        }

        // POST: api/AvailableFund
        [ResponseType(typeof(AvailableFunds))]
        public IHttpActionResult PostAvailableFunds(AvailableFundsViewModel funds)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            using (db)
            {
                db.AvailableFunds.Add(new AvailableFunds()
                {
                    AvailableFundsID = funds.AvailableFundsID,
                    AvailableMoney = funds.AvailableMoney
                    

                });

                db.SaveChanges();
            }

            return Ok();
        }

        // DELETE: api/AvailableFund/5
        [ResponseType(typeof(AvailableFunds))]
        public IHttpActionResult DeleteAvailableFunds(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid student id");

            using (db)
            {
                var funds = db.AvailableFunds
                    .Where(u => u.AvailableFundsID == id)
                    .FirstOrDefault();

                db.Entry(funds).State = System.Data.Entity.EntityState.Deleted;
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

        private bool AvailableFundsExists(int id)
        {
            return db.AvailableFunds.Count(e => e.AvailableFundsID == id) > 0;
        }
    }
}