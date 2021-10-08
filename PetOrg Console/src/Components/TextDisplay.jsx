import React, { useEffect, useState } from  'react';


function TextDisplay({messages}) {
  const [localMessages, setLocalMessages] = useState(messages);

  useEffect(() => {
    console.log(messages);
    setLocalMessages(messages);
  }, [messages])

  return (
    <div className={'Text-Display-Box'}>
      Text Display
      {localMessages.map((message) => {
        return <p>{message}</p>
      })}
    </div>
  );
}

export default TextDisplay;