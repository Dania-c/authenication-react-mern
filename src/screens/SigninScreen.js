import React from 'react';
import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
// import { toast } from 'react-toastify';
import { getError } from '../utils';

function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      //localstorage is to save the user information in the browser
      // and we convert it into string cause the data i the browser should be in string type
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/'); //we navigate to the redirect url, if it dosent exist we go to the home page
    } catch (err) {
      alert(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div>
      <h1 className="mb-3">Sign In</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label>Email</label>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <button type="submit">Sign In</button>
        </div>
        <div className="mb-3">
          New customer?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </form>
    </div>
  );
}

export default SigninScreen;
