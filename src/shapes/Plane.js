const geometry = new THREE.PlaneGeometry(1000,1000,100,100);
let colorStr = Math.random().toString().slice(2, 8)
colorStr = 'ffff00'
const material = new THREE.MeshStandardMaterial({ 
    color: '#' + colorStr, side: THREE.BackSide,
    wireframe:true
 });
const plane = new THREE.Mesh(geometry, material);
plane.castShadow = true; //default is false
plane.receiveShadow = true; //default
plane.position.set(0,0,0)
// plane.layers.enable( 1 );
plane.name = 'plane'

export default plane