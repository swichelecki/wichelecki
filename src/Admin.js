import React, { Component } from 'react';
import FileInput from './components/FileInput';
import AboutAbout from './components/AboutAbout';
import ManageWebsites from './components/ManageWebsites';
import ManageLearning from './components/ManageLearning';
import './css/app.css';
import './css/admin.css';
import './images/icon_wichel_1.png';

class Admin extends Component {
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
          <div>
          <div className="admin-header">
            <h2>Wichelecki.com Content Management System</h2>
            <h3>The database is set to read only (naturally) but please click around.</h3>
          </div>
          <div className="tab-wrapper">
            <ul className="admin-ul">
              <li onClick={() => this.showHideTab('one')} data-li="one">Header Image</li>
              <li onClick={() => this.showHideTab('two')} data-li="two">Website Widgets</li>
              <li onClick={() => this.showHideTab('three')} data-li="three">Text Sections</li>
              <li onClick={() => this.showHideTab('four')} data-li="four">Learning Section</li>
            </ul>
            <div id="first-tab">
            </div>
            <div id="one" className="tab">
                <FileInput />
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
          </div>
          </div>
        );
    }
}

export default Admin;
