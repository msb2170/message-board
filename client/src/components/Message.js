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
        await fetch(`/message/${id}`)
        .then((res) => res.json())
        .then((data) => setMessage(data))
    }

    async function handleEdit() {
        const editedMessage = {
            title: message.title,
            author: message.author,
            messageText: message.messageText,
        };

        await fetch(`/message/${message._id}`, {
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
                <h2 className='message-title'>{props.title}</h2>
                <h4 className='message-author'>Posted By: {props.author}</h4>
                <h4 className="date-field">Posted on: {cleanDate(props.date)}</h4>
            </div>
            <div className="message-body">
                <h3 className='message-text'><strong>{props.messageText}</strong></h3>
            </div>
            <div className='card-btns'>
            <button className="card-btn" onClick={() => getQuestion(props.id)}>edit</button>
            <span className='vert-line'></span>
            <button className="card-btn" onClick={props.handleDelete}>delete</button>
            </div>
        </div>
        
    )
    } else {
        return (
            <div className='update-container'>
                 <h2>Update your programming thought</h2>
            <h4>Title</h4>     
            <input
                className='title-update'
                type="text"
                id="title-text"
                placeholder="Enter a Post Title"
                value={message.title}
                onChange={(e) => updateMessage({title: e.target.value})}
                />
            <h4>Author</h4>
            <input
                type="text"
                className='author-update'
                id="author-text"
                placeholder="Who are you?"
                value={message.author}
                onChange={(e) => updateMessage({author: e.target.value})}
                />
            <textarea
                rows="10"
                cols="32"
                className='messageText-update'
                placeholder="Write your programming thought here..."
                value={message.messageText}
                onChange={(e) => updateMessage({messageText: e.target.value})}
            />
                <button 
                    onClick={handleEdit}
                    className="submit-btn-edit"
                >
                    Submit
                </button>
            </div>
        )
    }
}