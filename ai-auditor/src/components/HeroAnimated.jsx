import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, TrendingUp, BarChart3, Zap, ArrowRight, Play } from 'lucide-react';

const HeroAnimated = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)',
            'linear-gradient(135deg, #1e293b 0%, #334155 25%, #475569 50%, #334155 75%, #1e293b 100%)',
            'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Primary floating orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={floatingAnimation}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={floatingAnimation}
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={floatingAnimation}
          transition={{ delay: 2 }}
        />

        {/* Additional animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Animated waves */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-32"
          animate={{
            background: [
              'linear-gradient(to top, rgba(59, 130, 246, 0.1), transparent)',
              'linear-gradient(to top, rgba(147, 51, 234, 0.1), transparent)',
              'linear-gradient(to top, rgba(59, 130, 246, 0.1), transparent)'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{
            clipPath: 'polygon(0 100%, 0 0, 100% 60%, 100% 100%)'
          }}
        />
      </div>

      {/* Enhanced Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px']
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" />
                AI-Powered Financial Intelligence
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Smarter Auditing.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Stronger Compliance.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Transform your Canadian small business with AI-driven financial auditing and compliance monitoring. 
              Ensure accuracy, reduce risk, and save time with intelligent automation.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                See Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Animated Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* Main Dashboard Card */}
            <motion.div
              variants={itemVariants}
              animate={{ ...floatingAnimation, delay: 0.5 }}
              className="relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">AI Compliance Dashboard</h3>
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">Risk Score</span>
                  <span className="text-green-400 font-bold">98%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "98%" }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                </div>
              </div>

              {/* Mini Charts */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[85, 92, 96].map((value, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/5 rounded-lg p-3 text-center"
                    animate={pulseAnimation}
                    transition={{ delay: index * 0.2 }}
                  >
                    <BarChart3 className="w-8 h-8 text-blue-400 mx-auto mb-1" />
                    <div className="text-white text-sm font-bold">{value}%</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
              animate={{ ...floatingAnimation, delay: 1 }}
            >
              <TrendingUp className="w-8 h-8 text-white" />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center"
              animate={{ ...floatingAnimation, delay: 1.5 }}
            >
              <Shield className="w-6 h-6 text-white" />
            </motion.div>

            {/* Background Cards */}
            <motion.div
              className="absolute top-8 -right-8 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
              animate={{ ...floatingAnimation, delay: 2 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">247</div>
                <div className="text-xs text-gray-300">Audits Complete</div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-8 -right-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
              animate={{ ...floatingAnimation, delay: 2.5 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">99.9%</div>
                <div className="text-xs text-gray-300">Accuracy</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>


    </div>
  );
};

export default HeroAnimated;