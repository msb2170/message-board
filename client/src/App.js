
import './App.css';
import {useState, useEffect} from 'react'
import MessageForm from './components/MessageForm';
import Message from './components/Message';


function App() {
  const [messages, setMessages] = useState([])

  //Re-render when the length of the message array changes (a message is added or deleted)
  useEffect(() => {
    populateMessages()
  }, [messages.length])

  const populateMessages = () => {
    //Get the messages from the database
      fetch('https://message-board-wheat.vercel.app/message')
    //Convert the response to JSON
    .then((response) => response.json())
    //Set the messages state to the data from the database
    .then((data) => setMessages(data.db))
  }

  async function handleDelete(id) {
    //Get the message to be deleted
    await fetch(`https://message-board-wheat.vercel.app/message/${id}`, {
      method: "DELETE"
    })
    //Remove the message from the messages array
    const newMessages = messages.filter(message => message.id !== id);
    //Update the messages state
    setMessages(newMessages)
    //Re-render the messages
    populateMessages()
  }
  
  return (
    <div className="App">
      <h1 className='title' role='title'>Programming Thoughts</h1>
      <MessageForm
        
        populateMessages={populateMessages}
      />
      {messages.map((message, i) => {
          return <Message
                  
                  key={i}
                  role='message'
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
