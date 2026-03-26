import { motion } from "framer-motion";
import { Target, Layers, Activity, Shield, Satellite } from "lucide-react";

const advantages = [
  { icon: Target, title: "High Accuracy Detection", description: "YOLOv8-powered detection with 99.2% precision across all aerial vehicle classes" },
  { icon: Layers, title: "Multi-class Classification", description: "Simultaneous identification of aircraft, helicopters, and fighter jets" },
  { icon: Activity, title: "Real-time Monitoring", description: "Sub-50ms inference enabling live airspace surveillance and tracking" },
  { icon: Shield, title: "Defense Applications", description: "Scalable architecture designed for military and government intelligence" },
  { icon: Satellite, title: "Satellite Compatible", description: "Process high-resolution satellite imagery from major Earth observation platforms" },
];

const AdvantagesSection = () => {
  return (
    <section id="about" className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            System <span className="text-primary neon-text">Advantages</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Built for defense-grade reliability and performance
          </p>
        </motion.div>
      </div>

      {/* Scrolling cards */}
      <div className="relative">
        <motion.div
          className="flex gap-6 px-6"
          animate={{ x: [0, -1200] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...advantages, ...advantages].map((adv, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(180 100% 50% / 0.15)" }}
              className="glass rounded-2xl p-6 min-w-[300px] flex-shrink-0 hover:border-primary/40 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <adv.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground mb-2">{adv.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{adv.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
