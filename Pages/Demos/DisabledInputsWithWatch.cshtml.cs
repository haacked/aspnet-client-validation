using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DemoWeb.Pages.Demos;

public class DisabledInputsWithWatchPageModel : PageModel
{
    [TempData]
    public string? StatusMessage { get; set; }

    [BindProperty]
    [Required]
    public string? Value1 { get; set; }

    [BindProperty]
    [Required]
    public string? Value2 { get; set; }

    public bool IsChecked { get; set; }

    [Remote("CheckboxRemote", "Validations", HttpMethod = "Post",
        ErrorMessage = "Must match other checkbox.",
        AdditionalFields = $"{nameof(IsChecked)}"
    )]
    public bool IsCheckedToo { get; set; }

    public IActionResult OnPost()
    {
        StatusMessage = "Form was submitted to server. Any validation errors that may be present are due to server side validation, not client.";

        return RedirectToPage();
    }
}