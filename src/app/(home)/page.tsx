import {
  ArrowRight,
  BarChart2,
  Globe2,
  LineChart,
  TrendingUp,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-24">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Make Your Trading{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                    Exceptional
                  </span>
                </h1>
                <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                  Achieve precision and confidence in your trades with our
                  advanced technical indicator. Experience up to 95% accuracy
                  across multiple markets.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gap-2">
                  Start Trading <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  View Demo
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8">
                <div className="space-y-2">
                  <h4 className="text-4xl font-bold text-primary">95%</h4>
                  <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-4xl font-bold text-primary">24/7</h4>
                  <p className="text-sm text-muted-foreground">
                    Market Coverage
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-4xl font-bold text-primary">10k+</h4>
                  <p className="text-sm text-muted-foreground">
                    Active Traders
                  </p>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-3xl" />
              <div className="relative bg-card rounded-2xl border p-6 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold">Ved Indicator Signal</h3>
                      <p className="text-sm text-muted-foreground">
                        Real-time market analysis
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Live Demo
                    </Button>
                  </div>
                  <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 flex items-center justify-center">
                    <BarChart2 className="h-24 w-24 text-primary/40" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="space-y-2">
                        <div className="h-2 rounded-full bg-primary/20" />
                        <div className="h-2 w-2/3 rounded-full bg-muted" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="markets" className="bg-muted/50 py-24">
        <div className="container space-y-12">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
            Markets We Cover
          </h2>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 space-y-2">
                <BarChart2 className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Forex Markets</h3>
                <p className="text-sm text-muted-foreground">
                  Trade major, minor, and exotic currency pairs with confidence
                  using our precise signals.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-2">
                <LineChart className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Indian Markets</h3>
                <p className="text-sm text-muted-foreground">
                  Get accurate signals for Nifty, Bank Nifty, and other Indian
                  market instruments.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-2">
                <Globe2 className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Global Markets</h3>
                <p className="text-sm text-muted-foreground">
                  Access signals for commodities, indices, and cryptocurrency
                  markets worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="demo" className="py-24">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              See It In Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-[42rem] mx-auto">
              Watch how the Ved Indicator provides precise trading signals in
              real-time market conditions.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
