import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t relative z-50">
      <div className="absolute inset-0 -z-10">
        {/* Hexagon Grid Pattern */}
        <div className="bg-hexagon-pattern-light dark:bg-hexagon-pattern-dark absolute inset-0 -z-10" />
      </div>
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground">Data Hive Studio</h3>
            <p className="text-muted-foreground">
              Empowering businesses with intelligent data management and visualization solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-primary transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/download" className="text-muted-foreground hover:text-primary transition">
                  Download
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Contact</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground">
                Email: dagarabhishek584@gmail.com
              </li>
              <li className="text-muted-foreground">
                Support: dagarabhishek584@gmail.com
              </li>
              <li className="text-muted-foreground">
                Phone: +91 9643501840
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between pt-8 mt-8 border-t md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Data Hive Studio. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter size={20} />
            </Link>
            <Link
              href="https://github.com/abhishek-dagar"
              className="text-muted-foreground hover:text-primary transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={20} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/abhishek-dagar-a97375199/"
              className="text-muted-foreground hover:text-primary transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 