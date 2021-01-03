import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Main, Detail, Map, RouteM, NewMain ,Match, Character, Rank, Rank_Character, Loading } from 'pages';

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={NewMain}/>
                <Switch>
                    <Route path="/Tier" component={Main}/>
                    <Route path="/Detail" component={Detail}/>

                    <Route path="/Map" component={Map}/>
                    <Route path="/Route" component={RouteM}/>

                    <Route path="/Match" component={Match}/>
                    
                    <Route path="/Rank" component={Rank}/>
                    <Route path="/RankCharacter" component={Rank_Character}/>
                </Switch>
            </div>
        );
    }
}

export default App;