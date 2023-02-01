
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
  }, [messages.length])

  console.log(messages)

  async function handleDelete(id) {
    await fetch(`http://localhost:8000/message/${id}`, {
      method: "DELETE"
    })
    const newMessages = messages.filter(message => message.id !== id);
    setMessages(newMessages)
  }


  return (
    <div className="App">
      <h1>Programming Thoughts</h1>
      <MessageForm 
        
      />
      {messages.map((message, i) => {
          return <Message
                  key={i}
                  title={message["title"]}
                  author={message["author"]}
                  messageText={message["messageText"]}
                  date={message["date"]}
                  handleDelete={() => handleDelete(message["_id"])}
                />
      })
        
    }
    </div>
  );
}

export default App;
