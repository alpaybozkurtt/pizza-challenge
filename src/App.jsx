  import { BrowserRouter, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
  import Home from "./components/Anasayfa";
  import OrderForm from "./components/SiparisFormu";
  import Success from "./components/SiparisAlindi";  
  import "./components/SiparisFormu.css"
  import "./components/Anasayfa.css"

  import "./App.css"
  
  function App() {
    return (
      <BrowserRouter>
  
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/SiparisFormu">
            <OrderForm />
          </Route>
          <Route path="/SiparisAlindi">
            <Success />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  export default App;