import React from 'react';
import * as THREE from 'three';

class Shape extends React.Component {
   constructor() {
      super()

      this.state = {
         sizeValue: 1,
         color: "red",
         vertices: 0
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

      this.createObject()
   };

   createObject() {

      let { sizeValue, color, vertices } = this.state;

      let scene = new THREE.Scene();
      let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

      let geometry = new THREE.TetrahedronGeometry(sizeValue, vertices);
      let material = new THREE.MeshPhongMaterial({ color: color });
      let shape = new THREE.Mesh(geometry, material);

      camera.position.z = 15;

      let pointLight = new THREE.PointLight(0xffffff);
      pointLight.position.set(0, 200, 500);

      scene.add(pointLight);
      scene.add(shape);

      this.scene = scene
      this.camera = camera
      this.material = material
      this.shape = shape

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
      this.shape.rotation.x += 0.005;
      this.shape.rotation.y += 0.005;
      
      this.renderScene()
      this.frameId = window.requestAnimationFrame(this.animate)
   };

   renderScene() {
      this.renderer.render(this.scene, this.camera)
   };

   componentWillReceiveProps(nextProps) {
      if ((this.props.color === nextProps.color) && (this.props.sizeValue === nextProps.sizeValue) && (this.props.vertices === nextProps.vertices)) {
         return false;
      }
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