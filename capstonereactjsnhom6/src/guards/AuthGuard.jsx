import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AuthGuard(props) {
  const navigate = useNavigate();

  const userState = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (!userState.userInfo) {
      navigate('/login');
    }
  }, []);

  return <>{props.children}</>;
}
