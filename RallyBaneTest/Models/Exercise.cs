using MongoDB.Bson;

namespace RallyBaneTest.Models;

public class Exercise
{
	public ObjectId Id { get; set; }

	public string Url { get; set; }
}
