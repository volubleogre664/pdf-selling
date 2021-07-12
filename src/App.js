import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase/app";
// import "firebase/analytics";
import "firebase/storage";

import Header from "./components/Header";
import InstallPromt from "./components/InstallPromt";

import Account from "./pages/Account";
import ViewBook from "./pages/ViewBook";
import BuyBook from "./pages/BuyBook/BuyBook";
import UploadBook from "./pages/UploadBook";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { useUserSlice } from "./redux/getState";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);
firebase.analytics();

function App() {
  const [{ installPrompt }] = useUserSlice();

  return (
    <Router>
      <div className="flex flex-col overflow-x-hidden overflow-y-auto relative font-poppins text-gray-800 w-screen h-screen">
        <Header />
        {installPrompt && <InstallPromt />}
        <Switch>
          <Route exact path="/" component={Account} />

          <Route exact path="/login" component={Login} />

          <Route exact path="/register" component={Register} />

          {/* <Route exact path="/edit_information" component={EditUser} /> */}

          <Route exact path="/new_book" component={UploadBook} />

          <Route exact path="/viewbook*" component={ViewBook} />

          <Route exact path="/buy*" component={BuyBook} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
