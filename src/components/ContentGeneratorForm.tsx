
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { X, Plus } from "lucide-react";

const topicOptions = [
  { value: "scope3", label: "Scope 3 Emissions" },
  { value: "carbon", label: "Carbon Reduction" },
  { value: "madeInUK", label: "Made in UK" },
  { value: "sustainable", label: "Sustainable Construction" },
  { value: "renewable", label: "Renewable Energy" },
  { value: "syntechASB", label: "Syntech ASB" },
  { value: "innovation", label: "Biofuel Innovation" },
  { value: "circular", label: "Circular Economy" },
  { value: "netZero", label: "Net Zero" }
];

interface ContentGeneratorFormProps {
  onGenerate: (topics: string[]) => void;
  isLoading: boolean;
}

const ContentGeneratorForm: React.FC<ContentGeneratorFormProps> = ({ 
  onGenerate,
  isLoading
}) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [mainTopic, setMainTopic] = useState<string>("");
  const [tagInput, setTagInput] = useState<string>("");
  const { toast } = useToast();

  const handleTopicChange = (value: string) => {
    setMainTopic(value);
    if (!selectedTopics.includes(value)) {
      setSelectedTopics([value]);
    }
  };

  const handleAddTag = () => {
    // Allow any custom tag input, just check for duplicates
    if (tagInput.trim() !== '') {
      const newTag = tagInput.trim();
      
      if (!selectedTopics.includes(newTag)) {
        setSelectedTopics(prev => [...prev, newTag]);
        setTagInput("");
      } else {
        toast({
          title: "Topic already added",
          description: "This topic has already been added to the list.",
          variant: "destructive"
        });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (topic: string) => {
    setSelectedTopics(prev => prev.filter(t => t !== topic));
  };

  const getLabelForValue = (value: string) => {
    // Try to find a matching predefined topic label
    const topic = topicOptions.find(t => t.value === value);
    // Return the label if found, otherwise return the value itself (custom tag)
    return topic ? topic.label : value;
  };

  const handleSubmit = () => {
    if (!mainTopic) {
      toast({
        title: "Main topic required",
        description: "Please select a main topic to generate content.",
        variant: "destructive"
      });
      return;
    }
    
    // Generate content with only the main topic if no additional topics are selected
    const topicsToSubmit = selectedTopics.length > 0 ? selectedTopics : [mainTopic];
    onGenerate(topicsToSubmit);
  };

  return (
    <Card className="w-full border-0 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-[#1C242B]">Generate Social Media Content</CardTitle>
        <CardDescription>
          Select your main topic and add any additional topics to customize your social media content.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="main-topic">Main Topic</Label>
          <Select value={mainTopic} onValueChange={handleTopicChange}>
            <SelectTrigger id="main-topic" className="w-full border-[#F2F2F2]">
              <SelectValue placeholder="Select main topic" />
            </SelectTrigger>
            <SelectContent>
              {topicOptions.map(topic => (
                <SelectItem key={topic.value} value={topic.value}>
                  {topic.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Additional Topics (Optional)</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedTopics.map(topic => (
              <div 
                key={topic} 
                className="inline-flex items-center bg-[#F2F2F2] text-[#1C242B] py-1 px-3 rounded-full text-sm"
              >
                {getLabelForValue(topic)}
                <button 
                  onClick={() => handleRemoveTag(topic)} 
                  className="ml-1 p-0.5 hover:bg-[#303030] hover:text-white rounded-full"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input 
              placeholder="Type any topic and press Enter" 
              value={tagInput} 
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button 
              onClick={handleAddTag} 
              variant="outline" 
              className="shrink-0" 
              disabled={tagInput.trim() === ""}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground mt-1">
            Enter any topics relevant to your content. You can add custom topics beyond the suggestions.
          </div>
        </div>

        <Button 
          onClick={handleSubmit} 
          className="w-full bg-[#94C11F] hover:bg-[#1C242B] transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate Content"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContentGeneratorForm;
