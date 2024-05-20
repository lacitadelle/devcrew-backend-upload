import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { upload } from './upload.js';


const app = express();
const PORT = 8401;

app.use(cors());
app.use(morgan(":method :url :status :response-time ms - :res[content-length]"));

app.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: "Please select a file" })
  }
  return res.json({
    fileName: req.file.originalname,
    size: `${req.file.size / 1e6}MB`,
    extension: req.file.originalname.split('.').at(-1),
  })
})

app.use('*', (req, res) => {
  return res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND })
})

app.listen(PORT, () => {
  console.log(console.log(('App listening on port ' + PORT)));
})

