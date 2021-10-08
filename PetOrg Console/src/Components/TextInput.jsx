import React from  'react';


function TextInput({textCommand, setTextCommand, processTextCommand}) {

  return (
    <div className={'Text-Input-Box'}>
      <label htmlFor={'InputArea'}>PetOrg:</label>
      <input name={'InputArea'} id={'InputArea'} type={"text"}
             spellCheck={false}
             placeholder={'Enter command'}
             value={textCommand}
             onChange={(event) => setTextCommand(event.target.value)}
             onKeyPress={(event) => event.key === 'Enter' ? processTextCommand(event) : null}

      />
      <button onClick={(event) => processTextCommand(event)} className={'Send-Button'}>
        Send
      </button>
    </div>
  );
}

export default TextInput;