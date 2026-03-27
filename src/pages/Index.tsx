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

// ✅ USE ENV VARIABLE (IMPORTANT FOR DEPLOYMENT)
const API = import.meta.env.VITE_API_URL;

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<DetectionResult | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [mode, setMode] = useState<"image" | "video">("image");
  const [outputVideo, setOutputVideo] = useState<string | null>(null);

  const handleDetect = async (mode: string, file?: File) => {
    if (!file) {
      toast.error("Please upload a file first");
      return;
    }

    setIsLoading(true);
    setResults(null);
    setMode(mode as "image" | "video");

    // Preview (image or video)
    setOriginalImage(URL.createObjectURL(file));

    toast.info("Detection initiated", {
      description: `Processing ${mode} input...`,
    });

    try {
      const formData = new FormData();
      formData.append("file", file);

      // ✅ USE DEPLOYED BACKEND URL
      const url =
        mode === "video"
          ? `${API}/predict-video`
          : `${API}/predict-image`;

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      const realResults: DetectionResult = {
        aircraft: data.aircraft,
        helicopters: data.helicopters,
        fighter_jets: data.fighter_jets,
      };

      setResults(realResults);

      // ✅ HANDLE IMAGE / VIDEO OUTPUT
      if (mode === "image" && data.output_image) {
        setOutputImage(`data:image/jpeg;base64,${data.output_image}`);
        setOutputVideo(null);
      } else if (mode === "video" && data.video_url) {
        setOutputVideo(data.video_url);
        setOutputImage(null);
      }

      toast.success("Detection complete", {
        description: `Found ${
          data.aircraft + data.helicopters + data.fighter_jets
        } targets`,
      });

      setTimeout(() => {
        document
          .getElementById("results")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } catch (error) {
      console.error(error);
      toast.error("Error connecting to backend");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <HeroSection />
      <InputCards onDetect={handleDetect} />

      <div id="results">
        <ResultsSection
          results={results}
          originalImage={originalImage}
          outputImage={outputImage}
          mode={mode}
          outputVideo={outputVideo}
        />
      </div>

      <AdvantagesSection />
      <Footer />
      <LoadingOverlay isVisible={isLoading} />
    </div>
  );
};

export default Index;