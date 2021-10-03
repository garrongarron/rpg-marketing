let water = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(16384 + 1024, 16384 + 1024, 16, 16),
    new THREE.MeshLambertMaterial({ color: 0x006ba0, transparent: true, opacity: 0.6 })
);
water.position.y = .45;
water.rotation.x = -0.5 * Math.PI;

export default water