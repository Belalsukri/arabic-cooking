import React,{useState,useEffect} from 'react'
import {NavLink,Link} from 'react-router-dom'
import {allBlogerPost} from '../services/api'
const Navigation = () => {

  const intialState={
    bloger:[]
  }
  const [state,setState] = useState(intialState)
  useEffect(()=>{
    allBlogerPost().then(data=>{
     
      
         setState({...state,bloger:data})
      

  })
  }, [])
  const linkkategorie =state.bloger.map(blog =>{
    
    return blog.kategorie
    
  })
    const distinctKategorie = [...new Set(linkkategorie)].map(blo=>{
      return(
        <li className="nav-item " >
        <NavLink key={blo._id} className="nav-link "exact activeClassName='active' to={'/kategori/'+blo}>{blo}</NavLink>
        </li>
      )
    })
    
      
    
    

    return (
        <nav  className="navbar navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg col-12" color-on-scroll="100" id="sectionsNav">
        <div className="container" >
            <Link className="navbar-brand ml-5 pl-5" to="#"><img className="my-logo" src="/img/logo-b.png" alt=""/></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
           aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            <span className="navbar-toggler-icon"></span>
            <span className="navbar-toggler-icon"></span>
          </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="nav ml-auto justify-content-end">
                <ul className="navbar-nav">
                  <li className="nav-item ">
                    <NavLink className="nav-link"exact activeClassName='active' to="/">الصفحة الرئيسية<span className="sr-only"></span></NavLink>
                  </li>
                     
                          {distinctKategorie}
                     
                  <li className="nav-item">
                    <NavLink className="nav-link"exact activeClassName='active' to="/admin">Admin</NavLink>
                  </li>
                  
                </ul>
                
              </div>
            </div>
        </div>
    </nav>
    )
}

export default Navigation
