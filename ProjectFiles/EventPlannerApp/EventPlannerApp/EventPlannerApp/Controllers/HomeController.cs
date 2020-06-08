using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EventPlannerApp.Models;

namespace EventPlannerApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        #region user login/register
        [HttpGet]
        public ActionResult UserLogin()
        {
            return View();
        }
        [HttpPost]
        public ActionResult UserLoginAutorization(User user)
        {
            using (EventPlannerDBEntities model = new EventPlannerDBEntities())
            {
                var userDetails = model.User.Where(x => x.Email == user.Email && x.Password == user.Password).FirstOrDefault();
                if (userDetails == null)
                {
                    user.LoginErrorMassage = "Wrong Email or Password";
                    return View("UserLogin", user);
                }
                else
                {
                    Session["UserID"]= userDetails.UserID;

                    //Dodati redirect na stranicu koja je ista kao i pocetna defaultna stranica (za koju se ne treba loginati)
                    // i ima dodatne funkcionalnosti za ulogiranog/registriranog usera
                    return RedirectToAction("UserIndexPage", "UserHomePage");
                }
            }
        }

        [HttpGet]
        public ActionResult RegisterUser(int id = 0)
        {
            User user = new User();
            return View(user);

        }
        [HttpPost]
        public ActionResult RegisterUser(User user)
        {

            using (EventPlannerDBEntities model = new EventPlannerDBEntities())
            {
                if (model.User.Any(x => x.Email == user.Email))
                {
                    ViewBag.DuplicateMessage = "User with same Email already exits!";
                    return View("RegisterUser", user);
                }

                model.User.Add(user);
                model.SaveChanges();
            }
            ModelState.Clear();
            ViewBag.SuccessMessage = "Registration completed!";

            return View("RegisterUser", new User());

        }
        #endregion 

        #region Host login/register
        [HttpGet]
        public ActionResult HostLogin()
        {
            return View();
        }
        [HttpPost]
        public ActionResult HostLoginAutorization(EventHost eventHost)
        {
            using (EventPlannerDBEntities model = new EventPlannerDBEntities())
            {
                var eventHostDetails = model.EventHost.Where(x => x.Email == eventHost.Email && x.Password == eventHost.Password).FirstOrDefault();
                if (eventHostDetails == null)
                {
                    eventHost.LoginErrorMassage = "Wrong Email or Password";
                    return View("HostLogin", eventHost);
                }
                else
                {
                    Session["EventHostID"] = eventHostDetails.EventHostID;
                    //Dodati redirect na stranicu koja je ista kao i pocetna defaultna stranica (za koju se ne treba loginati)
                    // i ima funkcionalnosti za ulogiranog/registriranog hosta
                    return RedirectToAction("HostIndexPage", "HostHomePage");
                }
            }
        }

        [HttpGet]
        public ActionResult RegisterHost(int id = 0)
        {
            EventHost eventHost = new EventHost();
            return View(eventHost);

        }
        [HttpPost]
        public ActionResult RegisterHost(EventHost eventHost)
        {

            using (EventPlannerDBEntities model = new EventPlannerDBEntities())
            {
                if (model.EventHost.Any(x => x.Email == eventHost.Email))
                {
                    ViewBag.DuplicateMessage = "User with same Email already exits!";
                    return View("RegisterUser", eventHost);
                }

                model.EventHost.Add(eventHost);
                model.SaveChanges();
            }
            ModelState.Clear();
            ViewBag.SuccessMessage = "Registration completed!";

            return View("RegisterHost", new EventHost());

        }
        #endregion


        #region super admin login
        [HttpGet]
        public ActionResult AdminLogin()
        {
            return View();
        }
        [HttpPost]
        public ActionResult AdminLoginAutorization(Admin admin)
        {
            using (EventPlannerDBEntities model = new EventPlannerDBEntities())
            {
                var adminDetails = model.Admin.Where(x => x.Username == admin.Username && x.Password == admin.Password).FirstOrDefault();
                if (adminDetails == null)
                {
                    admin.LoginErrorMassage = "Wrong Email or Password";
                    return View("AdminLogin", admin);
                }
                else
                {
                    Session["AdminID"] = adminDetails.AdminID;
                    
                    //Dodati redirect na stranicu za ulogiranog admina
                    return RedirectToAction("AdminIndexPage", "AdminHomePage");
                }
            }
        }

        #endregion

        public ActionResult Logout()
        {
            Session.Abandon();
            return View("Index");
        }


        
    }
}