const fs = require("fs").promises;

const deleteImage = async (userImagePath) => {
    try{
        await fs.access(userImagePath);
        await fs.unlink(userImagePath);
        console.log("image was deleted")
    }catch(err){
        console.log("image does not exist")
        throw err;
    }
}

module.exports = {deleteImage}