import multer from "multer";

// set up storage
const storage = multer.diskStorage(
  {
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // prepend timestamp to avoid files name collision
    }
  }
)

export const upload = multer({ storage })