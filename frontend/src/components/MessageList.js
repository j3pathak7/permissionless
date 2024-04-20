const MessageList = ({ messages, isTyping, dotCount }) => {
  return (
    <>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          } mb-2`}
        >
          <div
            className={`p-2 rounded-lg ${
              msg.sender === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="flex justify-start mb-2">
          <div className="p-2 rounded-lg bg-gray-200 text-gray-800 typing-indicator">
            {Array(dotCount + 1)
              .fill(".")
              .map((dot, index) => (
                <span key={index} style={{ "--i": index }}>
                  {dot}
                </span>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MessageList;
