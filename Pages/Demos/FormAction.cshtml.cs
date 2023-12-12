using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DemoWeb.Pages.Demos;

public class FormAction : PageModel
{
    [TempData]
    public string? StatusMessage { get; set; }


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
}