/**
 * 
 * @param {*} arr 
 * @param {*} index 
 * @returns 
 */
let terrain = (x, y) =>{
    return 5*Math.sin(x/10)*Math.sin(y/10)
}


export default terrain