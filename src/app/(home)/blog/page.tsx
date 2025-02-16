"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { StarIcon, Filter } from "lucide-react";
import { useState } from "react";

const prompts = [
  {
    id: 1,
    title: "Creative Story Generator",
    description:
      "Generate engaging short stories with complex characters and plot twists.",
    price: 0.1,
    category: "Creative Writing",
    rating: 4.8,
    seller: "Alice.eth",
  },
  // Add more prompts...
];

export default function Page() {
  const [priceRange, setPriceRange] = useState([0, 1]);

  return (
    <>
      <div className="flex-1 space-y-6">
        <div className="flex items-center gap-4">
          <Input placeholder="Search prompts..." className="max-w-md" />
          <Button>Search</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt) => (
            <Card key={prompt.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex justify-between items-start gap-2">
                  <span>{prompt.title}</span>
                  <Badge variant="secondary">{prompt.category}</Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {prompt.description}
                </p>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-center gap-2">
                  <StarIcon className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm">{prompt.rating}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Seller: {prompt.seller}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-lg font-bold">{prompt.price} ETH</span>
                <Button>View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
