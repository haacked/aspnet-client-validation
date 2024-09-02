using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DemoWeb.Pages.Demos;

public class SubmitButtonDownload : PageModel
{
    [BindProperty]
    [Required]
    public string? SubmitButtonValue { get; set; }

    [BindProperty]
    [Required]
    public string? SomeRequiredValue { get; set; }

    public IActionResult OnPost()
    {
        return File([0], "application/octet-stream", $"DEMO-{SubmitButtonValue}.txt");
    }
}