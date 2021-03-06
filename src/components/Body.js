import React, { Component } from 'react';
import * as firebase from 'firebase';
import _ from 'lodash';

class Body extends Component {
    constructor() {
        super();
        this.state = {
          dataArray: []
        };
        let app = firebase.database().ref('websites');
        app.on('value', snapshot => {
            this.getData(snapshot.val());
        });
    }

    getData(values) {
        let websiteVal = values;
        let websites = _(websiteVal)
                          .keys()
                          .map(websiteKey => {
                              let cloned = _.clone(websiteVal[websiteKey]);
                              cloned.key = websiteKey;
                              return cloned;
                          })
                          .value();
          this.setState({
            dataArray: websites
          });

    }

    render() {

          return(
            <div>
                <section className="container">
                    <div className="body-header">
                        <h2 className="body-header-h2">Take a look at some of my work.</h2>
                    </div>
                    <FlexBox boxContent={this.state.dataArray} />
                </section>
            </div>
          );
    }
}

class FlexBox extends Component {

    render() {

        let contentBlock;
        if (this.props.boxContent) {

            contentBlock = this.props.boxContent.slice(0).reverse().map((data, index) => {

              return(
                  <div id="box" key={index} className="flexbox">
                      <h1 className="body-h1">
                        <a href={data.link} target="_blank">{data.header}</a>
                      </h1>
                      <a href={data.link} target="_blank">
                          <img className="flex-image image" src={data.image}/>
                      </a>
                      <p className="flex-p">{data.text}</p>
                      <h2>{data.tech}</h2>
                      <p className="flex-p">{data.techtext}</p>
                      <span className="flex-span">Front end: </span>
                      <p className="flex-p-inline">{data.frontend}</p>
                      <br/><br/>
                      <span className="flex-span">Back end: </span>
                      <p className="flex-p-inline">{data.backend}</p>
                      <h2>{data.lessons}</h2>
                      <p className="flex-p">{data.lessonstext}</p>
                  </div>
              );

            });
        }

        return (
          <div className="flexbox-container">
          {contentBlock}
          </div>);
    }
}

export default Body;
