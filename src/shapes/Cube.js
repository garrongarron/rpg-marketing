const geometry = new THREE.BoxGeometry( .01,0.1,0.1 );
const material = new THREE.MeshStandardMaterial(
    // {color: 0x00ff00}
 );
const cube = new THREE.Mesh( geometry, material );
cube.castShadow = true; //default is false
cube.receiveShadow = true; //default

export default cube