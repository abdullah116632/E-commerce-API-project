const fs = require("fs").promises;

const deleteImage = async (userImagePath) => {
    try{
        await fs.access(userImagePath);
        await fs.unlink(userImagePath);
        console.log("user image was deleted")
    }catch(err){
        console.log("user image does not exist")
        throw err;
    }
}

module.exports = {deleteImage}