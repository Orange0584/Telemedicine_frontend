import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import apis from "../../apis";
import { getHeaders } from "../../headers";
import Cookies from "js-cookie"
import { FaUserCircle } from "react-icons/fa";

const Chat = () => {
  const { receiver_name, receiver_id, room_id } = useParams();
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const headers = getHeaders();
  const wskt = useRef(null); 
  const cookieValue = Cookies.get('userData');
  const userData = cookieValue ? JSON.parse(cookieValue) : null;
  // Fetch chat history
  const fetchChats = async () => {
    try {
      const res = await axios.get(`${apis.GET_CHATS}${room_id}`, { headers });
      setChats(res?.data);
      console.log("Chats--" , res?.data)
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    fetchChats();

    // Initialize WebSocket connection
    wskt.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${room_id}/`);

    wskt.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    wskt.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // if(data?.receiver_id === userData?.user_id){
      setChats((prevChats) => [...prevChats, data]);
      console.log("onMessage", event);
      // }
    };

    wskt.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Clean up function to close WebSocket connection on component unmount
    return () => {
      if (wskt.current) {
        wskt.current.close();
        console.log("WebSocket connection closed");
      }
    };
  }, [room_id]);

  console.log("chats" , chats)

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const newMessage = { message , receiver_id , sender_id:userData?.user_id };
      // setChats((prevChats) => [...prevChats, newMessage]);
      console.log("sendMessage" , newMessage);
      if (wskt.current && wskt.current.readyState === WebSocket.OPEN) {
        wskt.current.send(JSON.stringify(newMessage));
      } else {
        console.error("WebSocket is not open");
      }
      setMessage("");
    }
  };
  return (
    <div className="bg-purple-200 flex justify-center h-screen items-center w-full">
    <div className="flex flex-col h-screen md:h-[90%] w-full md:w-[80%] mx-auto bg-white shadow-lg border rounded-lg">
      <div className="flex items-center p-4 bg-purple-500 text-white">
        <button className="mr-4" onClick={() => window.history.back()}>
          <FaArrowLeftLong size={20} />
        </button>
        <h1 className="text-lg font-semibold capitalize flex items-center gap-2"><FaUserCircle size={30}  /> {receiver_name.replace("+", " ")}</h1>
      </div>

      {/* Chats Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 ${chat.sender_id == userData?.user_id ? "justify-end" : "  justify-start"} mb-2`}
          >
            {chat.sender_id != userData?.user_id && <FaUserCircle size={30}  />}
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                chat.sender_id == userData?.user_id ?  "  bg-purple-500 text-white" : "bg-gray-200 text-gray-800" 
              }`}
            >
              {chat.message}
            </div>
            {chat.sender_id == userData?.user_id && <FaUserCircle size={30}  />}
          </div>
        ))}
      </div>

      {/* Footer */}
      
        <form className="flex items-center w-full p-4 border-t bg-purple-100" onSubmit={sendMessage} >
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="ml-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-blue-600"
          type="submit"
        >
          Send
        </button>
        </form>
      
    </div>
    </div>
  );
};

export default Chat;
