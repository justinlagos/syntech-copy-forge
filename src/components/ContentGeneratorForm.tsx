
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  const handleTopicChange = (value: string) => {
    setMainTopic(value);
    if (!selectedTopics.includes(value)) {
      setSelectedTopics([value]);
    }
  };

  const handleTopicCheckboxChange = (topic: string, checked: boolean) => {
    if (checked) {
      setSelectedTopics(prev => [...prev, topic]);
    } else {
      setSelectedTopics(prev => prev.filter(t => t !== topic));
    }
  };

  const handleSubmit = () => {
    if (selectedTopics.length === 0) {
      toast({
        title: "Please select at least one topic",
        description: "You need to select at least one topic to generate content.",
        variant: "destructive"
      });
      return;
    }
    
    onGenerate(selectedTopics);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Generate Social Media Content</CardTitle>
        <CardDescription>
          Select your main topic and any additional topics to include in your social media content.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="main-topic">Main Topic</Label>
          <Select value={mainTopic} onValueChange={handleTopicChange}>
            <SelectTrigger id="main-topic" className="w-full">
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {topicOptions.map(topic => (
              <div key={topic.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={`topic-${topic.value}`}
                  checked={selectedTopics.includes(topic.value)}
                  onCheckedChange={(checked) => 
                    handleTopicCheckboxChange(topic.value, checked as boolean)
                  }
                />
                <label 
                  htmlFor={`topic-${topic.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {topic.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Button 
          onClick={handleSubmit} 
          className="w-full bg-syntech-green hover:bg-syntech-blue"
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate Content"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContentGeneratorForm;
