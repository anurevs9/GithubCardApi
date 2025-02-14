import GitHubCard from './GitHubCard';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({ username: event.target.value });
  };

 handleFormChange = (event) => {
    event.preventDefault();
    this.setState({ submittedUsername: this.state.username });
  };

  render() {
    return (
      <div className="App">
        <h1>Github Card</h1>
        <form onSubmit={this.handleFormChange}>
          <input
            type="text"
            placeholder="Enter Github Username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        {/* Pass the username to the GitHubCard component */
          this.state.submittedUsername &&(
        <GitHubCard username={this.state.submittedUsername} />
          )
        }
      </div>
    );
  }
}



export default App;
