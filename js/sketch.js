// Variable donde se almacena el modelo 3D
let modelo3DActual;
let primerModelo3D;
let segundoModelo3D;
let alpha = 0;
let beta;
let gamma = 0;
let velocidadRotacion = 0.5;
let textGamma = document.getElementById("textGama");
let texturaPrimerModelado;

// FUNCIÓN DE PRECARGA
function preload() {
	// Carga el modelo 3D, normalizado
	primerModelo3D = loadModel("./sources/models/Primer modelado.obj", true);
	segundoModelo3D = loadModel("./sources/models/SegundoModelado.obj", true);
	texturaPrimerModelado = loadImage("./sources/models/Primero/untitled_tongue_albedo.png");
	modelo3DActual = primerModelo3D;
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
	if (gamma === 0) {
		rotateY(velocidadRotacion);
	} else if (gamma > 0) {
		rotateY(velocidadRotacion + gamma);
	} else {
		console.log("Velocidad decreciente", velocidadRotacion * gamma);
		rotateY(velocidadRotacion + gamma / 2);
	}
	velocidadRotacion += 0.1;
	texture(texturaPrimerModelado);
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
			modelo3DActual = primerModelo3D;
			break;
		case 2:
			modelo3DActual = segundoModelo3D;
			break;
		case 3:
			break;
		default:
			break;
	}
};

window.addEventListener("deviceorientation", handleOrientation, true);
