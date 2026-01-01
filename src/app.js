import express from 'express';
import usersRoutes from './routes/users.routes.js'
import messagesRoutes from './routes/messages.routes.js'

const PORT = process.env.PORT
const app = express();
app.use(express.json())

app.use('/api', usersRoutes)
app.use('/api/messages', messagesRoutes)


app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
})