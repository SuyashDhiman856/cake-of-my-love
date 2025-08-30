import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Cake from "./pages/Cake";
import LoveLetter from "./pages/LoveLetter";
import Memories from "./pages/Memories";
import Gifts from "./pages/Gifts";
import Rating from "./pages/Rating";
import Music from "./pages/Music";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cake" element={<Cake />} />
          <Route path="/love-letter" element={<LoveLetter />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/gifts" element={<Gifts />} />
          <Route path="/rating" element={<Rating />} />
          <Route path="/music" element={<Music />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
