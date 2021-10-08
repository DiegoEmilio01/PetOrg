import React, { useEffect, useState } from  'react';
import TextDisplay from './TextDisplay';
import TextInput from './TextInput';
const axios = require('axios');

const useForceUpdate = () => useState()[1];

function Console() {
  const [textCommand, setTextCommand] = useState('');
  const [messages, setMessages] = useState(['hola']);

  const forceUpdate = useForceUpdate();
  useEffect(() => {

  }, [messages])

  const apiCall = async (url, requestOptions) => {
    return await axios(url, requestOptions)
      .then((res) => res.data);

  };

  const GET = async (object, params, newMesagges) => {
    console.log('ejecutando comando GET para el objeto ', object , '.');
    const url = `http://pet-org.herokuapp.com/api/${object}`;
    const headers = {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
    const requestOptions = {
      method: 'GET',
      headers,
      credentials: 'include',
      body: JSON.stringify(),
    }
    const response = await apiCall(url, requestOptions);
    response.map((element) => newMesagges.push(element.name))
    console.log('loool', newMesagges);
    await setMessages(newMesagges);
    forceUpdate();

  }

  const CREATE = async (object, params, newMesagges) => {
    console.log('ejecutando comando CREATE para el objeto ', object, ' y parametros ', params, '.');
  }

  const DELETE = async (object, params, newMesagges) => {
    console.log('ejecutando comando DELETE para el objeto ', object, ' y parametros ', params, '.');

  }

  const LOGIN = async (object, params, newMesagges) => {
    console.log('ejecutando comando LOGIN para el objeto ', object, ' y parametros ', params, '.');

  }

  const commands = {'get': GET, 'create': CREATE, 'delete': DELETE, 'login':LOGIN};

  const processTextCommand = (e) => {
    e.preventDefault();
    console.log(textCommand);
    const newMessages = messages;
    newMessages.push(textCommand)
    console.log(messages);
    handlecommand(textCommand, newMessages);
    setTextCommand('');

  }

  const handlecommand = (rawCommand, newMesagges) => {
    const words = rawCommand.split(' ');
    try {
      const command = commands[words[0].toLowerCase()];
      const object = words[1].toLowerCase();
      const rawParams = words.slice(2).map((param) => param.split(':'));
      let params = {};
      rawParams.forEach((rawParam) => {
        params[rawParam[0].toLowerCase()] = rawParam[1];
      })
      command(object, params, newMesagges)

    } catch {
      newMesagges.push('Comando inválido')
      setMessages(newMesagges)
    }
  }
  return (
    <div className={'Console'} >
      PetOrg Console
      <TextDisplay messages={messages} key={messages}/>
      <TextInput textCommand={textCommand} setTextCommand={setTextCommand} processTextCommand={processTextCommand}/>
    </div>
  );
}

export default Console;