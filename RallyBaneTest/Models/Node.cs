using MongoDB.Bson;

namespace RallyBaneTest.Models;

public class Node
{
	public ObjectId Id { get; set; }
	public string Url { get; set; }
	public int X { get; set; }
	public int Y { get; set; }
	public int Rotation { get; set; }
	public string ClassName { get; set; }
}
