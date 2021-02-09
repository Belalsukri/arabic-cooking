import React,{useEffect,useRef} from 'react'
import {useForm} from 'react-hook-form'
import {addBlog} from '../services/api'
import {useHistory} from 'react-router-dom'
import Tinymce from './Tinymce'
const AddBloger = () => {
  const history=useHistory()


    const {register,handleSubmit}= useForm()
    const imagesFileInpRef = useRef()
    const description = useRef()
    useEffect(() => {
      const dec=description.current.state
       console.log(dec);
    }, [])
    const onSubmits=(data)=>{
        const imgs=imagesFileInpRef.current.files
        const dec=description.current.state.content
        
    console.log(data.text,data.supTitel,dec ,data.urlVideo,data.Kategorie, data.url,imgs);
    addBlog(data.text,data.supTitel,dec,data.urlVideo,data.Kategorie, data.url,imgs).then(dat=>{
        console.log(dat);
        if (dat===1) {
          
          history.push('/')
        }
        if (dat===3) {
          alert('العنوان موجود يرجى تغير العنوان')
        } else {
          alert('هناك خطاء اعد تعبئه البينات')
        }
       
    })
    
    }
    return (
        <div className="container-fluid backg admin ">
        <div className="row justify-content-center ">
          
      
          <div className="col-sm-9 mt-5 pt-5">
                 
                
            <div className="form"> 
                  
            <form onSubmit={handleSubmit(onSubmits)}>
                     
                <div className="form-group row">
                  <strong htmlFor="colFormLabel  " className="col-sm-2 col-form-label  text-primary">Titel </strong>
                  <div className="col-sm-6">
                    <input type="text"name='text' 
                     className="form-control"  placeholder="Titel"
                     ref={register} />
                  </div>
                </div>  
      
                <div className="form-group row">
                  <strong htmlFor="colFormLabel  " className="col-sm-2 col-form-label  text-primary">sup Titel </strong>
                  <div className="col-sm-6">
                    <input type="text"name='supTitel'
                     className="form-control" id="sumTitleInp" placeholder="sumTitel"
                     ref={register} />
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
                 <Tinymce ref={description} /> 
                {/* <div className="form-group row">
                      <strong htmlFor="descriptionInp  " className="col-sm-2 col-form-label  text-primary">Beschreibung</strong>
                  <div className=" mt-2 col-sm-8">
                    <textarea className="form-control text-white"
                    id='description' name='textarea'ref={description} rows="3"></textarea>
                  </div>
                </div> */}
                <br/>
             
                 <div className="form-group row mt-2">
                  <strong htmlFor="colFormLabel" className="col-sm-2 col-form-label  text-primary">urlVideo </strong>
                  <div className="col-sm-6">
                    <input type="text" className="form-control" id="urlVideo"
                    name="urlVideo" ref={register} placeholder="url"/>
                  </div>
                </div>  
                <br/>
      
                <div className="form-group row">
                  <strong htmlFor="colFormLabel" className="col-sm-2 col-form-label  text-primary">Url </strong>
                  <div className="col-sm-6">
                    <input type="url" name="url" className="form-control"
                     ref={register} placeholder="url"/>
                  </div>
                </div>  
              <hr/>
              
                <div className="form-group row">
                <strong htmlFor="colFormLabel  " className="col-sm-2 col-form-label  text-primary"> Kategorie</strong>
                <select className="custom-select col-sm-6 mt-2" name="Kategorie"ref={register} >
                  <option  defaultValue='منوعات'>منوعات عامه</option>
                  <option value="صحه"> صحه</option>
                  <option value="حيل وافكار ">حيل وافكار </option>
                  <option value="اخرالاخبار">اخر الاخبار</option>
                  <option value="اطباق عربيه">اطباق عربيه </option>
                  <option value="حلويات عربيه">حلويات عربيه </option>
                  <option value="طبخ">طبخ </option>
                </select>
              </div> 
                   
           
            
            <strong htmlFor="colFormLabel  " className="col-sm-4 col-form-label   text-primary">Daten abspeichern</strong>
            <button type="submit" id="SaveBtn" className="btn btn-primary btn-lg col-4">save</button>
              
           
        
            </form>
      </div>
      </div>
      </div>
      </div>
      
    )
}

export default AddBloger
