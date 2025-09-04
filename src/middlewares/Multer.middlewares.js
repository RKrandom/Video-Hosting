import multer from 'multer';

//storage engine in disk storage//
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")//location where the file will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname) // How file will be named in the destination folder
  }
})

export const upload = multer({ 
    storage,
})
