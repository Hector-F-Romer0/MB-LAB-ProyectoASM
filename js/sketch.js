// Variable donde se almacena el modelo 3D
let modelo3DActual;
let primerModelo3D;
let segundoModelo3D;
let alpha = 0;
let beta;
let gamma = 0;
let velocidadRotacion = 0.1;
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
		velocidadRotacion += 0.1;
	} else if (gamma > 0) {
		rotateY(velocidadRotacion + gamma);
		velocidadRotacion += 0.1;
	} else {
		rotateY(velocidadRotacion - gamma * velocidadRotacion);
		velocidadRotacion -= 0.1;
	}
	console.log(`Valor: ${velocidadRotacion + gamma * 0.5} - Añadadido: ${gamma * velocidadRotacion}`);

	texture(texturaPrimerModelado);
	// Escala el modelo 3D
	scale(beta * 0.04);
	// Rota el modelo 180 grados
	rotateX(3.1416);
	// Presenta el modelo
	model(model3D);
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

	console.log(`Gamma en bruto: ${gamma}`);
	gamma = (gamma * Math.PI) / 180;
	redraw();
	// console.log(
	// 	`Valor de alpha: ${alpha}, valor de beta: ${beta}, valor de gamma ${gamma}, valor de absolute: ${absolute}`
	// );
	console.log(`Gamma en radianes: ${gamma}`);
	console.log(`Beta: ${beta}`);
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
