import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star, Heart, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Please rate my efforts! ⭐",
        description: "I'd love to know how I did with your birthday surprise!",
        variant: "destructive"
      });
      return;
    }

    // Here you would normally submit to Supabase
    // For now, we'll just show a success message
    setIsSubmitted(true);
    
    toast({
      title: "Thank you, my love! 💕",
      description: `You rated me ${rating}/10! Your feedback means everything to me.`,
    });
  };

  const resetForm = () => {
    setRating(0);
    setFeedback('');
    setIsSubmitted(false);
  };

  const getRatingMessage = (rating: number) => {
    if (rating >= 9) return "You're the absolute best! 💕";
    if (rating >= 7) return "You did amazing! ❤️";
    if (rating >= 5) return "Pretty good effort! 😊";
    if (rating >= 3) return "You tried your best! 💙";
    if (rating >= 1) return "There's room for improvement! 💛";
    return "";
  };

  const getRatingEmoji = (rating: number) => {
    if (rating >= 9) return "🥰";
    if (rating >= 7) return "😍";
    if (rating >= 5) return "😊";
    if (rating >= 3) return "🙂";
    if (rating >= 1) return "😐";
    return "";
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-soft">
        <Navigation />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto text-center">
              <Card className="p-8 shadow-celebration">
                <div className="text-6xl mb-6">{getRatingEmoji(rating)}</div>
                <h1 className="text-4xl font-bold bg-gradient-romantic bg-clip-text text-transparent mb-4">
                  Thank You For Rating Me!
                </h1>
                <div className="text-6xl mb-4 text-gold">
                  {rating}/10
                </div>
                <p className="text-2xl text-primary mb-6 font-medium">
                  {getRatingMessage(rating)}
                </p>
                {feedback && (
                  <div className="bg-primary/5 p-4 rounded-xl mb-6">
                    <p className="text-foreground italic">"{feedback}"</p>
                  </div>
                )}
                <p className="text-lg text-muted-foreground mb-8">
                  Your rating and feedback have been saved to my heart! 💕 
                  Thank you for taking the time to let me know how I did with your birthday surprise.
                </p>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Rate Again 💕
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-romantic bg-clip-text text-transparent mb-4 animate-pulse-heart">
                Rate My Birthday Efforts ⭐
              </h1>
              <p className="text-lg text-muted-foreground">
                How did I do with your birthday surprise? Your honest feedback means the world to me!
              </p>
            </div>

            <Card className="p-8 shadow-romantic">
              <div className="space-y-8">
                {/* Rating Section */}
                <div className="text-center">
                  <Label className="text-xl font-semibold text-primary mb-6 block">
                    Rate my birthday efforts (1-10):
                  </Label>
                  
                  <div className="flex justify-center gap-2 mb-4">
                    {[...Array(10)].map((_, index) => {
                      const starValue = index + 1;
                      return (
                        <button
                          key={index}
                          onClick={() => setRating(starValue)}
                          onMouseEnter={() => setHoveredRating(starValue)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="transition-all duration-200 hover:scale-110"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              starValue <= (hoveredRating || rating)
                                ? 'fill-gold text-gold'
                                : 'text-muted-foreground'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  
                  {(rating > 0 || hoveredRating > 0) && (
                    <div className="animate-fade-in">
                      <div className="text-4xl mb-2">
                        {hoveredRating || rating}/10 {getRatingEmoji(hoveredRating || rating)}
                      </div>
                      <p className="text-lg text-primary font-medium">
                        {getRatingMessage(hoveredRating || rating)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Feedback Section */}
                <div className="space-y-4">
                  <Label htmlFor="feedback" className="text-lg font-medium text-primary">
                    Tell me what you think (optional):
                  </Label>
                  <Textarea
                    id="feedback"
                    placeholder="Share your thoughts about the birthday surprise... What did you love? What could be better? How did it make you feel? 💕"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={5}
                    className="resize-none focus:ring-primary/30"
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <Button
                    onClick={handleSubmit}
                    className="bg-gradient-romantic text-white shadow-romantic hover:shadow-celebration transition-all duration-300 px-8 py-3 text-lg"
                    disabled={rating === 0}
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Submit My Rating
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    {rating === 0 
                      ? "Please give me a rating first! ⭐" 
                      : "Click to send your rating and make me happy! 💕"
                    }
                  </p>
                </div>
              </div>
            </Card>

            {/* Note about database connection */}
            <div className="mt-8 glass p-6 rounded-2xl text-center">
              <MessageCircle className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-primary">
                Note: Connect Supabase for Database Storage
              </h3>
              <p className="text-sm text-muted-foreground">
                To save your rating and feedback permanently, please connect this project to Supabase 
                using the green button in the top right corner. This will enable the database functionality!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;