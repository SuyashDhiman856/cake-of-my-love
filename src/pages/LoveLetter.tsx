import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import loveLetterBg from '@/assets/love-letter-bg.jpg';

const LoveLetter = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-romantic bg-clip-text text-transparent mb-4 animate-pulse-heart">
                A Letter From My Heart 💕
              </h1>
              <p className="text-lg text-muted-foreground">
                Every word written with infinite love for you
              </p>
            </div>

            <Card className="relative overflow-hidden shadow-romantic">
              {/* Background Image */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url(${loveLetterBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              
              <div className="relative z-10 p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <div className="text-right mb-8 text-muted-foreground italic">
                    Written with love, on your special day
                  </div>

                  <div className="space-y-6 text-foreground leading-relaxed">
                    <div className="text-2xl mb-6 text-primary font-medium">My Dearest Cutu Laddo 🩷🛐,</div>

                    <p>
                      As I sit here writing this letter, my heart overflows with emotions I struggle to put into words. Today marks another year of your beautiful existence in this world, and I am overwhelmed with gratitude for having you in my life. Distance may separate us physically, but our hearts beat as one, connected by an invisible thread of love that spans across continents and time zones.
                    </p>

                    <p>
                      When I first met you, I never imagined that someone could bring such light into my world. Your laughter became my favorite melody, your smile my daily sunshine, and your voice the comfort that soothes my soul after the longest days. You transformed my life from black and white into a canvas painted with the most vibrant colors I never knew existed.
                    </p>

                    <p>
                      Every morning I wake up thinking of you, and every night I fall asleep with your name on my lips. The miles between us feel like an eternity, yet your love gives me strength to face each day with hope and determination. You've taught me that love knows no boundaries, that hearts can be close even when bodies are apart, and that true connection transcends physical distance.
                    </p>

                    <p>
                      I cherish every memory we've created together - our late-night conversations when the world was asleep, the way you look at me through video calls that makes me feel like I'm the only person in your universe, your adorable morning voice that melts my heart, and the comfortable silences we share that speak volumes about our connection. Each moment with you is a treasure I hold close to my heart.
                    </p>

                    <p>
                      Your kindness inspires me to be a better person every day. Your intelligence challenges me to grow, your humor brightens my darkest moments, and your unwavering support gives me courage to chase my dreams. You believe in me even when I don't believe in myself, and that faith has been my anchor through life's storms.
                    </p>

                    <p>
                      I love the way you laugh when you are genuinely happy, how you get excited about the little things in life, your passion for the things you care about, and the gentle way you handle my heart. I love your morning texts that start my day with a smile, your goodnight messages that help me sleep peacefully, and the way you say my name like it's your favorite word.
                    </p>

                    <p>
                      On this special day, I want you to know that you are not just a year older, but a year more beautiful, wiser, and more amazing than before. Your birthday reminds me of all the reasons I fell in love with you and continues to fall deeper every single day. You are my dream come true, my answered prayer, and my heart's greatest joy.
                    </p>

                    <p>
                      Though I cannot be there to hold you close, to look into your eyes, or to celebrate with you in person, please know that my love travels across every mile to reach you. Feel it in the morning breeze, see it in the twinkling stars, and hear it in the songs that remind us of our love. I am with you in spirit, celebrating this beautiful soul that has captured my heart completely.
                    </p>

                    <p>
                      I promise you that no matter how far apart we are, no matter what challenges come our way, my love for you will remain constant and true. You are my forever person, my soulmate, my best friend, and the love of my life. Every day with you, even from a distance, is a gift I never take for granted.
                    </p>

                    <p>
                      As you blow out your candles today, know that my wish is the same as yours - for us to be together soon, to create more beautiful memories, and to continue this incredible journey of love side by side. Until that day comes, carry my love with you wherever you go, and remember that you are deeply, madly, and eternally loved.
                    </p>

                    <p>
                      Happy Birthday, my beautiful angel. You deserve all the happiness in the world, and I'll spend the rest of my life making sure you feel loved, cherished, and adored. Thank you for being you, for choosing me, and for making life so wonderfully worth living.
                    </p>

                    <p>
                      Here's to another year of your amazing life, to our love growing stronger with each passing day, and to the beautiful future we're building together, one day at a time. You are my everything, today and always.
                    </p>

                    <div className="text-right mt-12">
                      <div className="text-xl font-medium text-primary">With all my love and endless devotion,</div>
                      <div className="text-2xl font-bold bg-gradient-romantic bg-clip-text text-transparent mt-4">
                        Yours Suyash ❤️
                      </div>
                      <div className="text-sm text-muted-foreground mt-2 italic">
                        Forever yours, across every mile and through every season
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="mt-8 text-center glass p-6 rounded-2xl">
              <p className="text-lg text-primary font-medium">
                "Distance is just a test to see how far love can travel." 💕
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Every word in this letter comes straight from my heart to yours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveLetter;
