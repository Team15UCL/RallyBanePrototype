//#region drag&drop DOM objects
var itemUrl = "";
document.getElementById("exercises").addEventListener("dragstart", (e) => {
	itemUrl = e.target.src;
});

let items = document.querySelectorAll(".exercise");
items.forEach(function (item) {
	item.addEventListener("dragstart", () => {
		item.style.opacity = "0.4";
	});
	item.addEventListener("dragend", () => {
		item.style.opacity = "1";
	});
});

document.getElementById("bane").addEventListener("ondragenter", () => {
	window.style.cursor = "no-drop";
});

document.getElementById("bane").addEventListener("ondragleave", () => {
	window.style.cursor = "default";
});
//#endregion

let stageSize = { x: 1260, y: 820 };
const GUIDELINE_OFFSET = 5;
var arrowCounter = 1;
let track = [];
var labelcounter = 0;

var stage = new Konva.Stage({
	container: "bane",
	width: stageSize.x,
	height: stageSize.y,
});

var backgroundLayer = new Konva.Layer({
	name: "backgroundLayer",
});
var trackLayer = new Konva.Layer({
	name: "trackLayer",
});
var transformLayer = new Konva.Layer();
var tooltipLayer = new Konva.Layer({
	name: "tooltipLayer",
});
stage.add(backgroundLayer);
stage.add(trackLayer);
stage.add(tooltipLayer);
stage.add(transformLayer);

// Function for loading track from db
async function fetchTrack() {
	trackLayer.destroyChildren();
	var name = document.getElementById("getName").value;
	document.getElementById("getName").value = "";
	console.log(name);
	var response = await axios.get(`https://localhost:7213/tracks?name=${name}`);
	track = response.data.nodes;

	track.forEach((item) => {
		switch (item.className) {
			case "Image":
				console.log(item);
				Konva.Image.fromURL(item.url, (image) => {
					image.setAttrs({
						id: item.url,
						width: 90,
						height: 55,
						draggable: true,
						offsetX: 45,
						offsetY: 27.5,
						name: "object",
						stroke: "orange",
						strokeWidth: 4,
						x: item.x,
						y: item.y,
						rotation: item.rotation,
					});
					trackLayer.add(image);
					image.on("mouseenter", () => {
						stage.container().style.cursor = "pointer";
					});

					image.on("mouseleave", () => {
						stage.container().style.cursor = "default";
					});
				});
				break;

			case "Arrow":
				var arrow = new Konva.Arrow({
					fill: "black",
					points: [0, 200, 0, 0],
					pointerLength: 12,
					pointerWidth: 8,
					stroke: "black",
					strokeWidth: 3,
					draggable: true,
					fillAfterStrokeEnabled: true,
					hitStrokeWidth: 20,
					id: "arrow" + arrowCounter,
					x: item.x,
					y: item.y,
					rotation: item.rotation,
				});
				trackLayer.add(arrow);
				arrow.on("mouseover", () => {
					arrow.fill("white");
					document.body.style.cursor = "pointer";
				});
				arrow.on("mouseout", () => {
					arrow.fill("black");
					document.body.style.cursor = "default";
				});

				arrow.on("transform", () => {
					arrow.pointerLength(12 / arrow.scaleY());
				});

				arrowCounter++;
			default:
				break;
		}
	});
}

//#region Create new image when dropping DOM objects on stage
var con = stage.container();
con.addEventListener("dragover", (e) => {
	e.preventDefault();
});

