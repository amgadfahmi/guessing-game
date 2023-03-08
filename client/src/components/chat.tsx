import { useEffect, useState } from 'react';
import { ChatMessage } from '../types';

interface ChatProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}
const Chat = ({ messages, onSendMessage }: ChatProps) => {
  const [message, setMessage] = useState<string>('');
  const handleSendMessage = () => {
    onSendMessage(message);
    setMessage('');
  };

  useEffect(() => {}, [messages]);

  return (
    <>
      <div className="w-full h-full grid grid-rows-1 bg-zinc-900 rounded-lg shadow-md p-2 ">
        <div className="w-full h-full pb-3 overflow-y-hidden overflow-hidden">
          <div
            placeholder="chat"
            className="w-full h-52 bg-gray-700 rounded-lg shadow-inner overflow-y-auto scroll-smooth"
          >
            <ul>
              {messages?.map((message, i) => (
                <li key={i} className="flex p-2 gap-2">
                  <span
                    className={`font-bold ${
                      i % 2 === 0 ? 'text-orange-700' : 'text-sky-600'
                    }`}
                  >
                    {message.sender}
                  </span>
                  :<span className="text-gray-400">{message.message}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full grid grid-cols-4 gap-2">
          <div className="w-full col-span-3">
            <input
              type="text"
              placeholder="Enter Message..."
              className="input input-bordered  w-full "
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <button
              className="btn btn-outline btn-warning w-full btn-small"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
