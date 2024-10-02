using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace DemoWeb.Pages.Demos;

public class SelectInput : PageModel
{
    [BindProperty]
    [Required]
    public string? Animal { get; set; }

    [BindProperty]
    [Required]
    public string? AnotherRequiredField { get; set; }

    public IReadOnlyList<SelectListItem> Animals => new List<SelectListItem>
    {
        new("None", ""),
        new("Dog", "Dog"),
        new("Cat", "Cat"),
        new("Fish", "Fish"),
    };
}