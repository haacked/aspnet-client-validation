using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DemoWeb.Pages.Demos;

public class Checkboxes : PageModel
{
    public string? StatusMessage { get; set; }

    public void OnGet()
    {
        Numbers.Add(new() { Name = "One" });
        Numbers.Add(new() { Name = "Two" });
        Numbers.Add(new() { Name = "Three" });
    }

    public IActionResult OnPost()
    {
        StatusMessage = "Form was submitted: " + (ModelState.IsValid
            ? "Model is valid"
            : "Model is invalid");

        return Page();
    }

    [BindProperty]
    public InputModel Input { get; set; } = new();

    [BindProperty]
    public InputModelRemote InputRemote { get; set; } = new();

    [BindProperty]
    [Required]
    public List<string> SelectedAnimals { get; set; } = new();

    public IReadOnlyList<string> Animals = new List<string> { "Dog", "Cat", "Fish" };

    [BindProperty]
    [Required]
    public string SelectedFruit { get; set; } = string.Empty;

    public IReadOnlyList<string> Fruits = new List<string> { "Apple", "Banana", "Strawberry" };

    public class InputModel
    {
        public bool IsChecked { get; set; }
    }

    public class InputModelRemote
    {
        [Remote("CheckboxRemote", "Validations", HttpMethod = "Post")]
        public bool IsCheckedRemote { get; set; }
    }

    [BindProperty]
    public List<Selectable> Numbers { get; } = new();

    public class Selectable
    {
        public required string Name { get; set; }

        public bool IsSelected { get; set; }
    }
}
