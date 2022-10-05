// Variable donde se almacena el modelo 3D
let modelo3DActual;
let alpha = 0;
let beta;
let gamma = 0;
let velocidadRotacion = 0.5;
let textGamma = document.getElementById("textGama");

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
	// Establece el color de fondo
	background(200);

	// Rota la figura en el eje Y
	if (gamma > 0) {
		rotateY(velocidadRotacion + 2 * gamma);
	} else {
		console.log("Velocidad decreciente", velocidadRotacion - velocidadRotacion * gamma);
		rotateY(velocidadRotacion - velocidadRotacion * gamma);
	}
	velocidadRotacion += 0.1;
	normalMaterial();
	// Escala el modelo 3D
	scale(beta * 0.04);
	// Rota el modelo 180 grados
	rotateX(3.1416);
	// Presenta el modelo
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

	textGamma.innerText = gamma;
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
