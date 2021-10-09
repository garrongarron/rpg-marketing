const geometry = new THREE.BoxGeometry( 1,1,1 );
const material = new THREE.MeshStandardMaterial(
    {
        color: 0x00ff00,
        // wireframe:true
    }
 );
const cube = new THREE.Mesh( geometry, material );
cube.castShadow = true; //default is false
cube.receiveShadow = true; //default
cube.name = 'cube'; //default


export default cube