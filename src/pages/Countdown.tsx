import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, Heart, MapPin } from 'lucide-react';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set your special date here (when you'll meet next)
  const targetDate = new Date('2024-12-25T00:00:00').getTime(); // Christmas example

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-romantic bg-clip-text text-transparent mb-4 animate-pulse-heart font-playfair">
              Until We Meet Again ⏰
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-inter">
              Every second brings us closer to being together again. This countdown is my heart beating in anticipation! 💕
            </p>
          </div>

          {/* Main Countdown */}
          <div className="max-w-4xl mx-auto mb-8">
            <Card className="overflow-hidden shadow-celebration glass">
              <div className="bg-gradient-romantic p-8 text-white text-center">
                <Clock className="w-16 h-16 mx-auto mb-6 animate-pulse-heart" />
                <h2 className="text-3xl font-bold mb-8 font-playfair">Time Until Our Reunion</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white/20 rounded-2xl p-4">
                    <div className="text-4xl md:text-6xl font-bold mb-2 font-playfair">
                      {timeLeft.days}
                    </div>
                    <div className="text-sm uppercase tracking-wide font-dancing text-lg">Days</div>
                  </div>
                  <div className="bg-white/20 rounded-2xl p-4">
                    <div className="text-4xl md:text-6xl font-bold mb-2 font-playfair">
                      {timeLeft.hours}
                    </div>
                    <div className="text-sm uppercase tracking-wide font-dancing text-lg">Hours</div>
                  </div>
                  <div className="bg-white/20 rounded-2xl p-4">
                    <div className="text-4xl md:text-6xl font-bold mb-2 font-playfair">
                      {timeLeft.minutes}
                    </div>
                    <div className="text-sm uppercase tracking-wide font-dancing text-lg">Minutes</div>
                  </div>
                  <div className="bg-white/20 rounded-2xl p-4">
                    <div className="text-4xl md:text-6xl font-bold mb-2 font-playfair">
                      {timeLeft.seconds}
                    </div>
                    <div className="text-sm uppercase tracking-wide font-dancing text-lg">Seconds</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Special Events Countdown */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="overflow-hidden shadow-romantic">
              <div className="bg-gradient-to-r from-rose-pink to-baby-pink p-6 text-white">
                <Calendar className="w-8 h-8 mb-4" />
                <h3 className="text-xl font-semibold mb-2 font-playfair">Next Birthday</h3>
                <div className="text-2xl font-bold font-playfair">45 Days</div>
                <p className="text-sm opacity-90 font-inter">Your special day! 🎂</p>
              </div>
            </Card>

            <Card className="overflow-hidden shadow-romantic">
              <div className="bg-gradient-to-r from-deep-red to-rose-pink p-6 text-white">
                <Heart className="w-8 h-8 mb-4" />
                <h3 className="text-xl font-semibold mb-2 font-playfair">Anniversary</h3>
                <div className="text-2xl font-bold font-playfair">127 Days</div>
                <p className="text-sm opacity-90 font-inter">Our love milestone! 💕</p>
              </div>
            </Card>

            <Card className="overflow-hidden shadow-romantic">
              <div className="bg-gradient-to-r from-coral to-cream p-6 text-white">
                <MapPin className="w-8 h-8 mb-4" />
                <h3 className="text-xl font-semibold mb-2 font-playfair">Dream Trip</h3>
                <div className="text-2xl font-bold font-playfair">365 Days</div>
                <p className="text-sm opacity-90 font-inter">Our adventure awaits! ✈️</p>
              </div>
            </Card>
          </div>

          {/* Motivational Messages */}
          <div className="max-w-2xl mx-auto">
            <Card className="glass p-8 text-center shadow-celebration">
              <Heart className="w-12 h-12 text-primary mx-auto mb-6 animate-pulse-heart" />
              <h3 className="text-2xl font-semibold mb-4 text-primary font-playfair">
                Every Moment Counts
              </h3>
              <p className="text-lg text-muted-foreground mb-6 font-inter">
                Distance is just a test of how far love can travel. Every tick of this clock 
                is a heartbeat that says "I love you" and "I miss you" and "I can't wait to 
                hold you again."
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-primary/5 rounded-xl p-4">
                  <div className="font-semibold text-primary font-playfair">Time Zones Apart</div>
                  <div className="text-muted-foreground font-inter">But our hearts beat as one</div>
                </div>
                <div className="bg-primary/5 rounded-xl p-4">
                  <div className="font-semibold text-primary font-playfair">Miles Between Us</div>
                  <div className="text-muted-foreground font-inter">Yet you feel so close</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;