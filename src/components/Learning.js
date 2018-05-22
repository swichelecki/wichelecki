import React, { Component } from 'react';
import * as firebase from 'firebase';
import _ from 'lodash';

class Learning extends Component {
    constructor(props) {
        super(props);
        this.showHideLearning = this.showHideLearning.bind(this);
        this.state = {
            mounted: '',
            learningArray: []
        };
    }

    componentDidMount() {

        const learningObjs = firebase.database().ref('learning');
        learningObjs.on('value', snapshot => {
            this.getData(snapshot.val());
        });

        const onOffValue = firebase.database().ref('onOffValue');
        const value = onOffValue.child('on');
        value.on('value', snap => {
            this.setState({
                mounted: snap.val()
            })
        });
    }

    getData(values) {
        let learningVals = values;
        let learningObjs = _(learningVals)
                            .keys()
                            .map(learningKey => {
                                let cloned = _.clone(learningVals[learningKey]);
                                cloned.key = learningKey;
                                return cloned;
                            })
                            .value();
        this.setState({
            learningArray: learningObjs
        });
    }

    showHideLearning(event) {

        this.setState(prevState => ({
            mounted: !prevState.mounted
        }));

    }

    componentWillUnmount() {

        let learningObjs = firebase.database().ref('learning');
        learningObjs.off();

        let onOffValue = firebase.database().ref('onOffValue');
        onOffValue.off();
    }

    render() {

        return(
            <section className="container">
                { this.state.mounted &&
                <div className="flexbox-container">
                    <div id="box" className="flexbox-image">
                    <img className="learning-image" src="/images/1022_lakefront.jpg" />
                    </div>
                    <LearningWidget learning={this.state.learningArray}/>
                </div>
                }
            </section>
        );
    }
}

class LearningWidget extends Component {

    render() {

        let whatIAmLearning;
        if (this.props.learning) {

            let oldestShownIndex = this.props.learning.length - 4;
            let newestIndex = this.props.learning.length;

            whatIAmLearning = this.props.learning.slice(oldestShownIndex, newestIndex).reverse().map((data, index) => {

                return(
                    <div id="box" key={index}>
                        <p className="learning-posted">Posted: {data.date}</p>
                        <i className={data.icon} aria-hidden="true"></i>
                        <h2 className="learning-h2">{data.header}</h2>
                        <p className="flex-p learning-p">{data.text}</p>
                    </div>
                );

            });
        }

        return(
            <div id="box" className="flexbox">
                <h2 className="learning-header">What I’ve been up to lately</h2>
                {whatIAmLearning}
            </div>
        );
    }
}

export default Learning;
