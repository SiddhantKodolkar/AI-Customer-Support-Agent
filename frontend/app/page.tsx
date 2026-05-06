"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Message = {
  id: number;
  customer_id: string;
  channel: string;
  content: string;
  intent: string;
  urgency: string;
  sentiment: string;
};

const LabeledBadge = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className: string;
}) => (
  <div className="flex flex-col items-start">
    <span className="text-[10px] uppercase text-gray-400 mb-0.5">
      {label}
    </span>
    <span className={`px-2 py-1 rounded text-xs ${className}`}>
      {value}
    </span>
  </div>
);


const badgeColor = (value: string) => {
  switch (value) {
    case "high":
      return "bg-red-100 text-red-700";
    case "medium":
      return "bg-yellow-100 text-yellow-700";
    case "low":
      return "bg-green-100 text-green-700";
    case "negative":
      return "bg-red-100 text-red-700";
    case "positive":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [summary, setSummary] = useState("");
  const [draft, setDraft] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/messages").then((res) => {
      if (Array.isArray(res.data)) setMessages(res.data);
    });
  }, []);

  const customerMessages = messages.filter(
    (m) => m.customer_id === selectedCustomer
  );

  const generateSummary = async () => {
    const texts = customerMessages.map((m) => m.content);
    const res = await axios.post(
      "http://localhost:8000/ai/summarize",
      texts
    );
    setSummary(res.data);
  };

  const generateDraft = async () => {
    const context = customerMessages.map((m) => m.content).join("\n");
    const res = await axios.post("http://localhost:8000/ai/draft", {context});
    setDraft(res.data);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Inbox */}
      <div className="w-1/3 border-r bg-white p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Inbox</h2>

        {messages.map((m) => (
          <div
            key={m.id}
            onClick={() => {
              setSelectedCustomer(m.customer_id);
              setSummary("");
              setDraft("");
            }}
            className={`p-4 mb-3 rounded-lg border cursor-pointer transition ${
              selectedCustomer === m.customer_id
                ? "border-blue-500 bg-blue-50"
                : "hover:bg-gray-100"
            }`}
          >
            <p className="text-sm text-gray-800 mb-2 line-clamp-2">
              {m.content}
            </p>

            <div className="flex flex-wrap gap-4">
  <LabeledBadge
    label="Type"
    value={m.channel}
    className="bg-gray-200 text-gray-800"
  />
  <LabeledBadge
    label="Issue"
    value={m.intent}
    className={badgeColor(m.intent)}
  />
  <LabeledBadge
    label="Risk"
    value={m.urgency}
    className={badgeColor(m.urgency)}
  />
  <LabeledBadge
    label="Sentiment"
    value={m.sentiment}
    className={badgeColor(m.sentiment)}
  />
</div>

          </div>
        ))}
      </div>

      {/* AI Panel */}
      <div className="w-2/3 p-6 overflow-y-auto">
        {!selectedCustomer ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a conversation to view AI insights
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                Customer {selectedCustomer}
              </h2>
              <p className="text-sm text-gray-500">
                AI-assisted support overview
              </p>
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={generateSummary}
                className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-90"
              >
                Generate Summary
              </button>
              <button
                onClick={generateDraft}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:opacity-90"
              >
                Draft Response
              </button>
            </div>

            {summary && (
              <div className="mb-6 bg-white p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">AI Summary</h3>
                <pre className="whitespace-pre-wrap text-sm text-gray-800">
                  {summary}
                </pre>
              </div>
            )}

            {draft && (
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">AI Draft Response</h3>
                <textarea
                  className="w-full h-40 border rounded p-3 text-sm"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                />
                <p className="text-xs text-gray-400 mt-2">
                  AI-assisted draft. Agent review required before sending.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
