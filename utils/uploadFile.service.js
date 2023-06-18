const { mkdirSync } = require("fs");
const createHttpError = require("http-errors");
const md5 = require("md5");
const multer = require("multer");
const path = require("path");

const CreateProfilesPath = () => {
    const directory = path.join(__dirname, "..", "public", "uploads", "profiles");
    mkdirSync(directory, { recursive: true });
    return directory;
}
const CreateImageNameHash = (imageName) => md5(imageName);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file?.originalname) {
            const filePath = CreateProfilesPath();
            req.body.fileUploadPath = filePath;
            return cb(null, filePath);
        }
        return cb(null, null);
    },
    filename: (req, file, cb) => {
        if (file?.originalname) {
            const ext = path.extname(file.originalname);
            const fileName = String(CreateImageNameHash(file.originalname) + ext);
            req.body.fileName = fileName;
            return cb(null, fileName);
        }
        return cb(null, null);
    }
})

function FileFilter(req, file, cb) {
    const MimeTypes = [".png", ".jpg", ".jpeg", ".webp", ".gif"]
    const Ext = path.extname(file.originalname)
    if (MimeTypes.includes(Ext)) {
        return cb(null, true)
    }
    return cb(createHttpError.BadRequest("File Format is not correct!"))
}

const maxSize = 5 * 1000 * 1000; // 5 MB

const UploadFile = multer({
    storage,
    fileFilter: FileFilter,
    limits: {
        fileSize: maxSize
    }
})

module.exports = {
    UploadFile
}
