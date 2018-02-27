import React from 'react';
import * as THREE from 'three';

class Shape extends React.Component {
   constructor() {
      super()

      this.state = {
         sizeValue: 5,
         color: "red",
         lightsColor: "white",
         vertices: 0,
         shapeRotationX : 0,
         shapeRotationY : 0,
         bulb1Speed : 0,
         bulb2Speed : 0,
         bulb3Speed : 0,   
         bulbLight1PositionX : 0,
         bulbLight1PositionZ : 0,         
         bulbLight2PositionX : 0,
         bulbLight2PositionZ : 0,         
         bulbLight3PositionX : 0,
         bulbLight3PositionZ : 0,
         
      }

      this.createObject = this.createObject.bind(this)
      this.start = this.start.bind(this)
      this.stop = this.stop.bind(this)
      this.animate = this.animate.bind(this)
      this.renderScene = this.renderScene.bind(this)
   };

   componentDidMount() {
      const renderer = new THREE.WebGLRenderer();
      document.body.appendChild(renderer.domElement);
      renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer = renderer

      this.createObject();
   };

   createObject() {

      //STATES IMPORTED
      let { sizeValue, color, vertices, lightsColor } = this.state;

      let scene = new THREE.Scene();

      //CAMERA
      let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
      camera.position.set( 0, 0, 25 );

      //SHAPE
      let geometry = new THREE.TetrahedronGeometry(sizeValue, vertices);
      let material = new THREE.MeshStandardMaterial({ 
         color: color,
         metalness: 0.5,
         roughness: 0.7
      });
      let shape = new THREE.Mesh(geometry, material);


      //ALL BULBS
      let bulbGeometry = new THREE.SphereGeometry( 0.08, 16, 8 );
      let bulbMat = new THREE.MeshStandardMaterial( {
         emissive: lightsColor,
         emissiveIntensity: 1,
         color: lightsColor
      });

      //BULB 1
      let bulbLight1 = new THREE.PointLight( lightsColor, 1, 80, 5 );
      bulbLight1.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
      bulbLight1.position.set( -7.5, 0, 10 );

      //BULB 2
      let bulbLight2 = new THREE.PointLight( lightsColor, 1, 80, 5 );
      bulbLight2.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
      bulbLight2.position.set( 0, -9, 0 );      
      //BULB 3
      let bulbLight3 = new THREE.PointLight( lightsColor, 1, 80, 5 );
      bulbLight3.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
      bulbLight3.position.set( 0, 9, 0 );     

      //GENERAL POINTLIGHT
      let pointLight = new THREE.PointLight(0xffffff, 1, 60, 5);
      pointLight.position.set(0, 0, 11);

      //FLOOR
      let floorMat = new THREE.MeshStandardMaterial( {
         // shininess: 100,
         side: THREE.DoubleSide,
         roughness: 0.6,
         color: "white",
         metalness: 1,
         // bumpScale: 0.0005
      });
      let floorGeometry = new THREE.PlaneBufferGeometry( 300, 300, 8, 8 );
      let floorMesh = new THREE.Mesh( floorGeometry, floorMat );
      floorMesh.rotation.x = -Math.PI / 2.0;
      floorMesh.position.set( 0, -10, 0 );

      //FLOOR2 (CEILING)
      let floorMesh2 = new THREE.Mesh( floorGeometry, floorMat );
      floorMesh2.rotation.x = -Math.PI / 2.0;
      floorMesh2.position.set( 0, 10, 0 );

      //OBJECTS IN SCENE
      scene.add( bulbLight1 );
      scene.add( bulbLight2 );
      scene.add( bulbLight3 );
      scene.add( pointLight );
      scene.add( shape );
      scene.add( floorMesh );
      scene.add( floorMesh2 );

      this.bulbLight1 = bulbLight1
      this.bulbLight2 = bulbLight2
      this.bulbLight3 = bulbLight3
      
      this.scene = scene
      this.camera = camera
      this.shape = shape

      //CURRENT SHAPE ROTATION
      this.shape.shapeRotationX = this.state.shapeRotationX;
      this.shape.shapeRotationY = this.state.shapeRotationY;

      //CURRENT BULB POSITION      
      this.bulbLight1.position.x = this.state.bulbLight1PositionX;
      this.bulbLight1.position.z = this.state.bulbLight1PositionZ;      
      this.bulbLight2.position.x = this.state.bulbLight2PositionX;
      this.bulbLight2.position.z = this.state.bulbLight2PositionZ;      
      this.bulbLight3.position.x = this.state.bulbLight3PositionX;
      this.bulbLight3.position.z = this.state.bulbLight3PositionZ;

      this.mount.appendChild(this.renderer.domElement)
      this.start()

   };

   componentWillUnmount() {
      this.stop()
      this.mount.removeChild(this.renderer.domElement)
   };

   stop() {
      cancelAnimationFrame(this.frameId)
   };

   start() {
      if (!this.frameId) {
        this.frameId = requestAnimationFrame(this.animate)
      }
   };

