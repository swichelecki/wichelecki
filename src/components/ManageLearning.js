import React, { Component } from 'react';
import * as firebase from 'firebase';
import _ from 'lodash';

class ManageLearning extends Component {
    constructor(props) {
        super(props);
        this.onOffSection = this.onOffSection.bind(this);
        this.updateFirebaseVal = this.updateFirebaseVal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChangeCallback = this.onChangeCallback.bind(this);
        this.setDate = this.setDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.editLearning = this.editLearning.bind(this);
        this.openClose = this.openClose.bind(this);
        this.deleteLearningObject = this.deleteLearningObject.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
        this.state = {
            on: '',
            header: '',
            date: '',
            icon: '',
            text: '',
            key: '',
            display: 'none',
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
                on: snap.val()
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

    onOffSection() {

        this.setState(prevState => ({
            on: !prevState.on
        }), this.updateFirebaseVal);
    }

    updateFirebaseVal() {

        let onOffVal = firebase.database().ref().child('onOffValue');
        onOffVal.set({on: this.state.on});
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, this.onChangeCallback);
    }

    onChangeCallback() {

    }

    setDate(event) {

        event.preventDefault();

        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();

        let month;
        switch(mm) {
            case 1:
                month = 'January';
                break;
            case 2:
                month = 'February';
                break;
            case 3:
                month = 'March';
                break;
            case 4:
                month = 'April';
                break;
            case 5:
                month = 'May';
                break;
            case 6:
                month = 'June';
                break;
            case 7:
                month = 'July';
                break;
            case 8:
                month = 'August';
                break;
            case 9:
                month = 'September';
                break;
            case 10:
                month = 'October';
                break;
            case 11:
                month = 'November';
                break;
            case 12:
                month = 'December';
                break;
            default:
                month = 'not a month';

                return month;
            }

            today = month + ' ' + dd + ', ' + yyyy;

            this.setState({
                date: today
            }, this.onSubmit);
        }

    onSubmit() {

        let learningDatabaseRef = firebase.database().ref('learning');
        let addNewObject = learningDatabaseRef.push();
        let newLearningObject = this.state;
        delete newLearningObject.learningArray;

        addNewObject.update(newLearningObject);

        this.setState({
            header: '',
            date: '',
            icon: '',
            text: ''
        });

    }

    confirmDelete(key) {

        let deleteLearning = confirm('Are you sure you want to delete this?');

        if (deleteLearning == true) {
            this.deleteLearningObject(key);
        }
    }

    deleteLearningObject(key) {

        let app = firebase.database().ref('learning');
        app.child(key).remove();
    }

    editLearning(header, icon, text, key, date) {
        this.setState({
            header: header,
            icon: icon,
            text: text,
            key: key,
            date: date
        });
    }

    onEditSubmit(event) {

        event.preventDefault();

        let editThisObject = this.state;
        delete editThisObject.learningArray;

        let key = editThisObject.key;

        let editThisInFirebase = firebase.database().ref().child('learning').child(key);

        editThisInFirebase.once('value', function(snapshot) {

            if (snapshot.val() === null) {
                alert('Item does not exist.');
            } else {
                editThisInFirebase.update(editThisObject);
            }
        });

        this.setState({
            header: '',
            icon: '',
            text: '',
            key: '',
            display: 'none'
        });

        window.scrollTo(0,0);
    }

    openClose() {

        if (this.state.display == 'none') {
            this.setState({
                display: 'block'
            });
        } else {
            this.setState({
                display: 'none',
                header: '',
                icon: '',
                text: '',
                key: ''
            });
        }

        window.scrollTo(0,0);

    }

    componentWillUnmount() {

        let learningObjs = firebase.database().ref('learning');
        learningObjs.off();

        let onOffValue = firebase.database().ref('onOffValue');
        onOffValue.off();

    }

    render() {

        return(
            <div>
            <ShowHideSection
                onOff={this.onOffSection}
                isTrue={this.state.on}
            />
            <LearningForm
                onChange={this.handleChange}
                stateValue={this.state}
                onSubmit={this.setDate}
                display={this.state.display}
            />
            <EditLearningForm
                onChange={this.handleChange}
                stateValue={this.state}
                onSubmit={this.onEditSubmit}
                cancelEdit={this.openClose}
                display={this.state.display}
            />
            <h3 className="admin-h3">Manage Learning Section</h3>
            <ManageObjects
                learningArray={this.state.learningArray}
                deleteLearning={this.confirmDelete}
                editLearning={this.editLearning}
                openForm={this.openClose}
            />
            </div>
        );
    }
}

class ShowHideSection extends Component {

    render() {

        return(
            <div>
            <h3 className="admin-h3">Show/Hide Section</h3>
                <button className="on-off" onClick={this.props.onOff}
                style={ this.props.isTrue == true ? {backgroundColor:'green'} : {backgroundColor:'red'}}>
                    { this.props.isTrue == true ? "On" : "Off" }
                </button>
            </div>
        );
    }
}

class LearningForm extends Component {

    render() {

        const displayVal = this.props.display;

        let formDisplay;
        formDisplay = (displayVal == 'none') ? formDisplay = 'block' : formDisplay = 'none';

        const displayStyle = {display: formDisplay}

        return(
            <div style={displayStyle}>
            <form onSubmit={this.props.onSubmit}>
            <h3 className="admin-h3">Add Learning Blurb</h3>
            <label>Title:<br/>
                <input type="text" name="header" value={this.props.stateValue.header} onChange={this.props.onChange}/>
            </label>
            <label>Font Awesome Icon:<br/>
                <input type="text" name="icon" value={this.props.stateValue.icon} onChange={this.props.onChange}/>
            </label>
            <label>Text:<br/>
                <textarea type="text" rows="10" name="text" value={this.props.stateValue.text} onChange={this.props.onChange}/>
            </label>
                <input className="form-submit" type="submit" value="Submit"/>
            </form>
            </div>
        );
    }
}

class EditLearningForm extends Component {

    render() {

        const displayVal = this.props.display;
        const displayStyle = {display: displayVal};

        return(
            <div style={displayStyle}>
            <form onSubmit={this.props.onSubmit}>
            <h3 className="admin-h3">Edit Learning Blurb</h3>
            <label>Title:<br/>
                <input type="text" name="header" value={this.props.stateValue.header} onChange={this.props.onChange}/>
            </label>
            <label>Font Awesome Icon:<br/>
                <input type="text" name="icon" value={this.props.stateValue.icon} onChange={this.props.onChange}/>
            </label>
            <label>Text:<br/>
                <textarea type="text" rows="10" name="text" value={this.props.stateValue.text} onChange={this.props.onChange}/>
            </label>
                <input type="submit" value="Submit"/>
            </form>
                <button className="cancel-button" onClick={this.props.cancelEdit}>Cancel</button>
            </div>
        );
    }
}

class ManageObjects extends Component {

    render() {

        let learningContent;
        if (this.props.learningArray) {

                learningContent = this.props.learningArray.slice(0).reverse().map((data, index) => {

                    return(
                        <div id="box" key={index} className="manage-section-box">
                            <p><strong>{data.header}</strong></p>
                            <button className="admin-button left-button" onClick={() => {this.props.editLearning(data.header, data.icon, data.text, data.key, data.date); this.props.openForm();}}>Edit</button>
                            <button className="admin-button right-button" onClick={() => this.props.deleteLearning(data.key)}>Delete</button>
                        </div>
                    );

                });
        }

        return (
            <div>
            {learningContent}
            </div>
        );

    }
}

export default ManageLearning;
