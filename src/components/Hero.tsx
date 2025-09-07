import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-civic-care.jpg";

const Hero = () => {
  return (
    <section className="hero-bg min-h-screen flex items-center justify-center px-4 py-20">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Civic Care
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-medium">
                "New Dawn of Civic Samadhan"
              </p>
            </div>
            
            <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-xl">
              Empowering citizens to report and track civic issues like potholes, broken streetlights, 
              or garbage, while helping local governments respond faster.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/auth">
                <Button className="btn-hero-primary">
                  Get Started
                </Button>
              </Link>
              <Link to="/track-complaint">
                <Button className="btn-hero-secondary">
                  Track Complaint
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="ghost" className="text-white hover:bg-white/10 border border-white/20">
                  Admin Login
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-6 pt-8 text-white/70">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-civic-green rounded-full"></div>
                <span className="text-sm font-medium">Instant Reporting</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-civic-green rounded-full"></div>
                <span className="text-sm font-medium">Real-time Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-civic-green rounded-full"></div>
                <span className="text-sm font-medium">Smart Routing</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-feature">
              <img 
                src={heroImage} 
                alt="Citizens reporting civic issues using mobile technology"
                className="w-full h-auto transform hover:scale-105 transition-smooth"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 flex items-center justify-center bounce-soft">
              <span className="text-2xl">📱</span>
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30 flex items-center justify-center bounce-soft" style={{animationDelay: '0.5s'}}>
              <span className="text-xl">🏙️</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;