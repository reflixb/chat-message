import { configureAbly, useChannel } from "@ably-labs/react-hooks";
import { useState } from "react";

interface Message {
  id: number;
  data: {
    text: string;
    date: number;
  };
}

interface ChatMessage {
  id: number;
  text: string;
}

configureAbly({
  key: "AJGfXA.9sCLtQ:MolwgIPUQZVm31-cFDatAMfEnRhZ41yJXnT53z_u4hs",
  clientId: Date.now() + "",
});

const ChatBubble: React.FC<{ text: string }> = ({ text }) => (
  <div className="chat-bubble p-2 bg-blue-500 text-white rounded-lg">
    {text}
  </div>
);

const Home: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [channel] = useChannel("public-chat", (message: Message) => {
    setMessages((prev) => [
      ...prev,
      { id: message.id, text: message.data.text },
    ]);
  });

  async function sendMessage() {
    channel.publish("message", { text, date: Date.now() });
    setText("");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full p-4 bg-white rounded shadow">
        {messages.map((message) => (
          <div key={message.id} className="chat chat-start">
            <ChatBubble text={message.text} />
          </div>
        ))}
        <textarea
          className="textarea w-full mt-4 p-2 border border-gray-300 rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="button"
          className="btn mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </main>
  );
};

export default Home;

function add() {
  console.log("haa");
}
