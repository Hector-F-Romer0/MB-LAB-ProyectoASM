const textAlpha = document.getElementById("valorAlpha");
const textAbsolute = document.getElementById("valorAbsolute");

const handleOrientation = (event) => {
	let absolute = event.absolute;
	let alpha = event.alpha;
	let beta = event.beta;
	let gamma = event.gamma;

	document.getElementById("valorAlpha").innerHTML = alpha;
	document.getElementById("valorBeta").innerHTML = beta;
	document.getElementById("valorGamma").innerHTML = gamma;
	textAbsolute.textContent = absolute;
	console.log(
		`Valor de alpha: ${alpha}, valor de beta: ${beta}, valor de gamma ${gamma}, valor de absolute: ${absolute}`
	);
};

if (window.DeviceOrientationEvent) {
	window.addEventListener("deviceorientation", handleOrientation, false);
	document.getElementById("doeSupported").innerText = "Supported!";
}

window.addEventListener("deviceorientation", handleOrientation, true);
