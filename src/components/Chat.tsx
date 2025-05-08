import React from "react";
import { useConversationQuery } from "../graphql/generated/types";
import "../styles/Chat.css";

interface ChatProps {
  conversationId: string;
}

export const Chat: React.FC<ChatProps> = ({ conversationId }) => {
  const { data, isLoading, isError } = useConversationQuery(
    {
      endpoint: "/api/graphql",
      fetchParams: { headers: { "Content-Type": "application/json" } },
    },
    { id: conversationId }
  );

  const notes = data?.conversation.notes ?? [];

  return (
    <aside className="chat-box">
      <h2>Chat</h2>
      {isLoading && <div className="center">Loading chat...</div>}
      {isError && <div className="center error">Failed to load chat</div>}

      <div className="messages">
        {notes.length === 0 ? (
          <div className="no-messages">No messages</div>
        ) : (
          notes.map((n) => (
            <div key={n.id} className="message">
              <div className="message-body">
                {n.content.split("\n").map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
              <div className="timestamp">
                {new Date(n.created_at).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};
