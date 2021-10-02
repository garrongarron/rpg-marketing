const geometry = new THREE.PlaneGeometry(3,3,10,10);
let colorStr = Math.random().toString().slice(2, 8)
const material = new THREE.MeshBasicMaterial({ 
    color: '#' + colorStr, side: THREE.FrontSide,
    // wireframe:true
 });
const plane = new THREE.Mesh(geometry, material);

export default plane