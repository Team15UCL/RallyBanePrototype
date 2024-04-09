axios.post("https://localhost:7213/nodes", {
	id: 3,
	url: "test",
	x: 100,
	y: 100
})
	.then(function (response) {
		console.log(response);
	})
	.catch(function (error) {
		console.log(error);
	});

axios.get("https://localhost:7213/nodes").then(function (response) {
	console.log(response);
});

var imageData = document.getElementById("baneURL").value;
console.log(myVar);

var stage = new Konva.Stage({
	container: "bane",
	width: 1295,
	height: 600,
});

window.addEventListener("keydown", function (e) {
	if (e.key === "Delete") {
		if (selectedNode.getLayer().getName() === "trackLayer") {
			selectedNode.destroy();
			tr.nodes([]);
			trImage.nodes([]);
		}
	}
});

var backgroundLayer = new Konva.Layer({
	name: "backgroundLayer",
});
var exerciseLayer = new Konva.Layer();
var trackLayer = new Konva.Layer({
	name: "trackLayer",
});
stage.add(backgroundLayer);
stage.add(exerciseLayer);
stage.add(trackLayer);

Konva.Image.fromURL("/Images/Bane.png", (background) => {
	background.setAttrs({
		x: 1,
		y: 50,
		opacity: 0.3,
		id: "background",
		width: stage.width() - 200,
		height: stage.height() - 100,
		stroke: "black",
		strokeWidth: 5,
	});
	backgroundLayer.add(background);
});

var arrow = new Konva.Arrow({
	fill: "black",
	x: 1250,
	y: 20,
	points: [0, 100, 0, 0],
	pointerLength: 12,
	pointerWidth: 12,
	stroke: "black",
	strokeWidth: 4,
	draggable: true,
	fillAfterStrokeEnabled: true,
	hitStrokeWidth: 20,
});
exerciseLayer.add(arrow);

arrow.on("mouseover", () => {
	arrow.fill("white");
	document.body.style.cursor = "pointer";
});
arrow.on("mouseout", () => {
	arrow.fill("black");
	document.body.style.cursor = "default";
});

arrow.on("dragstart", function () {
	arrow.stopDrag();

	var clone = arrow.clone({
		x: arrow.getAttr("x"),
		y: arrow.getAttr("y"),
		opacity: 0.2,
	});

	clone.off("dragstart mouseover mouseout");
	clone.on("mouseover", () => {
		clone.fill("white");
		document.body.style.cursor = "pointer";
	});
	clone.on("mouseout", () => {
		clone.fill("black");
		document.body.style.cursor = "default";
	});
	clone.on("dragend", () => {
		clone.opacity(1);
	});

	trackLayer.add(clone);
	clone.startDrag();
});

var tr = new Konva.Transformer({
	rotationSnaps: [0, 90, 180, 270, 45, 135, 225, 315],
	rotationSnapTolerance: 22.5,
	enabledAnchors: ["bottom-center", "top-center"],
});
exerciseLayer.add(tr);
tr.nodes([]);

stage.on("click tap", function (e) {
	if (e.target.className != "Arrow") {
		tr.nodes([]);
		return;
	}

	if (
		e.target.className === "Arrow" &&
		e.target.getLayer().getName() === "trackLayer"
	) {
		tr.nodes([e.target]);
		return;
	}
});

var trImage = new Konva.Transformer({
	rotationSnaps: [0, 90, 180, 270],
	rotationSnapTolerance: 45,
});
exerciseLayer.add(trImage);
tr.nodes([]);

stage.on("click tap", function (e) {
	selectedNode = e.target;
	if (
		e.target.className != "Image" ||
		e.target.getLayer().getName() === "backgroundLayer"
	) {
		trImage.nodes([]);
		return;
	}

	if (
		e.target.className === "Image" &&
		e.target.getLayer().getName() === "trackLayer"
	) {
		trImage.nodes([e.target]);
		return;
	}
});

let selectedNode;
function DeleteNode() {
	if (selectedNode != undefined && selectedNode.getLayer().getName() === "trackLayer") {
		selectedNode.destroy();
		tr.nodes([]);
		trImage.nodes([]);
	}
	console.log(trackLayer.getChildren());
}

myVar.forEach((element) => {
	Konva.Image.fromURL(element.imageString, (exercise) => {
		exercise.setAttrs({
			x: element.position.x,
			y: element.position.y,
			id: element.imageString,
			name: element.name,
			width: 100,
			height: 50,
			draggable: true,
			stroke: "black",
			strokeEnabled: false,
		});
		exerciseLayer.add(exercise);

		exercise.on("mouseover", () => {
			exercise.strokeEnabled(true);
			document.body.style.cursor = "pointer";
		});

		exercise.on("mouseout", () => {
			exercise.strokeEnabled(false);
			document.body.style.cursor = "default";
		});

		exercise.on("dragstart", function () {
			exercise.stopDrag();

			var clone = exercise.clone({
				x: exercise.getAttr("x"),
				y: exercise.getAttr("y"),
				opacity: 0.2,
			});

			clone.off("dragstart mouseover mouseout");

			clone.on("mouseover", () => {
				clone.strokeEnabled(true);
				document.body.style.cursor = "pointer";
			});

			clone.on("mouseout", () => {
				clone.strokeEnabled(false);
				document.body.style.cursor = "default";
			});

			clone.on("dragend", () => {
				clone.opacity(1);
			});

			trackLayer.add(clone);
			clone.startDrag();
		});
	});
});

var test = stage.toJSON();
console.log(test);
