import React, { Component } from 'react'
import{BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from './Home'
import Navigation from "./Navigation"
import Admin from './Admin'
import AddBloger from './AddBloger'
import Editbloger from './Editbloger'
import Kategori from './Kategori'
import NetFound from './NetFound'
import Bloger from './Bloger'
 class Router extends Component {
    render() {
        return (
            <BrowserRouter>
            <Navigation /> 
            <Switch>
            <Route path='/'exact  component={Home}/>
            <Route path='/admin'  component={Admin}/>
            <Route path='/addBloger' component={AddBloger}/>
            <Route path='/editbloger/:id'exact component={Editbloger}/>
            <Route path='/kategori/:kategori'exact component={Kategori}/>
            <Route path='/Bloger/:_id'exact component={Bloger}/>
            <Route component={NetFound}/>
            </Switch>
                
            </BrowserRouter>
        )
    }
}
export default Router

