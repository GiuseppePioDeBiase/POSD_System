import { useState } from 'react';

function useToken() {
  const getToken = () => sessionStorage.getItem('token');
  const [token, setTokenState] = useState(getToken());

  const setToken = (userToken) => {
    sessionStorage.setItem('token', userToken);
    setTokenState(userToken);
  };

  const removeToken = () => {
    sessionStorage.removeItem('token');
    setTokenState(null);
  };

  return {
    token,
    setToken,
    removeToken
  };
}

export default useToken;
