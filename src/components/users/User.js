import React, {Component, Fragment} from 'react'
import Repos from '../repos/Repos'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
class User extends Component {
     componentDidMount(){
          this.props.getUser(this.props.match.params.login) 
          this.props.getUserRepos(this.props.match.params.login) 
          
          
     }
      render(){
          const {
               name,
               avatar_url, 
               location, 
               bio, 
               blog,
               login, 
               company,
               html_url,
               followers,
               following,
               public_repos,
               public_gists, 
            } = this.props.user
            const {loading} = this.props.loading
        if (loading) return < Spinner/>
        return(
            <Fragment>
                <Link to = "/" className = "btn btn-light">
                     Back To Search
                </Link>
                <div className = "card grid-2">
                    <div className = "all-center" >
                        <img src={avatar_url} className = "round-img" alt = "" style = {{width:"100px"}}/> 
                        <h1>{name}</h1>  
                        <p>Location: {location}</p>
                    </div>
                    <div>
                        {bio &&  <Fragment>
                             <h3>Bio</h3>
                             <p>{bio}</p>
                        </Fragment>}
                        <a href={html_url} className = "btn btn-dark my-1"> Visit Github Profile</a>
                        <ul>
                            <li>
                                 {login && <Fragment>
                                     <strong>Username : {login}</strong>
                                </Fragment>}
                            </li>
                            <li>
                                 {company && <Fragment>
                                     <strong>Company : {company}</strong>
                                </Fragment>}
                            </li>
                            <li>
                                 {blog && <Fragment>
                                     <strong>website : {blog}</strong>
                                </Fragment>}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className = "card text-center">
                     <div className = "badge badge-primary">Followers : {followers}</div>
                     <div className = "badge badge-success">Following : {following}</div>
                     <div className = "badge badge-danger">Public Repos : {public_repos}</div>
                     <div className = "badge badge-dark">Public gists : {public_gists}</div>
                </div>
                <Repos repos = {this.props.repos}/>
            </Fragment>
        )
      }
}
export default User