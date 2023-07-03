using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DemoWeb.Pages.Demos;

public class SubmitButton : PageModel
{
    [BindProperty]
    [Required]
    public string? SubmitButtonValue { get; set; }

    public void OnPost()
    {
        SubmitButtonValue ??= "Form submitted, but button value not submitted";
    }
}