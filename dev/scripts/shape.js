import React from 'react';
import * as THREE from 'three';

class Shape extends React.Component {
   constructor() {
      super()

      this.state = {
         sizeValue: 1,
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

      const { sizeValue } = this.state;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
         75, 
         window.innerWidth/window.innerHeight, 
         0.1, 
         1000
      );

      // let color = new THREE.Color( 0xf80d18 );

      const geometry = new THREE.CubeGeometry(sizeValue, sizeValue, sizeValue);
      const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
      const cube = new THREE.Mesh(geometry, material);

      camera.position.z = 25;

      const pointLight = new THREE.PointLight(0xffffff);
      pointLight.position.set(0, 200, 500);

      scene.add(pointLight);
      scene.add(cube);

      // this.color = color
      this.scene = scene
      this.camera = camera
      this.material = material
      this.cube = cube

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
      this.cube.rotation.x += 0.005;
      this.cube.rotation.y += 0.005;
      
      this.renderScene()
      this.frameId = window.requestAnimationFrame(this.animate)
   };

   renderScene() {
      this.renderer.render(this.scene, this.camera)
   };

   componentWillReceiveProps(nextProps) {
      const { sizeValue: sizeValueNext } = nextProps;
      this.setState({ sizeValue: sizeValueNext }, () => this.createObject());
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