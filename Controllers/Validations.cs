using Microsoft.AspNetCore.Mvc;

namespace DemoWeb.Controllers;

public class ValidationsController : Controller
{
    [HttpPost]
    public IActionResult CheckRemote()
    {
        return Ok(false);
    }

    [HttpGet]
    public IActionResult Test()
    {
        return Content("Here");
    }
}
