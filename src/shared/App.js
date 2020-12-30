import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Main, Detail, Map, RouteM,  Rank, Rank_Character } from 'pages';

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Main}/>
                <Switch>
                    <Route path="/Detail" component={Detail}/>
                    <Route path="/Map" component={Map}/>
                    <Route path="/Route" component={RouteM}/>
                    <Route path="/Rank" component={Rank}/>
                    <Route path="/RankCharacter" component={Rank_Character}/>
                </Switch>
            </div>
        );
    }
}

export default App;