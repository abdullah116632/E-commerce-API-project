const multer = require("multer");
// const path = require("path");

const USER_DIR = process.env.UPLOAD_USER_IMG_DIRECTORY;
const PRODUCT_DIR = process.env.UPLOAD_PRODUCT_IMG_DIRECTORY;
const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE) ||  2097152 // 1024 * 1024 * 2 kB
const ALLOWED_FILE_TYPES = ["image/jpg", "image/jpeg", "image/png"]


const userStorage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, USER_DIR)
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + "-" + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if(!file.mimetype.startsWith("image/")){
        return cb(new Error("Only image files are allowed"), false);
    }
    if(file.size > MAX_FILE_SIZE){
        return cb(new Error("File size exit the limit"), false);
    }
    if(!ALLOWED_FILE_TYPES.includes(file.mimetype)){
        return cb(new Error("File extention is allowed"), false)
    }
    cb(null, true);
}

const productStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, PRODUCT_DIR)
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const uploadUserImage = multer({
    storage: userStorage,
    fileFilter
});

const uploadProductImage = multer({
    storage: productStorage,
    fileFilter
});

module.exports = {uploadUserImage, uploadProductImage};