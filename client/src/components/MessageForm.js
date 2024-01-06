
import {useState} from 'react';

export default function MessageForm(props) {
    const [message, setMessage] = useState({
        title: "",
        author: "",
        messageText: "",
    })

    const updateMessage = (value) => {
        return setMessage((prev) => {
            return {...prev, ...value}
        })
    }
 
    async function handleSubmit(e) {
        const newMessage = {...message};

        await fetch('https://message-board-wheat.vercel.app/message', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newMessage)
        })
        .catch(err => console.log(err))

        setMessage({
            title: "",
            author: "",
            messageText: ""
        })
        props.populateMessages()
    }

    return (
        <div className="message-form-container">
            <h2 className='title'>Write a programming thought</h2>
            <input
                type="text"
                id="title-text"
                role='title-text'
                placeholder="Enter a Post Title"
                value={message.title}
                onChange={(e) => updateMessage({title: e.target.value})}
                />
            <input
                type="text"
                id="author-text"
                role="author-text"
                placeholder="Who are you?"
                value={message.author}
                onChange={(e) => updateMessage({author: e.target.value})}
                />
            <textarea
                rows="10"
                cols="32"
                placeholder="Write your programming thought here..."
                role='textbox'
                value={message.messageText}
                onChange={(e) => updateMessage({messageText: e.target.value})}
            />
            <button 
            onClick={handleSubmit}
            className='submit-btn'
            >
                Submit
            </button>
        </div>
    )
}