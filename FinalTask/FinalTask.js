function main() {
	//var volume = new KVS.SingleCubeData();
	//var volume = new KVS.CreateHydrogenData( 64, 64, 64 );
	var volume = new KVS.LobsterData();
	var screen = new KVS.THREEScreen();

	screen.init(volume, {
		width: window.innerWidth * 0.7,
		height: window.innerHeight,
		targetDom: document.getElementById('display'),
		enableAutoResize: false
	});

	var fov = 45;
	var aspect = width / height;
	var near = 1;
	var far = 1000;
	var width = window.innerWidth * 0.7;
	var height = window.innerHeight;
	var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(0, 0, 15);
	screen.scene.add(camera);
	var light = new THREE.PointLight();
	light.position.set(5, 5, 5);
	screen.scene.add(light);

	var color = new KVS.Vec3(0, 0, 0);
	var box = new KVS.BoundingBox();
	var shadeflag;//add
	shadeflag = 0;//add
	box.setColor(color);
	box.setWidth(2);

	var smin = volume.min_value;
	var smax = volume.max_value;
	var isovalue = 128;
	var reflection = 2;
	var r = 0.5;
	var g = 0.5;
	var b = 0.5;

	var surfaces = Isosurfaces(volume, isovalue, screen, reflection, r, g, b);
	screen.scene.add(surfaces);

	document.getElementById('label_iso').innerHTML = "Isovalue: " + Math.round(isovalue);
	document.getElementById('label_red').innerHTML = "Red" + Math.round(isovalue);
	document.getElementById('label_green').innerHTML = "Green: " + Math.round(isovalue);
	document.getElementById('label_blue').innerHTML = "Blue: " + Math.round(isovalue);

	document.getElementById('isovalue')
		.addEventListener('mousemove', function () {
			var value = +document.getElementById('isovalue').value;
			var isovalue = KVS.Mix(smin, smax, value);
			document.getElementById('label_iso').innerHTML = "Isovalue: " + Math.round(isovalue);
		});

	document.getElementById('redval')
		.addEventListener('mousemove', function () {
			var value = +document.getElementById('redval').value;
			var red = KVS.Mix(smin, smax, value);
			document.getElementById('label_red').innerHTML = "Red: " + Math.round(red);
		});

	document.getElementById('greenval')
		.addEventListener('mousemove', function () {
			var value = +document.getElementById('greenval').value;
			var green = KVS.Mix(smin, smax, value);
			document.getElementById('label_green').innerHTML = "Green: " + Math.round(green);
		});

	document.getElementById('blueval')
		.addEventListener('mousemove', function () {
			var value = +document.getElementById('blueval').value;
			var blue = KVS.Mix(smin, smax, value);
			document.getElementById('label_blue').innerHTML = "Blue: " + Math.round(blue);
		});

	document.getElementById('change-button')
		.addEventListener('click', function () {

			screen.scene.remove(surfaces);
			r = +document.getElementById('redval').value;
			g = +document.getElementById('greenval').value;
			b = +document.getElementById('blueval').value;
			isovalue = Math.round(KVS.Mix(smin, smax, +document.getElementById('isovalue').value));
			reflection = getReflection();
			surfaces = Isosurfaces(volume, isovalue, screen, reflection, r, g, b);
			screen.scene.add(surfaces);
		});

	document.addEventListener('mousemove', function () {
		screen.light.position.copy(screen.camera.position);
	});

	window.addEventListener('resize', function () {
		screen.resize([
			window.innerWidth * 0.7,
			window.innerHeight
		]);
	});

	//screen.draw();

	screen.loop();

	/* loop();

	function loop() {
		requestAnimationFrame(loop);
		surfaces.rotation.x += 0.01;
		surfaces.rotation.y += 0.01;
		renderer.render(screen.scene, camera);
	} */
}





function getReflection() {
	radio = document.getElementsByName('reflection')
	radio2 = document.getElementsByName('shading')
	/* console.log(radio);
	console.log(radio2); */

	var reflection, shading, mode;
	if (radio[0].checked) {
		reflection = 0;
	}
	if (radio[1].checked) {
		reflection = 1;
	}
	if (radio2[0].checked) {
		shading = 0;
	}
	if (radio2[1].checked) {
		shading = 1;
	}
	if (reflection == 0 && shading == 0) {
		mode = 0;
	}
	else if (reflection == 1 && shading == 0) {
		mode = 1;
	}
	else if (reflection == 0 && shading == 1) {
		mode = 2;
	}
	else if (reflection == 1 && shading == 1) {
		mode = 3;
	}
	/* if (radio[0].checked && radio2[0].chacked) {
		reflection = 0;
	}
	else if (radio[1].checked && radio2[0].chacked) {
		reflection = 1;
	}
	else if (radio[0].checked && radio2[1].chacked) {
		reflection = 2;
	}
	else if (radio[1].checked && radio2[1].chacked) {
		reflection = 3;
	} */
	return mode;
}
function changeIsovalue() {

}


