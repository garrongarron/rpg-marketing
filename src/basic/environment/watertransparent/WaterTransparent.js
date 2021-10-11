const waterGeometry = new THREE.PlaneGeometry(100, 100);
const params = {
    color: '#66ddff',
    scale: 4,
    flowX: -.3,
    flowY: -.3
};


let transparentWater = new THREE.Water(waterGeometry, {
    color: params.color,
    scale: params.scale,
    flowDirection: new THREE.Vector2(params.flowX, params.flowY),
    textureWidth: 1024,
    textureHeight: 1024
});


transparentWater.rotation.x = Math.PI * - 0.5;

transparentWater.position.set(20, 0, 50)
transparentWater.position.y = .5;
transparentWater.position.y = .5;

export default transparentWater