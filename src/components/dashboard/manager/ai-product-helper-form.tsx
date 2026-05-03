"use client";

import { useState } from "react";
import { z } from "zod";
import {
  Bot,
  Copy,
  Loader2,
  Sparkles,
  Tags,
  WandSparkles,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useGenerateProductSuggestions } from "@/hooks/use-ai";
import type { AiProductSuggestion } from "@/services/ai.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const aiHelperSchema = z.object({
  rawIdea: z
    .string()
    .min(10, "Product idea must be at least 10 characters")
    .max(500, "Product idea must not exceed 500 characters"),
  category: z.string().optional(),
  targetAudience: z.string().optional(),
  qualityLevel: z.enum(["budget", "mid-range", "premium"]),
});

type AiHelperFormValues = z.infer<typeof aiHelperSchema>;

const copyText = async (text: string, label: string) => {
  await navigator.clipboard.writeText(text);
  toast.success(`${label} copied`);
};

export function AiProductHelperForm() {
  const [suggestion, setSuggestion] = useState<AiProductSuggestion | null>(null);
  const generateMutation = useGenerateProductSuggestions();

  const form = useForm<AiHelperFormValues>({
    resolver: zodResolver(aiHelperSchema),
    defaultValues: {
      rawIdea: "",
      category: "",
      targetAudience: "",
      qualityLevel: "mid-range",
    },
  });

  const onSubmit = async (values: AiHelperFormValues) => {
    const response = await generateMutation.mutateAsync(values);
    setSuggestion(response.data ?? null);
  };

  const fillDemoIdea = () => {
    form.reset({
      rawIdea:
        "A wireless gaming mouse with RGB lighting, long battery life, ergonomic grip, fast response time, and adjustable DPI for competitive gamers.",
      category: "Electronics",
      targetAudience: "Gamers and students",
      qualityLevel: "mid-range",
    });
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-[2.5rem] p-8">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground">
          <Bot className="h-4 w-4" />
          AI Product Helper
        </p>

        <h1 className="text-gradient text-4xl font-semibold tracking-tight md:text-5xl">
          Generate better product listings with AI.
        </h1>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Describe your product idea and let NexaCart AI suggest a name,
          descriptions, price, tags, and specifications.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="glass rounded-[2.5rem] p-6 md:p-8">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-semibold">Product idea</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Give the AI enough context for better suggestions.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              className="rounded-full bg-background/50"
              onClick={fillDemoIdea}
            >
              Demo idea
            </Button>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="rawIdea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raw product idea</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="min-h-40 rounded-[1.5rem] bg-background/60 p-5"
                        placeholder="Describe your product idea..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category context</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-12 rounded-full bg-background/60 px-5"
                          placeholder="Electronics"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target audience</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-12 rounded-full bg-background/60 px-5"
                          placeholder="Gamers, students, remote workers"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="qualityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quality level</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="h-12 rounded-full bg-background/60">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="budget">Budget</SelectItem>
                        <SelectItem value="mid-range">Mid-range</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="h-12 rounded-full px-8"
                disabled={generateMutation.isPending}
              >
                {generateMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <WandSparkles className="mr-2 h-4 w-4" />
                )}
                Generate Suggestions
              </Button>
            </form>
          </Form>
        </div>

        <div className="glass rounded-[2.5rem] p-6 md:p-8">
          {!suggestion ? (
            <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Sparkles className="h-8 w-8 text-muted-foreground" />
              </div>

              <h2 className="text-2xl font-semibold">AI output will appear here</h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Generate a product idea to get polished copy, price suggestions,
                tags, and specifications.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Suggested product name
                  </p>
                  <h2 className="text-3xl font-semibold">
                    {suggestion.suggestedName}
                  </h2>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-background/50"
                  onClick={() =>
                    copyText(suggestion.suggestedName, "Product name")
                  }
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </div>

              <div className="rounded-[1.5rem] border border-border bg-background/50 p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-semibold">Short description</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                    onClick={() =>
                      copyText(
                        suggestion.shortDescription,
                        "Short description"
                      )
                    }
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <p className="leading-7 text-muted-foreground">
                  {suggestion.shortDescription}
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-border bg-background/50 p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-semibold">Full description</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                    onClick={() =>
                      copyText(suggestion.description, "Full description")
                    }
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <p className="leading-7 text-muted-foreground">
                  {suggestion.description}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-border bg-background/50 p-5">
                  <p className="text-sm text-muted-foreground">
                    Suggested price
                  </p>
                  <p className="mt-2 text-3xl font-semibold">
                    ${Number(suggestion.suggestedPrice).toFixed(2)}
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-border bg-background/50 p-5">
                  <p className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <Tags className="h-4 w-4" />
                    Tags
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {suggestion.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="rounded-full bg-background/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-border bg-background/50 p-5">
                <h3 className="mb-4 font-semibold">Specifications</h3>

                <div className="grid gap-3 sm:grid-cols-2">
                  {suggestion.specifications.map((specification) => (
                    <div
                      key={`${specification.name}-${specification.value}`}
                      className="rounded-2xl border border-border bg-background/50 p-4"
                    >
                      <p className="text-sm text-muted-foreground">
                        {specification.name}
                      </p>
                      <p className="mt-1 font-medium">
                        {specification.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="rounded-full bg-background/50"
                onClick={() =>
                  copyText(
                    JSON.stringify(suggestion, null, 2),
                    "Full AI suggestion"
                  )
                }
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy full suggestion
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}