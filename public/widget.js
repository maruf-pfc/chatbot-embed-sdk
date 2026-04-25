(function () {
  // Get bot ID from script tag
  const scriptTag = document.currentScript;
  const botId = scriptTag.dataset.botId;

  if (!botId) {
    console.error("Chat widget: Missing data-bot-id attribute");
    return;
  }

  // Get color from script tag or use default
  const bubbleColor = scriptTag.dataset.color || "#3B82F6";
  const apiUrl = scriptTag.dataset.apiUrl || window.location.origin;

  // Prevent duplicate widgets
  if (document.getElementById("chat-widget-root")) {
    return;
  }

  // Create widget container
  const widgetRoot = document.createElement("div");
  widgetRoot.id = "chat-widget-root";
  widgetRoot.innerHTML = `
    <style>
      #chat-widget-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: ${bubbleColor};
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: all 0.3s ease;
        border: none;
        font-family: sans-serif;
      }
      #chat-widget-button:hover {
        transform: scale(1.08);
        box-shadow: 0 6px 16px rgba(0,0,0,0.2);
      }
      #chat-widget-button svg {
        width: 28px;
        height: 28px;
        fill: white;
      }
      #chat-widget-window {
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 380px;
        height: 550px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        display: none;
        flex-direction: column;
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        overflow: hidden;
      }
      #chat-header {
        background-color: ${bubbleColor};
        color: white;
        padding: 16px;
        font-weight: 600;
        font-size: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      #close-chat {
        cursor: pointer;
        font-size: 24px;
        font-weight: bold;
        opacity: 0.8;
        transition: opacity 0.2s;
        line-height: 1;
      }
      #close-chat:hover {
        opacity: 1;
      }
      #chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        background: #f9fafb;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .message {
        padding: 10px 14px;
        border-radius: 12px;
        max-width: 85%;
        word-wrap: break-word;
        font-size: 14px;
        line-height: 1.4;
        animation: fadeIn 0.3s ease;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .user-message {
        background-color: ${bubbleColor};
        color: white;
        align-self: flex-end;
        border-bottom-right-radius: 4px;
      }
      .bot-message {
        background-color: #e5e7eb;
        color: #1f2937;
        align-self: flex-start;
        border-bottom-left-radius: 4px;
      }
      .typing-indicator {
        background-color: #e5e7eb;
        color: #6b7280;
        align-self: flex-start;
        padding: 10px 14px;
        border-radius: 12px;
        font-size: 13px;
        border-bottom-left-radius: 4px;
      }
      #chat-input-area {
        padding: 12px;
        border-top: 1px solid #e5e7eb;
        display: flex;
        gap: 8px;
        background: white;
      }
      #chat-input {
        flex: 1;
        padding: 10px 12px;
        border: 1px solid #d1d5db;
        border-radius: 20px;
        font-size: 14px;
        font-family: inherit;
        outline: none;
        transition: border-color 0.2s;
      }
      #chat-input:focus {
        border-color: ${bubbleColor};
      }
      #chat-send {
        padding: 8px 20px;
        background-color: ${bubbleColor};
        color: white;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: opacity 0.2s;
      }
      #chat-send:hover {
        opacity: 0.9;
      }
      /* Mobile fix - prevent keyboard from covering input */
      @media (max-width: 768px) {
        #chat-widget-window {
          position: fixed;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 80vh;
          border-radius: 12px 12px 0 0;
        }
        #chat-widget-button {
          bottom: 20px;
          right: 20px;
        }
      }
    </style>
    <div id="chat-widget-button">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2z"/>
      </svg>
    </div>
    <div id="chat-widget-window">
      <div id="chat-header">
        <span>💬 Chat Support</span>
        <span id="close-chat">×</span>
      </div>
      <div id="chat-messages"></div>
      <div id="chat-input-area">
        <input type="text" id="chat-input" placeholder="Type your question...">
        <button id="chat-send">Send</button>
      </div>
    </div>
  `;

  document.body.appendChild(widgetRoot);

  // Get elements
  const button = document.getElementById("chat-widget-button");
  const chatWindow = document.getElementById("chat-widget-window");
  const closeBtn = document.getElementById("close-chat");
  const sendBtn = document.getElementById("chat-send");
  const input = document.getElementById("chat-input");
  const messagesDiv = document.getElementById("chat-messages");

  let isWaitingForResponse = false;

  // ✅ FIX: Chat window starts CLOSED by default
  chatWindow.style.display = "none";

  // Toggle chat window
  button.onclick = () => {
    if (chatWindow.style.display === "flex") {
      chatWindow.style.display = "none";
    } else {
      chatWindow.style.display = "flex";
      if (messagesDiv.children.length === 0) {
        addBotMessage("👋 Hello! How can I help you today?");
      }
      // Focus input after window opens
      setTimeout(() => {
        input.focus();
      }, 300);
    }
  };

  closeBtn.onclick = () => {
    chatWindow.style.display = "none";
  };

  // Send message function
  async function sendMessage() {
    const message = input.value.trim();
    if (!message || isWaitingForResponse) return;

    addUserMessage(message);
    input.value = "";
    input.disabled = true;
    isWaitingForResponse = true;

    // ✅ FIX: Blur input to dismiss keyboard on mobile
    input.blur();

    // Show typing indicator
    const typingId = showTypingIndicator();

    try {
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          botId: botId,
          message: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      removeTypingIndicator(typingId);
      addBotMessage(data.answer || "Sorry, I couldn't process that request.");
    } catch (error) {
      console.error("Chat error:", error);
      removeTypingIndicator(typingId);
      addBotMessage(
        "⚠️ Sorry, I'm having trouble connecting. Please try again in a moment.",
      );
    } finally {
      input.disabled = false;
      isWaitingForResponse = false;
      // Scroll to bottom after response
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }

  function addUserMessage(text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = "message user-message";
    msgDiv.textContent = text;
    messagesDiv.appendChild(msgDiv);
    scrollToBottom();
  }

  function addBotMessage(text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = "message bot-message";
    msgDiv.textContent = text;
    messagesDiv.appendChild(msgDiv);
    scrollToBottom();
  }

  function showTypingIndicator() {
    const id = "typing-" + Date.now();
    const typingDiv = document.createElement("div");
    typingDiv.id = id;
    typingDiv.className = "typing-indicator";
    typingDiv.textContent = "Bot is typing...";
    messagesDiv.appendChild(typingDiv);
    scrollToBottom();
    return id;
  }

  function removeTypingIndicator(id) {
    const element = document.getElementById(id);
    if (element) element.remove();
  }

  function scrollToBottom() {
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  sendBtn.onclick = sendMessage;
  input.onkeypress = (e) => {
    if (e.key === "Enter" && !isWaitingForResponse) {
      sendMessage();
    }
  };
})();
