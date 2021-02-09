const mongoose =require('mongoose')
const fs= require("fs")
const connectionString = 'mongodb+srv://alaa:alaa0966405529@alaa.fetj3.mongodb.net/bloger?retryWrites=true&w=majority'
function connect() {
    return new Promise((resolve, reject) => {
        if (mongoose.connection.readyState === 1) {
            resolve()
        } else {
            mongoose.connect(connectionString, {
                useUnifiedTopology: true,
                useCreateIndex: true,
                useNewUrlParser: true
            }).then(() => {
                resolve()
                console.log('hello mongoose');
            }).catch(error => {
                reject(error)
            })
        }
    })
  }

//////
const Schema = mongoose.Schema
// ..................................................................... //
const productSchema = new Schema({

    title:{
        type:String,
        required:true,
    },
    sumTitle:{
        type:String,
        required:true,
    },
    urlBlog:{
        type:String,
        required:true,
    },
    urlVideo:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    kategorie:{
        type:String,
        required:true
    },
   date:{
       type:Date,
       required:true
    },
    imgs:{
        type:[String],
        required:true,
        min:1
    },

})
const Product =mongoose.model('product',productSchema)
// ..................................................................... //
function addProduct(title,sumTitle , description,urlVideo, Kategorie,urlBlog ,productImgs) {
    return new Promise((resolve, reject) => {
        connect().then(()=>{
            Product.findOne({title: title,}).then(findP => {
               //  console.log(findP);
                 if(findP) {
                   reject(3)
                 } else {
                    // create images array to be saved in database
                    const imgsArr = []
                    productImgs.forEach((img, idx) => {
                        // get file extension
                          let ext = img.name.substr(img.name.lastIndexOf('.'))
                          // set the new image name
                          let newName = title.trim().replace(/ /g, '_') + '_' + idx + ext
                          img.mv('./client/public/uplodeFiles/' + newName)
                          imgsArr.push('/uplodeFiles/' + newName)
                    });
                      const newProduct =new Product({
                        title: title,
                        sumTitle:sumTitle,
                        urlBlog:urlBlog,
                        urlVideo,urlVideo,
                        description: description,
                        imgs: imgsArr,
                        kategorie:Kategorie,
                        date:Date() 
                        
                    })
                    newProduct.save().then(response => {
                        //console.log(response);

                              resolve()

                      }).catch(error => {
                        console.log(error.code);

                      })
                }
            }).catch(error => {

              reject(error)
            })

    }).catch(error => {
        reject(error)
    })
})
}
// ..................................................................... //
function getAllProducts() {
    return new Promise((resolve, reject) => {
     
        connect().then(() => {
          
            Product.find().sort({"date": -1}).then(blogers => {
               
                blogers.forEach(blog => {
                  
                    blog['id'] = blog['_id']
                })
                
                resolve(blogers)
            }).catch(error => {
              
                reject(error)
            })
            })
                
    }).catch(error => {

        reject(error)
    })

}
// ..................................................................... //
function getProduct(id) {
    return new Promise((resolve, reject) => {
        connect().then(() => {
            
            Product.findOne({_id: id}).then(product=>{
                resolve(product)
                // console.log('db'+ {product});

          }).catch(error => {

            reject(error)
        })
          }).catch(error => {

            reject(error)
        })
    })

}
// ..................................................................... //
function updateProduct(newtitle, newsupTitel, newtextarea, newurlVideo,newKategorie,newurl,oldImgsUrlsArr,newImgs,blogId ) {
    return new Promise((resolve, reject) => {
    try {
       
        (async()=>{
        let result =await getProduct(blogId)
        oldProductData = result
        const deletedImgs=[]
        const keepImgs=[]
       
        result.imgs.forEach(img =>{
            if (oldImgsUrlsArr.indexOf(img) >= 0) {
                keepImgs.push(img)
            } else {
                deletedImgs.push(img)
            }
        })
        
        ///
        const newImgsUrlsArr=[]
        newImgs.forEach((img, idx) =>{
            const imgExt =img.name.substr(img.name.lastIndexOf('.'))
            console.log(imgExt);
            const newImgName=newtitle.trim().replace(/ /g, '_') + '_' +(oldProductData.__v+1)+imgExt
            newImgsUrlsArr.push('/uplodeFiles/'+newImgName)
            img.mv('./client/public/uplodeFiles/'+newImgName)
        })
        deletedImgs.forEach(file=>{
            if (fs.existsSync('./client/public'+file)) {
                fs.unlinkSync('./client/public'+file)
            }
        })

         await Product.updateOne({_id: blogId},{

                title:newtitle,
                description:newtextarea,
                imgs:[...keepImgs, ...newImgsUrlsArr],
                sumTitle:newsupTitel,
                urlBlog:newurl,
                urlVideo:newurlVideo,
                kategorie:newKategorie,
                $inc:{__v:1}
        })

        resolve()
       
   
})()
} catch (error) {
    reject(error)
}
})
}
// ..................................................................... //
function deleteProduct(productid) {
    return new Promise((resolve, reject) => {
        getProduct(productid).then(prod => {
            
                    if (fs.existsSync('./public' + prod.imgs)){
                        fs.unlinkSync('./public' + prod.imgs)
                    }
                Product.deleteOne({_id:productid}).then(() => { 
                        resolve()
                    }).catch(error => {
                        
                        reject(error)
                    })
        }).catch(error => {
            reject(error)
        })
    })  
  }
    // ..................................................................... //
  function getKategorien(kategorie) {
    return new Promise((resolve, reject) => {
        connect().then(() => {
            getAllProducts().then(prodts => {
            Product.find({kategorie:kategorie}).then(kategor =>{

            resolve(kategor)
                console.log(kategor);

          }).catch(error => {

            reject(error)
        })


    }).catch(error => {

        reject(error)
    })
}).catch(error => {

    reject(error)
})
})
}
// ..................................................................... //

module.exports={
    addProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getKategorien
}