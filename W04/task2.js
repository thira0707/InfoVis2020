function main()
{
  var width = 500;
  var height = 500;

  var scene = new THREE.Scene();

  var fov = 45;
  var aspect = width / height;
  var near = 1;
  var far = 1000;
  var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  camera.position.set( 0, 0, 5 );
  scene.add( camera );
  
  /* var light = new THREE.PointLight();
  light.position.set( 5, 5, 5 );
  scene.add( light ); */

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( width, height );
  document.body.appendChild( renderer.domElement );
  
  
  var vertices = [
    [-1, 1, 1],  // v0
    [-1,-1, 1],  // v1
    [ 1,-1, 1],  // v2
    [ 1, 1, 1],  // v3
    [-1, 1, -1], // v4
    [-1,-1, -1], // v5
    [ 1,-1, -1], // v6
    [ 1, 1, -1]  // v7
  ];
  var faces = [
    [0,1,2], // f0: v0-v1-v2
    [2,3,0], // f1: v0-v2-c3
    [5,6,7], // f2: v7-v6-c5
    [7,4,5], // f3: v4-v7-c5
    [3,2,6], // f4: v4-v0-c1
    [6,7,3], // f5: v4-v1-c5
    [4,5,1], // f6: v3-v2-c6
    [1,0,4], // f7: v7-v3-c6
    [0,3,7], // f8: v4-v0-c3
    [7,4,0], // f9: v3-v7-c4
    [5,1,2], // f10: v2-v1-c6
    [2,6,5]  // f11: v5-v6-c1
  ];
  
  var v0 = new THREE.Vector3().fromArray( vertices[0] );
  var v1 = new THREE.Vector3().fromArray( vertices[1] );
  var v2 = new THREE.Vector3().fromArray( vertices[2] );
  var v3 = new THREE.Vector3().fromArray( vertices[3] );
  var v4 = new THREE.Vector3().fromArray( vertices[4] );
  var v5 = new THREE.Vector3().fromArray( vertices[5] );
  var v6 = new THREE.Vector3().fromArray( vertices[6] );
  var v7 = new THREE.Vector3().fromArray( vertices[7] );
  
  var id = faces[0];
  var f0 = new THREE.Face3( id[0], id[1], id[2] );
  var id = faces[1];
  var f1 = new THREE.Face3( id[0], id[1], id[2] );
  var id = faces[2];
  var f2 = new THREE.Face3( id[0], id[1], id[2] );
  var id = faces[3];
  var f3 = new THREE.Face3( id[0], id[1], id[2] );
  var id = faces[4];
  var f4 = new THREE.Face3( id[0], id[1], id[2] );
  var id = faces[5];
  var f5 = new THREE.Face3( id[0], id[1], id[2] );
  var id = faces[6];
  var f6 = new THREE.Face3( id[0], id[1], id[2] );
  var id = faces[7];
  var f7 = new THREE.Face3( id[0], id[1], id[2] );
  var id = faces[8];
  var f8 = new THREE.Face3( id[0], id[1], id[2] );
  var id = faces[9];
  var f9 = new THREE.Face3( id[0], id[1], id[2] );
  var id = faces[10];
  var f10 = new THREE.Face3( id[0], id[1], id[2] );
  var id = faces[11];
  var f11 = new THREE.Face3( id[0], id[1], id[2] );
  
  
  var geometry = new THREE.Geometry();
  geometry.vertices.push( v0 );
  geometry.vertices.push( v1 );
  geometry.vertices.push( v2 );
  geometry.vertices.push( v3 );
  geometry.vertices.push( v4 );
  geometry.vertices.push( v5 );
  geometry.vertices.push( v6 );
  geometry.vertices.push( v7 );


  geometry.faces.push( f0 );
  geometry.faces.push( f1 );
  geometry.faces.push( f2 );
  geometry.faces.push( f3 );
  geometry.faces.push( f4 );
  geometry.faces.push( f5 );
  geometry.faces.push( f6 );
  geometry.faces.push( f7 );
  geometry.faces.push( f8 );
  geometry.faces.push( f9 );
  geometry.faces.push( f10 );
  geometry.faces.push( f11 );
  
  
  var material = new THREE.MeshBasicMaterial();
  material.vertexColors = THREE.FaceColors;
  geometry.faces[0].color = new THREE.Color( 1, 0, 0 );
  geometry.faces[2].color = new THREE.Color( 1, 0, 0 );
  geometry.faces[4].color = new THREE.Color( 1, 0, 0 );
  geometry.faces[6].color = new THREE.Color( 1, 0, 0 );
  geometry.faces[8].color = new THREE.Color( 1, 0, 0 );
  geometry.faces[10].color = new THREE.Color( 1, 0, 0 );
  /*
  var material = new THREE.MeshBasicMaterial();
  material.vertexColors = THREE.VertexColors;
  geometry.faces[0].vertexColors.push(new THREE.Color(1,0,0));
  geometry.faces[0].vertexColors.push(new THREE.Color(0,1,0));
  geometry.faces[0].vertexColors.push(new THREE.Color(0,0,1));
  */
  // Normal vectors for each face are automatically computed.
  geometry.computeFaceNormals();
  
  // Front: THREE.FrontSide (default)
  // Back: THREE.BackSide
  // Both: THREE.DoubleSide
  material.side = THREE.DoubleSide
  
  var triangle = new THREE.Mesh( geometry, material );
  scene.add( triangle );

  //a mouse down event
  document.addEventListener( 'mousedown', mouse_down_event );
  function mouse_down_event( event )
  {
    // Mouse picking
    var x_win = event.clientX;
    var y_win = event.clientY;

    var vx = renderer.domElement.offsetLeft;
    var vy = renderer.domElement.offsetTop;
    var vw = renderer.domElement.width;
    var vh = renderer.domElement.height;
    var x_NDC = 2 * ( x_win - vx ) / vw - 1;
    var y_NDC = -( 2 * ( y_win - vy ) / vh - 1 );

    //NDC to world coordinates
    var p_NDC = new THREE.Vector3( x_NDC, y_NDC, 1 );
    var p_wld = p_NDC.unproject( camera );

    var origin = camera.position;
    var direction = p_wld.sub(camera.position).normalize();
    
    //THREE.Raycaster
    var raycaster = new THREE.Raycaster( origin, direction );
    var intersects = raycaster.intersectObject( triangle );
    if ( intersects.length > 0 )
    {
      intersects[0].face.color.setRGB( 0, 1, 1 );
      intersects[0].object.geometry.colorsNeedUpdate = true;
    }
  }

  loop();

  function loop()
  {
    requestAnimationFrame( loop );
    triangle.rotation.x += 0.002;
    triangle.rotation.y += 0.006;
    renderer.render( scene, camera );
  }
}


