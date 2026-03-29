import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import type { Message } from "../types/chat";
import { SUGGESTIONS, MOCK_RESPONSES } from "../constants/chatConfig";
import "../styles/ChatBot.css";

// ─── Helpers ────────────────────────────────────────────────
const formatTime = (date: Date): string =>
  date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

// ─── Component ──────────────────────────────────────────────
export default function ChatBot() {
  const [messages, setMessages]   = useState<Message[]>([]);
  const [input, setInput]         = useState<string>("");
  const [loading, setLoading]     = useState<boolean>(false);
  const [streaming, setStreaming] = useState<boolean>(false);
  const [error, setError]         = useState<string | null>(null);

  const bottomRef   = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom whenever messages or loading state changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Auto-resize textarea up to 140px
  const autoResize = (el: HTMLTextAreaElement): void => {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 140) + "px";
  };

  const sendMessage = async (text?: string): Promise<void> => {
    const content = (text ?? input).trim();
    if (!content || loading || streaming) return;

    setError(null);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "24px";
    }

    const userMsg: Message = { role: "user", content, time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      // ── TODO: Replace mock with real API call ──────────────
      // Example SSE integration:
      //
      //   const es = new EventSource(`/api/chat?q=${encodeURIComponent(content)}`);
      //   es.onmessage = (e) => { /* append e.data to last message */ };
      //   es.onerror  = ()  => { es.close(); setStreaming(false); };
      //
      // Or fetch + ReadableStream for POST requests:
      //
      //   const res = await fetch("/api/chat", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ message: content, history: messages }),
      //   });
      //   const reader = res.body?.getReader();
      //   ...
      // ───────────────────────────────────────────────────────

      // Simulated API delay
      await new Promise<void>((r) => setTimeout(r, 600));
      setLoading(false);
      setStreaming(true);

      const reply = MOCK_RESPONSES[messages.length % MOCK_RESPONSES.length];
      const botMsg: Message = { role: "assistant", content: "", time: new Date() };
      setMessages((prev) => [...prev, botMsg]);

      // Simulate character-by-character streaming
      for (let i = 1; i <= reply.length; i++) {
        await new Promise<void>((r) => setTimeout(r, 16));
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...botMsg,
            content: reply.slice(0, i),
          };
          return updated;
        });
      }

      setStreaming(false);
    } catch (err) {
      setLoading(false);
      setStreaming(false);
      setError("Connection failed. Please try again later.");
      console.error("Chat error:", err);
    }
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setInput(e.target.value);
    autoResize(e.target);
  };

  // ─── Render ───────────────────────────────────────────────
  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="header">
        <div className="logo-ring" role="img" aria-label="SmartSweep Bot">
          🤖
        </div>
        <div className="header-text">
          <h1>SmartSweep Bot</h1>
          <p>Intelligent Customer Service</p>
        </div>
        <div className="status-dot">
          <div className="dot" />
          Online
        </div>
      </header>

      {/* ── Messages ── */}
      <main className="messages" role="log" aria-live="polite">
        {messages.length === 0 ? (
          <div className="welcome">
            <div className="welcome-icon" role="img" aria-label="Robot vacuum">
              🧹
            </div>
            <h2>Hello! I'm your SmartSweep Assistant</h2>
            <p>
              I can help with product features, after-sales support, or any
              technical questions you might have.
            </p>
            <div className="suggestions">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className="suggestion-btn"
                  onClick={() => sendMessage(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => {
            const isBot       = msg.role === "assistant";
            const isLastMsg   = i === messages.length - 1;
            const isStreaming = streaming && isLastMsg && isBot;

            return (
              <div key={i} className={`msg-row ${msg.role}`}>
                <div className={`avatar ${isBot ? "bot" : "user"}`}>
                  {isBot ? "🤖" : "👤"}
                </div>
                <div>
                  <div
                    className={[
                      "bubble",
                      isBot ? "bot" : "user",
                      isStreaming ? "streaming-cursor" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {msg.content}
                  </div>
                  <div className="bubble-meta">{formatTime(msg.time)}</div>
                </div>
              </div>
            );
          })
        )}

        {/* Typing indicator while waiting for first chunk */}
        {loading && (
          <div className="msg-row" aria-label="Assistant is typing">
            <div className="avatar bot">🤖</div>
            <div className="bubble bot typing">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={bottomRef} />
      </main>

      {/* ── Error Bar ── */}
      {error && (
        <div className="error-bar" role="alert">
          ⚠️ {error}
        </div>
      )}

      {/* ── Input ── */}
      <footer className="input-area">
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Type your question..."
            value={input}
            onChange={handleChange}
            onKeyDown={handleKey}
            disabled={loading || streaming}
            aria-label="Message input"
          />
          <button
            className="send-btn"
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading || streaming}
            aria-label="Send message"
          >
            ➤
          </button>
        </div>
        <p className="input-hint">Enter to send · Shift + Enter for new line</p>
      </footer>
    </div>
  );
}