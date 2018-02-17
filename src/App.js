import React, { Component } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import About from './components/About';
import Footer from './components/Footer';
import './css/app.css';
import './css/header.css';
import './css/body.css';
import './css/about.css';
import './css/footer.css';

class App extends Component {

    render() {

        return(
          <div>
          <Header />
          <Body />
          <About />
          <Footer />
          </div>
        );
    }
}

export default App;