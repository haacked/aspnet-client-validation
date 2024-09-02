using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DemoWeb.Pages.Demos;

public class RemovedInputs : PageModel
{
    [TempData]
    public string? StatusMessage { get; set; }

    [BindProperty]
    [Required]
    public string? Value1 { get; set; }

    [BindProperty]
    [Required]
    public string? Value2 { get; set; }

    public IActionResult OnPost()
    {
        StatusMessage = "Form was submitted";

        return RedirectToPage();
    }
}