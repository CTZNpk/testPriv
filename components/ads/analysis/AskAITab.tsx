"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { SelectionData } from "@/types/ads"
import { getInitialChatMessage, generateContextualChatResponse } from "@/lib/analysisLogic"

interface AskAITabProps {
  selectionData: SelectionData
}

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

function AskAITab({ selectionData }: AskAITabProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: getInitialChatMessage(selectionData),
      timestamp: new Date(),
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: chatInput,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setChatInput("")
    setIsLoading(true)

    // Generate contextual response based on selection type
    setTimeout(() => {
      const response = generateContextualChatResponse(selectionData)

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-300px)]">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg">AI Assistant</CardTitle>
          <p className="text-sm text-gray-500">
            Ask questions about your selected{" "}
            {selectionData.type === "rows" ? "campaigns" : selectionData.type === "columns" ? "metrics" : "data points"}{" "}
            and get AI-powered insights
          </p>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 space-y-4 mb-4 overflow-y-auto max-h-96">
            {chatMessages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900 border"
                  }`}
                >
                  <div className="text-sm">{message.content}</div>
                  <div className={`text-xs mt-2 ${message.role === "user" ? "text-blue-100" : "text-gray-500"}`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 p-4 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <span className="text-sm text-gray-500 ml-2">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-3 pt-4 border-t">
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={`Ask about your selected ${selectionData.type}... (e.g., 'Why is this campaign performing better?')`}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={isLoading || !chatInput.trim()}>
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AskAITab
