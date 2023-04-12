import React from 'react';
import { render } from '@testing-library/react';
import Provider from '../context/Provider';

function RenderProvider(children) {
  return (
    render(
      <Provider>
        { children }
      </Provider>,
    )
  );
}

export default RenderProvider;
