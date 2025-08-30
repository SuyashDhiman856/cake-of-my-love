import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Cake, Mail, Camera, Gift, Star, Music, Clock } from 'lucide-react';
import heroImage from '@/assets/birthday-cake.jpg';

const Index = () => {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const features = [
    {
      icon: Cake,
      title: "3D Birthday Cake",
      description: "Cut your virtual birthday cake with love",
      path: "/cake",
      color: "from-rose-gold to-soft-pink"
    },
    {
      icon: Mail,
      title: "Love Letter",
      description: "A heartfelt letter written just for you",
      path: "/love-letter",
      color: "from-deep-rose to-rose-gold"
    },
    {
      icon: Camera,
      title: "Our Memories",
      description: "Beautiful moments we've shared together",
      path: "/memories",
      color: "from-gold to-cream"
    },
    {
      icon: Gift,
      title: "Virtual Gifts",
      description: "Special surprises wrapped with love",
      path: "/gifts",
      color: "from-soft-pink to-deep-rose"
    },
    {
      icon: Star,
      title: "Rate My Efforts",
      description: "Tell me how I did with your birthday surprise",
      path: "/rating",
      color: "from-cream to-gold"
    },
    {
      icon: Music,
      title: "Our Love Songs",
      description: "Music that reminds me of you",
      path: "/music",
      color: "from-rose-gold to-cream"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-romantic bg-clip-text text-transparent mb-6 animate-pulse-heart">
              Happy Birthday, My Love! 💕
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Even though we're miles apart, my love travels across every distance to celebrate you on your special day. 
              This entire website is my birthday gift to you! 🎂✨
            </p>
            
            {/* Time Counter */}
            <Card className="inline-block glass p-4 mb-8">
              <div className="flex items-center space-x-2 text-primary">
                <Clock className="w-5 h-5" />
                <span className="font-mono text-lg">
                  Celebrating for: {formatTime(timeElapsed)}
                </span>
              </div>
            </Card>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cake">
                <Button size="lg" className="bg-gradient-romantic text-white shadow-romantic hover:shadow-celebration transition-all duration-300">
                  <Cake className="w-5 h-5 mr-2" />
                  Cut Your Birthday Cake! 🎂
                </Button>
              </Link>
              <Link to="/love-letter">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <Heart className="w-5 h-5 mr-2" />
                  Read My Love Letter 💌
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-celebration mb-16">
            <img 
              src={heroImage} 
              alt="Beautiful birthday cake" 
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              Your Birthday Experience 🎉
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I've created something special for each part of your celebration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.path}>
                  <Card className="h-full overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-romantic hover:scale-105">
                    <div className={`h-32 bg-gradient-to-br ${feature.color} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
                      <Icon className="w-12 h-12 text-white animate-float" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-deep-rose transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Love Message */}
        <section className="container mx-auto px-4 py-12">
          <Card className="max-w-4xl mx-auto glass p-8 md:p-12 text-center">
            <Heart className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse-heart" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Made With Infinite Love 💖
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Every pixel, every animation, every word on this website was crafted with you in mind. 
              Though distance separates us, my love bridges every mile. This is my way of celebrating 
              your special day and showing you just how much you mean to me. You are my everything, 
              today and always. Happy Birthday, beautiful! 🌟
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {['💕', '🎂', '✨', '🌟', '💖', '🎉', '🥰', '💝'].map((emoji, i) => (
                <span 
                  key={i} 
                  className="text-2xl animate-bounce" 
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Index;
