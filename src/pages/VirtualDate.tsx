import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Coffee, Moon, Star, Utensils, Camera } from 'lucide-react';

const VirtualDate = () => {
  const [currentDate, setCurrentDate] = useState(0);
  const [isDateActive, setIsDateActive] = useState(false);

  const dateIdeas = [
    {
      id: 1,
      title: "Coffee Date",
      icon: Coffee,
      description: "Let's have a virtual coffee together! Grab your favorite cup and we'll chat like we're at our favorite cafe.",
      activity: "Brew your coffee, light a candle, and let's talk about our dreams while sipping together",
      color: "from-coral to-cream",
      duration: "30 mins",
      mood: "Cozy & Intimate"
    },
    {
      id: 2,
      title: "Dinner Date", 
      icon: Utensils,
      description: "Cook the same meal together! We'll share recipes, cook simultaneously, and dine 'together' over video call.",
      activity: "Choose a recipe, shop for ingredients, and cook together while chatting and laughing",
      color: "from-rose-pink to-baby-pink",
      duration: "2 hours",
      mood: "Romantic & Fun"
    },
    {
      id: 3,
      title: "Stargazing",
      icon: Star,
      description: "Look at the same stars and moon! Download a stargazing app and explore the cosmos together.",
      activity: "Find a cozy spot by your window, look up at the night sky, and share what you see",
      color: "from-deep-red to-rose-pink",
      duration: "1 hour",
      mood: "Dreamy & Peaceful"
    },
    {
      id: 4,
      title: "Photo Walk",
      icon: Camera,
      description: "Take a virtual walk together! Share photos of beautiful things you see on your walks.",
      activity: "Go for a walk, take photos of flowers, sunsets, or anything that reminds you of me",
      color: "from-orange-red to-coral",
      duration: "45 mins",
      mood: "Adventurous & Sweet"
    },
    {
      id: 5,
      title: "Moonlit Chat",
      icon: Moon,
      description: "A late-night heart-to-heart under the moonlight. Share secrets, dreams, and sweet whispers.",
      activity: "Dim the lights, look at the moon, and let's talk about everything and nothing",
      color: "from-rose-pink to-cream",
      duration: "1.5 hours",
      mood: "Intimate & Deep"
    }
  ];

  const startDate = (index: number) => {
    setCurrentDate(index);
    setIsDateActive(true);
  };

  const endDate = () => {
    setIsDateActive(false);
  };

  const currentDateData = dateIdeas[currentDate];
  const DateIcon = currentDateData?.icon || Heart;

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-romantic bg-clip-text text-transparent mb-4 animate-pulse-heart font-playfair">
              Virtual Date Night 💕
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-inter">
              Distance can't stop us from having magical moments together. Choose a date idea and let's create beautiful memories! 
            </p>
          </div>

          {/* Active Date Display */}
          {isDateActive && (
            <div className="max-w-3xl mx-auto mb-8">
              <Card className="overflow-hidden shadow-celebration">
                <div className={`bg-gradient-to-r ${currentDateData.color} p-8 text-white text-center`}>
                  <DateIcon className="w-16 h-16 mx-auto mb-4 animate-pulse-heart" />
                  <h2 className="text-3xl font-bold mb-2 font-playfair">{currentDateData.title}</h2>
                  <p className="text-lg mb-4 font-inter">{currentDateData.description}</p>
                  
                  <div className="bg-white/20 rounded-2xl p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-2 font-playfair">What We'll Do:</h3>
                    <p className="font-inter">{currentDateData.activity}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/20 rounded-xl p-3">
                      <div className="font-semibold font-playfair">Duration</div>
                      <div className="font-inter">{currentDateData.duration}</div>
                    </div>
                    <div className="bg-white/20 rounded-xl p-3">
                      <div className="font-semibold font-playfair">Mood</div>
                      <div className="font-inter">{currentDateData.mood}</div>
                    </div>
                  </div>

                  <Button
                    onClick={endDate}
                    variant="outline"
                    className="border-white text-white hover:bg-white/20 font-dancing text-lg"
                  >
                    End Date 💕
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Date Ideas Grid */}
          {!isDateActive && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {dateIdeas.map((date, index) => {
                const IconComponent = date.icon;
                return (
                  <Card 
                    key={date.id}
                    className="overflow-hidden hover:shadow-celebration hover:scale-105 transition-all duration-300 cursor-pointer"
                    onClick={() => startDate(index)}
                  >
                    <div className={`bg-gradient-to-r ${date.color} p-6 text-white`}>
                      <IconComponent className="w-10 h-10 mb-4" />
                      <h3 className="text-xl font-semibold mb-2 font-playfair">{date.title}</h3>
                      <p className="text-sm opacity-90 mb-4 font-inter">{date.description}</p>
                      
                      <div className="bg-white/20 rounded-lg p-3">
                        <div className="flex justify-between text-sm">
                          <span className="font-dancing">{date.duration}</span>
                          <span className="font-dancing">{date.mood}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 text-center">
                      <Button 
                        className="w-full bg-gradient-romantic text-white shadow-romantic hover:shadow-celebration font-dancing"
                        onClick={(e) => {
                          e.stopPropagation();
                          startDate(index);
                        }}
                      >
                        Start This Date 💖
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Date Tips */}
          <div className="max-w-4xl mx-auto">
            <Card className="glass p-8 shadow-romantic">
              <div className="text-center mb-6">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse-heart" />
                <h3 className="text-2xl font-semibold text-primary font-playfair">
                  Making Virtual Dates Special
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-primary/5 rounded-xl">
                  <div className="text-2xl mb-2">📱</div>
                  <div className="font-semibold font-playfair">Video Call Ready</div>
                  <div className="text-sm text-muted-foreground font-inter">Set up good lighting and a cozy background</div>
                </div>
                
                <div className="text-center p-4 bg-primary/5 rounded-xl">
                  <div className="text-2xl mb-2">💝</div>
                  <div className="font-semibold font-playfair">Special Touches</div>
                  <div className="text-sm text-muted-foreground font-inter">Light candles, dress up, create ambiance</div>
                </div>
                
                <div className="text-center p-4 bg-primary/5 rounded-xl">
                  <div className="text-2xl mb-2">📷</div>
                  <div className="font-semibold font-playfair">Capture Moments</div>
                  <div className="text-sm text-muted-foreground font-inter">Take screenshots and create memories</div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-muted-foreground font-inter">
                  "Distance means so little when someone means so much. Every virtual date is a real moment of love." 💕
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualDate;