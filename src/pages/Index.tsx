import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import InputCards from "@/components/InputCards";
import LoadingOverlay from "@/components/LoadingOverlay";
import ResultsSection from "@/components/ResultsSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import Footer from "@/components/Footer";
import { toast } from "sonner";

interface DetectionResult {
  aircraft: number;
  helicopters: number;
  fighter_jets: number;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<DetectionResult | null>(null);

  const handleDetect = (mode: string, file?: File) => {
    setIsLoading(true);
    setResults(null);

    toast.info("Detection initiated", {
      description: `Processing ${mode} input...`,
    });

    // Simulate AI detection (mock backend)
    setTimeout(() => {
      const mockResults: DetectionResult = {
        aircraft: Math.floor(Math.random() * 12) + 3,
        helicopters: Math.floor(Math.random() * 8) + 1,
        fighter_jets: Math.floor(Math.random() * 6) + 1,
      };
      setResults(mockResults);
      setIsLoading(false);

      toast.success("Detection complete", {
        description: `Found ${mockResults.aircraft + mockResults.helicopters + mockResults.fighter_jets} targets`,
      });

      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }, 4200);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <HeroSection />
      <InputCards onDetect={handleDetect} />
      <div id="results">
        <ResultsSection results={results} />
      </div>
      <AdvantagesSection />
      <Footer />
      <LoadingOverlay isVisible={isLoading} />
    </div>
  );
};

export default Index;
