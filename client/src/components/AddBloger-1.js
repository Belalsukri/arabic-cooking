import React,{useState, useRef } from 'react'
import axios from 'axios'

const AddBloger = () => {
    const intialState = {
        title: '',
        supTitel:'',
        description: '',
        urlVideo:null,
        url:'',
        Kategorie:''
       
      }
      const [state,
        setState] = useState(intialState)
    const imagesFileInpRef = useRef()
    
      
        const bookSaveBtnClick = async e =>{
            e.preventDefault()
            const fd = new FormData()
            fd.append('textTitel', state.title)
            fd.append('supTitel', state.supTitel)
            fd.append('textarea', state.textarea)
            
                fd.append('imgs', imagesFileInpRef.current.files[0])
           if ( state.urlVideo) {
            fd.append('urlVideo', state.urlVideo)
           } 
            
            fd.append('Kategorie', state.Kategorie)
            fd.append('url', state.url)
            console.log(fd);
           
          try {
              const res =await axios.post('/addBlog',fd, {
                  headers:{
                      'Content-Typo': 'multipart/form-data'
                  }
              })
              console.log('exist');
          } catch (error) {
              if(error.response.status ===500){
                  console.log('problem with the server');
              }else{
                  console.log(error);
              }
          }

        }    
    
    
    
    return (
        <div className="container-fluid backg">
        <div className="row justify-content-center mt-5">
          
      
          <div className="col-sm-9 mt-5">
                 
                
            <div className="form"> 
                  
            <form >
                     
                <div className="form-group row">
                  <strong htmlFor="colFormLabel  " className="col-sm-2 col-form-label  text-primary">Titel </strong>
                  <div className="col-sm-6">
                    <input type="text"name='text' 
                     className="form-control"  placeholder="Titel"
                     value={state.title}
                      onChange={e => {
                      setState({
                        ...state,
                        title: e.target.value
                      })
                    }} />
                  </div>
                </div>  
      
                <div className="form-group row">
                  <strong htmlFor="colFormLabel  " className="col-sm-2 col-form-label  text-primary">sup Titel </strong>
                  <div className="col-sm-6">
                    <input type="text"name='supTitel'
                     className="form-control" id="sumTitleInp" placeholder="sumTitel"
                     value={state.supTitel}
                      onChange={e => {
                      setState({
                        ...state,
                        supTitel: e.target.value
                      })
                    }} />
                  </div>
                </div>  
                      
                <div className=" row">
                    
                  <strong htmlFor="colFormLabel " className="col-sm-2 mr-md-3 col-form-label  text-primary">Fotos hochladen &nbsp; </strong>
                     
                   <div className="custom-file mt-2 col-sm-6">
                    <label className="" htmlFor="imgsInp ">Fotos hochladen</label>
                    <input type="file" className="form-control-file" multiple id="imgsInp/"
                        accept="image/x-png,image/gif,image/jpeg"
                        name='images' ref={imagesFileInpRef} />
                       
                   </div>
                </div>
                <br/>
                   
                <div className="form-group row">
                      <strong htmlFor="descriptionInp  " className="col-sm-2 col-form-label  text-primary">Beschreibung</strong>
                  <div className=" mt-2 col-sm-8">
                    <textarea className="form-control text-white"
                     name='textarea'value={state.description}
                     onChange={e => {
                     setState({
                       ...state,
                       description: e.target.value
                     })
                   }} rows="3"></textarea>
                  </div>
                </div>
                <br/>
             
                 <div className="form-group row mt-2">
                  <strong htmlFor="colFormLabel" className="col-sm-2 col-form-label  text-primary">urlVideo </strong>
                  <div className="col-sm-6">
                    <input type="text" className="form-control" id="urlVideo"
                    name="urlVideo"value={state.urlVideo}
                    onChange={e => {
                    setState({
                      ...state,
                      urlVideo: e.target.value
                    })
                  }} placeholder="url"/>
                  </div>
                </div>  
                <br/>
      
                <div className="form-group row">
                  <strong htmlFor="colFormLabel" className="col-sm-2 col-form-label  text-primary">Url </strong>
                  <div className="col-sm-6">
                    <input type="url" name="url" className="form-control"
                     value={state.url}
                     onChange={e => {
                     setState({
                       ...state,
                       url: e.target.value
                     })
                   }} placeholder="url"/>
                  </div>
                </div>  
              <hr/>
              
                <div className="form-group row">
                <strong htmlFor="colFormLabel  " className="col-sm-2 col-form-label  text-primary"> Kategorie</strong>
                <select className="custom-select col-sm-6 mt-2" name="Kategorie"value={state.Kategorie}
                      onChange={e => {
                      setState({
                        ...state,
                        Kategorie: e.target.value
                      })
                    }} >
                  <option  defaultValue='منوعات'>منوعات عامه</option>
                  <option value="صحه"> صحه</option>
                  <option value="رياضه">رياضه</option>
                  <option value="اخرالاخبار">اخر الاخبار</option>
                  <option value="تكنولوجيا">تكنولوجيا </option>
                  <option value="منوعات">منوعات </option>
                  <option value="ثقافه">ثقافه </option>
                  <option value="سياحه وسفر">سياحه وسفر </option>
                  <option value="قران">قران</option>
                  <option value="طبخ">طبخ </option>
                  <option value="علوم">علوم</option>
                </select>
              </div> 
                   
           
            
            <strong htmlFor="colFormLabel  " className="col-sm-4 col-form-label   text-primary">Daten abspeichern</strong>
            <button onClick={bookSaveBtnClick} type="submit" id="SaveBtn" className="btn btn-primary btn-lg col-4">save</button>
              
           
        
            </form>
      </div>
      </div>
      </div>
      </div>
      
    )
}

export default AddBloger
