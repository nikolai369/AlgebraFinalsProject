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
    [EnableCors(origins: "*", headers: "Content-Type", methods: "GET, POST, PUT, DELETE")]
    public class TransactionController : ApiController
    {
        private EventPlannerDBEntities db = new EventPlannerDBEntities();

        // GET: api/Transaction
        public IHttpActionResult GetTransaction()
        {
            IList<TransactionViewModel> transactions = null;
            using (db)
            {
                transactions = db.Transaction
                    .Include("Ticket")
                    .Include("User")
                    .Select(u => new TransactionViewModel()
                    {
                        TimeOfPurchase = u.TimeOfPurchase,
                        Info = u.Info,
                        Ticket = new TicketViewModel()
                        {
                            TicketID = u.Ticket.TicketID,
                            PriceInKunas = u.Ticket.PriceInKunas
                        },
                        User = new UserViewModel()
                        {
                            UserID = u.User.UserID,
                            Email = u.User.Email,
                            FirstName = u.User.FirstName,
                            LastName = u.User.LastName
                        }

                    }).ToList<TransactionViewModel>();
            }
            if (transactions.Count() == 0)
            {
                return NotFound();
            }
            return Ok(transactions);
        }

        // GET: api/Transaction/5
        [ResponseType(typeof(Transaction))]
        public IHttpActionResult GetTransactionById(int id)
        {
            TransactionViewModel transaction = null;

            using (db)
            {
                transaction = db.Transaction
                    .Where(u => u.TransactionID == id)
                    .Include("Ticket")
                    .Include("User")
                    .Select(u => new TransactionViewModel()
                    {
                        TimeOfPurchase = u.TimeOfPurchase,
                        Info = u.Info,
                        Ticket = new TicketViewModel()
                        {
                            TicketID = u.Ticket.TicketID,
                            PriceInKunas = u.Ticket.PriceInKunas
                        },
                        User = new UserViewModel()
                        {
                            UserID = u.User.UserID,
                            Email = u.User.Email,
                            FirstName = u.User.FirstName,
                            LastName = u.User.LastName
                        }

                    }).FirstOrDefault<TransactionViewModel>();

                if (transaction == null)
                {
                    return NotFound();
                }

                return Ok(transaction);
            }
        }

        // PUT: api/Transaction/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTransaction(TransactionViewModel transaction)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (db)
            {
                var existingTransaction = db.Transaction.Where(u => u.TransactionID == transaction.TransactionID)
                                                        .FirstOrDefault<Transaction>();

                if (existingTransaction != null)
                {
                    existingTransaction.TimeOfPurchase = transaction.TimeOfPurchase;
                    existingTransaction.Info = transaction.Info;


                    db.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
            }

            return Ok();
        }

        // POST: api/Transaction
        [ResponseType(typeof(Transaction))]
        public IHttpActionResult PostTransaction(TransactionViewModel transaction)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            using (db)
            {
                db.Transaction.Add(new Transaction()
                {
                    TransactionID = transaction.TransactionID,
                    TimeOfPurchase = transaction.TimeOfPurchase,
                    Info = transaction.Info

                });

                db.SaveChanges();
            }

            return Ok();
        }

        // DELETE: api/Transaction/5
        [ResponseType(typeof(Transaction))]
        public IHttpActionResult DeleteTransaction(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid student id");

            using (db)
            {
                var transaction = db.Transaction
                    .Where(u => u.TransactionID == id)
                    .FirstOrDefault();

                db.Entry(transaction).State = System.Data.Entity.EntityState.Deleted;
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

        private bool TransactionExists(int id)
        {
            return db.Transaction.Count(e => e.TransactionID == id) > 0;
        }
    }
}