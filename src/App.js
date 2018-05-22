import React, { Component } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import About from './components/About';
import Learning from './components/Learning';
import Footer from './components/Footer';
import './css/app.css';
import './css/header.css';
import './css/body.css';
import './css/about.css';
import './css/learning.css';
import './css/footer.css';
import './images/icon_wichel_1.png';
import './images/1022_lakefront.jpg';

class App extends Component {

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

export default App;
