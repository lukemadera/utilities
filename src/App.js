import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import './App.css';
import './styles/flexbox.css';
import RandomItemComponent from './RandomItem/RandomItemComponent';

const Home = () => (
    <div>Home</div>
);

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <div className='flexbox app-header'>
                        <div className='flex1'><Link to='/random-item'>Random Item</Link></div>
                    </div>

                    <div className='app-content'>
                        <Route exact path='/' component={Home}/>
                        <Route path='/random-item' component={ RandomItemComponent } />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
