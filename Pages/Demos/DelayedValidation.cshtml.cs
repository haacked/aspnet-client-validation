using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace DemoWeb.Pages.Demos;

public class DelayedValidation : PageModel
{
    [BindProperty]
    [Required]
    [EmailAddress]
    public string? EmailAddress { get; set; }
}