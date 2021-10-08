import React, {useEffect} from 'react';
import { hot } from 'react-hot-loader';
import Dashboard from './Dashboard';
import ToggleButton from './ToggleButton';

function ToggleContainer(props) {
  const { paths } = props;
  const { user } = props;

  const [showDashboard, setShowDashboard] = React.useState(false);

  const handlerShowDashboard = () => {
    setShowDashboard((show) => setShowDashboard(!show));
  };

  const escFunction = (event) => {
    if(event.keyCode === 27) {
      setShowDashboard(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return (
    <>
      {showDashboard && <div className="clickOut" onClick={handlerShowDashboard} ></div>}
      <ToggleButton onClick={handlerShowDashboard} />

      {showDashboard && <Dashboard paths={paths} />}
    </>
  );
}

export default hot(module)(ToggleContainer);