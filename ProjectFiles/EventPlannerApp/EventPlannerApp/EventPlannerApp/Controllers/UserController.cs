using EventPlannerApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using EventPlannerApp.GlobalVariables;

namespace EventPlannerApp.Controllers
{
    public class UserController : Controller
    {
        // GET: User
        public ActionResult Index()
        {
            IEnumerable<User> users;
            HttpResponseMessage respone = GlobalVariables.GlobalVariables.WebApiClient.GetAsync("User").Result;
            users = respone.Content.ReadAsAsync<IEnumerable<User>>().Result;
            return View(users);
        }

        //public ActionResult Login()
        //{
        //    return View();
        //}
        //[HttpPost]
        //public ActionResult LoginAutorization(User user)
        //{
        //    HttpResponseMessage respone = GlobalVariables.GlobalVariables.WebApiClient.GetAsync("User").Result;
        //    user = respone.Content.ReadAsAsync<User>().Result;

        //    var userDetails = user.Where(x => x.Email == user.Email && x.Password == user.Password).FirstOrDefault();
        //    if (userDetails == null)
        //    {
        //        user.LoginErrorMassage = "Wrong Email or Password";
        //        return View("UserLogin", user);
        //    }
        //    else
        //    {
        //        Session["UserID"] = userDetails.UserID;

        //        //Dodati redirect na stranicu koja je ista kao i pocetna defaultna stranica (za koju se ne treba loginati)
        //        // i ima dodatne funkcionalnosti za ulogiranog/registriranog usera
        //        return RedirectToAction("UserIndexPage", "UserHomePage");
        //    }
            
        //}

        //[HttpGet]
        //public ActionResult Register(int id = 0)
        //{
        //    User user = new User();
        //    return View(user);

        //}
        //[HttpPost]
        //public ActionResult Register(User user)
        //{

        //    using (EventPlannerDBEntities model = new EventPlannerDBEntities())
        //    {
        //        if (model.User.Any(x => x.Email == user.Email))
        //        {
        //            ViewBag.DuplicateMessage = "User with same Email already exits!";
        //            return View("RegisterUser", user);
        //        }

        //        model.User.Add(user);
        //        model.SaveChanges();
        //    }
        //    ModelState.Clear();
        //    ViewBag.SuccessMessage = "Registration completed!";

        //    return View("RegisterUser", new User());

        //}

    }
}