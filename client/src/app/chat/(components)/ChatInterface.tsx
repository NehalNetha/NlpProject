import React from 'react';
import { MessageCircle, Sparkle } from 'lucide-react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface Message {
  type: 'question' | 'response';
  content: string;
  timestamp: number | undefined
}

interface ChatInterfaceProps {
  messages: Message[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages }) => {
  const renderMessage = (message: Message) => {
    try {
      // Check if the message content is a JSON string
      const parsedContent = typeof message.content === 'string' && 
        message.content.startsWith('{') ? 
        JSON.parse(message.content) : null;

      if (parsedContent?.type === 'pdf_upload') {
        return (
          <div>
            <p>Uploaded PDF: 
              <a 
                href={parsedContent.fileUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 underline"
              >
                {parsedContent.fileName}
              </a>
            </p>
          </div>
        );
      }

      // Regular text message
      return <MarkdownRenderer markdown={message.content} />;
    } catch (e) {
      // If parsing fails, render as regular text
      return <MarkdownRenderer markdown={message.content} />;
    }
  };

  return (
    <div className="chat-messages w-full max-w-[90%] mx-auto px-4 sm:px-8 lg:px-[2rem] space-y-4">
      {messages.map((message, index) => (
        <div 
          key={index} 
          className={`message flex flex-row items-start gap-2 ${
            message.type === 'question' ? 'justify-end' : 'justify-start'
          }`}
        >
          {message.type === 'response' && (
            <Sparkle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
          )}
          <div className={`max-w-[80%] ${
            message.type === 'question' ? 'bg-blue-500 text-white' : 'bg-white'
          } rounded-lg p-3`}>
            {renderMessage(message)}
          </div>
          {message.type === 'question' && (
            <MessageCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatInterface;