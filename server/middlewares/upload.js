import multer from "multer";
import moment from "moment";
import _ from 'lodash';
import fs from "fs";


const folderPath = 'public/images/big';

fs.stat(folderPath, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  const createdDate = new Date(stats.ctime);

  const currentDate = new Date();

  const diff = currentDate.getTime() - createdDate.getTime();

  const week = 7 * 24 * 60 * 60 * 1000;

  if (diff > week) {
    const date = currentDate.toISOString().slice(0, 10);
    const newFolderPath = `${folderPath}-${date}`;
    fs.mkdir(newFolderPath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
console.log(`New folder created: ${newFolderPath}`);
    });
  }
});


const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/images/big')
    },
    filename(req, file, cb) {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      let ext = '';
      if (file.mimetype === 'image/jpeg') ext = '.jpg';
      else if (file.mimetype === 'image/svg+xml') ext = '.svg';
      else if (file.mimetype === 'image/png') ext = '.png';
    
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  })

const limit = {
    fileSize: 1024 * 1024 * 50
}


const upload = multer({
    storage: storage,
    limits: limit
})

export default upload;