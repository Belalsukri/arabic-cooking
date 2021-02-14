import React,{useEffect,useState} from 'react'
import {allBlogerPost,deletePost} from '../services/api'
import {Link,useHistory} from 'react-router-dom'
import ConfirmModal from './ConfirmModal'
const Admin = () => {
  const history =useHistory()
  const intialState={
    bloger:[],
    confirmModalShow: false,
    confirmModalElement: null,
    confirmModalPayLoad: null
  }
  const [state,setState] = useState(intialState)
  const deletBtn =(blogerId)=>{
     
    setState({
        ...state,
        confirmModalShow: true,
        confirmModalPayLoad: blogerId,
        confirmModalElement: <p>I hope you know what you are doing , this book gonna be deleted for ever</p>
      })
  }
  
  useEffect(()=>{
    allBlogerPost().then(data=>{
      console.log(data);
      
         setState({...state,bloger:data})
      

  })
  }, [])
  const closeCnfirmModal = () => {
    setState({
      ...state,
      confirmModalShow: false
    })
  }
  const deleteConferm =(blogerId)=>{
       
    deletePost(blogerId).then(dat=>{
        console.log(dat);
        switch (dat) {
            case 1:
                history.push('/')
                break;
                case 2:
                    console.log(('server error'));
                    break;
                   
            default:
                const getblog=[...state.bloger]
                getblog.splice(getblog.indexOf(getblog.find (element=>element._id===blogerId)),1)
                setState({
                 ...state,
                 bloger:getblog,
                 confirmModalShow: false
               })
                break;
        }
        
    })

}

  const BlogersElement =state.bloger.map(blog=>{
    return(
        <section key={blog._id}>
        <div className='mb-5 bg-light'>
        <div className="card card-plain card-blog ">
        <div className="row">
          <div className="col-md-5">
            <div className="card-header card-header-image">
              <Link to="">
                <img className="img"src={blog.imgs[0]} alt="img"/>
              </Link>
            <div className="colored-shadow" >
            </div>
            </div>
          </div>
          <div className="col-md-7">
           
            <h3 className="card-title">
              <Link to="">{blog.title}</Link>
            </h3>
            <h5 className="font-weight-bold">
              {blog.sumTitle}
            </h5>
            <p className="card-description">
            {blog.description}
              <Link to=""> Read More </Link>
            </p>
            <p>{blog.date} </p>
            <p className="author">
              
              <Link to="{blog.urlBlog}">
                <b>{blog.urlBlog}</b>
              </Link>
            </p>
            <button type="button" className="btn btn-success col-5"><Link className="text-white" to={"/editbloger/"+blog._id}>Edit</Link></button>
            <button type="button" className="btn btn-danger col-5"><Link className="showDeleteModalBtn text-white" onClick={()=>{deletBtn(blog._id)}} to="#">Delete</Link></button>
          </div>
        </div>
      </div>

        </div>
        </section>
    )
    })

    return (
      <React.Fragment>
      <ConfirmModal  className="bg-danger"
          show={state.confirmModalShow}
          close={closeCnfirmModal}
          title="Confirm Delete"
          payload={state.confirmModalPayLoad}
          onConfirm ={deleteConferm}
  >
          {state.confirmModalElement}
      </ConfirmModal>
        <div className="container-fluid backg">
      <div className="row  ">
        <div className="row  col-sm-12  col-lg-12 mt-5">
            <h3 className="col-sm-12 text-white mt-auto p-2 d-flex justify-content-center my pt-4">مرحبا بكم في صفحتك الشخصية</h3>
            <div className="col-sm-12 mr-5">
                <h3><span className="p-3 badge badge-dark"><a href="/addBloger" className="badge badge-dark"> اضافه  مقال  جديد....</a></span></h3>    
                  
            </div>
            
            
              
                  <div className="container-fluid">  
                  
                
                   
                              {BlogersElement}
                    </div>
                    <div className="col-12">
                        <div className="col-11 mt-2">
                         <nav aria-label="...">
                
                             <ul className="pagination  justify-content-center">
                                
                                 
                               <li className="page-item "><a className="page-link fn-link" href="/admin-alla-0000/<%= i%>"> </a></li>
                             
                             </ul>
                             
                           </nav>
                        </div>
                
                     </div> 
                    
                    </div> 
                 
               
              
                   
       
      </div>
    </div>
    
    
    </React.Fragment>
    
    )

}

export default Admin
