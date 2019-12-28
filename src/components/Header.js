import React, { Component } from 'react';
import * as firebase from 'firebase';

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var offset = window.scrollY + 322;

var clientWidth = 0;

window.addEventListener('scroll', function(event) {

clientWidth = window.innerWidth;

if (clientWidth >= 640) {

var navbarHeight = document.getElementById('head').offsetHeight;
var header = document.getElementsByClassName('header')[0];

        didScroll = true;

        setInterval(function() {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 250);

        function hasScrolled() {
            var st = document.documentElement.scrollTop || document.body.scrollTop;

            if(Math.abs(lastScrollTop - st) <= delta)
                return;

            if (st > lastScrollTop && st > offset){
                 header.classList.add('head-collapse');
            } else {
                if(st + window.innerHeight < document.body.scrollHeight) {
                  header.classList.remove('head-collapse');
                }
            }

            lastScrollTop = st;
        }
  }

});

class Header extends Component {
    constructor() {
          super();
          this.showResume = this.showResume.bind(this);
          this.hideResume = this.hideResume.bind(this);
          this.state = {
            url: '',
            resume: {display: 'none'},
            resWrapper: {display: 'none'},
            text: '',
            id: '',
            headerText: ''
          };
    }

    componentDidMount() {
        const rootRef = firebase.database().ref().child('headerUrl');
        const imageRef = rootRef.child('url');
        imageRef.on('value', snap => {
            this.setState({
              url: snap.val()
            });
        });

        let resume = firebase.database().ref('resume');
        resume.on('value', snapshot => {
            this.getData(snapshot.val());
        });

        let googleId = firebase.database().ref('googleId');
        googleId.on('value', snapshot => {
            this.getGoogleId(snapshot.val());
        });

        let headerText = firebase.database().ref('headerText');
        headerText.on('value', snapshot => {
            this.getHeaderText(snapshot.val());
        });
    }

    getData(value) {
        let resumeText = value;
        let resume = resumeText.text;
        this.setState({text: resume});
    }

    getGoogleId(value) {
        let googleId = value;
        let id = googleId.id;
        this.setState({id: id});
    }

    getHeaderText(value) {
        let headerText = value;
        let text = headerText.text;
        this.setState({headerText: text});
    }

    showResume(event) {

        this.setState({
            resume: {display: 'block'},
            resWrapper: {display: 'block'}
        });

        window.scrollTo(0,0);

      }

    hideResume(event) {

      this.setState({
          resume: {display: 'none'},
          resWrapper: {display: 'none'}
      });

      window.scrollTo(0,0);

    }

    componentWillUnmount() {

        let rootRef = firebase.database().ref().child('headerUrl');
        rootRef.off();

        let resume = firebase.database().ref('resume');
        resume.off();

        let idea = firebase.database().ref('googleId');
        id.off();

        let headerText = firebase.database().ref('headerText');
        headerText.off();
    }

    render () {

        const resume = this.state.resume
        const resumeWrapper = this.state.resWrapper

        return(
          <div>
              <div id="resume" style={resume}>
                  <div id="inner-rel">
                      <Resume text={this.state.text} id={this.state.id} hideResume={this.hideResume}/>
                  </div>
              </div>
              <div id="resume-wrapper" style={resumeWrapper}>
              </div>
              <header id="head" className="header clearfix">
                  <h2 className="header-h2 clearfix">Steve Wichelecki</h2>
                  <div className="header-right-nav">
                    <button className="header-button" onClick={this.showResume}>Resume</button>
                    <a className="header-a" href="mailto:swichelecki@gmail.com">swichelecki@gmail.com</a>
                  </div>
              </header>
              <section className="subheader">
                  <p className="subheader-p">{this.state.headerText}</p>
                  <h3 className="subheader-h2">Keep scrolling to learn more about me.</h3>
              </section>
              <img src={this.state.url}/>
          </div>
        );

    }

}

class Resume extends Component {

    render() {

        return(
<div id="res-container">
    <button className="header-button-x" onClick={this.props.hideResume}><i className="fa fa-times" aria-hidden="true"></i></button>
    <div id="remove-p-margin" dangerouslySetInnerHTML={{__html: this.props.text}}>
    </div>
    <div className="res-link-wrapper">
        <a href={`${this.props.id}`} target="_blank" className="footer-button-res">This website's GitHub repo</a>
    </div>
    <button className="header-button-x-bottom" onClick={this.props.hideResume}><i className="fa fa-times" aria-hidden="true"></i></button>
</div>
      );

  }

}

export default Header;
