export default function MessageForm(props) {
    return (
        <div className="message-form-container">
            <h2>Write a programming thought</h2>
            <input
                type="text"
                id="title-text"
                placeholder="Enter a Post Title"
                />
            <input
                type="text"
                id="author-text"
                placeholder="Who are you?"
                />
            <textarea
                rows="10"
                cols="32"
                placeholder="Write your programming thought here..."
            />
            <button>
                Submit
            </button>
        </div>
    )
}