import logo from './logo.svg';
import NonAuthRoutes from './routes/nonauthroutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';  // For Ant Design version 5 or later

import './App.css';



function App() {
  const API_URL = '';
  return (
    <div className='app'>
      <NonAuthRoutes API_URL={API_URL} />
    </div>
  );
}

export default App;
