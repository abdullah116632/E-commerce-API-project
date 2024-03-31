const multer = require("multer");
// const path = require("path");

// const UPLOAD_DIR = process.env.UPLOAD_DIRECTORY;
const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE) ||  2097152 // 1024 * 1024 * 2 kB
const ALLOWED_FILE_TYPES = ["image/jpg", "image/jpeg", "image/png"]


const storage = multer.memoryStorage();

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

const upload = multer({
    storage: storage,
    fileFilter
});

module.exports = upload;