import express from 'express';
import dotenv from 'dotenv';
import parser from 'body-parser';
import allRoutes from './routes'

dotenv.config();

const app = express();

// configuring body-parser to app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const basePath = '/api'
app.use(basePath, allRoutes)


app.get('/', (req, res) => {
  res.status(500).json({ status: 200, message: 'welcome to IRIS' });
});

app.get("/sayhello", (req, res) => {
    res.json({
        message: 'hello',
        status: 200
    });
});

app.get('*', (req, res) => {
  res.status(404).json({ status: 404, message: 'Resource not found' });
});

const port = process.env.PORT
app.listen(port, () => {
  console.log(`IRIS server is running on port ${port}`);
});

export default app;
