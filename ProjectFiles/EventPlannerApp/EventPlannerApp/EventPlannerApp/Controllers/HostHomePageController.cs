using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EventPlannerApp.Controllers
{
    public class HostHomePageController : Controller
    {
        // GET: HostHomePage
        public ActionResult HostIndexPage()
        {
            return View();
        }
    }
}