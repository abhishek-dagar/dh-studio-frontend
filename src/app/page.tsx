import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download } from 'lucide-react'

export default function Home() {
  return (
    <div className="font-poppins grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 bg-[#0f172a] p-8 pb-20 sm:p-20">
      <Card className="mt-40 w-[800px] bg-[#1e293b] border-none text-white">
        <CardContent className="flex flex-col items-center gap-8 pt-10">
          <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-600/90 text-white">
            Download Linx 🔥
          </Badge>
          
          <h1 className="text-center text-5xl font-[800] tracking-tight">
            Download Linx VPN Software Today!
          </h1>
          
          <p className="text-center text-muted-foreground max-w-[600px]">
            Get instant access to secure browsing and content unblocking by downloading Linx VPN app
          </p>

          <div className="flex gap-4 items-center mt-4 mb-8">
            <Select defaultValue="windows">
              <SelectTrigger className="w-[180px] bg-transparent border-white/20">
                <SelectValue placeholder="Select Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="windows">Windows (64-bit)</SelectItem>
                <SelectItem value="mac">MacOS</SelectItem>
                <SelectItem value="linux">Linux</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-emerald-600 hover:bg-emerald-600/90">
              <Download className="mr-2 h-4 w-4" /> Download VPN
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

