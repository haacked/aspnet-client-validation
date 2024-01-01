using Microsoft.AspNetCore.Mvc;

namespace DemoWeb.Controllers;

public class ValidationsController : Controller
{
    [HttpPost]
    public IActionResult CheckRemote(string id)
    {
        return Ok(id == "42");
    }

    [HttpPost]
    public IActionResult CheckboxRemote(bool isCheckedRemote)
    {
        return Ok(isCheckedRemote);
    }

    [HttpGet]
    public IActionResult Test()
    {
        return Content("Here");
    }
}
