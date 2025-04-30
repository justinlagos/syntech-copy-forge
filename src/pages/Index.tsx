
import React, { useState } from 'react';
import Header from '@/components/Header';
import ContentGeneratorForm from '@/components/ContentGeneratorForm';
import ContentDisplay, { ContentPair } from '@/components/ContentDisplay';
import { Toaster } from "@/components/ui/toaster";
import { generateContent } from '@/services/contentGenerator';

const Index = () => {
  const [generatedContent, setGeneratedContent] = useState<ContentPair[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);

  const handleGenerateContent = async (topics: string[]) => {
    setIsLoading(true);
    try {
      const content = await generateContent(topics);
      setGeneratedContent(content);
      setHasGenerated(true);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-syntech-gray">
      <Header />

      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <section className="text-center mb-8">
            <h2 className="text-3xl font-bold text-syntech-blue mb-4">
              Social Media Content Generator
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Generate professional, on-brand social media content for LinkedIn and Instagram 
              that highlights Syntech Biofuel's sustainability initiatives and innovations.
            </p>
          </section>

          <ContentGeneratorForm 
            onGenerate={handleGenerateContent}
            isLoading={isLoading}
          />

          {hasGenerated && !isLoading && (
            <ContentDisplay content={generatedContent} />
          )}
        </div>
      </main>

      <footer className="bg-syntech-blue text-white py-4 mt-12">
        <div className="container mx-auto text-center text-sm">
          <p>© {new Date().getFullYear()} Syntech Biofuel. All rights reserved.</p>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Index;
