using Microsoft.AspNetCore.Mvc;

namespace DemoWeb.Controllers;

public class ValidationsController : Controller
{
    [HttpPost]
    public IActionResult CheckRemote(string id)
    {
        return Ok(id == "42");
    }

    [HttpGet]
    public IActionResult Test()
    {
        return Content("Here");
    }
}
