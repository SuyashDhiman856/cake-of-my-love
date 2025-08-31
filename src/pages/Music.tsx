import { useState } from 'react';
import Navigation from '@/components/Navigation';
import MusicPlayer from '@/components/MusicPlayer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Heart, Music as MusicIcon, Volume2, Download } from 'lucide-react';
import musics from '../musics';

const Music = () => {
  const [currentSong, setCurrentSong] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const ourPlaylist = [
    {
      id: 1,
      title: "Tum Ho To (Saiyaara)",
      artist: "Vishal Mishra, Hansika Pareek",
      dedication: "Because you're perfect to me in every way 💕",
      lyrics: "I found a love for me, darling just dive right in...",
      color: "from-rose-pink to-baby-pink",
      url: `${musics.musics.TumHoTo}`, // Demo URL
      duration: 180
    },
    {
      id: 2,
      title: "I Love You Diya",
      artist: "Ash King, Clinton Cerejo",
      dedication: "You have all of me, my heart and soul ❤️",
      lyrics: "All of me loves all of you, love your curves and all your edges...",
      color: "from-deep-red to-rose-pink",
      url: `${musics.musics.ILoveYouDiya}`, // Demo URL
      duration: 209
    },
    {
      id: 3,
      title: "Wanna Be Yours",
      artist: "Arctic Monkeys",
      dedication: "Growing old with you is my greatest dream 💫",
      lyrics: "When your legs don't work like they used to before...",
      color: "from-coral to-cream",
      url: `${musics.musics.WannaBeYours}`, // Demo URL
      duration: 281
    },
    {
      id: 4,
      title: "Raabta",
      artist: "Shreya Ghoshal",
      dedication: "I'd do anything to make you feel my love across the distance 🌙",
      lyrics: "When the rain is blowing in your face...",
      color: "from-baby-pink to-deep-red",
      url: `${musics.musics.Raabta}`, // Demo URL
      duration: 267
    },
    {
      id: 5,
      title: "Tum Se Hi",
      artist: "Mohit Chauhan",
      dedication: "I'll love you for a thousand years and more 💖",
      lyrics: "Heart beats fast, colors and promises...",
      color: "from-cream to-coral",
      url: `${musics.musics.TumSeHi}`, // Demo URL
      duration: 285
    },
    {
      id: 6,
      title: "Phir Kabhi",
      artist: "Arijit Singh",
      dedication: "I can't help but love you more each day 🎵",
      lyrics: "Sugar pie honey bunch, you know that I love you...",
      color: "from-rose-pink to-cream",
      url: `${musics.musics.PhirKabhi}`, // Demo URL
      duration: 174
    }
  ];

  const handlePlay = (songId: number) => {
    setCurrentSong(songId);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    const currentIndex = ourPlaylist.findIndex(song => song.id === currentSong);
    const nextIndex = (currentIndex + 1) % ourPlaylist.length;
    setCurrentSong(ourPlaylist[nextIndex].id);
  };

  const handlePrevious = () => {
    const currentIndex = ourPlaylist.findIndex(song => song.id === currentSong);
    const prevIndex = currentIndex === 0 ? ourPlaylist.length - 1 : currentIndex - 1;
    setCurrentSong(ourPlaylist[prevIndex].id);
  };

  const togglePlay = (songId: number) => {
    if (currentSong === songId && isPlaying) {
      handlePause();
    } else {
      handlePlay(songId);
    }
  };

  const getCurrentSong = () => {
    return ourPlaylist.find(song => song.id === currentSong);
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-romantic bg-clip-text text-transparent mb-4 animate-pulse-heart font-playfair">
              Our Love Playlist 🎵
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-inter">
              Every song that reminds me of you and our beautiful love story. Click to play and listen together! 🎶
            </p>
          </div>

          {/* Now Playing */}
          {currentSong && isPlaying && (
            <Card className="max-w-2xl mx-auto mb-8 overflow-hidden shadow-celebration">
              <div className={`bg-gradient-to-r ${getCurrentSong()?.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{getCurrentSong()?.title}</h3>
                    <p className="text-lg opacity-90">{getCurrentSong()?.artist}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Volume2 className="w-6 h-6" />
                    <div className="text-sm">Now Playing</div>
                  </div>
                </div>
                <p className="italic mb-4">"{getCurrentSong()?.dedication}"</p>
                <div className="bg-white/20 rounded-full h-1 overflow-hidden">
                  <div className="bg-white h-full w-1/3 animate-pulse"></div>
                </div>
              </div>
            </Card>
          )}

          {/* Playlist */}
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-4">
              {ourPlaylist.map((song, index) => {
                const isCurrentSong = currentSong === song.id;
                const isCurrentlyPlaying = isCurrentSong && isPlaying;
                
                return (
                  <Card 
                    key={song.id}
                    className={`overflow-hidden transition-all duration-300 ${
                      isCurrentSong 
                        ? 'shadow-celebration ring-2 ring-primary scale-105' 
                        : 'shadow-soft hover:shadow-romantic hover:scale-102'
                    }`}
                  >
                    <div className="flex items-center p-6">
                      {/* Play Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePlay(song.id)}
                        className={`w-12 h-12 rounded-full mr-4 ${
                          isCurrentSong 
                            ? 'bg-gradient-romantic text-white shadow-romantic' 
                            : 'bg-primary/10 text-primary hover:bg-primary/20'
                        }`}
                      >
                        {isCurrentlyPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 ml-0.5" />
                        )}
                      </Button>

                      {/* Song Info */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-primary">
                              {index + 1}. {song.title}
                            </h3>
                            <p className="text-muted-foreground">{song.artist}</p>
                          </div>
                          {isCurrentlyPlaying && (
                            <div className="flex items-center space-x-1">
                              <div className="w-1 h-4 bg-primary rounded animate-pulse"></div>
                              <div className="w-1 h-6 bg-primary rounded animate-pulse" style={{animationDelay: '0.2s'}}></div>
                              <div className="w-1 h-3 bg-primary rounded animate-pulse" style={{animationDelay: '0.4s'}}></div>
                              <div className="w-1 h-5 bg-primary rounded animate-pulse" style={{animationDelay: '0.6s'}}></div>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-sm text-foreground italic mb-2">
                          "{song.dedication}"
                        </p>
                        
                        <p className="text-xs text-muted-foreground">
                          {song.lyrics}
                        </p>
                      </div>
                    </div>

                    {/* Progress bar for playing song */}
                    {isCurrentlyPlaying && (
                      <div className="h-1 bg-primary/20">
                        <div className="h-full bg-gradient-romantic w-1/3 animate-pulse"></div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Enhanced Music Player */}
          <MusicPlayer
            songs={ourPlaylist}
            currentSongId={currentSong}
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onPause={handlePause}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />

          {/* Love Message */}
          <div className="mt-12 text-center glass p-8 rounded-2xl max-w-2xl mx-auto">
            <Heart className="w-8 h-8 text-primary mx-auto mb-4 animate-pulse-heart" />
            <h3 className="text-2xl font-semibold mb-4 text-primary">
              Our Soundtrack of Love
            </h3>
            <p className="text-lg text-muted-foreground">
              Every song in this playlist was chosen because it reminds me of you, 
              our love, or a special moment we've shared. When you hear these songs, 
              know that I'm thinking of you and sending all my love across the miles. 
              Music connects our hearts when distance keeps us apart. 🎵💕
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;