import React,{useState,useEffect,useRef} from 'react'
import {getBlogPost,updateBlog} from '../services/api'

import { Editor } from '@tinymce/tinymce-react';
import {useParams,useHistory} from 'react-router-dom'


const Editbloger = () => {
    
    const history=useHistory()
    const imagesFileInpRef = useRef()
    const oldimg = useRef()
    
    const params = useParams()
    
    const initialState = {
        bloger: null,
        newImgFiles:[],
        oldimgs:[],
        selctKategorei:''
      }
      const [state, setState] = useState(initialState)

    useEffect(() => {
        getBlogPost(params.id).then(data => {
         console.log(data);
         switch (data) {
            case 2:
              console.log('server error');
              break;
            
    
            default:
              setState({
                ...state,
                bloger: data,
               
              })
              
              break;
          }
        })
    
      },[params.id]);
    
      const titleInpChange = e => {
        const newBloger = {...state.bloger}
        newBloger.title = e.target.value
        setState({
          ...state,
          bloger: newBloger
        })
      }

      const suptitleInpChange = e => {
        const newBloger = {...state.bloger}
        newBloger.supTitel = e.target.value
        setState({
          ...state,
          bloger: newBloger
        })
      }

      const descriptionInpChange =(content ,editor)=> {
        const newBloger = {...state.bloger}
        newBloger.description = content
        setState({
          ...state,
          bloger: newBloger
        })
      }

      const urlVideoInpChange = e => {
        const newBloger = {...state.bloger}
        newBloger.urlVideo = e.target.value
        setState({
          ...state,
          bloger: newBloger
        })
      }
      const urlInpChange = e => {
        const newBloger = {...state.bloger}
        newBloger.urlBlog = e.target.value
        setState({
          ...state,
          bloger: newBloger
        })
      }

      const kategorieInpChange = e => {
        
        const newKategorie = {...state.bloger}
        newKategorie.kategorie = e.target.value
        setState({
          ...state,
          bloger : newKategorie
        })
      }

      
      
      
      
      
      
     
      const saveBtnClick=(e)=>{
        
        e.preventDefault()
   const nowimgs=imagesFileInpRef.current.files
//    const oldimgs=oldimg.current.src
// console.log(oldimgs);
  
   
  

   
    console.log(state.bloger.title,state.bloger.sumTitle, state.bloger.description,state.bloger.urlVideo,state.bloger.kategorie, state.bloger.urlBlog,nowimgs ,state.bloger.imgs, params.id);
    updateBlog(state.bloger.title,state.bloger.sumTitle, state.bloger.description,state.bloger.urlVideo,state.bloger.kategorie, state.bloger.urlBlog,nowimgs, state.bloger.imgs, params.id).then(dat=>{
        console.log(dat);
        switch (dat) {
            
            case 1:
                history.push('/')
                
            break;
           
        
          default:
            imagesFileInpRef.current.value=''
            setState({
                ...state,
                book: dat,
               
              })
            
            break;
        }
      }).catch(error => {
        alert(error)

       
       
    })

    }
    
    const deleteImgClick = (image , e) => {
      e.preventDefault()
      const oldimgs = {...state.bloger}
      oldimgs.imgs.splice(oldimgs.imgs.indexOf(image), 1)
      setState({
        ...state,
        bloger: oldimgs
      })
    }

      if (state.bloger) {
        
      const imagesElement = state
      .bloger
      .imgs
      .map((image, idx) => {
        
       
        return (
          <div key={idx} className="col-md-3">
            <a href="#" className="" onClick={(e) => {deleteImgClick(image, e)}}>X</a>
            <br/>
            <img className="daletimg" ref={oldimg} src={image} alt="" />
          </div>
        )
        
        
      }) 

     
    

    return (
         
        <div className="container-fluid backg admin mt-4 pt-4">
        <div className="row justify-content-center ">
          
      
          <div className="col-sm-9 mt-5">
                 
                
            <div className="form"> 
                  
            <form >
                     
                <div className="form-group row">
                  <label  htmlFor="colFormLabel  " className="col-sm-2 col-form-label  text-primary">Titel </label >
                  <div className="col-sm-6">
                    <input type="text"name='text' 
                     onChange={titleInpChange}
                     className="form-control"  placeholder='Titel'
                     value={state.bloger.title}
                     />
                  </div>
                </div>  
      
                <div className="form-group row">
                  <label  htmlFor="colFormLabel  " className="col-sm-2 col-form-label  text-primary">sup Titel </label >
                  <div className="col-sm-6">
                    <input type="text"name='sumTitle'
                  onChange={suptitleInpChange}
                     className="form-control"  placeholder={state.bloger.sumTitle}
                     
                      />
                  </div>
                </div>  
                      
                <div className=" row">
                <label className='col-12' htmlFor="bookImgsInp"> Images</label>
                    <div className="row col-12">
                    
                         {imagesElement}
                   
                    </div>
                  <label  htmlFor="colFormLabel " className="col-sm-2 mr-md-3 col-form-label  text-primary">Fotos hochladen &nbsp; </label >
                     
                   <div className="custom-file mt-2 col-sm-6">
                    <label className="" htmlFor="imgsInp ">Fotos hochladen</label>
                    <input type="file" className="form-control-file" multiple id="imgsInp/"
                        accept="image/x-png,image/gif,image/jpeg"
                        name='images'ref={imagesFileInpRef}  />
                        onChange={e => {setState({...state, newImgFiles: e.target.files})}}
                       
                   </div>
                </div>
                <br/>
                
                   
                <div className="form-group row">
                      <label  htmlFor="descriptionInp  " className="col-sm-2 col-form-label  text-primary">Beschreibung</label >
                  <div className=" mt-2 col-sm-8">
                    <Editor 
                    init={{
                      statubar: true,
                      width: "100%",
                      height: 300,
                      theme: "silver",
                      skin: "oxide-dark",
                      selector: 'textarea#myTextArea',
                      plugins: [
                          'advlist autolink lists link image charmap print preview anchor',
                          'searchreplace visualblocks code fullscreen',
                          'insertdatetime media table paste code help wordcount'
                        ],
                      toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons",
                      
                    
                  }}
  
                    apiKey='wt8d5rcrexduz1zs6s5ck57ss7u6vwz3p4z5fpavlymw1wmg'
                    tinymceScriptSrc='/path/to/tinymce.min.js'
                     onEditorChange={descriptionInpChange}
                     value={state.bloger.description}
                     placeholder='description'/>
                  </div>
                </div>
                <br/>
             
                 <div className="form-group row mt-2">
                  <label  htmlFor="colFormLabel" className="col-sm-2 col-form-label  text-primary">urlVideo </label >
                  <div className="col-sm-6">
                    <input type="text" className="form-control" id="urlVideo"
                     onChange={urlVideoInpChange}
                     placeholder='urlVideo'
                     value={state.bloger.urlVideo}
                      name="urlVideo" />
                  </div>
                </div>  
                <br/>
      
                <div className="form-group row">
                  <label  htmlFor="colFormLabel" className="col-sm-2 col-form-label  text-primary">Url </label >
                  <div className="col-sm-6">
                    <input type="url" name="url" className="form-control"
                      onChange={urlInpChange}
                     placeholder='Url'
                     value={state.bloger.urlBlog} />
                  </div>
                </div>  
              <hr/>
              
                <div className="form-group row">
                <label  htmlFor="colFormLabel  " className="col-sm-2 col-form-label  text-primary"> Kategorie</label >
                <select className='col-4'  onChange={kategorieInpChange}   value={state.bloger.Kategorie} >   
                
                <option defaultValue>{state.bloger.kategorie}</option>
                <option value="صحه"> صحه</option>
                  <option value="حيل وافكار ">حيل وافكار </option>
                  <option value="اخرالاخبار">اخر الاخبار</option>
                  <option value="اطباق عربيه">اطباق عربيه </option>
                  <option value="حلويات عربيه">حلويات عربيه </option>
                  <option value="طبخ">طبخ </option>
                
                </select>
              </div> 
                   
           
            
            <label  htmlFor="colFormLabel  " className="col-sm-4 col-form-label   text-primary">Daten abspeichern</label >
            <button type="submit" onClick={saveBtnClick} id="SaveBtn" className="btn btn-primary btn-lg col-4">save</button>
              
           
        
            </form>
      </div>
      </div>
      </div>
      </div>
    )
      }else {
        return (
          <div>Loading ....</div>
        )
      }
}

export default Editbloger
