import React, { Component } from 'react'
import PropTypes from 'prop-types'
 class Search extends Component {
     state = {
         text:''
     }

    onChange = (e) => {
          this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
          e.preventDefault()
          if(this.state.text === ""){
            this.props.showAlert("Please enter something", "light")
          }else {
            this.props.searchUsers(this.state.text)
            this.setState({text:""})
          }
         
    }
    render() {
        return (
            <div>
                  <form className="form" onSubmit={this.onSubmit}>
                       <input  type="text" name="text" placeholder="Search Users....."
                          value = {this.state.text}
                          onChange = {this.onChange}
                       />
                       <input  type="submit" value = "Search" className= "btn btn-dark btn-block"/>
                  </form>
                  {this.props.showClear &&   <button className = "btn btn-light btn-block" onClick= {this.props.clearUser}>
                       Clear  
                  </button>}
                 
            </div>
        )
    }
}
Search.propTypes = {
      searchUsers:PropTypes.func.isRequired,
      clearUser:PropTypes.func.isRequired,
      showClear:PropTypes.bool.isRequired
}
export default Search

