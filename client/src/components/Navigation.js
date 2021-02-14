import React,{useState,useEffect} from 'react'
import {NavLink,Link} from 'react-router-dom'
import {allBlogerPost} from '../services/api'

import {
  Collapse,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';
const Navigation = (props) => {

  const intialState={
    bloger:[]
  }
  const [state,setState] = useState(intialState)
  useEffect(()=>{
    allBlogerPost().then(data=>{
     
      
         setState({...state,bloger:data})
  })
  }, [])
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const linkkategorie =state.bloger.map(blog =>{
    
    return blog.kategorie
    
  })
    const distinctKategorie = [...new Set(linkkategorie)].map(blo=>{
      return(
        <NavItem>
        <NavLink onClick={toggle} key={blo._id} className="nav-link "exact activeClassName='active' to={'/kategori/'+blo}>{blo}</NavLink>
        </NavItem>
      )
    })
    
      
     
    
    

    return (
        <nav  className="navbar navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg col-12" color-on-scroll="100" id="sectionsNav">
        <div className="container" >
            <Link className="navbar-brand ml-5 pl-5" to="#"><img className="my-logo" src="/img/logo-b.png" alt=""/></Link>
           
            <NavbarToggler onClick={toggle} >
            <span class="navbar-toggler-icon"></span>
            <span class="navbar-toggler-icon"></span>
            <span class="navbar-toggler-icon"></span>
            </NavbarToggler  >
            
            
            <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          <NavItem>
                  
                    <NavLink onClick={toggle}  className="nav-link "exact activeClassName='active' to="/">الصفحة الرئيسية<span className="sr-only"></span></NavLink>
                    </NavItem>
                     
                          {distinctKategorie}
                     
                          <NavItem>
                    <NavLink onClick={toggle} className="nav-link"exact activeClassName='active' to="/admin">Admin</NavLink>
                    </NavItem>
                  </Nav>
                  </Collapse>
      
        </div>
    </nav>
    )
}

export default Navigation
