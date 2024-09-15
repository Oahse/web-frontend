import React from 'react';
import Router from './routes/router';  // Import the Router component that handles the app's routing
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS for styling
import 'antd/dist/reset.css';  // Import Ant Design CSS for styling (for version 5 or later)
import './App.css';  // Import custom styles for the App component

function App() {
  // Define the API URL. For now, it's an empty string.
  // Replace with the actual API URL or configuration as needed.
  const API_URL = 'vv b';

  return (
    <div className='app'>
      {/* Render the Router component and pass the API_URL as a prop */}
      {/* The Router component will handle all routing based on the API_URL */}
      <Router API_URL={API_URL} />
    </div>
  );
}

export default App;
