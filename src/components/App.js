import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import theme from './ui/Theme';
import Header from './ui/Header';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={() => <div>Home</div>} />
        <Route exact path="/services" component={() => <div>Services</div>} />
        <Route exact path="/customSoftware" component={() => <div>Custom Software</div>} />
        <Route exact path="/mobileApp" component={() => <div>Mobile App</div>} />
        <Route exact path="/websites" component={() => <div>Websites</div>} />
        <Route exact path="/revolution" component={() => <div>Revolution</div>} />
        <Route exact path="/about" component={() => <div>About Us</div>} />
        <Route exact path="/contact" component={() => <div>Contact Us</div>} />
        <Route exact path="/estimates" component={() => <div>Estimates</div>} />
      </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;