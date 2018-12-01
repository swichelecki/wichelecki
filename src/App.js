import React, { Component } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import About from './components/About';
import Learning from './components/Learning';
import Footer from './components/Footer';
import FileInput from './components/FileInput';
import AboutAbout from './components/AboutAbout';
import ManageWebsites from './components/ManageWebsites';
import ManageLearning from './components/ManageLearning';
import ManageResumeId from './components/ManageResumeId';
import ManageResumeText from './components/ManageResumeText';
import ManageHeaderText from './components/ManageHeaderText';
import './css/app.css';
import './css/header.css';
import './css/body.css';
import './css/about.css';
import './css/learning.css';
import './css/footer.css';
import './images/icon_wichel_1.png';
import './images/1022_lakefront.jpg';
import './css/admin.css';
import './css/quill.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {

    render() {

        return(
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/admin" component={Cms}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

class Home extends Component {

    render() {

        return(
          <div>
          <Header />
          <Body />
          <About />
          <Learning />
          <Footer />
          </div>
        );
    }
}

class Cms extends Component {

    constructor() {
        super();
        this.showHideTab = this.showHideTab.bind(this);
    }

    showHideTab(inside){

        let tabs = document.getElementsByClassName("tab");
        let firstTab = document.getElementById('first-tab');

        for (var i = 0; i < tabs.length; i++){
            tabs[i].style.display = "none";
        }

        firstTab.style.display = "none";
        document.getElementById(inside).style.display = "block";

        let li = document.querySelectorAll('li');

        li.forEach(li => {
          if (inside == li.dataset.li) {
            li.classList.add('li-background');
          } else {
            li.classList.remove('li-background');
          }

        });
    }

    render() {

        return(
          <div className="admin-body">
          <div className="admin-header">
            <h2>Wichelecki.com Content Management System</h2>
            <h3>The database is set to read only (naturally) but please click around.</h3>
          </div>
          <div className="tab-wrapper">
            <ul className="admin-ul">
              <li onClick={() => this.showHideTab('one')} data-li="one">Header Section</li>
              <li onClick={() => this.showHideTab('two')} data-li="two">Website Widgets</li>
              <li onClick={() => this.showHideTab('three')} data-li="three">Text Sections</li>
              <li onClick={() => this.showHideTab('four')} data-li="four">Learning Section</li>
              <li onClick={() => this.showHideTab('five')} data-li="five">Resume Section</li>
            </ul>
            <div id="first-tab">
            </div>
            <div id="one" className="tab">
                <FileInput />
                <ManageHeaderText/>
            </div>
            <div id="two" className="tab">
                <ManageWebsites />
            </div>
            <div id="three" className="tab">
                 <AboutAbout />
            </div>
            <div id="four" className="tab">
                 <ManageLearning />
            </div>
            <div id="five" className="tab">
                <ManageResumeText />
                <ManageResumeId />
            </div>
          </div>
          </div>
        );
    }
}

export default App;