con.addEventListener("drop", (e) => {
	e.preventDefault();
	stage.setPointersPositions(e);
	// var group = new Konva.Group({
	// 	draggable: true,
	// });

	Konva.Image.fromURL(itemUrl, (image) => {
		image.setAttrs({
			id: itemUrl,
			width: 90,
			height: 55,
			offsetX: 45,
			offsetY: 27.5,
			name: "object",
			stroke: "orange",
			strokeWidth: 4,
			draggable: true,
		});

		// group.add(image);
		image.position(stage.getPointerPosition());
		trImage.nodes([image]);

		image.on("mouseenter", () => {
			stage.container().style.cursor = "pointer";
			document.getElementById(image._id.toString()).style.borderColor = "black";
		});

		image.on("mouseleave", () => {
			stage.container().style.cursor = "default";
			document.getElementById(image._id.toString()).style.borderColor = "white";
		});

		image.on("dragmove", () => {
			var label = stage.findOne("#" + image._id).getParent();
			label.position({ x: image.x(), y: image.y() });
		});

		image.on("transform", () => {
			var label = stage.findOne("#" + image._id).getParent();
			label.rotation(image.rotation());
		});

		routeCount(image);

		if (!itemUrl.includes("Start") && !itemUrl.includes("M%C3%A5l")) {
			// labeltest
			var simpleLabel = new Konva.Label({
				draggable: true,
				x: image.getAttr("x"),
				y: image.getAttr("y"),
				offset: { x: 50, y: 50 },
			});
			simpleLabel.add(
				new Konva.Tag({
					fill: "yellow",
					stroke: "black",
					shadowColor: "black",
					shadowBlur: 10,
					shadowOffset: [10, 10],
					shadowOpacity: 0.2,
					lineJoin: "round",
					cornerRadius: 5,
				})
			);
			simpleLabel.add(
				new Konva.Text({
					text: exerciseRoute.length,
					fontFamily: "Calibri",
					fontSize: 18,
					fontStyle: "bold",
					padding: 5,
					fill: "black",
					id: image._id.toString(),
				})
			);
			tooltipLayer.add(simpleLabel);
			console.log(simpleLabel);
		}

		trackLayer.add(image);
	});
});
//#endregion

window.addEventListener("keydown", function (e) {
	if (e.key === "Delete") {
		if (selectedNode.getLayer().getName() === "trackLayer") {
			selectedNode.destroy();
			tr.nodes([]);
			trImage.nodes([]);
		}
	}
});

Konva.Image.fromURL("/Images/Bane.png", (background) => {
	background.setAttrs({
		opacity: 0.3,
		id: "background",
		width: stage.width(),
		height: stage.height(),
	});
	backgroundLayer.add(background);
});

stage.on("dblclick", () => {
	var arrow = new Konva.Arrow({
		fill: "black",
		points: [0, 200, 0, 0],
		pointerLength: 12,
		pointerWidth: 8,
		stroke: "black",
		strokeWidth: 3,
		draggable: true,
		fillAfterStrokeEnabled: true,
		hitStrokeWidth: 20,
		id: "arrow" + arrowCounter,
	});
	arrow.position(stage.getPointerPosition());
	tr.nodes([arrow]);
	trackLayer.add(arrow);

	arrow.on("mouseover", () => {
		arrow.fill("white");
		document.body.style.cursor = "pointer";
	});
	arrow.on("mouseout", () => {
		arrow.fill("black");
		document.body.style.cursor = "default";
	});

	arrow.on("transform", () => {
		arrow.pointerLength(12 / arrow.scaleY());
	});

	arrowCounter++;
});

var tr = new Konva.Transformer({
	rotationSnaps: [0, 90, 180, 270, 45, 135, 225, 315],
	rotationSnapTolerance: 22.5,
	enabledAnchors: ["bottom-center"],
	centeredScaling: true,
});
transformLayer.add(tr);
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
	enabledAnchors: [],
});
transformLayer.add(trImage);
trImage.nodes([]);

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

//#region objectMenu
let currentShape;
var menuNode = document.getElementById("menu");

