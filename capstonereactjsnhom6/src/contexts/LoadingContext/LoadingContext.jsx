import { Spin } from 'antd';
import { createContext, useState } from 'react';
import './style.scss';

const DEFAULT_STATE = {
  isLoading: false,
};

export const LoadingContext = createContext(DEFAULT_STATE);

export const LoadingProvider = (props) => {
  const [state, setState] = useState(DEFAULT_STATE);

  document.querySelector('body').style.overflow = state.isLoading
    ? 'hidden'
    : 'unset';

  return (
    <LoadingContext.Provider value={[state, setState]}>
      {state.isLoading && (
        <div className="wrapper-spin">
          <Spin size="large" />
        </div>
      )}

      {props.children}
    </LoadingContext.Provider>
  );
};
