import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';


function FactDisplay(props) {
  const [fact, setFact] = useState(null);
  
  useEffect(() => {
    if (!fact) {
      fetch('https://cat-fact.herokuapp.com/facts')
        .then((response) => response.json())
        .then((jresponse) => {
          let limit = 0;
          if (jresponse.all.length > 20) {
            limit = 20;
          } else {
            limit = jresponse.all.length;
          }
          const index = Math.floor(Math.random() * limit);
          setFact(jresponse.all[index].text);
      })
    }
  });

  if (fact) {
    return (
      <div id="fact_container">
        <h4>Dato Freak</h4>
        <p>{fact}</p>
      </div>
    );
  } else {
    return <></>;
  }
}

export default hot(module)(FactDisplay);