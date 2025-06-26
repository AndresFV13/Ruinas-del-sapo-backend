import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const storage = diskStorage({
  destination: './uploads/blogs',
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  },
});
