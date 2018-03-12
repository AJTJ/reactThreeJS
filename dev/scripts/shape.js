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
         middleBulbDistance : 0,
         bottomBulbDistance : 0,
         topBulbDistance : 0,

         middleBulbSpeed : 0.004,
         topBulbSpeed: 0.003,
         bottomBulbSpeed: 0.005,
         // middleBulbPositionX : 0,
         // middleBulbPositionZ : 0,         
         // bottomBulbPositionX : 0,
         // bottomBulbPositionZ : 0,         
         // topBulbPositionX : 0,
         // topBulbPositionZ : 0,
         
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
      let MiddleBulb = new THREE.PointLight( lightsColor, 1, 80, 5 );
      MiddleBulb.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
      MiddleBulb.position.set( -7.5, 0, 10 );

      //BULB 2
      let BottomBulb = new THREE.PointLight( lightsColor, 1, 80, 5 );
      BottomBulb.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
      BottomBulb.position.set( 0, -9, 0 );      
      //BULB 3
      let TopBulb = new THREE.PointLight( lightsColor, 1, 80, 5 );
      TopBulb.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
      TopBulb.position.set( 0, 9, 0 );     

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
      scene.add( MiddleBulb );
      scene.add( BottomBulb );
      scene.add( TopBulb );
      scene.add( pointLight );
      scene.add( shape );
      scene.add( floorMesh );
      scene.add( floorMesh2 );

      this.middleBulb = MiddleBulb
      this.bottomBulb = BottomBulb
      this.topBulb = TopBulb
      
      this.scene = scene
      this.camera = camera
      this.shape = shape

      //CURRENT SHAPE ROTATION
      this.shape.shapeRotationX = this.state.shapeRotationX;
      this.shape.shapeRotationY = this.state.shapeRotationY;

      //CURRENT BULB POSITION      
      // this.middleBulb.position.x = this.state.middleBulbPositionX;
      // this.middleBulb.position.z = this.state.middleBulbPositionZ;      
      // this.bottomBulb.position.x = this.state.bottomBulbPositionX;
      // this.bottomBulb.position.z = this.state.bottomBulbPositionZ;      
      // this.topBulb.position.x = this.state.topBulbPositionX;
      // this.topBulb.position.z = this.state.topBulbPositionZ;

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

      let middleBulbSpeed = Number(this.state.middleBulbSpeed)
      let topBulbSpeed = Number(this.state.topBulbSpeed)
      let bottomBulbSpeed = Number(this.state.bottomBulbSpeed)

      //THE DISTANCE THAT THE THINGS MOVE
      let newShapeStateX = this.state.shapeRotationX += 0.005;
      let newShapeStateY = this.state.shapeRotationY += 0.005;
      let newMiddleBulbDistance = this.state.middleBulbDistance += middleBulbSpeed;
      let newBottomBulbDistance = this.state.bottomBulbDistance += bottomBulbSpeed;
      let newTopBulbDistance = this.state.topBulbDistance += topBulbSpeed;

      //THE PATH THAT THE BULBS TAKE RELATED TO THE DISTANCE THEY'VE MOVED.
      this.middleBulb.position.x = -11*Math.cos(newMiddleBulbDistance) + 0;
      this.middleBulb.position.z = 11*Math.sin(newMiddleBulbDistance) + 0;
      
      this.bottomBulb.position.x = 6*Math.cos(newBottomBulbDistance) + 0;
      this.bottomBulb.position.z = 6*Math.sin(newBottomBulbDistance) + 5;

      this.topBulb.position.x = 7*Math.cos(newTopBulbDistance) + 0;
      this.topBulb.position.z = 7*Math.sin(newTopBulbDistance) + 5;

      let newMiddleBulbPositionX = this.middleBulb.position.x = -11*Math.cos(newMiddleBulbDistance) + 0;
      let newMiddleBulbPositionZ = this.middleBulb.position.z = 11*Math.sin(newMiddleBulbDistance) + 0;

      // let newBottomBulbPositionX = this.bottomBulb.position.x = 6*Math.cos(newBottomBulbDistance) + 0;
      // let newBottomBulbPositionZ = this.bottomBulb.position.z = 6*Math.sin(newBottomBulbDistance) + 5;

      // let newTopBulbPositionX = this.topBulb.position.x = 7*Math.cos(newTopBulbDistance) + 0;
      // let newTopBulbPositionZ = this.topBulb.position.z = 7*Math.sin(newTopBulbDistance) + 5;

      this.setState({
         //STORING STATE FOR THE SHAPES ROTATION DISTANCE, FOR WHEN A NEW SHAPE IS SPAWNED
         shapeRotationX : newShapeStateX,
         shapeRotationY : newShapeStateY,   
         // middleBulbDistance : newMiddleBulbDistance,
         // bottomBulbDistance : newBottomBulbDistance,
         // topBulbDistance : newTopBulbDistance,
         // middleBulbPositionX : newMiddleBulbPositionX,
         // middleBulbPositionZ : newMiddleBulbPositionZ,   
         // bottomBulbPositionX : newBottomBulbPositionX,
         // bottomBulbPositionZ : newBottomBulbPositionZ,   
         // topBulbPositionX : newTopBulbPositionX,
         // topBulbPositionZ : newTopBulbPositionZ,
      }, () => {
         this.shape.rotation.x = this.state.shapeRotationX;
         this.shape.rotation.y = this.state.shapeRotationY;   
         // this.middleBulb.position.x = this.state.middleBulbPositionX;
         // this.middleBulb.position.z = this.state.middleBulbPositionZ;   
         // this.bottomBulb.position.x = this.state.bottomBulbPositionX;
         // this.bottomBulb.position.z = this.state.bottomBulbPositionZ;   
         // this.topBulb.position.x = this.state.topBulbPositionX;
         // this.topBulb.position.z = this.state.topBulbPositionZ;
      });

      this.renderScene()
      this.frameId = window.requestAnimationFrame(this.animate)
   };

   renderScene() {
      this.renderer.render(this.scene, this.camera)
   };

   componentWillReceiveProps(nextProps) {
      const { 
         sizeValue: sizeValueNext, 
         color: colorNext, 
         vertices: verticesNext, 
         lightsColor: lightsColorNext, 
         middleBulbSpeed: middleBulbSpeedNext,
         topBulbSpeed: topBulbSpeedNext,
         bottomBulbSpeed: bottomBulbSpeedNext 
      } = nextProps;
      this.setState({ 
         sizeValue: sizeValueNext, 
         color: colorNext, 
         vertices: verticesNext, 
         lightsColor: lightsColorNext, 
         middleBulbSpeed: middleBulbSpeedNext,
         topBulbSpeed: topBulbSpeedNext,
         bottomBulbSpeed: bottomBulbSpeedNext 
      }, () => this.createObject());
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

      // let newMiddleBulbRotateY = this.middleBulb.rotation.y += 0.03;
// let newBottomBulbRotateY = this.bottomBulb.rotation.y += 0.02;
// let newTopBulbRotateY = this.topBulb.rotation.y -= 0.01;
// MiddleBulbRotateY : newMiddleBulbRotateY,
// BottomBulbRotateY : newBottomBulbRotateY,
// TopBulbRotateY : newTopBulbRotateY,
// this.middleBulb.rotation.y = this.state.middleBulbRotateY;
// this.bottomBulb.rotation.y = this.state.bottomBulbRotateY;
// this.topBulb.rotation.y = this.state.topBulbRotateY;

// MiddleBulbRotateY : 0,
// BottomBulbRotateY : 0,
// TopBulbRotateY : 0,
// this.middleBulb.rotation.y = this.state.middleBulbRotateY;
// this.bottomBulb.rotation.y = this.state.bottomBulbRotateY;
// this.topBulb.rotation.y = this.state.topBulbRotateY;