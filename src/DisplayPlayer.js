import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import { deletePlayerAction, handleSortingAction, editPlayerAction } from './actions/playersAction';

class DisplayPlayer extends Component {
    state = {
        addNewPlayer: false,
        displayPlayerData: [],
        sortingIsDoneOn: '',
        editPlayer: false,
    };

    componentWillMount() {
        const { displayPlayerData } = this.props;
        this.setState({
            displayPlayerData,
        })
    }

    componentWillReceiveProps(nextProps) {
        const { displayPlayerData } = nextProps;
        this.setState({
            displayPlayerData,
        })
    }

    removePlayer = (e, data) => {
        this.props.deletePlayerAction(data.id);
    };

    editPlayer = (e, data) => {
        this.setState({
            editPlayer: data,
        })
    };

    handleSort = (data) => {
        const { displayPlayerData, sortingIsDoneOn } = this.state;
        if (data === 'score') {
            this.props.handleSortingAction(displayPlayerData.sort((a, b) => Number(sortingIsDoneOn === 'score' ? a.score : b.score) - Number(sortingIsDoneOn === 'score' ? b.score : a.score) || (a.firstName + ', ' + a.lastName).localeCompare(b.firstName + ', ' + b.lastName)))
            return this.setState({
                sortingIsDoneOn: sortingIsDoneOn === 'score' ? '' : 'score',
            })
        }

        this.props.handleSortingAction(displayPlayerData.sort((a, b) => (sortingIsDoneOn === 'name' ? a.firstName + ', ' + a.lastName : b.firstName + ', ' + b.lastName ).localeCompare(sortingIsDoneOn === 'name' ? b.firstName + ', ' + b.lastName : a.firstName + ', ' + a.lastName )))
        this.setState({
            sortingIsDoneOn: sortingIsDoneOn === 'name' ? '' : 'name',
        })
    };

    render() {
        const { addNewPlayer, editPlayer } = this.state;
        const { displayPlayerData } = this.props;
        if (addNewPlayer) {
            return <Redirect to='/add-player' />;
        }
        if (editPlayer) {
            console.log(editPlayer);
            return <Redirect to={{
                pathname: "/add-player",
                state: { formData: editPlayer, edit: true },
            }} />;
        }

        return (
            <>
                <Table>
                    <thead>
                    <tr>
                        <th style={{ cursor: 'pointer' }} onClick={() => this.handleSort('name')}>Full Name</th>
                        <th style={{ cursor: 'pointer' }} onClick={() => this.handleSort('score')}>Score</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            displayPlayerData.map((player, index) =>
                                <tr key={ player.firstName + index }>
                                    <td>{ player.firstName + ', ' + player.lastName }</td>
                                    <td>{ player.score }</td>
                                    <td style={{ cursor: 'pointer' }} >
                                        <span onClick={(e) => this.removePlayer(e, player)}>Delete </span>
                                        <span onClick={(e) => this.editPlayer(e, player)}> Edit</span>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
                <Button color="primary" onClick={() => { this.setState({addNewPlayer: true}) }}>Add New Player</Button>{' '}
            </>
        );
    }
}

const mapStateToProps = ({ playersReducers }) => {
    return playersReducers;
};

const mapDispatchToProps = dispatch => ({
    deletePlayerAction: (data) => dispatch(deletePlayerAction(data)),
    handleSortingAction: (data) => dispatch(handleSortingAction(data)),
    editPlayerAction: (data) => dispatch(editPlayerAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPlayer);