
import './App.css';
import {useState, useEffect} from 'react'
import MessageForm from './components/MessageForm';
import Message from './components/Message';

function App() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getMessages()
  }, [])

  function getMessages() {
    try {
      fetch('http://localhost:8000/message')
    .then((response) => response.json())
    .then((data) => console.log(data))
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div className="App">
      <h1>Message Board</h1>
      <MessageForm />
      <Message />
    </div>
  );
}

export default App;
