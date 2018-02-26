import React from 'react';
import * as THREE from 'three';

class Shape extends React.Component {
   constructor() {
      super()

      this.state = {
         sizeValue: 1,
         color: "red",
         vertices: 0,
         rotationX : 0,
         rotationY : 0
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
      console.log('mounting');
   };

   createObject() {

      let { sizeValue, color, vertices } = this.state;

      let scene = new THREE.Scene();
      let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

      let geometry = new THREE.TetrahedronGeometry(sizeValue, vertices);
      let material = new THREE.MeshPhongMaterial({ color: color });
      let shape = new THREE.Mesh(geometry, material);

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

      camera.position.z = 15;

      let pointLight = new THREE.PointLight(0xffffff);
      pointLight.position.set(0, 200, 500);

      scene.add(pointLight);
      scene.add(shape);

      this.scene = scene
      this.camera = camera
      this.material = material
      this.shape = shape

      this.shape.rotationX = this.state.rotationX;
      this.shape.rotationY = this.state.rotationY;

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
      let newStateX = this.state.rotationX += 0.005;
      let newStateY = this.state.rotationY += 0.005;
      this.setState({
         rotationX : newStateX,
         rotationY : newStateY
      }, () => {
         this.shape.rotation.x = this.state.rotationX;
         this.shape.rotation.y = this.state.rotationY;
      });

      this.renderScene()
      this.frameId = window.requestAnimationFrame(this.animate)
   };

   renderScene() {
      this.renderer.render(this.scene, this.camera)
   };



   componentWillReceiveProps(nextProps) {
      const { sizeValue: sizeValueNext, color: colorNext, vertices: verticesNext  } = nextProps;
      this.setState({ sizeValue: sizeValueNext, color: colorNext, vertices: verticesNext }, () => this.createObject());
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


// Perhaps useful?
// shouldComponentUpdate() {
//    return false
// }

//Perhaps useful?
// if ((this.props.color === nextProps.color) && (this.props.sizeValue === nextProps.sizeValue) && (this.props.vertices === nextProps.vertices)) {
//    return false;
// }