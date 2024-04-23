using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
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
		var client = new MongoClient("mongodb+srv://askelysgaard:1234@cluster0.avn6de9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
		var db = client.GetDatabase("RallyBane").GetCollection<Exercise>("Exercises");

		var filter = Builders<Exercise>.Filter.Empty;
		var nodes = db.Find(filter).ToList().OrderBy(x => x.Number).ToList();
		return View(nodes);
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
