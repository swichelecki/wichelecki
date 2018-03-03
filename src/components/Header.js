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
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus neque vel massa consequat scelerisque. Aenean varius felis et velit blandit maximus ut sit amet arcu. Morbi semper tortor in tortor vulputate ultricies. Praesent massa libero, tristique a aliquam at, efficitur id erat. Integer pellentesque libero blandit, semper eros et, ultrices erat. Praesent nibh sem, laoreet vel accumsan lobortis, pulvinar in sapien. Aliquam id pharetra lectus, sed porta tellus. Sed ut placerat ligula. Vivamus nec arcu vel lacus accumsan lacinia. Integer semper, sem quis blandit imperdiet, neque justo egestas velit, ut condimentum odio justo commodo elit.
</p>
<p>
Morbi at orci non libero porta pellentesque. Nunc dictum pulvinar turpis. Suspendisse vestibulum et magna ut gravida. Donec quis diam orci. Morbi at imperdiet nisl. Fusce in consectetur magna. Aenean scelerisque nunc id nisi tincidunt vestibulum. Praesent egestas commodo est pretium porttitor. Fusce dignissim ex vel rutrum auctor. Aliquam sollicitudin risus quis orci sagittis, lobortis consectetur tellus imperdiet. Praesent sit amet dui sapien. Nunc at interdum odio. Aliquam vulputate tellus non porttitor tempor.</p>
<p>
Aliquam ac tempus elit. Etiam suscipit sit amet neque et sodales. Integer felis tellus, malesuada ut varius a, mollis in lectus. Curabitur ut placerat lectus. Morbi dui nisi, interdum a maximus ac, ornare non libero. Cras ac elit eu risus pulvinar faucibus et at tortor. Nam facilisis vehicula mollis. Duis ac tempus leo, vel gravida nunc. Donec a est velit. Nulla lobortis dolor sed pretium auctor.
</p>
<p>
Aliquam odio mi, efficitur eget nibh vitae, egestas ultricies felis. Proin quis sem vitae lorem congue laoreet. Phasellus sem dolor, congue auctor nisi nec, pulvinar accumsan nibh. Nunc id imperdiet quam. Vivamus quis viverra orci, vitae placerat erat. Ut accumsan cursus lectus, vitae dapibus nulla placerat non. Donec id nunc nec ipsum facilisis commodo. Donec sapien felis, accumsan non facilisis vulputate, eleifend at mi. Vivamus dictum volutpat urna non accumsan. Donec venenatis placerat tellus, a tristique purus commodo a. Suspendisse vel volutpat purus. Aenean nec ante id ligula ornare euismod quis at quam. Quisque feugiat ultrices nunc, ultricies euismod enim iaculis at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam a tortor sem. Mauris nec tincidunt odio, iaculis malesuada dolor.
</p>
<p>
Nulla imperdiet justo quis orci faucibus volutpat. Cras libero nunc, finibus ac imperdiet vel, convallis at sapien. Maecenas quis molestie lacus. In a posuere eros, vitae tincidunt ex. Sed sollicitudin, arcu id efficitur posuere, ligula sem lacinia nunc, et congue ante libero nec lectus. Maecenas eu rhoncus magna. Etiam pulvinar urna a risus pulvinar volutpat. Nunc leo eros, suscipit at dictum nec, placerat at metus. Sed vel purus purus. Nullam accumsan pretium risus, at iaculis nunc placerat a. Nunc ornare enim placerat posuere tincidunt. Mauris auctor sem nunc. Praesent egestas velit quis enim aliquet, id cursus odio ullamcorper. Donec nulla justo, pretium eget lectus in, eleifend auctor felis.
</p>
</div>
      );

  }

}

export default Header;
