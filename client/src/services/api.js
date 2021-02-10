

export const addBlog=(textTitel,supTitel, textarea,urlVideo,Kategorie,url,imgs)=>{
    
    return new Promise((resolve, reject)=>{
        const fd = new FormData()
fd.append('textTitel', textTitel)
fd.append('supTitel', supTitel)
fd.append('textarea', textarea)
for (let i = 0; i < imgs.length; i++) {
    fd.append('imgs' + i, imgs[i])
}
   if (urlVideo !=='') {
    fd.append('urlVideo', urlVideo)
   } else {
    fd.append('urlVideo', 'undefined')
   }


fd.append('Kategorie', Kategorie)
fd.append('url', url)

        fetch('/addBlog',{
            method:'POST',
            
            body:fd
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                   
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            }else{
                reject(new Error('can not send data to server. response number is :'+response.status))
            }
        }).catch(error => {
            reject(error)
        })

    })
    
}

export const allBlogerPost=()=>{
    return new Promise((resolve, reject)=>{
     fetch('/getallbloger',{
         method:'POST',
         headers:{
            'Content-Type':'application/json'
        },
     }).then(response => {
        if (response.status === 200) {
            response.json().then(data => {
               
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        }else{
            reject(new Error('can not send data to server. response number is :'+response.status))
        }
    }).catch(error => {
        reject(error)
    })
})
    }

    export const getBlogPost=(blogerId) => {
        return new Promise((resolve, reject) => {
            const data = {
                id: blogerId
            }
            fetch('/getbloger', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        resolve(data)
                    }).catch(error => {
                        reject(error)
                    })
                } else {
                    reject(new Error('can not get the data, response number is: ' + response.status))
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    export const updateBlog=(title,supTitel, textarea,urlVideo,Kategorie, url,imgs,oldImgss,blogId)=>{
        return new Promise((resolve, reject) => {
            const fd = new FormData()
            fd.append('newtitle', title)
            fd.append('newsupTitel', supTitel)
            fd.append('newtextarea', textarea)
            fd.append('newurlVideo', urlVideo)
            fd.append('newKategorie', Kategorie)
            fd.append('newurl', url)
            
            for (let i = 0; i < imgs.length; i++) {
                fd.append('newImgs' + i, imgs[i])
            }
            const oldImgsll=oldImgss
            const oldImgs = []
            oldImgsll.forEach(img => {
                oldImgs.push(img.src)
               
            })
            fd.append('oldImgs',JSON.stringify(oldImgs))
            fd.append('blogId', blogId)
            fetch('/updateBlog', {
                method: 'POST',
                body: fd
            }).then(response => {
                if(response.status === 200) {
                    response.json().then(data => {
                        resolve(data)
                    }).catch(error => {
                        reject(error)
                    })
                } else {
                    reject(new Error('can not get the data, response number is: ' + response.status))
                }
            }).catch(error => {
                reject(error)
            })
        })
        }

        export const deletePost=(userId)=>{
            const sendData={
                userId,
            }
            return new Promise((resolve, reject)=>{
                fetch('/deletebloger',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(sendData)
                }).then(response => {
                    if (response.status === 200) {
                        response.json().then(recivedData => {
                           
                            resolve(recivedData)
                        }).catch(error => {
                            reject(error)
                        })
                    }else{
                        reject(new Error('can not send data to server. response number is :'+response.status))
                    }
                }).catch(error => {
                    reject(error)
                })
        
            })
            
        }

        export const katgoriePost=(kategori)=>{
            return new Promise((resolve, reject)=>{
            const sendData={
                kategori,
            }
           
                fetch('/kategori',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(sendData)
                }).then(response => {
                    if (response.status === 200) {
                        response.json().then(recivedData => {
                            console.log(recivedData);
                            resolve(recivedData)
                        }).catch(error => {
                            reject(error)
                        })
                    }else{
                        reject(new Error('can not send data to server. response number is :'+response.status))
                    }
                }).catch(error => {
                    reject(error)
                })
        
            })
            
        }
    
        export const blogerPost=(id)=>{
            return new Promise((resolve, reject)=>{
            const sendData={
                id,
            }
           
                fetch('/bloger',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(sendData)
                }).then(response => {
                    if (response.status === 200) {
                        response.json().then(recivedData => {
                            console.log(recivedData);
                            resolve(recivedData)
                        }).catch(error => {
                            reject(error)
                        })
                    }else{
                        reject(new Error('can not send data to server. response number is :'+response.status))
                    }
                }).catch(error => {
                    reject(error)
                })
        
            })
            
        }