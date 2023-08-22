import multer from "multer";
import moment from "moment";
import _ from 'lodash';
import fs from "fs"

const folderPath = 'public/files/';


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
        cb(null, 'public/files/')
    },
    filename(req, file, cb){
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `unknown-games-small-${file.originalname}`);   
    }
})

const limit = {
    fileSize: 1024 * 1024 * 100
}

const fileFilter = function(req, file, cb) {
    if (file.mimetype !== 'application/x-bittorrent') {
      cb(new Error('File type not supported'), false);
    } else {
      cb(null, true);
    }
  };

const uploadfile = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limit
})

export default uploadfile;