document.getElementById("delete-button").addEventListener("click", () => {
	if (currentShape.className === "Text") {
		currentShape.getParent().destroy();
		return;
	}

	if (
		currentShape.className != "Arrow" &&
		currentShape.id().includes("Start") === false &&
		currentShape.id().includes("M%C3%A5l") === false
	) {
		var index = exerciseRoute.findIndex(
			(item) => item.id() === currentShape.id()
		);
		var deleted = exerciseRoute.splice(index, 1);
		var route = document.getElementById("route");
		route.removeChild(document.getElementById(deleted[0]._id));
		reRenderList();
	}
	currentShape.destroy();
	tr.nodes([]);
	trImage.nodes([]);
	if (currentShape.className === "Image") {
		stage
			.findOne("#" + currentShape._id)
			.getParent()
			.destroy();
		updateNumbers();
	}
});

document.getElementById("info-button").addEventListener("click", () => {
	tooltipLayer.findOne("#tooltipText").text("Beskrivelse af øvelsen her");
	const { x, y } = currentShape.position();
	tooltip.position({ x, y: y - 40 });
	trImage.nodes([]);
	tooltip.show();
});
stage.on("click", () => {
	tooltip.hide();
});

document.getElementById("down-button").addEventListener("click", () => {
	var index = exerciseRoute.findIndex((item) => item._id === currentShape._id);
	var moved = exerciseRoute.splice(index, 1);
	exerciseRoute.splice(index + 1, 0, moved[0]);

	var route = document.getElementById("route");
	while (route.firstChild) {
		route.removeChild(route.firstChild);
	}
	exerciseRoute.forEach((item) => {
		var div = document.createElement("div");
		div.className = "countContainer";
		div.id = item._id;

		var count = document.createElement("p");
		count.id = "count";
		count.textContent =
			1 + exerciseRoute.findIndex((count) => count._id === item._id);
		div.appendChild(count);

		var image = document.createElement("img");
		image.src = item.id();
		image.width = 75;
		image.height = 52.5;
		image.style.marginTop = "10px";
		image.draggable = false;
		div.appendChild(image);

		route.appendChild(div);
	});

	updateNumbers();
});

document.getElementById("up-button").addEventListener("click", () => {
	if (exerciseRoute.findIndex((item) => item._id === currentShape._id) != 0) {
		var index = exerciseRoute.findIndex(
			(item) => item._id === currentShape._id
		);
		var moved = exerciseRoute.splice(index, 1);
		exerciseRoute.splice(index - 1, 0, moved[0]);

		var route = document.getElementById("route");
		while (route.firstChild) {
			route.removeChild(route.firstChild);
		}
		exerciseRoute.forEach((item) => {
			var div = document.createElement("div");
			div.className = "countContainer";
			div.id = item._id;

			var count = document.createElement("p");
			count.id = "count";
			count.textContent =
				1 + exerciseRoute.findIndex((count) => count._id === item._id);
			div.appendChild(count);

			var image = document.createElement("img");
			image.src = item.id();
			image.width = 75;
			image.height = 52.5;
			image.style.marginTop = "10px";
			image.draggable = false;
			div.appendChild(image);

			route.appendChild(div);
		});
	}

	updateNumbers();
});

window.addEventListener("click", () => {
	// hide menu
	menuNode.style.display = "none";
});

stage.on("contextmenu", function (e) {
	// prevent default behavior
	e.evt.preventDefault();
	if (e.target === stage || e.target.attrs.id === "background") {
		// if we are on empty place of the stage we will do nothing
		return;
	}
	currentShape = e.target;
	// show menu
	menuNode.style.display = "initial";
	var containerRect = stage.container().getBoundingClientRect();
	menuNode.style.top =
		containerRect.top + stage.getPointerPosition().y + 4 + "px";
	menuNode.style.left =
		containerRect.left + stage.getPointerPosition().x + 4 + "px";
});
//#endregion

//#region objectSnapping
function getLineGuideStops(skipShape) {
	var vertical = [];
	var horizontal = [];

	stage.find(".object").forEach((guideItem) => {
		if (guideItem === skipShape) {
			return;
		}

		var box = guideItem.getClientRect();

		vertical.push([box.x, box.x + box.width, box.x + box.width / 2]);
		horizontal.push([box.y, box.y + box.height, box.y + box.height / 2]);
	});

	return {
		vertical: vertical.flat(),
		horizontal: horizontal.flat(),
	};
}

