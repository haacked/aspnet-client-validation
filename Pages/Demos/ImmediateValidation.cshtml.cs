using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;

namespace DemoWeb.Pages.Demos;

public class ImmediateValidation : PageModel
{
    [BindProperty]
    [Required]
    [EmailAddress]
    public string? EmailAddress { get; set; }

    [BindProperty]
    [Required]
    [EmailAddress]
    public string? AnotherEmailAddress { get; set; }
}