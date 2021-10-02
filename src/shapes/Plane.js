const geometry = new THREE.PlaneGeometry(100,100,40,40);
let colorStr = Math.random().toString().slice(2, 8)
const material = new THREE.MeshBasicMaterial({ 
    color: '#' + colorStr, side: THREE.FrontSide,
    // wireframe:true
 });
const plane = new THREE.Mesh(geometry, material);
plane.position.set(2,0,3)

export default plane