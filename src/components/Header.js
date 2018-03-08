import React, { Component } from 'react';
import * as firebase from 'firebase';
import FontAwesome from 'react-fontawesome';

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
            resWrapper: {display: 'none'}
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

    render () {

        const resume = this.state.resume
        const resumeWrapper = this.state.resWrapper

        return(
          <div>
              <div id="resume" style={resume}>
              <Resume hideResume={this.hideResume}/>
              </div>
              <div id="resume-wrapper" style={resumeWrapper}>
              </div>
              <header id="head" className="header clearfix">
                  <h2 className="header-h2 clearfix">Steve Wichelecki</h2>
                  <button className="header-button" onClick={this.showResume}>Resume</button>
                  <p className="header-p"><a href="mailto:swichelecki@gmail.com">swichelecki@gmail.com</a></p>
              </header>
              <section className="subheader">
                  <p className="subheader-p">My name is Steve Wichelecki, and I’ve been learning web development for nearly two years now.</p>
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
<div>
<button className="header-button-x" onClick={this.props.hideResume}><i className="fa fa-times" aria-hidden="true"></i></button>
<ul className="resume-ul">
<li><strong>Steve Wichelecki</strong></li>
<li>2857 W. Shakespeare</li>
<li>Chicago, IL 60647</li>
<li className="phone-num">(773) 612-4221</li>
<li className="email-address"><a className="res-url" href="mailto:swichelecki@gmail.com">swichelecki@gmail.com</a></li>
</ul>
<p>
To Whom It May Concern,<br /><br />
My name is Steve Wichelecki, and I’ve been learning web development for nearly two years now. I am currently a Web Developer and Web Content Editor for a national broadcasting company, and prior to that I was a Writer/Editor for business-to-business publications.
<br /><br />
Although I have fewer than two years of experience, I have made solid progress and have become a passionate developer. In July of 2016 I enrolled in the Bloc Frontend Fundamentals course, an eight-month program that taught the basics of front-end development. Since then, it’s been a natural progression of learning and building websites, both for my current workplace and for myself.
<br /><br />
To date, my biggest accomplishment has been the website for <em>Svengoolie</em>, a program shown nationally on MeTV. I did both the front-end and back-end work for <a className="res-url" href="http://svengoolie.com/" target="_blank">svengoolie.com</a>, which was launched in early 2018.
<br /><br />
At the time of writing, my most recent work includes a variety of front- and back-end updates to the website for Decades TV Network, <a className="res-url" href="http://decades.com/" target="_blank">decades.com</a>. Also, I have launched a portfolio website (you are here now) to tell perspective employers more about myself. I built it using ReactJS and also created a <a className="res-url" href="https://wichelecki.com/admin" target="_blank">CRUD CMS</a> to manage persistent data.
<br /><br />
Currently, I still have a lot of content editor responsibilities, so I am looking to transition to a position that is 100% development.
I would like to learn more about the available position and would appreciate hearing from you.
<br /><br />
Sincerely,<br />
Steve Wichelecki<br />
</p>
<h3>Work Experience</h3>
<h4>Weigel Broadcasting (Section 1)<br />
Winter 2017 to Present</h4>
<h4>Position:</h4>
● Web Developer & Web Content Editor<br />
<h4>Duties: <em>Same as in Weigel Broadcasting (Section 2) with the addition of:</em></h4>
● Building and updating websites:<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <a className="res-url" href="http://svengoolie.com/" target="_blank">svengoolie.com</a> (built frontend and backend)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <a className="res-url" href="http://decades.com/" target="_blank">decades.com</a> (front-end and back-end updates for 2018 network format change)<br />
● Coding HTML newsletter templates for newsletters such as <a className="res-url" href="https://mailchi.mp/metv/are-you-a-big-enough-fan-to-ace-this-mayberry-trivia-challenge" target="_blank">this one</a>.<br />
<h4>Web Technologies & Software:</h4>
● HTML, CSS, JavaScript, jQuery, MySQL, PHP, Navicat, Smarty, Bitbucket, Sourcetree, Photoshop, MailChimp<br />
<h4>Other Web Technologies (I use or have used on my own time):</h4>
● ReactJS, Node.js, Webpack, Babel, Firebase, Git, Github, AngularJS, Grunt
<h4>Weigel Broadcasting (Section 2)<br />
November 2009 to Present</h4>
<h4>Position:</h4>
● Web Content Editor<br />
<h4>Duties:</h4>
● Manage content for multiple websites such as <a className="res-url" href="https://metv.com/" target="_blank">metv.com</a>, <a className="res-url" href="http://decades.com/" target="_blank">decades.com</a>, <a className="res-url" href="http://svengoolie.com/" target="_blank">svengoolie.com</a>, <a className="res-url" href="http://heroesandiconstv.com/" target="_blank">heroesandiconstv.com</a>; content includes:<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Video<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Advertisements (until 2016)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Promotional Elements<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Photo Galleries<br />
● Write and edit copy for various websites (not so much anymore, but some)<br />
● Write and build a variety of e-newsletters<br />
● Handle contesting for <a className="res-url" href="http://metv.fm/" target="_blank">metv.fm</a><br />
● Create landing pages for multiple sites<br />
● Manage Weigel Broadcasting’s online stores: The MeTV Store & The H&I Store<br />
● Create reports pertaining to Web traffic and online stores<br />
<h4>Software:</h4>
● MailChimp, Navicat, Shopify, DoubleClick for Publishers, WordPress, Google Analytics, Google AdSense, proprietary content management systems, Basecamp<br />
<h4>BNP Media: Appliance Design Magazine<br />
April 2009 to November 2009<br /><br />
Quality Magazine<br />
April 2007 to November 2009</h4>
<h4>Position:</h4>
● Assistant Editor<br />
<h4>Duties:</h4>
● Write feature articles<br />
● Solicit and edit articles<br />
● Handle monthly non-feature-related editorial for Quality, supplements and Web section<br />
● Copyedit and proof material for each publication<br />
● Compose Quality Update and Appliance Design e-newsletters<br />
● Maintain Quality and Appliance Design issue content on respective websites<br />
● Travel to expos to learn about the industry<br />
● Find, edit, and post industry news on Quality and Appliance Design websites<br />
● Shoot and edit video for the Quality website<br />
<h4>Dana Chase Publications: Appliance Magazine<br />
September 2006 to April 2007</h4>
<h4>Position:</h4>
● Assistant Editor<br />
<h4>Duties:</h4>
● Write feature articles<br />
● Handle a number of monthly departments<br />
● Copyedit all editorial included in magazine<br />
● Travel to expos to learn about the industry<br />
● Find, edit, and post industry news on Appliance Magazine website<br />
<h3>Education</h3>
● Received a BA in English-Writing from the University of Illinois at Chicago (UIC) in December 2005<br />
● Cumulative GPA: 3.71 / 4.0<br />
● Major GPA: 4.0 / 4.0<br />
● Graduated with honors: <em>Cum laude</em><br />
● Graduated with high departmental distinction—English<br />
● Made dean’s list four out of five semesters<br />
<button className="footer-button-res"><a href="https://drive.google.com/uc?export=download&id=1toi6KDiDm-6lg3Vv4VObWdRLkJuBYzUm" download>Download Resume</a></button>
<button className="header-button-x" onClick={this.props.hideResume}><i className="fa fa-times" aria-hidden="true"></i></button>
</div>
      );

  }

}

export default Header;
