import React from 'react';

import { Link, Route, Routes } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen';

import SignupScreen from './screens/SignupScreen';

import { useContext } from 'react';
import { Store } from './Store';
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
  };
  return (
    <div className="d-flex flex-column site-container">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <div>
          <Link to="/">Portfolio</Link>

          <div className="me-auto">
            {userInfo ? (
              // <span>{userInfo.name} </span>
              <div>
                <Link
                  className="dropdown-item"
                  to="#signout"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
                <p>welcome {userInfo.name}</p>
              </div>
            ) : (
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>
      <main>
        <div>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
          </Routes>
        </div>
      </main>
      <footer>
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>
  );
}

export default App;
