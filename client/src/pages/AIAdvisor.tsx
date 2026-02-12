import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send, Bot, User } from "lucide-react";
import { Link } from "wouter";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function AIAdvisor() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hello Alex. I have analyzed your financial profile. Based on your income stability and high rule-based score, you are eligible for prime tier credit products. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setLoading(true);

    // Mock AI Response
    setTimeout(() => {
        setMessages(prev => [...prev, { 
            role: "ai", 
            content: "Based on your spending patterns and savings rate of 22%, I recommend increasing your automated savings by 5% to boost your stability score component. This could increase your hybrid score by approximately 15 points over 3 months." 
        }]);
        setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard">
            <Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">AI Financial Advisor</h1>
            <p className="text-muted-foreground">Secure, context-aware financial guidance.</p>
        </div>
      </div>

      <Card className="flex-1 flex flex-col bg-card/40 backdrop-blur-md border-white/5 overflow-hidden">
        <CardHeader className="border-b border-white/5 pb-4">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Bot className="w-4 h-4 text-primary" />
                AltScore Intelligence v2.0
            </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-full p-4">
                <div className="space-y-4">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`
                                max-w-[80%] rounded-lg p-3 text-sm
                                ${msg.role === 'user' 
                                    ? 'bg-primary text-white ml-auto' 
                                    : 'bg-white/10 text-foreground border border-white/5'}
                            `}>
                                <div className="flex items-center gap-2 mb-1 opacity-50 text-xs uppercase tracking-wider">
                                    {msg.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                                    {msg.role === 'user' ? 'You' : 'Advisor'}
                                </div>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                             <div className="bg-white/5 rounded-lg p-4 border border-white/5 flex gap-1">
                                <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                                <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                                <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                             </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 border-t border-white/5 bg-black/20">
            <form onSubmit={handleSend} className="flex w-full gap-2">
                <Input 
                    placeholder="Ask for advice on improving your score..." 
                    className="flex-1 bg-black/20 border-white/10"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button type="submit" size="icon" disabled={loading}>
                    <Send className="w-4 h-4" />
                </Button>
            </form>
        </CardFooter>
      </Card>
    </div>
  );
}
