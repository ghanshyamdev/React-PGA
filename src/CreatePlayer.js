import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router'
import { connect } from 'react-redux';

import { addPlayerAction, editPlayerAction } from './actions/playersAction';

class CreatePlayer extends Component {
    state = {
        displayNewPlayer: false,
    };

    componentDidMount() {
        if (this.props.location.state && this.props.location.state.edit) {
            this.setState({
                firstName: this.props.location.state.formData.firstName,
                lastName: this.props.location.state.formData.lastName,
                score: this.props.location.state.formData.score,
            })
        }
    }

    handleChange = ({ target }) => {
        if (target.name === 'score') {
            target.value >= 0 && target.value <= 100 && this.setState({
                [target.name]: target.value,
            });
        } else {
            this.setState({
                [target.name]: target.value,
            });
        }
    };

    handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const { firstName, lastName, score } = this.state;
        if(!firstName ) {
            return alert('Please Enter The First Name');
        }
        if(!lastName) {
            return alert('Please Enter The Last Name');
        }
        if(!score) {
            return alert('Please Enter The Score');
        }

        if (this.props.location.state && this.props.location.state.edit) {
            this.props.editPlayerAction({ formData: { firstName, lastName, score, id: this.props.location.state.formData.id } })
        } else {
            this.props.addPlayerAction({ formData: { firstName, lastName, score } });
        }

        this.setState({
            displayNewPlayer: true,
        })
    };

    render() {
        const { firstName, lastName, score, displayNewPlayer } = this.state;
        if (displayNewPlayer) {
            return <Redirect to='/' />;
        }

        return (
            <div className="App">
                <Form>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={2}>First Name <span style={{ color: 'red' }}>*</span></Label>
                        <Col sm={10}>
                            <Input type="text" name="firstName" value={firstName} onChange={this.handleChange} placeholder="Enter First Name"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={2}>Last Name <span style={{ color: 'red' }}>*</span></Label>
                        <Col sm={10}>
                            <Input type="text" name="lastName" value={lastName} onChange={this.handleChange} placeholder="Enter Last Name"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={2}>Score <span style={{ color: 'red' }}>*</span></Label>
                        <Col sm={10}>
                            <Input type="number" name="score" value={score} onChange={this.handleChange} placeholder="Enter The Score"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={12}>
                            <Button color="primary" onClick={this.handleClick}>Save Player</Button>{' '}
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addPlayerAction: (data) => dispatch(addPlayerAction(data)),
    editPlayerAction: (data) => dispatch(editPlayerAction(data)),
})

export default connect(null, mapDispatchToProps)(CreatePlayer);
