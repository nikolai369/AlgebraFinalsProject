using EventPlannerApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using Newtonsoft;
using EventPlannerApi.Models;

namespace EventPlannerApp.Controllers
{
    public class UserController : Controller
    {

        private HttpClient client = new HttpClient();
        // GET: User
        public ActionResult Index()
        {
            IEnumerable<UserViewModel> users = null;

            using (client)
            {
                client.BaseAddress = new Uri("http://localhost:57871/api/");

                var response = client.GetAsync("User");
                response.Wait();

                var result = response.Result;

                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsAsync<IList<UserViewModel>>();
                    readTask.Wait();

                    users = readTask.Result;
                }
                else
                {
                    users = Enumerable.Empty<UserViewModel>();
                    ModelState.AddModelError(string.Empty, "Server error");
                }
            }
            return View(users);
        }

        public ActionResult UserLogin()
        {
            return View();
        }
        [HttpPost]
        public ActionResult LoginAutorization(UserViewModel user)
        {
            UserViewModel user_get;
            using (client)
            {
                client.BaseAddress = new Uri("http://localhost:57871/api/");

                var response = client.GetAsync("User/" + user.Email);
                response.Wait();

                var result = response.Result;

                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsAsync<UserViewModel>();
                    readTask.Wait();

                    user_get = readTask.Result;
                    if (user_get.Password == user.Password)
                    {
                        Session["UserID"] = user_get.UserID;
                        return View("UserIndexPage", user_get);//redirect to login
                    }
                    
                }
                else
                {
                    return View("UserLogin", user);
                }
            }
            return View();
        }

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