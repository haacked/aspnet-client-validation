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
    public IActionResult CheckboxRemote(bool isChecked, bool isCheckedToo)
    {
        return Ok(isChecked == isCheckedToo);
    }

    [HttpGet]
    public IActionResult Test()
    {
        return Content("Here");
    }
}
