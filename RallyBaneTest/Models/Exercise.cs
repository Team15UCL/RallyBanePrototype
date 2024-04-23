using MongoDB.Bson;

namespace RallyBaneTest.Models;

public class Exercise
{
	public ObjectId Id { get; set; }

	public string Url { get; set; }

	public int Number => int.Parse(Url[..(Url.IndexOf('.'))][14..]);
}
