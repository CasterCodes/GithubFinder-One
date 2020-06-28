import React , { Component, Fragment }from 'react';
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import {BrowserRouter as Router, Switch,  Route} from 'react-router-dom'
import axios from 'axios'
import './App.css';

class App extends Component {
   state = {
      users:[],
      repos:[],
      user:{},
      loading:false,
      alert:null
   }
async componentDidMount(){
     this.setState({loading:true})
     // get the users
     const res  =  await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`)
     //update the state
     this.setState(
         { loading:false, users: res.data }
      )   
}
// Get users
searchUsers = async (user) => {
   this.setState({laoding:true})
   const res  =  await axios.get(`https://api.github.com/search/users?q=${user}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`)
   //update the state
   this.setState(
       { loading:false, users: res.data.items }
    )  
}
// get user repos
getRepos = async (username) => {
   this.setState({laoding:true})
   const res  =  await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`)
   //update the state
   this.setState(
       { loading:false, repos: res.data }
    )  
}

// Get user
getUser = async (username) => {
   this.setState({laoding:true})
   const res  =  await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`)
   //update the state
   this.setState(
       { loading:false, user: res.data }
    )  
}
clearUser = () => {
      this.setState({users:[]})
}
showAlert = (message, type) => {
    this.setState({alert:{message, type}})
    setTimeout(() => this.setState({alert:null}), 4000)
}
render() {
     return (
        <Router>
               <div>
                  < Navbar title = "Github Finder" />
                     <div className = "container">
                        < Alert alert = {this.state.alert}/>
                        <Switch>
                              <Route 
                                 exact path = "/"
                                 render = {props => (
                                       <Fragment>
                                        < Search  
                                          searchUsers = {this.searchUsers} 
                                          clearUser = {this.clearUser} 
                                          showClear = {this.state.users.length > 0 ? true : false}
                                          showAlert = {this.showAlert}
                                          />
                                         < Users users = {this.state.users} loading = {this.state.loading} />
                                       </Fragment>
                                 )}
                              />
                              <Route
                                   exact path = "/about"
                                   component = {About}
                              />
                              <Route
                                 exact path = "/user/:login"
                                 render = {props => (
                                      <User 
                                          { ...props }
                                          getUser = {this.getUser}
                                          user = {this.state.user}
                                          getUserRepos = {this.getRepos}
                                          repos = {this.state.repos}
                                          loading = {this.state.loading}
                                      />
                                 )}
                              />

                             
                        </Switch>
                        
                     </div>
               </div>
        </Router>
     )
}
}
export default App;