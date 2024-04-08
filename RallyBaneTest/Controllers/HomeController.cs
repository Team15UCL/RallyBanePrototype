using Microsoft.AspNetCore.Mvc;
using RallyBaneTest.Models;
using System.Diagnostics;

namespace RallyBaneTest.Controllers;
public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        Exercise start = new()
        {
            Name = "Start",
            ImageString = "/Images/Start.png",
            Position = new() { X = 1100, Y = 10 }
        };
        Exercise mål = new()
        {
            Name = "Mål",
            ImageString = "/Images/Mål.png",
            Position = new() { X = 1100, Y = 70 }
        };
        Exercise exercise3 = new()
        {
            Name = "Øvelse3",
            ImageString = "/Images/Øvelse3.png",
            Position = new Position() { X = 1100, Y = 130 }
        };
        Exercise exercise4 = new()
        {
            Name = "Øvelse4",
            ImageString = "/Images/Øvelse4.png",
            Position = new Position() { X = 1100, Y = 190 }
        };
        Exercise exercise5 = new()
        {
            Name = "Øvelse5",
            ImageString = "/Images/Øvelse5.png",
            Position = new Position() { X = 1100, Y = 250 }
        };
        Exercise exercise6 = new()
        {
            Name = "Øvelse6",
            ImageString = "/Images/Øvelse6.png",
            Position = new Position() { X = 1100, Y = 310 }
        };
        Exercise exercise7 = new()
        {
            Name = "Øvelse7",
            ImageString = "/Images/Øvelse7.png",
            Position = new Position() { X = 1100, Y = 370 }
        };
        Exercise exercise8 = new()
        {
            Name = "Øvelse8",
            ImageString = "/Images/Øvelse8.png",
            Position = new Position() { X = 1100, Y = 430 }
        };

        List<Exercise> exercises =
        [
            start,
            mål,
            exercise3,
            exercise4,
            exercise5,
            exercise6,
            exercise7,
            exercise8
        ];

        return View(exercises);
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
