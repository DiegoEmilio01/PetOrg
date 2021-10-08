import React from 'react';
import { hot } from 'react-hot-loader';

function DashButton(props) {
  const { path } = props;
  return (
    <button><a className="link" href={path.url}>{path.text}</a></button>
  );
}

export default hot(module)(DashButton);