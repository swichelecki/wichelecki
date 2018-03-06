import React, { Component } from 'react';
import * as firebase from 'firebase';
import _ from 'lodash';

class About extends Component {
    constructor(props) {
      super(props);
      this.state = {
        aboutArray: []
      };

      let app = firebase.database().ref('about');
      app.on('value', snapshot => {
          this.getData(snapshot.val());
      });
    }

    getData(values) {
        let aboutValues = values;
        let about = _(aboutValues).keys()
                                  .map(aboutKey => {
                                      let cloned = _.clone(aboutValues[aboutKey]);
                                      cloned.key = aboutKey;
                                      return cloned;
                                  })
                                  .value();
        this.setState({
            aboutArray: about
        });

    }

    render() {

        return(
            <AboutDivs aboutObject={this.state.aboutArray}/>
        );

    }
}

class AboutDivs extends Component {

    render() {
        let aboutKey;
        if (this.props.aboutObject) {
            aboutKey = this.props.aboutObject.map((key, index) => {

              return(
                  <div className="about-wrapper">
                      <div className="about-container" key={index}>
                          <h2 className="body-header-h2 about-header">{key.header}</h2>
                          <p className="about-p">{key.text}</p>
                      </div>
                  </div>
              );

          });

        }

        return(
            <div>{aboutKey}</div>
        );
    }
}

export default About;
