
import './App.css';
import {useState, useEffect} from 'react'
import MessageForm from './components/MessageForm';
import Message from './components/Message';


function App() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    populateMessages()
  }, [messages.length])

  const populateMessages = () => {
      fetch('http://localhost:8000/message')
    .then((response) => response.json())
    .then((data) => setMessages(data.db))
  }

  async function handleDelete(id) {
    await fetch(`http://localhost:8000/message/${id}`, {
      method: "DELETE"
    })
    const newMessages = messages.filter(message => message.id !== id);
    setMessages(newMessages)
    populateMessages()
  }
  
  return (
    <div className="App">
      <h1 className='title'>Programming Thoughts</h1>
      <MessageForm
        
        populateMessages={populateMessages}
      />
      {messages.map((message, i) => {
          return <Message
                  
                  key={i}
                  title={message["title"]}
                  author={message["author"]}
                  messageText={message["messageText"]}
                  date={message["date"]}
                  handleDelete={() => handleDelete(message["_id"])}
                  id={message["_id"]}
                  populateMessages={populateMessages}
                />
      })
        
    }
    </div>
  );
}

export default App;
