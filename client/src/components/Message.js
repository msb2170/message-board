export default function Message(props) {
    return (
        <div className="message-container">
            <div className="message-header">
                <h4>{props.title}</h4>
                <h4>{props.author}</h4>
            </div>
            <div className="message-body">
                <h2>{props.messageText}</h2>
                <h4>{props.date}</h4>
            </div>
            <button>edit</button>
            <button>delete</button>
        </div>
    )
}