// Variable donde se almacena el modelo 3D
let modelo3DActual;
let alpha = 0;
let beta;
let gamma = 0;
let velocidadRotacion = 0.05;
let factorDeRelentizacion = 0;

// FUNCIÓN DE PRECARGA
function preload() {
	modelo3DActual = loadModel("./sources/models/Primer Modelado.obj", true);
}
// FUNCIÓN DE CONFIGURACIÓN
function setup() {
	let contenedorCanvas = document.getElementById("canvasContainer");
	let canvas = createCanvas(windowWidth, windowHeight, WEBGL).parent(contenedorCanvas);
	// Determina que se van a utilizas los grados como unidad de medición
	angleMode(RADIANS);
	frameRate(2);
	scale(2);
	beta = 75;
}
// FUNCIÓN DE PINTADO
function draw() {
	background(200);
	console.log(`Velocidad actual: ${velocidadRotacion}`);
	if (gamma >= 0) {
		factorDeRelentizacion += gamma * 5 + 0.1;
		velocidadRotacion += factorDeRelentizacion;
	} else {
		factorDeRelentizacion -= 0.02;

		velocidadRotacion += factorDeRelentizacion;
	}
	rotateY(velocidadRotacion);
	normalMaterial();
	scale(beta * 0.04);
	rotateX(3.1416);
	model(modelo3DActual);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

//* ------------ EXTERNO A P5 -----------------------
const cambiarZoom = (factorEscalado) => {
	scale(factorEscalado);
};

const handleOrientation = (event) => {
	absolute = event.absolute;
	alpha = event.alpha;
	beta = event.beta;
	gamma = event.gamma;
	gamma = (gamma * Math.PI) / 180;
	redraw();
};

const cambiarModelado = (identificadorModelado) => {
	console.log(`Modelado N°: ${identificadorModelado}`);
	switch (identificadorModelado) {
		case 1:
			modelo3DActual = loadModel("./sources/models/Primer Modelado.obj", true);
			break;
		case 2:
			modelo3DActual = loadModel("./sources/models/Segundo Modelado.obj", true);
			break;
		case 3:
			modelo3DActual = loadModel("./sources/models/Tercer Modelado.obj", true);
			break;
		case 4:
			modelo3DActual = loadModel("./sources/models/Cuarto Modelado.obj", true);
			break;
		case 5:
			modelo3DActual = loadModel("./sources/models/Quinto Modelado.obj", true);
			break;
		default:
			modelo3DActual = loadModel("./sources/models/Primer Modelado.obj", true);
			break;
	}
};

window.addEventListener("deviceorientation", handleOrientation, true);
