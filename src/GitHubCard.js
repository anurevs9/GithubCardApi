import React, { Component } from 'react';
import './GitHubCard.css';

class GitHubCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user : null,
            loading: null,
            error: null,
        };
    }

    componentDidMount() {
        this.setState({loading: true, error: null});
     fetch(`https://api.github.com/users/${this.props.username}`, {
        headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
        }
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.message) {
            this.setState({error: data.message, loading: false});
        } else {
            this.setState({user: data, loading: false});
        }
    })
     .catch((error) => {
        this.setState({error: 'Failed to fetch user data', loading: false});
     });

    }

    componentDidUpdate(prevProps) {
        if (prevProps.username !== this.props.username) {
            this.setState({ loading: true, error: null });
            fetch(`https://api.github.com/users/${this.props.username}`, {
                headers: {
                    Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message) {
                        this.setState({ error: data.message, loading: false });
                    } else {
                        this.setState({ user: data, loading: false });
                    }
                })
                .catch((error) => {
                    this.setState({ error: 'Failed to fetch user data', loading: false });
                });
        }
    }

    render() {
        const { user, loading , error } = this.state;

        if(!user){
            return <div>no user data available</div>;
        }
        if(error){
            return <div>Error:{error}</div>;
        }
        if(loading){
            return <div>Loading...</div>;
        }
        return(
            <div className='github-card'>
                <img src={user.avatar_url} alt={user.login} style={{width: 100}} />
                <div>{user.login}</div>
                <div>{user.location}</div>
                <div>{user.bio}</div>
                <a href={user.html_url} target='_blank' rel='noopener noreferrer'>Visit Github Profile</a>
            </div>
        )
    }
}

export default GitHubCard;  // export the component so that it can be used in other files
