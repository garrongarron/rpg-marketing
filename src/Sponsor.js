let sponsor = () => {
    var htmlImageElement = new Image();
    let url = 'src/basic/environment/cloth/Three-Basico.png'
    htmlImageElement.src = url;
    htmlImageElement.width = 70
    htmlImageElement.classList.add('sponsor')
    htmlImageElement.classList.add('sponsor')
    htmlImageElement.title = "Aprende a hacer videojuegos en 3D"
    htmlImageElement.alt = "Aprende a hacer videojuegos en 3D"

    htmlImageElement.addEventListener('click', () => {
        let url = 'https://www.udemy.com/course/threejs-basico-en-espanol/?referralCode=3985668E0F426CD1BA37'
        window.open(url, '_blank');
    })
    document.body.appendChild(htmlImageElement);


}

export default sponsor