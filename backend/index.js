import express from 'express';
import bodyparse from 'body-parser'
import userRoutes from './Route/User.js';

const app = express();
const PORT = 8080;


app.use(bodyparse.json())

app.use('/users', userRoutes)

app.listen(
    PORT,
    () => console.log(`Alive on http://localhost:${PORT}`)
)

app.get('/', (req, res) => {
    res.send("Hello there, general konobi!")
});
