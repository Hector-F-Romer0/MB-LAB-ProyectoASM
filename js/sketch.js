// Variable donde se almacena el modelo 3D
let model3D;
let alpha = 0;
let beta;
let gamma = 0;
let velocidadRotacion = 0;
let textGamma = document.getElementById("textGama");

// FUNCIÓN DE PRECARGA
function preload() {
	// Carga el modelo 3D, normalizado
	model3D = loadModel("./sources/Jaume.obj", true);
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

	rotateY(velocidadRotacion + gamma * velocidadRotacion);
	console.log(`Valor: ${velocidadRotacion + gamma * 2} - Añadadido: ${gamma * velocidadRotacion}`);
	// Establece un material por defecto para el modelo
	normalMaterial();
	// Escala el modelo 3D
	scale(beta * 0.04);
	// Rota el modelo 180 grados
	rotateX(3.1416);
	// Presenta el modelo
	model(model3D);
	velocidadRotacion += 0.3;
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

window.addEventListener("deviceorientation", handleOrientation, true);
