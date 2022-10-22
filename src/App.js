import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <Routes>
      <Route exact path="/">
        <Table />
      </Route>
    </Routes>
  );
}

export default App;
