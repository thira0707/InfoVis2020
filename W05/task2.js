function main() {
	var width = 500;
	var height = 500;

	var scene = new THREE.Scene();

	var fov = 45;
	var aspect = width / height;
	var near = 1;
	var far = 1000;
	var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(0, 0, 15);
	scene.add(camera);

	var light = new THREE.PointLight();
	light.position.set(5, 5, 5);
	scene.add(light);

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	document.body.appendChild(renderer.domElement);

	var geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 20);

	/* var material = new THREE.ShaderMaterial({
		vertexColors: THREE.VertexColors,
		vertexShader: document.getElementById("gouraud.vert").text,
		fragmentShader: document.getElementById("gouraud.frag").text,
	}); */

	var gouraud_lambertian = new THREE.ShaderMaterial({
		vertexColors: THREE.VertexColors,
		vertexShader: document.getElementById("gouraud.vert.lambertian").text,
		fragmentShader: document.getElementById("gouraud.frag").text,
		uniforms: {
			light_position: { type: "v3", value: light.position }
		}
	});

	var gouraud_phong = new THREE.ShaderMaterial({
		vertexColors: THREE.VertexColors,
		vertexShader: document.getElementById("gouraud.vert.phong").text,
		fragmentShader: document.getElementById("gouraud.frag").text,
		uniforms: {
			light_position: { type: "v3", value: light.position },
			camera_position: { type: "v3", value: camera.position }
		}
	});

	var phong_lambertian = new THREE.ShaderMaterial({
		vertexColors: THREE.VertexColors,
		vertexShader: document.getElementById("shader.vert").text,
		fragmentShader: document.getElementById("shader.frag.lambertian").text,
		uniforms: {
			light_position: { type: "v3", value: light.position }
		}
	});

	var phong_phong = new THREE.ShaderMaterial({
		vertexColors: THREE.VertexColors,
		vertexShader: document.getElementById("shader.vert").text,
		fragmentShader: document.getElementById("shader.frag.phong").text,
		uniforms: {
			light_position: { type: "v3", value: light.position },
			camera_position: { type: "v3", value: camera.position }
		}
	});

	var torus_knot_gouraud_lambertian = new THREE.Mesh(geometry, gouraud_lambertian);
	torus_knot_gouraud_lambertian.position.set(-2, +2, 0);
	scene.add(torus_knot_gouraud_lambertian);

	var torus_knot_gouraud_phong = new THREE.Mesh(geometry, gouraud_phong);
	torus_knot_gouraud_phong.position.set(2, +2, 0);
	scene.add(torus_knot_gouraud_phong);

	var torus_knot_phong_lambertian = new THREE.Mesh(geometry, phong_lambertian);
	torus_knot_phong_lambertian.position.set(-2, -2, 0);
	scene.add(torus_knot_phong_lambertian);

	var torus_knot_phong_phong = new THREE.Mesh(geometry, phong_phong);
	torus_knot_phong_phong.position.set(2, -2, 0);
	scene.add(torus_knot_phong_phong);
	loop();



	function loop() {
		requestAnimationFrame(loop);
		torus_knot_gouraud_lambertian.rotation.x += 0.01;
		torus_knot_gouraud_lambertian.rotation.y += 0.01;
		torus_knot_gouraud_phong.rotation.x += 0.01;
		torus_knot_gouraud_phong.rotation.y += 0.01;
		torus_knot_phong_lambertian.rotation.x += 0.01;
		torus_knot_phong_lambertian.rotation.y += 0.01;
		torus_knot_phong_phong.rotation.x += 0.01;
		torus_knot_phong_phong.rotation.y += 0.01;
		renderer.render(scene, camera);
	}
}