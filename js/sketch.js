// Variable donde se almacena el modelo 3D
let model3D;
let alpha = 0;
let beta;
let gamma = 0;
let zoom = 2;
let velocidadRotacion = 1;
let textGamma;

// FUNCIÓN DE PRECARGA
function preload() {
	// Carga el modelo 3D, normalizado
	model3D = loadModel("./sources/Jaume.obj", true);
}
// FUNCIÓN DE CONFIGURACIÓN
function setup() {
	// Cree un canvas con soporte para 3D de 500px x 500px
	createCanvas(500, 500, WEBGL);
	// Determina que se van a utilizas los grados como unidad de medición
	angleMode(RADIANS);
	frameRate(2);
	textGamma = document.getElementById("textGama");
}
// FUNCIÓN DE PINTADO
function draw() {
	// Establece el color de fondo
	background(200);
	// Rota la figura en el eje Y
	rotateY(frameCount + gamma);
	// Establece un material por defecto para el modelo
	normalMaterial();
	// Escala el modelo 3D
	scale(zoom);
	// Rota el modelo 180 grados
	rotateX(3.1416);
	// Presenta el modelo
	model(model3D);
}

//* ------------ EXTERNO A P5 -----------------------
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
	textGamma.innerText = gamma;
};

window.addEventListener("deviceorientation", handleOrientation, true);
