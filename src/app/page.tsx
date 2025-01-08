import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-black via-zinc-900 to-black font-poppins">
      <div className="relative flex h-screen flex-col overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#1f2937,transparent)]" />
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          )}
        />
        <div className="flex flex-1 flex-col items-center justify-center">
          <Card className="relative w-[800px] overflow-hidden rounded-2xl border-white/5 bg-zinc-900/30 text-white shadow-2xl shadow-emerald-500/10 backdrop-blur-sm">
            {/* <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" /> */}
            <CardContent className="relative flex flex-col items-center gap-8 bg-transparent pt-10">
              <Badge
                variant="default"
                className="animate-pulse bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition-colors"
              >
                Download Data Studio 🔥
              </Badge>
              <h1 className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-center text-xl font-[900] tracking-tight text-transparent sm:text-4xl">
                Download Data Studio Today!
              </h1>
              <p className="max-w-[600px] text-center text-xs text-zinc-400 sm:text-lg">
                Download the Data Studio app to simplify and streamline your
                database management.
              </p>
              <div className="mb-8 mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Select defaultValue="windows">
                  <SelectTrigger className="w-[180px] border-zinc-700 bg-zinc-800/50 backdrop-blur-sm transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                    <SelectValue placeholder="Select Platform" />
                  </SelectTrigger>
                  <SelectContent className="border-zinc-700 bg-zinc-800 text-white">
                    <SelectItem value="windows">Windows (64-bit)</SelectItem>
                    <SelectItem value="mac" disabled>
                      MacOS (coming soon)
                    </SelectItem>
                    <SelectItem value="linux" disabled>
                      Linux (coming soon)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  className="bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:scale-105 hover:from-emerald-500 hover:to-emerald-400 hover:shadow-emerald-500/30"
                  asChild
                >
                  <Link
                    href={
                      "https://github.com/abhishek-dagar/data-hive-studio/releases/download/0.1.0-alpha/Data.Hive.Studio.Setup.0.1.0-alpha.exe"
                    }
                  >
                    <Download className="h-4 w-4" /> Download
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
