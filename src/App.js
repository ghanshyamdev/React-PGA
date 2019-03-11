import React, {Component} from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import './App.css';
import CreatePlayer from './CreatePlayer';
import DisplayPlayer from './DisplayPlayer';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Route exact path="/add-player" component={CreatePlayer}/>
                    <Route exact path="/" component={DisplayPlayer}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
