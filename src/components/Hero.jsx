import { motion } from 'framer-motion';

const Hero = ({ onShopNowClick }) => {
  return (
    <section
      id="home"
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Video Background - Using local video (No overlay for clear video) */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/images/hero-poster.svg"
        >
          <source
            src="/videos/home.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Content - Only Shop Now Button */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            onClick={onShopNowClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary hover:bg-primary-light text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Shop Now
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-xs">Scroll to explore</span>
            <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
