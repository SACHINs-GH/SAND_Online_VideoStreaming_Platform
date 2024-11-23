import multer from 'multer';

let storage;
try {
   storage = multer.diskStorage({
      destination: function (req, file, cb) { 
        cb(null, "./public/temp");
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      }
    });
} catch (error) {
  console.log("Multer error: ", error);
}

export const upload = multer({ storage: storage });
