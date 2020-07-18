using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.CompilerServices;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using EventPlannerApi.Models;

namespace EventPlannerApi.Controllers
{
    [EnableCors(origins: "http://localhost:19006/", headers: "*", methods: "GET,POST")]
    public class UserController : ApiController
    {
        private EventPlannerDBEntities db = new EventPlannerDBEntities();

        // GET: api/User
        [Route("api/user/all")]
        public IHttpActionResult GetAllUsers()
        {
            IList<UserViewModel> users = null;
            using (db)
            {
                users = db.User
                    .Include("CreditCard")
                    .Include("AvailableFunds")
                    .Select(u => new UserViewModel()
                    {
                        UserID = u.UserID,
                        Email = u.Email,
                        Password = u.Password,
                        FirstName = u.FirstName,
                        LastName = u.LastName,
                        Age = u.Age,
                        IBAN = u.IBAN,
                        Info = u.Info,
                        AdminUser = u.AdminUser,
                        AvailableFunds = u.AvailableFunds == null ? null : new AvailableFundsViewModel() //if it has none it joins nothing, if it has it joins available emoney
                        {
                            AvailableFundsID = u.AvailableFunds.AvailableFundsID,
                            AvailableMoney = u.AvailableFunds.AvailableMoney
                        },
                        CreditCard = u.CreditCard == null ? null : new CreditCardViewModel()
                        {
                            CreditCardID = u.CreditCard.CreditCardID,
                            CardName = u.CreditCard.CardName
                        }

                    }).ToList<UserViewModel>();
            }
            if (users.Count() == 0)
            {
                return NotFound();
            }
            return Ok(users);
        }

        // GET: api/User/5
        [ResponseType(typeof(User))]
        [Route("api/user/{id}")]
        public IHttpActionResult GetUserById(int id)
        {
            UserViewModel user = null;

            using (db)
            {
                user = db.User
                    .Include("CreditCard")
                    .Include("AvailableFunds")
                    .Where(u => u.UserID == id)
                    .Select(u => new UserViewModel()
                    {
                        UserID = u.UserID,
                        Email = u.Email,
                        Password = u.Password,
                        FirstName = u.FirstName,
                        LastName = u.LastName,
                        Age = u.Age,
                        IBAN = u.IBAN,
                        Info = u.Info,
                        AdminUser = u.AdminUser,
                        AvailableFunds = u.AvailableFunds == null ? null : new AvailableFundsViewModel() //if it has none it joins nothing, if it has it joins available emoney
                        {
                            AvailableFundsID = u.AvailableFunds.AvailableFundsID,
                            AvailableMoney = u.AvailableFunds.AvailableMoney
                        },
                        CreditCard = u.CreditCard == null ? null : new CreditCardViewModel()
                        {
                            CreditCardID = u.CreditCard.CreditCardID,
                            CardName = u.CreditCard.CardName
                        }
                    }).FirstOrDefault<UserViewModel>();
            }

            //User user = db.User.Find(id);
            
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }


        [HttpPost]
        [Route("api/user/login")]
        //public IHttpActionResult PostUserLoginData(string email, string password)
        public IHttpActionResult PostUserLoginData(UserViewModel user)
        {
            UserViewModel user_r = null;
            using (db)
            {
                user_r = db.User
                    .Where(u => u.Email == user.Email && u.Password == user.Password)
                    .Select(u => new UserViewModel()
                    {
                        UserID = u.UserID,
                        Email = u.Email,
                        Password = u.Password,
                        FirstName = u.FirstName,
                        LastName = u.LastName,
                        Age = u.Age,
                        IBAN = u.IBAN,
                        Info = u.Info,
                        AdminUser = u.AdminUser,
                        AvailableFunds = u.AvailableFunds == null ? null : new AvailableFundsViewModel() //if it has none it joins nothing, if it has it joins available emoney
                        {
                            AvailableFundsID = u.AvailableFunds.AvailableFundsID,
                            AvailableMoney = u.AvailableFunds.AvailableMoney
                        },
                        CreditCard = u.CreditCard == null ? null : new CreditCardViewModel()
                        {
                            CreditCardID = u.CreditCard.CreditCardID,
                            CardName = u.CreditCard.CardName
                        }
                    }).FirstOrDefault<UserViewModel>();
            }
            if (user_r == null)
            {
                return NotFound();
            }
            return Ok(user_r);
        }


        // PUT: api/User/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(UserViewModel user)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (db)
            {
                var existingUser = db.User.Where(u => u.UserID == user.UserID)
                                                        .FirstOrDefault<User>();

                if (existingUser != null)
                {
                    existingUser.Email = user.Email;
                    existingUser.Password = user.Password;
                    existingUser.Password = user.Password;
                    existingUser.FirstName = user.FirstName;
                    existingUser.LastName = user.LastName;
                    existingUser.Age = user.Age;
                    existingUser.IBAN= user.IBAN;
                    existingUser.Info = user.Info;
                    existingUser.AdminUser = user.AdminUser;


                    db.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
            }

            return Ok();
        }

        // POST: api/User
        [ResponseType(typeof(User))]
        [Route("api/user/register")]
        public IHttpActionResult PostUser(UserViewModel user)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            using (db)
            {
                    db.User.Add(new User()
                {
                    Email = user.Email,
                    Password = user.Password,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Age = user.Age,
                    IBAN = user.IBAN,
                    Info = user.Info,
                    AdminUser = user.AdminUser

                });

                db.SaveChanges();
            }
            return Ok();
        }

        // DELETE: api/User/5
        //[ResponseType(typeof(User))]
        [HttpDelete]
        [Route("api/user/delete/{id}")]
        public IHttpActionResult DeleteUser(int id)
        {
            //if (id <= 0)
            //    return BadRequest("Not a valid student id");

            //using (db)
            //{
            //    var user = db.User
            //        .Where(u => u.UserID == id)
            //        .FirstOrDefault();

            //    db.Entry(user).State = System.Data.Entity.EntityState.Deleted;
            //    db.SaveChanges();
            //}
            using (db)
            {
                db.Database.ExecuteSqlCommand(
                    "Exec delete_user @userid",
                    new SqlParameter("@userid", id
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

        private bool UserExists(int id)
        {
            return db.User.Count(e => e.UserID == id) > 0;
        }
    }
}