function getObjectSnappingEdges(node) {
	var box = node.getClientRect();
	var absPos = node.absolutePosition();

	return {
		vertical: [
			{
				guide: Math.round(box.x),
				offset: Math.round(absPos.x - box.x),
				snap: "start",
			},
			{
				guide: Math.round(box.x + box.width / 2),
				offset: Math.round(absPos.x - box.x - box.width / 2),
				snap: "center",
			},
			{
				guide: Math.round(box.x + box.width),
				offset: Math.round(absPos.x - box.x - box.width),
				snap: "end",
			},
		],
		horizontal: [
			{
				guide: Math.round(box.y),
				offset: Math.round(absPos.y - box.y),
				snap: "start",
			},
			{
				guide: Math.round(box.y + box.height / 2),
				offset: Math.round(absPos.y - box.y - box.height / 2),
				snap: "center",
			},
			{
				guide: Math.round(box.y + box.height),
				offset: Math.round(absPos.y - box.y - box.height),
				snap: "end",
			},
		],
	};
}

function getGuides(lineGuideStops, itemBounds) {
	var resultV = [];
	var resultH = [];

	lineGuideStops.vertical.forEach((lineGuide) => {
		itemBounds.vertical.forEach((itemBound) => {
			var diff = Math.abs(lineGuide - itemBound.guide);
			if (diff < GUIDELINE_OFFSET) {
				resultV.push({
					lineGuide: lineGuide,
					diff: diff,
					snap: itemBound.snap,
					offset: itemBound.offset,
				});
			}
		});
	});

	lineGuideStops.horizontal.forEach((lineGuide) => {
		itemBounds.horizontal.forEach((itemBound) => {
			var diff = Math.abs(lineGuide - itemBound.guide);
			if (diff < GUIDELINE_OFFSET) {
				resultH.push({
					lineGuide: lineGuide,
					diff: diff,
					snap: itemBound.snap,
					offset: itemBound.offset,
				});
			}
		});
	});

	var guides = [];

	var minV = resultV.sort((a, b) => a.diff - b.diff)[0];
	var minH = resultH.sort((a, b) => a.diff - b.diff)[0];
	if (minV) {
		guides.push({
			lineGuide: minV.lineGuide,
			offset: minV.offset,
			orientation: "V",
			snap: minV.snap,
		});
	}
	if (minH) {
		guides.push({
			lineGuide: minH.lineGuide,
			offset: minH.offset,
			orientation: "H",
			snap: minH.snap,
		});
	}
	return guides;
}

function drawGuides(guides) {
	guides.forEach((lg) => {
		if (lg.orientation === "H") {
			var line = new Konva.Line({
				points: [-6000, 0, 6000, 0],
				stroke: "rgb(0, 161, 255)",
				strokeWidth: 1,
				name: "guid-line",
				dash: [4, 6],
			});
			trackLayer.add(line);
			line.absolutePosition({
				x: 0,
				y: lg.lineGuide,
			});
		} else if (lg.orientation === "V") {
			var line = new Konva.Line({
				points: [0, -6000, 0, 6000],
				stroke: "rgb(0, 161, 255)",
				strokeWidth: 1,
				name: "guid-line",
				dash: [4, 6],
			});
			trackLayer.add(line);
			line.absolutePosition({
				x: lg.lineGuide,
				y: 0,
			});
		}
	});
}

