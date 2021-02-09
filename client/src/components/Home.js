import React,{useEffect,useState} from 'react';
import {allBlogerPost} from '../services/api';
import {Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import parse from "html-react-parser"
import { renderToString } from 'react-dom/server'


const Home = ()=> {
    
    const intialState={
        bloger:[],
        
      }
      const [state,setState] = useState(intialState)
      const [pageNumber,setpageNumber] = useState(0)
      useEffect(()=>{
        allBlogerPost().then(data=>{
             setState({...state,bloger:data})  

      })
      }, [])
        const blogPage=6
        const pagesVisited = pageNumber * blogPage
        const BlogersElement = state.bloger.slice(pagesVisited,pagesVisited + blogPage).map(blog=>{
        return(
            <section key={blog._id}>
            <div className='mb-5'>
            <div className="card card-plain card-blog ">
            <div className="row">
              <div className="col-md-5">
                <div className="card-header card-header-image">
                    {blog.urlVideo!='undefined' ?
                    <div class="embed-responsive embed-responsive-4by3" >
                    <iframe  class="embed-responsive-item" height="80%"  src={blog.urlVideo} frameborder="0" allow="accelerometer; autoplay;
                     clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div> :
                    <Link to={"/Bloger/"+blog._id}>
                    <img className="img"src={blog.imgs[0]} alt="img"/>
                  </Link>
                    }
                  
                <div className="colored-shadow" >
                </div>
                </div>
              </div>
              <div className="col-md-7">
               
                <h3 className="card-title">
                  <Link to={"/Bloger/"+blog._id}>{blog.title}</Link>
                </h3>
                <h5 className="font-weight-bold">
                  {blog.sumTitle}
                </h5>
                {/* {blog.description.length>90 ?
                <div className="card-description read" dangerouslySetInnerHTML= {{__html:blog.description.slice(0,10)}}>
                  
               
                  <Link to={"/Bloger/"+blog._id}> Read More </Link>
                </div>
                 :<div className="card-description"dangerouslySetInnerHTML= {{__html:blog.description}}>
                  
               
                   
                 </div>}  */}

                  {blog.description.length>250 ?
                <div className="card-description read">
                  {parse(blog.description.slice(0,250))}
               
                  <Link to={"/Bloger/"+blog._id}> Read More </Link>
                </div>
                 :<div className="card-description">
                  
                  {parse(blog.description)}
                   
                 </div>} 

                <p>{blog.date.split('T')[0] } </p>
                <p className="link-blog">
                  
                  <a target='_blank' href={blog.urlBlog} >
                    <b>{blog.urlBlog}</b>
                  </a>
                </p>
              </div>
            </div>
          </div>

            </div>
            </section>
        )
        })

        const pageCont = Math.ceil(state.bloger.length /blogPage);
        const changePage =({selected})=>{
            
            setpageNumber(selected)  
        };
    return (
 <React.Fragment>
    <div className="page-header col-12 backgrund-1" data-parallax="true" >
        <div className="container"  >
          <div className="row" >
            <div className="col-6 " >
              <div className="brand-1  an" >
                <div className=' chrome mt-4' id="home">
                معنا تجد

                </div>
                <h3 className="prgr prg ">  اهم وافضل الاطباق العربيه 
                  <br/>
                  في عالم الطبخ مع سماح 
                </h3>
              </div>
            </div>

          </div>

        </div>
    </div>
    <div className="main main-raised">
        <div className="profile-content" >
            <div className="container-sm">
                <h3 className="title text-center " id="projects">Nice food & sweet</h3>
                <h4 className="text-center ">اهلا بكم في عالم الطبخ مع سماح </h4>

                    {BlogersElement}

                {/* ............................... */}
                
                <ReactPaginate 
                previousLabel={'السابق'}
                nextLabel ={'التالي'}
                pageCount={pageCont}
                onPageChange={changePage}
                containerClassName={"pagBtn"}
                previousLinkClassName={"preBtn"}
                nextLinkClassName={"nextBtn"}
                disabledClassName={"pagDisanled"}
                activeClassName={"activBtn"}

                />
                <section>
                <div className="section section-contacts mb-5 " id="contact_me">
          <div className="row">
              <div className="col-md-8 ml-auto mr-auto">
                <h2 className="text-center title ml-auto mr-auto text-center font-contact"> اتصل بنا</h2>
                <h4 className="text-center description ">اذا كان لديك اي استفسار او سؤال لاتتردد بلاتصال بنا سوف نرد بافرب وقت</h4>
              </div>



              <form  className="contact-form col-md-7  ml-auto col-12 needs-validation" name="contact" id="contact" noValidate  >
                <div className="form-row">
                  <div id="txtHint" className="text-center mt-4 mb-4 p-4 text-white col-12"></div>
                  <div className="col-md-6 col-11">

                    <div className="form-group font-contact">
                      <label htmlFor="validationServer01" className=" font-contact">Your Name</label>
                      <input id="validationServer01" type="text" className=" form-control" required/>
                      <div id="invalid" className="">

                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-11">
                    <div className="form-group font-contact">
                      <label htmlFor="validationServer02" className=" font-contact">Your Email</label>
                      <input id="validationServer02" type="email" className="form-control" required />
                      <div id="invalid-1" className="">

                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group font-contact">
                  <label htmlFor="exampleMessage" className=" font-contact pl-md-0 pl-4">Your Message</label>
                  <textarea type="text" className="form-control" rows="4" id="exampleMessage" ></textarea>
                  <div id="invalid-2" className="">

                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 ml-auto mr-auto text-center">
                    <button className="btn btn-primary btn-raised" type="submit">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
              <div className="col-md-3 col-12 icone text-center mt-5  ">
                <ul className="list-unstyled mb-0 mt-5">
                    <li className='hof'><i className="fas fa-map-marker-alt fa-2x  list-inline  "> </i>
                        <p className=' '>Friedrich-Frank-Bogen 44</p>
                        <p className=' '>hamburg  21033</p>
                    </li>

                    <li  className='hof'><i className="fas fa-phone mt-4 fa-2x  list-inline  "></i>
                        <p className=' hof'> 01 629 664 219</p>
                    </li>

                    <li  className='hof'><i className="fas fa-envelope mt-4 fa-2x  list-inline "></i>
                        <p className=' hof'>belalsukari@gmail.com</p>
                    </li>
                </ul>
              </div>
          </div>
        </div>
                </section>

            </div>
        </div>
        {/* ........................................ */}
        <div className="mx-auto" id="scbtn">
            <ul className="justify-content-center">
                <li><Link id="profile-link" to="https://github.com/Belalsukri" target='_blank'><i className="fa fa-github"></i></Link></li>
                <li><Link id="profile-link" to="https://www.linkedin.com/in/belal-sukari/"  target='_blank'><i className="fa fa-linkedin" ></i></Link></li>
                <li><Link id="profile-link" to="https://www.xing.com/profile/Belal_Sukari/cv"  target='_blank'><i className="fa fa-youtube"></i></Link></li>
                <li><Link id="profile-link" to="https://www.facebook.com/ibelal.sukar"  target='_blank'><i className="fa fa-facebook-f"  ></i></Link></li>
            </ul>
        </div>
      <div className="fotr "> Belal Sukari © Web Design 2020. All Rights Reserved</div>
    </div>
</React.Fragment>
    )
}



export default Home


