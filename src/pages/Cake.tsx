import CakeScene from '@/components/CakeScene';
import Navigation from '@/components/Navigation';
import heroImage from '@/assets/birthday-cake.jpg';

const Cake = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-romantic bg-clip-text text-transparent mb-4 animate-pulse-heart">
              Your Special Birthday Cake 🎂
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              This beautiful 3D cake is made with all my love for you. Hover over it and click to cut your birthday cake together, even from afar! 💕
            </p>
          </div>
          
          {/* Hero Image */}
          <div className="mb-8 rounded-3xl overflow-hidden shadow-romantic">
            <img 
              src={heroImage} 
              alt="Beautiful birthday cake" 
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>
          
          {/* 3D Cake Scene */}
          <div className="rounded-3xl overflow-hidden shadow-celebration bg-card">
            <CakeScene />
          </div>
          
          <div className="mt-8 text-center glass p-6 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-primary">How to Celebrate Together:</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm md:text-base">
              <div className="p-4 rounded-xl bg-primary/5">
                <div className="text-2xl mb-2">🖱️</div>
                <div className="font-medium">Hover</div>
                <div className="text-muted-foreground">Move your mouse over the cake to see the knife appear</div>
              </div>
              <div className="p-4 rounded-xl bg-primary/5">
                <div className="text-2xl mb-2">🎂</div>
                <div className="font-medium">Click</div>
                <div className="text-muted-foreground">Click on the cake to cut it and celebrate together</div>
              </div>
              <div className="p-4 rounded-xl bg-primary/5">
                <div className="text-2xl mb-2">🎉</div>
                <div className="font-medium">Enjoy</div>
                <div className="text-muted-foreground">Watch the confetti and feel my love across the distance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cake;