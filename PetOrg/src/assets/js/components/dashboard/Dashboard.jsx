import React from 'react';
import { hot } from 'react-hot-loader';
import DashButton from './DashButton';

function Dashboard(props) {
  const { paths } = props;
  return (
    <div id="dashboard">
      {paths.map((path) => (
        <DashButton key={path.id} path={path} />
      ))}
    </div>
  );
}

export default hot(module)(Dashboard);