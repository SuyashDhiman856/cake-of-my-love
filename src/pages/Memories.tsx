import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import coupleImage from '@/assets/couple-silhouette.jpg';
import images from '../images';
import SuyashDiyaFOREVER1 from '@/assets/SuyashDiyaFOREVER1.jpg';
import SuyashDiyaFOREVER2 from '@/assets/SuyashDiyaFOREVER2.jpg';
import SuyashDiyaFOREVER3 from '@/assets/SuyashDiyaFOREVER3.jpg';
import SuyashDiyaFOREVER4 from '@/assets/SuyashDiyaFOREVER4.jpg';
import SuyashDiyaFOREVER5 from '@/assets/SuyashDiyaFOREVER5.jpg';
import SuyashDiyaFOREVER6 from '@/assets/SuyashDiyaFOREVER6.jpg';
import SuyashDiyaFOREVER7 from '@/assets/SuyashDiyaFOREVER7.jpg';
import SuyashDiyaFOREVER8 from '@/assets/SuyashDiyaFOREVER8.jpg';
import SuyashDiyaFOREVER9 from '@/assets/SuyashDiyaFOREVER9.jpg';
import SuyashDiyaFOREVER10 from '@/assets/SuyashDiyaFOREVER10.jpg';
import SuyashDiyaFOREVER11 from '@/assets/SuyashDiyaFOREVER11.jpg';

const Memories = () => {
  const [currentMemory, setCurrentMemory] = useState(0);

  // Placeholder memories - you can replace with real photos
  const memories = [
    {
      id: 1,
      image: SuyashDiyaFOREVER1,
      title: "Our First Birthday Together",
      description: "Our First Celebration Together, The Most Perfect Day Ever.",
      date: "29th August 2025"
    },
    {
      id: 2,
      image: SuyashDiyaFOREVER2,
      title: "After So Many Obstacles, We are Together On The Day We Born",
      description: "My heart skipped a beat and the world felt perfect.",
      date: "29th August 2025"
    },
    {
      id: 3,
      image: SuyashDiyaFOREVER3,
      title: "The Again Surprise",
      description: "Every second was precious, every moment a treasure.",
      date: "21th August 2025"
    },
    {
      id: 4,
      image: SuyashDiyaFOREVER4,
      title: "The Mother's Love",
      description: "The Moment when you loved me like my Mother.",
      date: "19th August 2025"
    },
    {
      id: 5,
      image: SuyashDiyaFOREVER5,
      title: "The Moment when we found the best compatible arms to hold each other",
      description: "Sharing our dreams, fears, and everything in between",
      date: "19th August 2025"
    },
    {
      id: 6,
      image: SuyashDiyaFOREVER6,
      title: "Khushi is finally so Happy",
      description: "When she is so happy because of you, it makes you cry the tears of happiness.",
      date: "19th August 2025"
    },
    {
      id: 7,
      image: SuyashDiyaFOREVER7,
      title: "Our First Meet",
      description: "The Day when the butterflies in my stomach flew away because I saw you.",
      date: "2nd April 2025"
    },
    {
      id: 8,
      image: SuyashDiyaFOREVER8,
      title: "Our First Date",
      description: "The First Date with you was the most magical evening of my life.",
      date: "16th April 2025"
    },
    {
      id: 9,
      image: SuyashDiyaFOREVER9,
      title: "When We Fall In Love",
      description: "The moment when it becomes mutual",
      date: "2nd April 2025"
    },
    {
      id: 10,
      image: SuyashDiyaFOREVER10,
      title: "When She Is happy",
      description: "When his happiness totally depends on her Happiness",
      date: "16th April 2025"
    },
    {
      id: 11,
      image: SuyashDiyaFOREVER11,
      title: "When They are Together, Every Problem Seems Smaller",
      description: "They Found Themselves When They Found Each Other",
      date: "Every precious evening"
    }
  ];

  const nextMemory = () => {
    setCurrentMemory((prev) => (prev + 1) % memories.length);
  };

  const prevMemory = () => {
    setCurrentMemory((prev) => (prev - 1 + memories.length) % memories.length);
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-romantic bg-clip-text text-transparent mb-4 animate-pulse-heart">
              Our Beautiful Memories 📸
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every moment with you is a memory worth treasuring forever
            </p>
          </div>

          {/* Main Carousel */}
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-celebration bg-gradient-to-br from-card to-card/80">
              <div className="relative">
                {/* Current Memory */}
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={memories[currentMemory].image}
                    alt={memories[currentMemory].title}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Navigation Buttons */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevMemory}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextMemory}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>

                  {/* Memory Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      {memories[currentMemory].title}
                    </h3>
                    <p className="text-lg mb-2 opacity-90">
                      {memories[currentMemory].description}
                    </p>
                    <p className="text-sm opacity-75">
                      {memories[currentMemory].date}
                    </p>
                  </div>
                </div>

                {/* Memory Counter */}
                <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-white text-sm">
                  {currentMemory + 1} / {memories.length}
                </div>
              </div>
            </Card>

            {/* Thumbnail Navigation */}
            <div className="flex justify-center gap-2 mt-6 flex-wrap">
              {memories.map((memory, index) => (
                <button
                  key={memory.id}
                  onClick={() => setCurrentMemory(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === currentMemory 
                      ? 'ring-2 ring-primary scale-110 shadow-romantic' 
                      : 'opacity-60 hover:opacity-80'
                  }`}
                >
                  <img 
                    src={memory.image}
                    alt={`Memory ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Memory Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {memories.map((memory, index) => (
                <Card 
                  key={memory.id}
                  className={`overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-romantic hover:scale-105 ${
                    index === currentMemory ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setCurrentMemory(index)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={memory.image}
                      alt={memory.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-primary mb-2">{memory.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {memory.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Love Note */}
            <div className="mt-12 text-center glass p-8 rounded-2xl">
              <Heart className="w-8 h-8 text-primary mx-auto mb-4 animate-pulse-heart" />
              <h3 className="text-2xl font-semibold mb-4 text-primary">
                Every Photo Tells Our Story
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These are just a few of the countless beautiful moments we've shared. 
                Each memory is a chapter in our love story, and I can't wait to create 
                thousands more with you. Distance may separate us, but these memories 
                keep us connected across any distance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Memories;