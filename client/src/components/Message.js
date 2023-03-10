import {useState} from 'react'

export default function Message(props) {
    const [isEditing, setIsEditing] = useState(false)
    const [message, setMessage] = useState('')

    const updateMessage = (value) => {
        return setMessage((prev) => {
            return {...prev, ...value}
        })
    }

    const cleanDate = (date) => {
        return date.toString().replace("T", " ").split(".")[0]
    }
    
    async function getQuestion(id) {
        setIsEditing(true)
        await fetch(`http://localhost:8000/message/${id}`)
        .then((res) => res.json())
        .then((data) => setMessage(data))
    }

    async function handleEdit() {
        const editedMessage = {
            title: message.title,
            author: message.author,
            messageText: message.messageText,
        };

        await fetch(`http://localhost:8000/message/${message._id}`, {
            method: "PATCH",
            body: JSON.stringify(editedMessage),
            headers: {
                "Content-Type": "application/json"
            },
        });
        setIsEditing(false)
        props.populateMessages()
    }  

    if (!isEditing) {
    return (
        <div className="message-container">
            <div className="message-header">
                <h2>{props.title}</h2>
                <h4>Posted By: {props.author}</h4>
            </div>
            <div className="message-body">
                <h3 className='message-text'><strong>{props.messageText}</strong></h3>
                <h4 className="date-field">Posted on: {cleanDate(props.date)}</h4>
            </div>
            <button className="card-btn-edit" onClick={() => getQuestion(props.id)}>edit</button>
            <button className="card-btn-del" onClick={props.handleDelete}>delete</button>
        </div>
        
    )
    } else {
        return (
            <div>
                 <h2>Update your programming thought</h2>
            <input
                type="text"
                id="title-text"
                placeholder="Enter a Post Title"
                value={message.title}
                onChange={(e) => updateMessage({title: e.target.value})}
                />
            <input
                type="text"
                id="author-text"
                placeholder="Who are you?"
                value={message.author}
                onChange={(e) => updateMessage({author: e.target.value})}
                />
            <textarea
                rows="10"
                cols="32"
                placeholder="Write your programming thought here..."
                value={message.messageText}
                onChange={(e) => updateMessage({messageText: e.target.value})}
            />
                <button onClick={handleEdit}>Submit</button>
            </div>
        )
    }
}