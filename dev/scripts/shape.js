import React from 'react';
import * as THREE from 'three';
// import React3 from 'react-three-renderer';
// import OBJLoader from 'three-obj-loader';

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
			middleBulbLum : 300,
			topBulbLum: 300,
			bottomBulbLum: 300,
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
		let { sizeValue, color, vertices, lightsColor, middleBulbLum, topBulbLum, bottomBulbLum } = this.state;

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
		let MiddleBulb = new THREE.PointLight( lightsColor, 1, middleBulbLum, 20 );
		MiddleBulb.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
		MiddleBulb.position.set( -7.5, 0, 10 );

		//BULB 2
		let BottomBulb = new THREE.PointLight( lightsColor, 1, bottomBulbLum, 20 );
		BottomBulb.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
		BottomBulb.position.set( 0, -9, 0 );      
		
		//BULB 3
		let TopBulb = new THREE.PointLight(lightsColor, 1, topBulbLum, 20 );
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
		let floorGeometry = new THREE.PlaneBufferGeometry( 900, 900, 8, 8 );
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

		this.setState({
			//STORING STATE FOR THE SHAPES ROTATION DISTANCE, FOR WHEN A NEW SHAPE IS SPAWNED
			shapeRotationX : newShapeStateX,
			shapeRotationY : newShapeStateY,
		}, () => {
			this.shape.rotation.x = this.state.shapeRotationX;
			this.shape.rotation.y = this.state.shapeRotationY;   
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
			bottomBulbSpeed: bottomBulbSpeedNext,
			middleBulbLum: middleBulbLumNext,
			topBulbLum: topBulbLumNext,
			bottomBulbLum: bottomBulbLumNext 
		} = nextProps;
		this.setState({ 
			sizeValue: sizeValueNext, 
			color: colorNext, 
			vertices: verticesNext, 
			lightsColor: lightsColorNext, 
			middleBulbSpeed: middleBulbSpeedNext,
			topBulbSpeed: topBulbSpeedNext,
			bottomBulbSpeed: bottomBulbSpeedNext,
			middleBulbLum: middleBulbLumNext,
			topBulbLum: topBulbLumNext,
			bottomBulbLum: bottomBulbLumNext 
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