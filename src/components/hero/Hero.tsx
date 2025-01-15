"use client";

import { motion } from 'framer-motion';
import BlurIn from "@/components/hero/magicui/blur-in";
//import AnimatedImage from '@/components/hero/AnimatedImage';
import { Button } from './button';

const MotionDiv = motion.div;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Hero() {
  return (
    <section>
      <div className="bg-cover bg-center z-0 relative h-96 w-full overflow-hidden bg-[radial-gradient(97.14%_56.45%_at_51.63%_0%,_#7D56F4_0%,_#4517D7_30%,_#000_100%)]"
      style={{ backgroundImage: `url('/movieTime-hero.jpg')` }}
      >

        <MotionDiv 
          className="relative z-10 flex flex-col items-center justify-start min-h-screen space-y-6 px-4 pt-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <BlurIn
              word="MovieTime"
              className="font-display text-center text-4xl font-bold text-white w-full lg:w-auto max-w-3xl mx-auto z-10"
              duration={1}
            />
          </motion.div>

          <motion.h2 
            className="text-xl text-white text-opacity-60 tracking-normal text-center max-w-2xl mx-auto z-10"
            variants={itemVariants}
          >
            Discover Your Favorite Movies and Shows in One Place
          </motion.h2>

          <motion.div variants={itemVariants} className="z-20">
            <Button size="lg" className="shadow-2xl mb-10">
              Get Started
            </Button>
          </motion.div>

{/*           <motion.div variants={itemVariants}>
            <AnimatedImage
              src="/image.webp"
              alt="Image"
              width={1200}
              height={900}
              className="w-full h-auto max-w-6xl mx-auto rounded-2xl shadow-lg"
            />
          </motion.div> */}

        </MotionDiv>
      </div>
    </section>
  );
} 





