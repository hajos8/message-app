import "../styles/Messages.css";

export default function MessageBoxComponent({ data, currentUserId }) {
    return (
        <div className="message-box">
            {data[0].messages.map((elem, idx) => {
                return (
                    <div key={idx} className={elem.senderId == currentUserId ? "sent message" : "received message"}>
                        <p>{elem.text}</p>
                        <span className="timestamp">{elem.timestamp}</span>
                    </div>
                )
            })}
        </div>
    )
}