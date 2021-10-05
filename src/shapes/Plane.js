const geometry = new THREE.PlaneGeometry(600,600,100,100);
let colorStr = Math.random().toString().slice(2, 8)
colorStr = 'ffff00'
const material = new THREE.MeshStandardMaterial({ 
    color: '#' + colorStr, side: THREE.FrontSide,
    wireframe:true
 });
const plane = new THREE.Mesh(geometry, material);
plane.castShadow = true; //default is false
plane.receiveShadow = true; //default
plane.position.set(0,0,0)
plane.layers.enable( 1 );

export default plane