import {v4 as uuidV4} from 'uuid'
import {Component} from 'react'
import './App.css'

const initialEl = []

class App extends Component {
  state = {
    initial: initialEl,
    ispasswordShow: false,
    url: '',
    name: '',
    password: '',
    searchInputValue: '',
  }

  websiteEventTrigger = event => {
    this.setState({url: event.target.value})
  }

  usernameEventTrigger = event => {
    this.setState({name: event.target.value})
  }

  passwordEventTrigger = event => {
    this.setState({password: event.target.value})
  }

  searchEventTrigger = event => {
    this.setState({searchInputValue: event.target.value})
  }

  onCheckEventTriggered = () => {
    this.setState(prevState => ({ispasswordShow: !prevState.ispasswordShow}))
  }

  onDeletBtnTrigger = id => {
    console.log(id)
    const {initial} = this.state
    const listEl = initial.filter(eachItem => eachItem.id !== id)
    this.setState({initial: listEl})
  }

  searchOutput = () => {
    const {searchInputValue, initial} = this.state
    const result = initial.filter(eachItem =>
      eachItem.url
        .toLocaleLowerCase()
        .includes(searchInputValue.toLocaleLowerCase()),
    )
    return result
  }

  submitBtnEventTrigger = event => {
    event.preventDefault()
    const {url, name, password} = this.state
    if (url !== '' && name !== '' && password !== '') {
      const newProfile = {
        id: uuidV4(),
        url,
        name,
        password,
      }
      this.setState(prevState => ({
        initial: [...prevState.initial, newProfile],
        url: '',
        name: '',
        password: '',
      }))
    }
  }

  render() {
    const {ispasswordShow, url, name, password} = this.state
    const searchResult = this.searchOutput()
    return (
      <div className="bg_container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="applogoImage"
        />
        <div className="newPasswordContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="passwordManagerImage"
          />
          <form className="newFormContainer">
            <h1 className="newpasswordPara">Add New Password</h1>
            <div className="inputElcontainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="websiteImage"
              />
              <input
                type="text"
                value={url}
                className="inputTextEl"
                placeholder="Enter website"
                onChange={this.websiteEventTrigger}
              />
            </div>
            <div className="inputElcontainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="websiteImage"
              />
              <input
                type="text"
                value={name}
                placeholder="Enter username"
                className="inputTextEl"
                onChange={this.usernameEventTrigger}
              />
            </div>
            <div className="inputElcontainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="websiteImage"
              />
              <input
                type="password"
                value={password}
                placeholder="Enter password"
                className="inputTextEl"
                onChange={this.passwordEventTrigger}
              />
            </div>
            <button
              className="addBtn"
              type="submit"
              onClick={this.submitBtnEventTrigger}
            >
              Add
            </button>
          </form>
        </div>
        <div className="HistoryContainer">
          <div className="searchContainer">
            <div className="pslengthcontainer">
              <h1 className="PasswordPara">Your Passwords</h1>
              <p className="span">{searchResult.length}</p>
            </div>
            <div className="inputElContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="searchImage"
              />
              <input
                type="search"
                className="inputSearachEl"
                placeholder="Search"
                onChange={this.searchEventTrigger}
              />
            </div>
          </div>
          <hr className="horizontalLine" />
          <div className="checkBoxPasswordContainer">
            <input
              type="checkbox"
              className="inputcheckboxEl"
              id="password"
              onChange={this.onCheckEventTriggered}
            />
            <label htmlFor="password" className="ShowPasswordsPara">
              Show Passwords
            </label>
          </div>
          {searchResult.length === 0 && (
            <>
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="noHistoryImage"
              />
              <p className="NoPasswordsPara">No Passwords</p>
            </>
          )}
          {searchResult.length !== 0 && (
            <ul className="passwordListContainer">
              {searchResult.map(eachItem => (
                <li className="itemsContainer" key={eachItem.id}>
                  <div className="container">
                    <h1 className="urlheading">{eachItem.url[0]}</h1>
                    <div className="descrip">
                      <p className="descripPara">{eachItem.url}</p>
                      <p className="descripPara">{eachItem.name}</p>
                      {ispasswordShow && (
                        <p className="descripPara">{eachItem.password}</p>
                      )}
                      {!ispasswordShow && (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png "
                          alt="stars"
                          className="passswordhideImage"
                        />
                      )}
                    </div>
                  </div>
                  <button
                    className="deletBtn"
                    type="button"
                    data-testid="delete"
                    onClick={() => this.onDeletBtnTrigger(eachItem.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="delteIcon"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default App
