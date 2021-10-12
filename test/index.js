// import "./style.scss";

const lazy = async () =>{
    let module = await import('./lazyLoad.js')
    console.log(module.msg);
    console.log(module.message());
    let lazy = new module.default
    console.log(lazy.message())
}

setTimeout(() => {
    lazy()
}, 3000);