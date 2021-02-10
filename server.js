const express =require('express');
const fileupload = require('express-fileupload')
const cookie = require('cookie-parser')
const dataModule = require('./modules/mongooseDataModule')
const fs = require('fs')
const app=express();
const path =require('path')

app.use(express.urlencoded({extended: false}))
app.use(express.json());
//app.use(express.static(__dirname + '/client/build'))
const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`App listening on port ${port}!`);
})
app.use(cookie());
app.use(fileupload({
    limits: { fileSize: 50 * 1024 * 1024 }
}))

app.post('/addBlog', (req, res) => {
    if (req.files) {
    const textTitel = req.body.textTitel
    const supTitel = req.body.supTitel
    const textarea = req.body.textarea
    const urlVideo = req.body.urlVideo
    const Kategorie = req.body.Kategorie
    const url = req.body.url
     console.log( textTitel,supTitel, textarea,urlVideo,Kategorie,url);
    const imgs =[]
    for(const key in req.files){
        if (req.files[key].mimetype !='application/pdf') {
            imgs.push(req.files[key])
             
        }
    }    
   
        dataModule.addProduct(textTitel,supTitel, textarea,urlVideo,Kategorie,url,imgs ).then(() => {
            res.json(1)
        }).catch(error => {
            if (error == 3) {
                res.json(3)
            }else{
                res.json(4)
            }
        })
    } else {
        res.json(2)
    }
    
    })

    app.post('/getallbloger',(req,res)=>{
        dataModule.getAllProducts().then(bloger => {
            res.json(bloger)
        }).catch(error => {
            res.json(error)
        })
    })
    
    
    app.post('/getbloger', (req, res) => {
        const bookId = req.body.id
        
        dataModule.getProduct(bookId).then(data => {
    
            res.json(data)
        }).catch(error => {
            res.json(2)
        })
    });

    
   app.post('/updateBlog', (req, res) => {
    const {newtitle, newsupTitel, newtextarea, newurlVideo,newKategorie,newurl,newImgsUrl,oldImgs,blogId} = req.body
    // console.log(newtitle, newsupTitel, newtextarea, newurlVideo,newKategorie,newurl,newImgsUrl,oldImgs,blogId )
    //console.log(req.files)
  
    let newImgs = []
   
    if (req.files){
        for (const key in req.files) {
            if (req.files[key].mimetype != 'application/pdf') {
                newImgs.push(req.files[key]) 
            }
        }
    }

    let oldImgsUrlsArr =  JSON.parse(oldImgs)
    oldImgsUrlsArr = oldImgsUrlsArr.map(element => {
        return element.substr(element.indexOf('/uploadedfiles/'))
    })
    //console.log(oldImgsUrlsArr);

    dataModule.updateProduct(newtitle, newsupTitel, newtextarea, newurlVideo,newKategorie,newurl,oldImgsUrlsArr,newImgs,blogId ).then((book) => {
res.json(1)
    }).catch(error => {
res.json(2)
    })
})
app.post('/deletebloger', (req, res) => {
    const bookid = req.body.userId
    dataModule.deleteProduct(bookid).then(() => {
        res.json(1)
    }).catch(error => {
        res.json(2)
    })
})

app.post('/kategori',(req,res)=>{
    const kategories = req.body.kategori
    // console.log('kategorie',kategories);
    dataModule.getKategorien(kategories).then((data) => {
        res.json(data)
       
    }).catch(error=>{
     res.send('404,Product could not be found')
 })
 
})



app.post('/bloger',(req,res)=>{
    const id = req.body.id
     console.log('id',id);
    dataModule.getProduct(id).then((data) => {
        res.json(data)
       
    }).catch(error=>{
     res.send('404,Product could not be found')
 })
 
})
//  app.use(express.static(__dirname + '/client/build'))
// app.get('*',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'public','index.html'))
// })
// app.use('/',(req,res)=>{
//     const html =fs.readFileSync(__dirname+'/client/puild/index.html','utf-8')
//     res.send(html)
//  })
 app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

