import { HashRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { AppHeader } from './cmps/AppHeader/AppHeader';
import { TodoApp } from './pages/TodoApp/TodoApp';
import 'font-awesome/css/font-awesome.min.css'
import './App.css';

function App() {
  return (
  <Router>
    <div className="App">
        <AppHeader /> 
        <Switch >
          <Route path="/" component={TodoApp} />
        </Switch>
    </div>
  </Router>
  );
}

export default App;
