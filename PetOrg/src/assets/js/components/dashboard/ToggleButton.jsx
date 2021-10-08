import React from 'react';
import { hot } from 'react-hot-loader';

function ToggleButton(props) {
  return (
    <a id="toggle_button" onClick={props.onClick} >
      <i className="fa fa-bars"></i>
    </a>
  );
}

export default hot(module)(ToggleButton);