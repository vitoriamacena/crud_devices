import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import AppRoutes from './Routes';

function App() {
  return (
    <div className={styles.App}>
      <AppRoutes />
    </div>
  );
}

export default App;
