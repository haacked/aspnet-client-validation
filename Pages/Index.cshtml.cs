using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DemoWeb.Pages;

public class IndexModel : PageModel
{
    [TempData]
    public string? StatusMessage { get; set; }

    [BindProperty]
    [Required]
    [Remote("CheckRemote", "Validations", HttpMethod = "Post")]
    public string? Id { get; set; }

    [BindProperty]
    [Required]
    public string? Control { get; set; }

    public IActionResult OnPost()
    {
        if (!ModelState.IsValid)
        {
            StatusMessage = "It failed";
            return Page();
        }

        StatusMessage = "Form submission successful";
        return Page();
    }
}
