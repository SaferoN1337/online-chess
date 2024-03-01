import express from "express";
const app = express();
const port = 3001;

app.use((req, res, next)=> {
    console.log(req.url);
    next();
});
app.use('/assets', express.static('Frontend/dist/assets'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/Frontend/dist/index.html");
});

app.listen(port, () => {console.log(`Server is running on PORT ${port}...`)});