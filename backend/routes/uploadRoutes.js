import path from "path";
import multer from "multer";
import express from "express";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.filename}-${Date.now()}${extname}`);
  },
});
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpe?g|png|wepg/;
  const mimetypes = /image\/jpe?g|image\/png|image\/wepg/;
  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;
  if (fileTypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images Only"), false);
  }
};
const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      res.status(200).send({
        message: "Image Uploaded Successfully",
        image: `/${req.file.path}`,
      });
    } else {
      res.status(400).send({ message: "Image file is not provided" });
    }
  });
});
export default router;
