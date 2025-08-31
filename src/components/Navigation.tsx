import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Cake, Mail, Camera, Gift, Star, Music, Clock, Coffee } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Heart },
    { path: '/cake', label: 'Birthday Cake', icon: Cake },
    { path: '/love-letter', label: 'Love Letter', icon: Mail },
    { path: '/memories', label: 'Our Memories', icon: Camera },
    { path: '/gifts', label: 'Virtual Gifts', icon: Gift },
    { path: '/music', label: 'Our Songs', icon: Music },
    { path: '/messages', label: 'Special Messages', icon: Heart },
    { path: '/countdown', label: 'Countdown', icon: Clock },
    { path: '/virtual-date', label: 'Virtual Date', icon: Coffee },
    { path: '/rating', label: 'Rate Me', icon: Star },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
            Happy Birthday Diya ❤️
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`transition-all duration-300 ${
                      isActive 
                        ? "bg-gradient-romantic text-white shadow-romantic" 
                        : "hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Heart className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 glass rounded-b-xl border-t border-border/20">
            <div className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start transition-all duration-300 ${
                        isActive 
                          ? "bg-gradient-romantic text-white shadow-romantic" 
                          : "hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;