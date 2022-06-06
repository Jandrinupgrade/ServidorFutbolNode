const cloudinary = require('cloudinary').v2;

const deleteFile = (imgUrl) =>{
    const imgSplited = imgUrl.split('/'); // Dividimos nuestra url en un array de cadenas por cada separador '/'
    const nameSplited = imgSplited[imgSplited.length - 1].split('.'); // Hacemos otro split para separar nombre de extension
    const folderSplited = imgSplited[imgSplited.length - 2];    //obtenemos la penultima cadena de nuestro array que es la carpeta
    const imgToDelete = `${folderSplited}/${nameSplited[0]}`;   //generamos un valor con carpeta y nobre de archivo
    cloudinary.uploader.destroy(imgToDelete, () => {             //borramos la imagen
        console.log("Image deleted in cloudinary");
    })
}

module.exports = {deleteFile};