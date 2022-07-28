import React, { Component } from 'react';
import axios from 'axios';
import './GithubUserInfo.css';

class GithubUserInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            userData: {},
            avatar_url:'',
            isLoaded: false
        };
    }

    async componentDidMount(){

        const url = `https://api.github.com/users/${this.props.username}`;

        let res = await axios.get(url);
        this.setState({userData: res.data,avatar_url: res.data.avatar_url, isLoaded: true});
        console.log(res.data);
    }

    generateLoader(){
        return(
            <div className='GithubUserInfo-Loader'>
                <div className='GithubUserInfo-LoaderB'></div>
            </div>
        );
    }

    generateUserData(){
        return(
            <div className='GithubUserInfo-Display-Details'>
                <div className='GithubUserInfo-Display-Details-Panel GithubUserInfo-User-Avatar'>
                    <img className='GithubUserInfo-User-Avatar-Img' src={this.state.avatar_url} />
                </div>
                <div className='GithubUserInfo-Display-Details-Panel GithubUserInfo-User-Nfo'>
                    <p className='GithubUserInfo-User-Nfo-Points'>
                        <span className='GithubUserInfo-User-Nfo-Points-User'>{this.state.userData.name}</span><br/>
                        Bio: {this.state.userData.bio}<br/>
                        Location: {this.state.userData.location}<br/>
                        Followers: {this.state.userData.followers}<br/>
                        Public Repos: {this.state.userData.public_repos}<br/>
                        Public gists: {this.state.userData.public_gists}<br/>
                        Blog: {this.state.userData.blog}<br/>
                    </p>
                </div>
            </div>
        );
    }

  render() {

    let loader = this.generateLoader();
    let userData = this.generateUserData();

    return (
    <div className='GithubUserInfo'>
        <h1 className='GithubUserInfo-Title'>Github User Info</h1>
        <div className='GithubUserInfo-Display'>
            {this.state.isLoaded ? userData : loader}
        </div>
      </div>
    )
  }
}

export default GithubUserInfo;