   animate() {
      let newShapeStateX = this.state.shapeRotationX += 0.005;
      let newShapeStateY = this.state.shapeRotationY += 0.005;
      let newBulb1Speed = this.state.bulb1Speed += 0.004;
      let newBulb2Speed = this.state.bulb2Speed += 0.003;
      let newBulb3Speed = this.state.bulb3Speed += 0.005;

      let newBulbLight1PositionX = this.bulbLight1.position.x = -11*Math.cos(newBulb1Speed) + 0;
      let newBulbLight1PositionZ = this.bulbLight1.position.z = 11*Math.sin(newBulb1Speed) + 0;
      
      let newBulbLight2PositionX = this.bulbLight2.position.x = 6*Math.cos(newBulb2Speed) + 0;
      let newBulbLight2PositionZ = this.bulbLight2.position.z = 6*Math.sin(newBulb2Speed) + 5;

      let newBulbLight3PositionX = this.bulbLight3.position.x = 7*Math.cos(newBulb3Speed) + 0;
      let newBulbLight3PositionZ = this.bulbLight3.position.z = 7*Math.sin(newBulb3Speed) + 5;

      this.setState({
         shapeRotationX : newShapeStateX,
         shapeRotationY : newShapeStateY,   
         bulb1Speed : newBulb1Speed,
         bulb2Speed : newBulb2Speed,
         bulb3Speed : newBulb3Speed,
         bulbLight1PositionX : newBulbLight1PositionX,
         bulbLight1PositionZ : newBulbLight1PositionZ,   
         bulbLight2PositionX : newBulbLight2PositionX,
         bulbLight2PositionZ : newBulbLight2PositionZ,   
         bulbLight3PositionX : newBulbLight3PositionX,
         bulbLight3PositionZ : newBulbLight3PositionZ,
      }, () => {
         this.shape.rotation.x = this.state.shapeRotationX;
         this.shape.rotation.y = this.state.shapeRotationY;   
         this.bulbLight1.position.x = this.state.bulbLight1PositionX;
         this.bulbLight1.position.z = this.state.bulbLight1PositionZ;   
         this.bulbLight2.position.x = this.state.bulbLight2PositionX;
         this.bulbLight2.position.z = this.state.bulbLight2PositionZ;   
         this.bulbLight3.position.x = this.state.bulbLight3PositionX;
         this.bulbLight3.position.z = this.state.bulbLight3PositionZ;
      });

      this.renderScene()
      this.frameId = window.requestAnimationFrame(this.animate)
   };

   renderScene() {
      this.renderer.render(this.scene, this.camera)
   };

   componentWillReceiveProps(nextProps) {
      const { sizeValue: sizeValueNext, color: colorNext, vertices: verticesNext, lightsColor: lightsColorNext  } = nextProps;
      this.setState({ sizeValue: sizeValueNext, color: colorNext, vertices: verticesNext, lightsColor: lightsColorNext }, () => this.createObject());
   };

   render() {
      return (
         <div 
            ref={(mount) => {this.mount = mount}}
         />
      )
   };
}

export default Shape;



//OTHER CODE BITS AND PIECES

// Perhaps useful?
// shouldComponentUpdate() {
//    return false
// }

//Perhaps useful?
// if ((this.props.color === nextProps.color) && (this.props.sizeValue === nextProps.sizeValue) && (this.props.vertices === nextProps.vertices)) {
//    return false;
// }

      // // instantiate a loader
      // var loader = new THREE.OBJLoader();

      // // load a resource
      // loader.load(
      //    // resource URL
      //    '/assets/dummy.obj',
      //    // called when resource is loaded
      //    function ( shape ) {

      //       scene.add( shape );

      //    },
      //    // called when loading is in progresses
      //    function ( xhr ) {

      //       console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

      //    },
      //    // called when loading has errors
      //    function ( error ) {

      //       console.log( 'An error happened' );

      //    }
      // );

      // let newBulbLight1RotateY = this.bulbLight1.rotation.y += 0.03;
// let newBulbLight2RotateY = this.bulbLight2.rotation.y += 0.02;
// let newBulbLight3RotateY = this.bulbLight3.rotation.y -= 0.01;
// bulbLight1RotateY : newBulbLight1RotateY,
// bulbLight2RotateY : newBulbLight2RotateY,
// bulbLight3RotateY : newBulbLight3RotateY,
// this.bulbLight1.rotation.y = this.state.bulbLight1RotateY;
// this.bulbLight2.rotation.y = this.state.bulbLight2RotateY;
// this.bulbLight3.rotation.y = this.state.bulbLight3RotateY;

// bulbLight1RotateY : 0,
// bulbLight2RotateY : 0,
// bulbLight3RotateY : 0,
// this.bulbLight1.rotation.y = this.state.bulbLight1RotateY;
// this.bulbLight2.rotation.y = this.state.bulbLight2RotateY;
// this.bulbLight3.rotation.y = this.state.bulbLight3RotateY;