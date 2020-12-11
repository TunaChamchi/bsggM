import React, { Component } from 'react';
import { Route, Switch, Link  } from 'react-router-dom';
import { Main, Detail, Character } from 'pages';

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Main}/>
                <Switch>
                    <Route path="/Character" component={Character}/>
                    <Route path="/Detail" component={Detail}/>
                </Switch>
            </div>
        );
    }
}

export default App;