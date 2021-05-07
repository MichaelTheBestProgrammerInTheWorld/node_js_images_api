const { Console } = require('console');
const express = require('express');
const app = express();
const multer = require("multer");
const path = require("path");

//storage engine
//${file.fieldname}_${Date.now()}${path.extname(req.file.originalname)}
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        
    }
})

const upload = multer({
    storage: storage,
})

app.use('/profile', express.static('upload/images'));

app.post("/upload", upload.single('profile'), (req, res)=>{
    console.log(req.file);

    res.json({
        success: 1,
        profile_url: `http://localhost:4000/profile/${req.file.filename}`
    })
})

app.listen(4000, ()=>{
    console.log("server up and running");
})