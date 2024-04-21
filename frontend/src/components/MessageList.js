import { FaUser, FaRobot } from "react-icons/fa";
import { ImUser } from "react-icons/im";

const MessageList = ({ messages, isTyping, dotCount }) => {
  return (
    <div className="flex flex-col overflow-y-auto py-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          } mb-2`}
        >
          {msg.sender === "user" ? (
            <div className="flex items-end">
              <div className="p-2 rounded-lg bg-blue-500 text-white">
                <p className="text-sm">{msg.text}</p>
              </div>
              <div className="ml-2 mb-2 flex items-center">
                <ImUser size={18} className="text-blue-500" />
              </div>
            </div>
          ) : (
            <div className="flex items-end">
              <div className="mr-2 mb-2 flex items-center">
                <FaRobot size={18} className="text-cyan-600" />
              </div>
              <div className="p-2 rounded-lg bg-gray-200 text-gray-800">
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          )}
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
    </div>
  );
};

export default MessageList;
