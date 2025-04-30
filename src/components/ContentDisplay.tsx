
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export interface ContentPair {
  headline: string;
  subheadline: string;
  isFunny?: boolean;
}

interface ContentDisplayProps {
  content: ContentPair[];
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content }) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Content has been copied to clipboard",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Generated Content</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {content.map((pair, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-md relative ${
                pair.isFunny 
                  ? "bg-syntech-lightGreen border border-syntech-green/20" 
                  : "bg-syntech-lightBlue border border-syntech-blue/20"
              }`}
            >
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(`${pair.headline}\n${pair.subheadline}`)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              
              <div className="space-y-2 pr-8">
                <h3 className="font-bold text-lg">{pair.headline}</h3>
                <p className="text-gray-700">{pair.subheadline}</p>
                {pair.isFunny && (
                  <div className="mt-2">
                    <span className="bg-syntech-green text-white text-xs px-2 py-1 rounded-full">
                      Humor Option
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentDisplay;
