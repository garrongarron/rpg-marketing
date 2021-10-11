import params from "./Params.js"

let filters = {
    'headQuarter': (x, y, out) => {
        let pos = { x: 0, y: 20, z: -354 }
        let internalRadio = 150
        let externalRadio = 60
        let levelY = pos.y - 3
        //
        let a = new THREE.Vector2(x, y)
        let b = new THREE.Vector2(pos.x, -pos.z)
        let distance = a.distanceTo(b)
        if (distance < internalRadio) {
            let val = (distance - externalRadio) / (internalRadio - externalRadio)
            let lerp = THREE.MathUtils.clamp(val, 0, 1)
            return THREE.MathUtils.lerp(levelY, out, lerp)
        }
        return out
    },
    'lake': (x, y, out) => {
        let pos = { x: 100, y: 0, z: 60 }
        let internalRadio = 60
        let externalRadio = 20
        let levelY = pos.y +2
        //
        let a = new THREE.Vector2(x, y)
        let b = new THREE.Vector2(pos.x, -pos.z)
        let distance = a.distanceTo(b)
        if (distance < internalRadio) {
            let val = (distance - externalRadio) / (internalRadio - externalRadio)
            let lerp = THREE.MathUtils.clamp(val, 0, 1)
            return THREE.MathUtils.lerp(levelY, out, lerp)
        }
        return out
    }
}

console.log('a');
params.filters = (x, y, _out) => {
    let out = filters.headQuarter(x, y, _out)
    out = filters.lake(x, y, out)
    return out
}
