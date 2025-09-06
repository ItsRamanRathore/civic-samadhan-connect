import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold">Civic Care</h3>
              <p className="text-white/70 text-sm">"New Dawn of Civic Samadhan"</p>
            </div>
            <p className="text-white/80 leading-relaxed">
              Built for smarter cities and better civic engagement. 
              Empowering communities through technology.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-smooth">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-smooth">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-smooth">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-smooth">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-white/70 hover:text-white transition-smooth">Home</a></li>
              <li><a href="#features" className="text-white/70 hover:text-white transition-smooth">Features</a></li>
              <li><a href="#how-it-works" className="text-white/70 hover:text-white transition-smooth">How It Works</a></li>
              <li><a href="#about" className="text-white/70 hover:text-white transition-smooth">About</a></li>
              <li><a href="#demo" className="text-white/70 hover:text-white transition-smooth">Demo</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-white transition-smooth">Citizen Portal</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-smooth">Admin Dashboard</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-smooth">Mobile App</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-smooth">Analytics</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-smooth">Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <span className="text-white/80 text-sm">support@civiccare.gov</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <span className="text-white/80 text-sm">1800-CIVIC-CARE</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-primary" />
                <span className="text-white/80 text-sm">Smart City Initiative Office</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-4">
              <h5 className="font-semibold mb-3">Stay Updated</h5>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary transition-smooth"
                />
                <button className="px-4 py-2 bg-primary rounded-lg hover:bg-primary/80 transition-smooth">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/70 text-sm">
            © 2024 Civic Care. All rights reserved. Built for smarter cities and better civic engagement.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/70 hover:text-white transition-smooth">Privacy Policy</a>
            <a href="#" className="text-white/70 hover:text-white transition-smooth">Terms of Service</a>
            <a href="#" className="text-white/70 hover:text-white transition-smooth">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;