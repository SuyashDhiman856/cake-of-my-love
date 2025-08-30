import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star, Sparkles, Moon, Sun } from 'lucide-react';

const SpecialMessages = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const messages = [
    {
      id: 1,
      icon: Heart,
      title: "Good Morning My Love",
      message: "Every morning I wake up thinking of you. Your smile is my sunshine, and your love is my energy for the entire day. Distance means nothing when you mean everything to me. ☀️💕",
      color: "from-orange-red to-coral",
      time: "Morning"
    },
    {
      id: 2,
      icon: Sun,
      title: "Afternoon Reminder",
      message: "In the middle of this busy day, I want you to know that you're always on my mind. You're my motivation, my inspiration, and my greatest joy. Hope your day is as beautiful as you are! 🌅",
      color: "from-rose-pink to-baby-pink",
      time: "Afternoon"
    },
    {
      id: 3,
      icon: Moon,
      title: "Goodnight Sweet Dreams",
      message: "As the stars shine bright tonight, know that my love for you shines even brighter. Dream of us dancing under the moonlight, because that's where I'll be - in your dreams, always. 🌙✨",
      color: "from-deep-red to-rose-pink",
      time: "Night"
    },
    {
      id: 4,
      icon: Sparkles,
      title: "Random Love Note",
      message: "There's no special reason for this message except that I love you. You make ordinary moments extraordinary, and I'm grateful for every second we share, even from afar. 💫",
      color: "from-coral to-cream",
      time: "Anytime"
    },
    {
      id: 5,
      icon: Star,
      title: "Birthday Special",
      message: "Today is your special day, but honestly, every day with you feels like a celebration. You're not just my girlfriend, you're my best friend, my soulmate, and my forever love. Happy Birthday! 🎂⭐",
      color: "from-rose-pink to-orange-red",
      time: "Birthday"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
      setShowMessage(false);
      setTimeout(() => setShowMessage(true), 100);
    }, 5000);

    setShowMessage(true);
    return () => clearInterval(timer);
  }, [messages.length]);

  const handleNext = () => {
    setCurrentMessage((prev) => (prev + 1) % messages.length);
  };

  const handlePrevious = () => {
    setCurrentMessage((prev) => prev === 0 ? messages.length - 1 : prev - 1);
  };

  const current = messages[currentMessage];
  const IconComponent = current.icon;

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-romantic bg-clip-text text-transparent mb-4 animate-pulse-heart font-playfair">
              Special Messages for You 💌
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-inter">
              Daily reminders of my love for you, because every moment is perfect to tell you how much you mean to me
            </p>
          </div>

          {/* Main Message Display */}
          <div className="max-w-3xl mx-auto mb-8">
            <Card className={`overflow-hidden shadow-celebration transition-all duration-500 ${showMessage ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <div className={`bg-gradient-to-r ${current.color} p-8 text-white text-center`}>
                <IconComponent className="w-16 h-16 mx-auto mb-4 animate-pulse-heart" />
                <h2 className="text-3xl font-bold mb-2 font-playfair">{current.title}</h2>
                <div className="text-sm opacity-90 mb-4 font-dancing text-lg">{current.time}</div>
                <p className="text-lg leading-relaxed font-inter">{current.message}</p>
              </div>
            </Card>
          </div>

          {/* Navigation */}
          <div className="flex justify-center space-x-4 mb-8">
            <Button
              onClick={handlePrevious}
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 font-dancing"
            >
              Previous Message 💕
            </Button>
            <Button
              onClick={handleNext}
              className="bg-gradient-romantic text-white shadow-romantic hover:shadow-celebration font-dancing"
            >
              Next Message 💖
            </Button>
          </div>

          {/* Message Indicators */}
          <div className="flex justify-center space-x-2 mb-8">
            {messages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentMessage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentMessage 
                    ? 'bg-primary scale-125' 
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>

          {/* All Messages Preview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {messages.map((message, index) => {
              const MessageIcon = message.icon;
              return (
                <Card 
                  key={message.id}
                  className={`overflow-hidden cursor-pointer transition-all duration-300 ${
                    index === currentMessage 
                      ? 'ring-2 ring-primary shadow-celebration scale-105' 
                      : 'hover:shadow-romantic hover:scale-102'
                  }`}
                  onClick={() => setCurrentMessage(index)}
                >
                  <div className={`bg-gradient-to-r ${message.color} p-4 text-white text-center`}>
                    <MessageIcon className="w-8 h-8 mx-auto mb-2" />
                    <h3 className="text-lg font-semibold font-playfair">{message.title}</h3>
                    <div className="text-xs opacity-90 font-dancing">{message.time}</div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground line-clamp-3 font-inter">
                      {message.message}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Love Footer */}
          <div className="mt-12 text-center glass p-8 rounded-2xl max-w-2xl mx-auto">
            <Heart className="w-8 h-8 text-primary mx-auto mb-4 animate-pulse-heart" />
            <h3 className="text-2xl font-semibold mb-4 text-primary font-playfair">
              Always in My Heart
            </h3>
            <p className="text-lg text-muted-foreground font-inter">
              These messages are just tiny glimpses of what's in my heart for you. 
              No words can truly express how much you mean to me, but I'll keep trying 
              every single day. You are my everything, today and always. 💕
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialMessages;