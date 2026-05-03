import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { 
  Send, 
  Search, 
  User, 
  MessageSquare, 
  ArrowLeft,
  Loader2,
  Clock,
  MoreVertical
} from 'lucide-react';
import axios from 'axios';

const Chat = () => {
  const { id: conversationId } = useParams();
  const { user } = useContext(AuthContext);
  const socket = useSocket();
  const navigate = useNavigate();
  const scrollRef = useRef();

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(conversationId ? 'messages' : 'inbox');

  useEffect(() => {
    fetchConversations();
    if (conversationId) {
      fetchMessages(conversationId);
      if (socket) {
        socket.emit('join_conversation', conversationId);
      }
    }
  }, [conversationId, socket]);

  useEffect(() => {
    if (socket) {
      socket.on('receive_message', (data) => {
        if (data.conversationId === conversationId) {
          setMessages((prev) => [...prev, data]);
        }
        // Refresh conversations list to show last message
        fetchConversations();
      });

      return () => socket.off('receive_message');
    }
  }, [socket, conversationId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchConversations = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/chat/conversations', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setConversations(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching conversations');
    }
  };

  const fetchMessages = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/chat/messages/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessages(data);
    } catch (err) {
      console.error('Error fetching messages');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !conversationId) return;

    const messageData = {
      conversationId,
      senderId: user._id,
      text: newMessage,
      senderName: user.name
    };

    if (socket) {
      socket.emit('send_message', messageData);
    }

    try {
      // In a real app, we'd also save to DB via API
      // await axios.post(`http://localhost:5000/api/chat/messages`, messageData);
      setNewMessage('');
    } catch (err) {
      console.error('Error saving message');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-agri-cream/20">
        <Loader2 className="w-12 h-12 text-agri-leaf animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-12 h-[calc(100vh-80px)]">
      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-agri-light/10 h-full overflow-hidden flex">
        
        {/* Inbox Sidebar */}
        <div className={`w-full md:w-80 border-r border-gray-100 flex flex-col ${conversationId && activeTab === 'messages' ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-6 border-b border-gray-50">
            <h2 className="text-2xl font-heading font-bold text-agri-dark mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-3 bg-agri-cream/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-agri-leaf/20 transition-all"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="p-8 text-center text-gray-400 italic text-sm">No conversations yet</div>
            ) : (
              conversations.map((conv) => {
                const recipient = conv.participants.find(p => p._id !== user._id);
                return (
                  <div 
                    key={conv._id}
                    onClick={() => {
                      navigate(`/chat/${conv._id}`);
                      setActiveTab('messages');
                    }}
                    className={`p-4 flex gap-3 hover:bg-agri-cream/20 cursor-pointer transition-colors border-b border-gray-50/50 ${conversationId === conv._id ? 'bg-agri-leaf/5 border-l-4 border-l-agri-leaf' : ''}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-agri-cream flex items-center justify-center flex-shrink-0">
                      <User className="text-agri-green w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-bold text-agri-dark text-sm truncate">{recipient?.name}</p>
                        <p className="text-[10px] text-gray-400">12:30 PM</p>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{conv.lastMessage || 'Start a conversation...'}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className={`flex-1 flex flex-col bg-gray-50/30 ${!conversationId && activeTab === 'inbox' ? 'hidden md:flex' : 'flex'}`}>
          {conversationId ? (
            <>
              <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={() => navigate('/chat')} className="md:hidden p-2 hover:bg-agri-cream rounded-full">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="w-10 h-10 rounded-full bg-agri-cream flex items-center justify-center">
                    <User className="text-agri-green w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-agri-dark text-sm">Chatting with Partner</h3>
                    <p className="text-[10px] text-agri-leaf font-bold uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-agri-leaf rounded-full animate-pulse" /> Online
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-agri-cream rounded-full text-gray-400">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((msg, idx) => (
                  <div 
                    key={idx}
                    className={`flex ${msg.senderId === user._id || msg.sender?._id === user._id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] p-4 rounded-3xl text-sm shadow-sm ${msg.senderId === user._id || msg.sender?._id === user._id ? 'bg-agri-dark text-white rounded-tr-none' : 'bg-white text-agri-dark rounded-tl-none border border-agri-light/5'}`}>
                      <p className="leading-relaxed">{msg.text}</p>
                      <div className={`flex items-center gap-1 mt-2 text-[9px] ${msg.senderId === user._id || msg.sender?._id === user._id ? 'text-white/40' : 'text-gray-400'} font-bold`}>
                        <Clock className="w-3 h-3" />
                        {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={scrollRef} />
              </div>

              <div className="p-6 bg-white border-t border-gray-100">
                <form onSubmit={handleSendMessage} className="flex gap-4">
                  <input 
                    type="text" 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your harvest query..."
                    className="flex-1 px-6 py-4 bg-agri-cream/20 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-agri-leaf/10 transition-all font-sans"
                  />
                  <button 
                    type="submit"
                    className="bg-agri-leaf hover:bg-agri-green text-white p-4 rounded-2xl transition-all shadow-lg active:scale-95"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-20 h-20 bg-agri-leaf/10 rounded-full flex items-center justify-center mb-6">
                <MessageSquare className="text-agri-leaf w-10 h-10" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-agri-dark mb-2">Your Agricultural Inbox</h3>
              <p className="text-gray-400 text-sm max-w-xs font-sans leading-relaxed">
                Connect directly with farmers for bulk procurement or market insights. Select a chat to begin.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
