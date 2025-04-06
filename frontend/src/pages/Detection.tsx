import React, { useState, useRef } from 'react';
import { Upload, Loader2, Wheat, AlertCircle, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface DiseaseData {
  disease_name: string;
  confidence: string;
  symptoms: string[];
  causes: string[];
  treatments: string[];
  preventive_measures: string[];
}

function Detection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [diseaseData, setDiseaseData] = useState<DiseaseData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImage(URL.createObjectURL(file));
    setIsLoading(true);
    setError(null);
    setDiseaseData(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3000/detect-disease", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to analyze image');
      
      const data = await response.json();
      setDiseaseData(data);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="inline-block mb-8 text-green-700 hover:text-green-800">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-green-800 mb-4 flex items-center justify-center gap-2">
            <Wheat className="h-8 w-8" />
            Crop Disease Detection
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload an image of your crop to detect diseases and get detailed analysis including symptoms, 
            causes, treatments, and preventive measures.
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-8">
            <div 
              className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <Upload className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <p className="text-gray-600">Click or drag to upload your crop image</p>
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        {(selectedImage || isLoading || error || diseaseData) && (
          <motion.div 
            className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="md:flex">
              {/* Image Preview */}
              {selectedImage && (
                <div className="md:flex-shrink-0 md:w-1/2">
                  <img
                    src={selectedImage}
                    alt="Selected crop"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {/* Analysis Results */}
              <div className="p-8 md:w-1/2">
                {isLoading && (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                    <p className="ml-2 text-gray-600">Analyzing image...</p>
                  </div>
                )}

                {error && (
                  <div className="flex items-center text-red-500 mb-4">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    {error}
                  </div>
                )}

                {diseaseData && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-semibold text-gray-800">
                        {diseaseData.disease_name}
                      </h2>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {diseaseData.confidence}
                      </span>
                    </div>

                    {['symptoms', 'causes', 'treatments', 'preventive_measures'].map((section) => (
                      <motion.div 
                        key={section} 
                        className="mb-6"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <h3 className="text-lg font-medium text-gray-700 capitalize mb-2">
                          {section.replace('_', ' ')}
                        </h3>
                        <ul className="space-y-2">
                          {diseaseData[section as keyof DiseaseData].map((item, index) => (
                            <motion.li 
                              key={index} 
                              className="flex items-start"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.7 + (index * 0.1) }}
                            >
                              <span className="mr-2 mt-1">
                                {diseaseData.disease_name === "No disease detected" ? 
                                  <X className="h-4 w-4 text-gray-400" /> : 
                                  <Check className="h-4 w-4 text-green-500" />
                                }
                              </span>
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Detection;