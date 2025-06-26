import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';

export const storage = diskStorage({
  destination: './uploads/places',
  filename: (req, file, callback) => {
    const ext = extname(file.originalname);
    callback(null, `${uuid()}${ext}`);
  },
});
