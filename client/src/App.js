
import './App.css';
import {useState, useEffect} from 'react'
import MessageForm from './components/MessageForm';
import Message from './components/Message';

function App() {
  const [messages, setMessages] = useState([])

  useEffect(() =>  {
      fetch('http://localhost:8000/message')
    .then((response) => response.json())
    .then((data) => setMessages(data.db))
  }, [])

  console.log(messages)

  return (
    <div className="App">
      <h1>Programming Thoughts</h1>
      <MessageForm />
      {messages.map((message, i) => {
          return <Message
                  key={i}
                  title={message["title"]}
                  author={message["author"]}
                  messageText={message["messageText"]}
                  date={message["date"]}
                />
      })
        
    }
    </div>
  );
}

export default App;
