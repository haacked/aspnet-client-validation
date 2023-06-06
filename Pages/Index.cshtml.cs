using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DemoWeb.Pages;

public class IndexModel : PageModel
{
    [TempData]
    public string? StatusMessage { get; set; }

    [BindProperty]
    [Display(Name = "Id (42)")]
    [Required]
    [Remote("CheckRemote", "Validations", HttpMethod = "Post")]
    public string? Id { get; set; }

    [BindProperty]
    [Required]
    public string? Control { get; set; }

    [BindProperty]
    [Required]
    public string? Color { get; set; }

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

    [BindProperty]
    public InputModel Input { get; set; } = new();

    public class InputModel
    {
        [Required]
        public string? SomeRequiredField { get; set; }
    }
}
