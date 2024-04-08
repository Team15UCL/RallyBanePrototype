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
        Exercise m�l = new()
        {
            Name = "M�l",
            ImageString = "/Images/M�l.png",
            Position = new() { X = 1100, Y = 70 }
        };
        Exercise exercise3 = new()
        {
            Name = "�velse3",
            ImageString = "/Images/�velse3.png",
            Position = new Position() { X = 1100, Y = 130 }
        };
        Exercise exercise4 = new()
        {
            Name = "�velse4",
            ImageString = "/Images/�velse4.png",
            Position = new Position() { X = 1100, Y = 190 }
        };
        Exercise exercise5 = new()
        {
            Name = "�velse5",
            ImageString = "/Images/�velse5.png",
            Position = new Position() { X = 1100, Y = 250 }
        };
        Exercise exercise6 = new()
        {
            Name = "�velse6",
            ImageString = "/Images/�velse6.png",
            Position = new Position() { X = 1100, Y = 310 }
        };
        Exercise exercise7 = new()
        {
            Name = "�velse7",
            ImageString = "/Images/�velse7.png",
            Position = new Position() { X = 1100, Y = 370 }
        };
        Exercise exercise8 = new()
        {
            Name = "�velse8",
            ImageString = "/Images/�velse8.png",
            Position = new Position() { X = 1100, Y = 430 }
        };

        List<Exercise> exercises =
        [
            start,
            m�l,
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
