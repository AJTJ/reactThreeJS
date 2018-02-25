import React from 'react';
import * as THREE from 'three';

class Shape extends React.Component {
   constructor() {
      super()

      this.state = {
         sizeValue: 1,
      }

      this.createObject = this.createObject.bind(this);
   }

   componentDidMount() {
      this.createObject()
   }

   createObject() {
      const { sizeValue } = this.state;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      const geometry = new THREE.BoxGeometry(sizeValue, sizeValue, sizeValue);
      const material = new THREE.MeshPhongMaterial({ color: 99999999 });
      const cube = new THREE.Mesh(geometry, material);

      camera.position.z = 25;

      const pointLight = new THREE.PointLight(0xff0000);
      pointLight.position.set(0, 200, 500);

      scene.add(pointLight);
      scene.add(cube);

      const animate = function () {
         requestAnimationFrame(animate);
      
         cube.rotation.x += 0.005;
         cube.rotation.y += 0.005;
      
         renderer.render(scene, camera);
      };
      
      animate();
   }

   componentWillReceiveProps(nextProps) {
      // the same as saying const sizeValueNext = nextProps.sizeValue;
      const { sizeValue: sizeValueNext } = nextProps;
      // console.log(sizeValueNext);
      this.setState({ sizeValue: sizeValueNext }, () => this.createObject());
   }

   render() {
      return (
         <div></div>
      )
   }
}

export default Shape;

      // this.setState({ scene: scene });
      // this.setState({ camera: camera });
      // this.setState({ renderer: renderer});

      // const setObjectStates = () => {
      //    this.setState({ scene: scene });
      //    this.setState({ camera: camera });
      //    this.setState({ renderer: renderer});
      //    return this.animateObject()
      // }
      
      // setObjectStates()

   // componentDidUpdate() {
   //    const { scene, camera, renderer } = this.state;

   // }




