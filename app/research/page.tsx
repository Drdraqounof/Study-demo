"use client";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";
import { Upload, FileText, Loader2, AlertCircle, CheckCircle2, X } from "lucide-react";
interface UploadedFile {
  file: File;
  id: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

type Mode = "analyze" | "converse";

export default function ResearchPage() {
  // Remove mode state and all references to Converse Mode
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationInput, setConversationInput] = useState<string>("");
  const [sending, setSending] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        id: Math.random().toString(36).substr(2, 9),
      }));
      setFiles((prev) => [...prev, ...newFiles]);
      setError("");
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please select at least one file");
      return;
    }

    setUploading(true);
    setResponse("");
    setError("");
    setMessages([]);

    try {
      const formData = new FormData();
      if (files.length > 0) {
        formData.append("file", files[0].file);
      }
      if (question.trim()) {
        formData.append("question", question);
      }

      const res = await fetch("/api/research/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Upload failed: ${res.statusText}`);
      }

      const data = await res.json();
      // Use the first file's result for display (single file upload UI)
      const aiResult = Array.isArray(data.results) && data.results.length > 0 ? data.results[0].result : (data.result || "Analysis complete");
      setResponse(aiResult);
      // Add AI analysis to chat history
      setMessages([
        {
          role: "user",
          content: question ? question : "File uploaded for analysis.",
          timestamp: new Date(),
        },
        {
          role: "assistant",
          content: aiResult,
          timestamp: new Date(),
        },
      ]);
      setFiles([]);
      setQuestion("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload files");
    } finally {
      setUploading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!conversationInput.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: conversationInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setConversationInput("");
    setSending(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("message", conversationInput);
      formData.append("conversationHistory", JSON.stringify(messages));
      
      if (files.length > 0) {
        files.forEach(({ file }) => {
          formData.append("files", file);
        });
      }

      const res = await fetch("/api/research/converse", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.statusText}`);
      }

      const data = await res.json();
      
      const assistantMessage: Message = {
        role: "assistant",
        content: data.result || "I received your message.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar active="Research" />
      <main className="flex-1 p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Research Assistant</h2>
          <p className="text-gray-600">Upload documents for AI analysis. <span className='font-semibold text-red-500'>Only text-based files (PDF, DOCX, TXT) are supported. Image analysis is not available.</span></p>
        </div>

      export default ResearchPage;
        {/* File Upload Section (both modes) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Upload Documents for Analysis
          </h3>
          <div className="mb-4">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                <p className="mb-1 text-sm text-gray-600">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PDF, DOCX, TXT, or images (MAX. 10MB)</p>
              </div>
              <input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
              />
            </label>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Selected Files ({files.length})
              </h4>
              {files.map(({ file, id }) => (
                <div
                  key={id}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileText className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(id)}
                    className="ml-2 p-1 hover:bg-gray-200 rounded transition-colors"
                    aria-label="Remove file"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Analyze Mode (only mode) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Settings</h3>
            <div className="mb-4">
              <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                Ask a specific question (optional)
              </label>
              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g., What are the main findings? Summarize the key points..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>

            {/* AI Dialogue (same style as Converse Mode) */}
            {messages.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col mb-6" style={{ minHeight: "200px" }}>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-3 ${
                          message.role === "user"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.role === "user" ? "text-indigo-200" : "text-gray-500"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="mb-4 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={files.length === 0 || uploading}
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Analyze with AI
                </>
              )}
            </button>

            {response && (
              <div className="mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <h4 className="text-lg font-semibold text-gray-900">AI Analysis</h4>
                </div>
                <div className="prose prose-sm max-w-none">
                  <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">{response}</div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
}





