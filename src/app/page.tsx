import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download } from 'lucide-react';
import logo from '../../public/logo.png';
import Image from '../../node_modules/next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-black via-zinc-900 to-black p-8 pb-20 font-poppins">
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#1f2937,transparent)]" />
      {/* Logo container with absolute positioning */}
      <div className="absolute sm:left-40 sm:top-8">
        <Image src={logo} alt="logo" width={50} />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Card className="relative w-[800px] overflow-hidden rounded-2xl border-white/5 bg-zinc-900/80 text-white shadow-2xl shadow-emerald-500/10 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
          <CardContent className="relative flex flex-col items-center gap-8 pt-10">
            <Badge
              variant="default"
              className="animate-pulse bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition-colors "
            >
              Download Data Studio 🔥
            </Badge>

            <h1 className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-center sm:text-4xl text-xl font-[900] tracking-tight text-transparent">
              Download Data Studio Today!
            </h1>

            <p className="sm:text-lg text-xs max-w-[600px] text-center text-zinc-400">
              Get instant access to secure browsing and content unblocking by
              downloading Data Studio app
            </p>

            <div className="mb-8 mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Select defaultValue="windows">
                <SelectTrigger className="w-[180px] border-zinc-700 bg-zinc-800/50 backdrop-blur-sm transition-colors hover:bg-zinc-800">
                  <SelectValue placeholder="Select Platform" />
                </SelectTrigger>
                <SelectContent className="border-zinc-700 bg-zinc-800 text-white">
                  <SelectItem value="windows">Windows (64-bit)</SelectItem>
                  <SelectItem value="mac">MacOS</SelectItem>
                  <SelectItem value="linux">Linux</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:scale-105 hover:from-emerald-500 hover:to-emerald-400 hover:shadow-emerald-500/30">
                <Download className="h-4 w-4" /> Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
