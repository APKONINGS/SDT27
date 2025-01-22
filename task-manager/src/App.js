import React from 'react';
import Auth from './components/Auth'; 
import IndexPage from './components/home'; 
const App = () => {
  return (
    <div>
      <Auth />
      {/* Uncomment to show the index page */}
      {/* <IndexPage /> */}
    </div>
  );
};

export default App;