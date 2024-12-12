import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";

const UTMGenerator = () => {
  const [baseUrl, setBaseUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');

  useEffect(() => {
    generateUrl();
  }, [baseUrl, source, medium, campaign, term, content]);

  const generateUrl = () => {
    if (!baseUrl) {
      setGeneratedUrl('');
      return;
    }

    let url = new URL(baseUrl);
    
    if (source) url.searchParams.set('utm_source', source);
    if (medium) url.searchParams.set('utm_medium', medium);
    if (campaign) url.searchParams.set('utm_campaign', campaign);
    if (term) url.searchParams.set('utm_term', term);
    if (content) url.searchParams.set('utm_content', content);

    setGeneratedUrl(url.toString());
  };

  const copyToClipboard = async () => {
    if (!generatedUrl) {
      toast.error("Generate a URL first!");
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedUrl);
      toast.success("URL copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy URL");
    }
  };

  const handleBaseUrlChange = (value: string) => {
    try {
      // Only update if it's a valid URL or empty
      if (value === '' || new URL(value)) {
        setBaseUrl(value);
      }
    } catch (e) {
      // Invalid URL - don't update state
      console.log('Invalid URL entered');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">UTM Generator</h1>
        <p className="text-gray-500">Create tracked URLs for your marketing campaigns</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="baseUrl">Base URL</Label>
          <Input
            id="baseUrl"
            type="url"
            placeholder="https://example.com"
            value={baseUrl}
            onChange={(e) => handleBaseUrlChange(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="source">Campaign Source</Label>
            <Input
              id="source"
              placeholder="google"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medium">Campaign Medium</Label>
            <Input
              id="medium"
              placeholder="cpc"
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="campaign">Campaign Name</Label>
            <Input
              id="campaign"
              placeholder="summer_sale"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="term">Campaign Term</Label>
            <Input
              id="term"
              placeholder="running+shoes"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Campaign Content</Label>
          <Input
            id="content"
            placeholder="logolink"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Generated URL</Label>
          <div className="relative">
            <Input
              value={generatedUrl}
              readOnly
              className="pr-12 font-mono text-sm"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1 h-8 w-8"
              onClick={copyToClipboard}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UTMGenerator;