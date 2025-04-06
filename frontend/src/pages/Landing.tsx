import React from 'react';
import { Link } from 'react-router-dom';
import { Wheat, Leaf, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

function Landing() {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <motion.div 
            className="flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Wheat className="h-16 w-16 text-green-600" />
          </motion.div>
          <motion.h1 
            className="text-5xl font-bold text-green-800 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Smart Crop Disease Detection
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Protect your crops with AI-powered disease detection. Upload photos of your plants
            and get instant analysis with treatment recommendations.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              to="/detect"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Start Detection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: Wheat, title: "Instant Analysis", description: "Get immediate results about potential diseases affecting your crops using advanced AI technology." },
            { icon: Leaf, title: "Treatment Guide", description: "Receive detailed treatment recommendations and preventive measures for identified diseases." },
            { icon: Shield, title: "Preventive Care", description: "Learn best practices to protect your crops and prevent future disease outbreaks." }
          ].map((feature, index) => (
            <motion.div 
              key={feature.title}
              className="bg-white p-6 rounded-xl shadow-lg"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 * (index + 4) }}
            >
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to protect your crops?
          </motion.h2>
          <motion.p 
            className="text-lg text-green-100 mb-8 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Start using our AI-powered disease detection system today and ensure the health of your crops.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              to="/detect"
              className="inline-flex items-center px-6 py-3 bg-white text-green-800 font-semibold rounded-lg hover:bg-green-100 transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Landing;