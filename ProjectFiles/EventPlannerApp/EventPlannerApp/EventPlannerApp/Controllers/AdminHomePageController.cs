using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EventPlannerApp.Controllers
{
    public class AdminHomePageController : Controller
    {
        // GET: Admin
        public ActionResult AdminIndexPage()
        {
            return View();
        }
    }
}