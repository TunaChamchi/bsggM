import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Main, Detail, Map } from 'pages';

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Main}/>
                <Switch>
                    <Route path="/Detail" component={Detail}/>
                    <Route path="/Map" component={Map}/>
                </Switch>
            </div>
        );
    }
}

export default App;