import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { configure } from 'mobx';
import { RootStore } from './store/RootStore';

configure({ enforceActions: 'observed' });

const rootStore = new RootStore();

export const StoreContext: React.Context<RootStore> = React.createContext(rootStore);

ReactDOM.render((
  <StoreContext.Provider value={rootStore}>
    <App />
  </StoreContext.Provider>
), document.getElementById('root'));
