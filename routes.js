// Module Routing

const router = require('express').Router();

// Menangani file upload

const multer = require('multer');
const upload = multer({dest: 'uploads'});

// Menangani library file system

const fs = require('fs');
const path = require('path');

// Routing dengan method get

router.get('/', (req, res) => {
    res.send({
        status: 'Succesfully',
        message: 'Welcome to express js tutorial'
    });
});

router.get('/home', (req, res) => {
    res.send('<h1> Selamat Datang di class Eduwork materi Express JS </h1>');
})

// Dynamic Routing

router.get('/product/:id', (req, res) => {
    // res.send itu bisa kirim data berupa html ataupun json
    res.send({
        id: req.params.id
    });
});

// Destructuring Dynamic Routing

router.get('/:category/:tag', (req, res) => {
    const {category, tag} = req.params;
    // sedangkan res.json itu spesifik hanya ke data json
    res.json({category, tag});
});

// Routing dengan query string (parameternya key dan value)

router.get('/product', (req, res) => {
    const {merk, harga} = req.query;
    res.send({merk, harga});
});

// Menangani req.body dengan middleware

router.post('/product/', upload.single('image'), (req, res) =>{
    const {merk, harga, tersedia, status} = req.body;
    const image = req.file;
    if(image){
        const target = path.join(__dirname, 'uploads', image.originalname);
        fs.renameSync(image.path, target);
        // res.json({
        //     merk,
        //     harga,
        //     tersedia,
        //     status,
        //     image
        // });
        res.sendFile(target);
    }
    
}); 

// membuat fungsi router agar dapat digunakan di file lain

module.exports = router;