trackLayer.on("dragmove", function (e) {
	// clear all previous lines on the screen
	trackLayer.find(".guid-line").forEach((l) => l.destroy());

	// find possible snapping lines
	var lineGuideStops = getLineGuideStops(e.target);
	// find snapping points of current object
	var itemBounds = getObjectSnappingEdges(e.target);

	// now find where can we snap current object
	var guides = getGuides(lineGuideStops, itemBounds);

	// do nothing of no snapping
	if (!guides.length) {
		return;
	}

	drawGuides(guides);

	var absPos = e.target.absolutePosition();
	// now force object position
	guides.forEach((lg) => {
		switch (lg.snap) {
			case "start": {
				switch (lg.orientation) {
					case "V": {
						absPos.x = lg.lineGuide + lg.offset;
						break;
					}
					case "H": {
						absPos.y = lg.lineGuide + lg.offset;
						break;
					}
				}
				break;
			}
			case "center": {
				switch (lg.orientation) {
					case "V": {
						absPos.x = lg.lineGuide + lg.offset;
						break;
					}
					case "H": {
						absPos.y = lg.lineGuide + lg.offset;
						break;
					}
				}
				break;
			}
			case "end": {
				switch (lg.orientation) {
					case "V": {
						absPos.x = lg.lineGuide + lg.offset;
						break;
					}
					case "H": {
						absPos.y = lg.lineGuide + lg.offset;
						break;
					}
				}
				break;
			}
		}
	});
	e.target.absolutePosition(absPos);
});

trackLayer.on("dragend", function (e) {
	// clear all previous lines on the screen
	trackLayer.find(".guid-line").forEach((l) => l.destroy());
});
//#endregion

function saveTrack() {
	var name = document.getElementById("postName").value;
	document.getElementById("postName").value = "";
	track = [];
	var children = trackLayer.getChildren();
	children.forEach((child) => {
		var id = child.getAttr("id");
		var x = child.getAttr("x");
		var y = child.getAttr("y");
		var rotation = child.rotation();
		var classname = child.className;
		track.push({ url: id, x, y, rotation, classname });
	});
	var string = JSON.stringify(track);
	const trackData = { nodes: track, name };
	console.dir(trackData);
	axios
		.post("https://localhost:7213/tracks", trackData)
		.then(function (response) {
			console.dir(response.data);
		})
		.catch(function (error) {
			console.log(error);
		});
}

var tooltip = new Konva.Label();
tooltip.add(
	new Konva.Tag({
		fill: "black",
		pointerDirection: "down",
		pointerWidth: 10,
		pointerHeight: 10,
		lineJoin: "round",
		shadowColor: "black",
		shadowBlur: 10,
		shadowOffsetX: 10,
		shadowOffsetY: 10,
		shadowOpacity: 0.5,
	})
);
tooltip.add(
	new Konva.Text({
		text: "Beskrivelse af øvelsen",
		fontFamily: "Calibri",
		fontSize: 15,
		padding: 5,
		fill: "white",
		id: "tooltipText",
	})
);
tooltipLayer.add(tooltip);
tooltip.hide();

var exerciseRoute = [];
function routeCount(exercise) {
	if (exercise.id().includes("Start") || exercise.id().includes("M%C3%A5l")) {
		return;
	}
	var route = document.getElementById("route");
	while (route.firstChild) {
		route.removeChild(route.firstChild);
	}
	exerciseRoute.push(exercise);
	exerciseRoute.forEach((item) => {
		var div = document.createElement("div");
		div.className = "countContainer";
		div.id = item._id;

		var count = document.createElement("p");
		count.id = "count";
		count.textContent =
			1 + exerciseRoute.findIndex((count) => count._id === item._id);
		div.appendChild(count);

		var image = document.createElement("img");
		image.src = item.id();
		image.width = 75;
		image.height = 52.5;
		image.style.marginTop = "10px";
		image.style.marginLeft = "5px";
		image.style.border = "3px solid orange";
		image.draggable = false;
		div.appendChild(image);

		route.appendChild(div);
	});

	console.log(exerciseRoute);
}

function reRenderList() {
	var count = document.querySelectorAll("#count");
	var counter = 1;
	count.forEach((node) => {
		node.innerHTML = counter;
		counter++;
	});
}

function updateNumbers() {
	exerciseRoute.forEach((item) => {
		var text = stage.findOne("#" + item._id);
		text.text(1 + exerciseRoute.findIndex((index) => index._id === item._id));
	});
}
