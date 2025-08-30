import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Heart, Music, Camera, Mail, Sparkles } from 'lucide-react';
import giftBoxImage from '@/assets/gift-box.jpg';

const Gifts = () => {
  const [openedGifts, setOpenedGifts] = useState<number[]>([]);

  const gifts = [
    {
      id: 1,
      title: "Virtual Hugs",
      icon: Heart,
      description: "Sending you 1000 virtual hugs wrapped in love",
      content: "💕 Here are your virtual hugs! Close your eyes and feel my arms around you. Every hug carries all my love across the miles. You're being hugged right now! 🤗",
      color: "from-rose-gold to-deep-rose"
    },
    {
      id: 2,
      title: "Love Playlist",
      icon: Music,
      description: "Our special songs that remind me of you",
      content: "🎵 Our Love Playlist:\n• Perfect by Ed Sheeran\n• All of Me by John Legend\n• Thinking Out Loud by Ed Sheeran\n• Make You Feel My Love by Adele\n• A Thousand Years by Christina Perri\n\nEvery song chosen with you in mind! 🎶",
      color: "from-gold to-rose-gold"
    },
    {
      id: 3,
      title: "Memory Jar",
      icon: Camera,
      description: "Sweet memories of us together",
      content: "📸 Our Beautiful Memories:\n• The first time you made me laugh until I cried\n• When you stayed up all night talking to me when I was sad\n• Your sleepy voice saying 'good morning' \n• The way you light up when you talk about your dreams\n• How you always know exactly what to say 💝",
      color: "from-soft-pink to-rose-gold"
    },
    {
      id: 4,
      title: "Love Coupons",
      icon: Mail,
      description: "Special promises just for you",
      content: "🎫 Your Love Coupons:\n• One breakfast in bed (when we're together)\n• Movie night with all your favorite snacks\n• A full day of your choice activities\n• Unlimited back rubs and cuddles\n• One 'I'm sorry' for any future silly arguments\n• A surprise date planned entirely by me ❤️",
      color: "from-cream to-soft-pink"
    },
    {
      id: 5,
      title: "Future Adventures",
      icon: Sparkles,
      description: "All the places we'll explore together",
      content: "✈️ Our Dream Adventures:\n• Watching sunrise on a beach\n• Cozy cabin in the mountains\n• Walking through Paris hand in hand\n• Road trip with our favorite music\n• Stargazing under a clear night sky\n• Building sandcastles and laughing\n\nEvery adventure is better with you! 🌟",
      color: "from-deep-rose to-gold"
    },
    {
      id: 6,
      title: "Daily Affirmations",
      icon: Heart,
      description: "Reminders of how amazing you are",
      content: "💖 Daily Reminders:\n• You are beautiful inside and out\n• Your smile can light up any room\n• You make me a better person\n• You are worthy of all the love in the world\n• You are strong, smart, and incredible\n• You are my dream come true 🌟",
      color: "from-gold to-cream"
    }
  ];

  const openGift = (giftId: number) => {
    if (!openedGifts.includes(giftId)) {
      setOpenedGifts([...openedGifts, giftId]);
    }
  };

  const resetGifts = () => {
    setOpenedGifts([]);
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-romantic bg-clip-text text-transparent mb-4 animate-pulse-heart">
              Virtual Gifts For You 🎁
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each gift is wrapped with love and sent across the distance to make you smile
            </p>
          </div>

          {/* Hero Gift Box */}
          <div className="max-w-md mx-auto mb-12">
            <Card className="overflow-hidden shadow-celebration">
              <img 
                src={giftBoxImage}
                alt="Gift box"
                className="w-full h-64 object-cover"
              />
            </Card>
          </div>

          {/* Gifts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {gifts.map((gift) => {
              const Icon = gift.icon;
              const isOpened = openedGifts.includes(gift.id);
              
              return (
                <Card 
                  key={gift.id}
                  className={`overflow-hidden transition-all duration-500 cursor-pointer ${
                    isOpened 
                      ? 'shadow-celebration ring-2 ring-primary scale-105' 
                      : 'shadow-soft hover:shadow-romantic hover:scale-102'
                  }`}
                  onClick={() => openGift(gift.id)}
                >
                  <div className={`h-40 bg-gradient-to-br ${gift.color} flex items-center justify-center relative overflow-hidden`}>
                    {!isOpened ? (
                      <div className="text-center text-white">
                        <Gift className="w-12 h-12 mx-auto mb-2 animate-bounce" />
                        <p className="text-sm font-medium">Click to Open!</p>
                      </div>
                    ) : (
                      <div className="text-center text-white animate-scale-in">
                        <Icon className="w-12 h-12 mx-auto mb-2 animate-pulse-heart" />
                        <p className="text-sm font-medium">Opened! 💕</p>
                      </div>
                    )}
                    
                    {/* Sparkle effects */}
                    {isOpened && (
                      <div className="absolute inset-0">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-2 h-2 bg-white rounded-full animate-sparkle"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              animationDelay: `${i * 0.3}s`
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-2 flex items-center">
                      <Icon className="w-5 h-5 mr-2" />
                      {gift.title}
                    </h3>
                    
                    {!isOpened ? (
                      <p className="text-muted-foreground">
                        {gift.description}
                      </p>
                    ) : (
                      <div className="animate-fade-in">
                        <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                          {gift.content}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Gift Status */}
          <div className="mt-12 text-center glass p-6 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-primary">
              🎁 Gifts Opened: {openedGifts.length} / {gifts.length}
            </h3>
            <p className="text-muted-foreground mb-6">
              {openedGifts.length === gifts.length 
                ? "You've opened all your gifts! Each one was made with love just for you 💕"
                : "Keep opening gifts to discover all the love I've wrapped up for you!"
              }
            </p>
            
            {openedGifts.length > 0 && (
              <Button
                onClick={resetGifts}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Reset All Gifts 🎁
              </Button>
            )}
          </div>

          {/* Love Message */}
          <div className="mt-8 text-center glass p-8 rounded-2xl">
            <Heart className="w-8 h-8 text-primary mx-auto mb-4 animate-pulse-heart" />
            <h3 className="text-2xl font-semibold mb-4 text-primary">
              Made With Love, Just For You
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Though I can't give you physical gifts right now, I hope these virtual 
              surprises bring a smile to your face and warmth to your heart. 
              Every gift represents a piece of my love for you. 💝
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gifts;