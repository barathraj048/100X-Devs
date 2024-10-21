import express ,{ Request, Response } from 'express';

const app = express();

enum StatusCode {
   success = 200,
   notFound = 404,
   userError = 500
}

app.get('/', (req:Request, res:Response) => {
   res.status(StatusCode.success).json({ message: 'Request was successful!' });
});

app.listen(3000, () => {
   console.log('Server is running on port 3000');
});
