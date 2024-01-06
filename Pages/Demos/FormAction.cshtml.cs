using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;

namespace DemoWeb.Pages.Demos;

public class FormAction : PageModel
{
    [TempData]
    public string? StatusMessage { get; set; }

    [BindProperty]
    public InputModel Input { get; set; } = new();

    public class InputModel
    {
        [Display(Name = "Name")]
        [Required, StringLength(50)]
        public string? Name { get; set; }
    }

    public IActionResult OnPostSubmitAsync()
    {
        StatusMessage = "Submit button clicked";

        return RedirectToPage();
    }

    public IActionResult OnPostSave()
    {
        StatusMessage = "Save button clicked";

        return RedirectToPage();
    }

    public IActionResult OnPost()
    {
        StatusMessage = "The button with no formaction was clicked";

        return RedirectToPage();
    }
}