const express = require('express');
const router = express.Router();


const func = require('../controller');

//SETTING API
router.get("/", async function(req,res,next){ 
    let result = await func.getAllUser();
    res.locals.karyawan =  result;
    res.render('index', { csrfToken: req.csrfToken() });
});

router.get("/home", async function(req,res,next){ 
    let result = await func.getAllUser();
    res.locals.karyawan =  result;
    res.render('index', { csrfToken: req.csrfToken() });
});

router.get("/search/:keyword", async function(req,res,next){ 
    let key = '-';
    if(req.params.keyword){
        key = req.params.keyword
    }
    let result = await func.searchUser(key);
    res.send(result);
});

router.get("/prepareEdit/:noinduk", async function(req,res,next){
    let noinduk = req.params.noinduk; 
    let result = await func.getSpecificUserBeforeUpdate(noinduk);
    res.send(result);
});

router.post('/submit_karyawan', async function(req,res,next){
    let result;
    if(req.body.create_or_edit == 'create'){
        result = await func.insertUser(req.body);
    }else{
        result = await func.updateUser(req.body);
    }
    res.redirect('/home');
});

router.post('/hapus-kontak', async function(req,res,next){
    let result = await func.removeUser(req.body);
    res.redirect('/home');
});

router.get("/tiga-karyawan-pertama", async function(req,res,next){ 
    let result = await func.karyawan3();
    res.locals.karyawan =  result;
    
    
    res.render('karyawan3', { csrfToken: req.csrfToken() });
});

router.get("/pernah-cuti", async function(req,res,next){ 
    let result = await func.pernahCuti();
    res.locals.karyawan =  result;
    

    // res.send(result);
    res.render('pernah_cuti', { csrfToken: req.csrfToken() });
});

router.get("/cuti-lebih-dari-sekali", async function(req,res,next){ 
    let result = await func.cutiLebihDari1();
    res.locals.karyawan =  result;

    
    res.render('cuti_lebih1', { csrfToken: req.csrfToken() });
});





module.exports = router;