function _main()
{
  var width = 500;
  var height = 500;

  var scene = new THREE.Scene();

  var fov = 45;
  var aspect = width / height;
  var near = 1;
  var far = 1000;
  var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  camera.position.set( 0, 0, 5 );
  scene.add( camera );
  

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( width, height );
  document.body.appendChild( renderer.domElement );
  
  
  /* var light = new THREE.PointLight();
  light.position.set( 5, 5, 5 );
  scene.add( light ); */

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( width, height );
  document.body.appendChild( renderer.domElement );
  
  
  var vertices = [
    [-1, 1, 1],  // v0
    [-1,-1, 1],  // v1
    [ 1,-1, 1],  // v2
    [ 1, 1, 1],  // v3
    [-1, 1, -1], // v4
    [-1,-1, -1], // v5
    [ 1,-1, -1], // v6
    [ 1, 1, -1]  // v7
  ];
  var faces = [
    [0,1,2], // f0: v0-v1-v2
    [2,3,0], // f1: v0-v2-c3
    [5,6,7], // f2: v7-v6-c5
    [7,4,5], // f3: v4-v7-c5
    [3,2,6], // f4: v4-v0-c1
    [6,7,3], // f5: v4-v1-c5
    [4,5,1], // f6: v3-v2-c6
    [1,0,4], // f7: v7-v3-c6
    [0,3,7], // f8: v4-v0-c3
    [7,4,0], // f9: v3-v7-c4
    [5,1,2], // f10: v2-v1-c6
    [2,6,5]  // f11: v5-v6-c1
  ];
  
  var v0 = new THREE.Vector3().fromArray( vertices[0] );
  var v1 = new THREE.Vector3().fromArray( vertices[1] );
  var v2 = new THREE.Vector3().fromArray( vertices[2] );
  var v3 = new THREE.Vector3().fromArray( vertices[3] );
  var v4 = new THREE.Vector3().fromArray( vertices[4] );
  var v5 = new THREE.Vector3().fromArray( vertices[5] );
  var v6 = new THREE.Vector3().fromArray( vertices[6] );
  var v7 = new THREE.Vector3().fromArray( vertices[7] );
  
  var id = faces[0];
  var f0 = new THREE.Face3( id[0], id[1], id[2] );
  var id = faces[1];
  var f1 = new THREE.Face3( id[0], id[1], id[2] );
  var id = faces[2];
  var f2 = new THREE.Face3( id[0], id[1], id[2] );
  var id = faces[3];
  var f3 = new THREE.Face3( id[0], id[1], id[2] );
  var id = faces[4];
  var f4 = new THREE.Face3( id[0], id[1], id[2] );
  var id = faces[5];
  var f5 = new THREE.Face3( id[0], id[1], id[2] );
  var id = faces[6];
  var f6 = new THREE.Face3( id[0], id[1], id[2] );
  var id = faces[7];
  var f7 = new THREE.Face3( id[0], id[1], id[2] );
  var id = faces[8];
  var f8 = new THREE.Face3( id[0], id[1], id[2] );
  var id = faces[9];
  var f9 = new THREE.Face3( id[0], id[1], id[2] );
  var id = faces[10];
  var f10 = new THREE.Face3( id[0], id[1], id[2] );
  var id = faces[11];
  var f11 = new THREE.Face3( id[0], id[1], id[2] );
  
  
  var geometry = new THREE.Geometry();
  geometry.vertices.push( v0 );
  geometry.vertices.push( v1 );
  geometry.vertices.push( v2 );
  geometry.vertices.push( v3 );
  geometry.vertices.push( v4 );
  geometry.vertices.push( v5 );
  geometry.vertices.push( v6 );
  geometry.vertices.push( v7 );


  geometry.faces.push( f0 );
  geometry.faces.push( f1 );
  geometry.faces.push( f2 );
  geometry.faces.push( f3 );
  geometry.faces.push( f4 );
  geometry.faces.push( f5 );
  geometry.faces.push( f6 );
  geometry.faces.push( f7 );
  geometry.faces.push( f8 );
  geometry.faces.push( f9 );
  geometry.faces.push( f10 );
  geometry.faces.push( f11 );
  
  
  var material = new THREE.MeshBasicMaterial();
  material.vertexColors = THREE.FaceColors;
  
  // Normal vectors for each face are automatically computed.
  geometry.computeFaceNormals();
  
  // Front: THREE.FrontSide (default)
  // Back: THREE.BackSide
  // Both: THREE.DoubleSide
  material.side = THREE.DoubleSide
  
  var triangle = new THREE.Mesh( geometry, material );
  scene.add( triangle );
  
  //a mouse down event
  document.addEventListener( 'mousedown', mouse_down_event );
  function mouse_down_event( event )
  {
    // Mouse picking
    var x_win = event.clientX;
    var y_win = event.clientY;

    var vx = renderer.domElement.offsetLeft;
    var vy = renderer.domElement.offsetTop;
    var vw = renderer.domElement.width;
    var vh = renderer.domElement.height;
    var x_NDC = 2 * ( x_win - vx ) / vw - 1;
    var y_NDC = -( 2 * ( y_win - vy ) / vh - 1 );

    //NDC to world coordinates
    var p_NDC = new THREE.Vector3( x_NDC, y_NDC, 1 );
    var p_wld = p_NDC.unproject( camera );

    var origin = camera.position;
    var direction = p_wld.sub(camera.position).normalize();
    
    //THREE.Raycaster
    var raycaster = new THREE.Raycaster( origin, direction );
    var intersects = raycaster.intersectObject( triangle );
    if ( intersects.length > 0 )
    {
      intersects[0].face.color.setRGB( 0, 1, 1 );
      intersects[0].object.geometry.colorsNeedUpdate = true;
    }
  }
  
  
  
  
  loop();

  function loop()
  {
    requestAnimationFrame( loop );
    triangle.rotation.x += 0.02;
    triangle.rotation.y += 0.005;
    renderer.render( scene, camera );
  }
}