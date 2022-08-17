import React, { Component } from "react";
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import Home from './components/home/home';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Home />
        </Provider>
      </div>
    );
  }
}

export default App;
