import { Button } from "@/components/ui/button";
import { Play, Smartphone, Monitor } from "lucide-react";

const Demo = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            See It In <span className="text-gradient">Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the power of Civic Care with our interactive demo. 
            See how citizens and administrators can work together for better cities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Mobile App Preview */}
          <div className="space-y-8">
            <div className="feature-card">
              <div className="flex items-center gap-4 mb-6">
                <div className="icon-civic">
                  <Smartphone size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Citizen Mobile App</h3>
                  <p className="text-muted-foreground">Report issues on the go</p>
                </div>
              </div>
              
              <div className="bg-civic-gray rounded-2xl p-8 mb-6">
                <div className="bg-white rounded-xl p-6 shadow-soft mx-auto max-w-sm">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Report Issue</h4>
                      <div className="w-3 h-3 bg-civic-green rounded-full"></div>
                    </div>
                    <div className="h-32 bg-civic-gray rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">📸 Photo Upload</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-civic-gray rounded w-3/4"></div>
                      <div className="h-3 bg-civic-gray rounded w-1/2"></div>
                    </div>
                    <div className="bg-primary text-white py-2 px-4 rounded-lg text-center text-sm">
                      Submit Report
                    </div>
                  </div>
                </div>
              </div>

              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-civic-green rounded-full"></div>
                  One-click photo capture and upload
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-civic-green rounded-full"></div>
                  Automatic GPS location tagging
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-civic-green rounded-full"></div>
                  Voice note recording capability
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-civic-green rounded-full"></div>
                  Real-time complaint tracking
                </li>
              </ul>
            </div>
          </div>

          {/* Admin Dashboard Preview */}
          <div className="space-y-8">
            <div className="feature-card">
              <div className="flex items-center gap-4 mb-6">
                <div className="icon-civic">
                  <Monitor size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Admin Dashboard</h3>
                  <p className="text-muted-foreground">Manage and resolve efficiently</p>
                </div>
              </div>
              
              <div className="bg-civic-gray rounded-2xl p-6 mb-6">
                <div className="bg-white rounded-xl p-4 shadow-soft">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-sm">Live Dashboard</h4>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-civic-green rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-civic-blue-light p-2 rounded text-center">
                        <div className="font-bold">127</div>
                        <div className="text-muted-foreground">New</div>
                      </div>
                      <div className="bg-yellow-100 p-2 rounded text-center">
                        <div className="font-bold">45</div>
                        <div className="text-muted-foreground">In Progress</div>
                      </div>
                      <div className="bg-civic-green-light p-2 rounded text-center">
                        <div className="font-bold">892</div>
                        <div className="text-muted-foreground">Resolved</div>
                      </div>
                    </div>
                    
                    <div className="h-20 bg-civic-gray rounded flex items-center justify-center text-xs text-muted-foreground">
                      🗺️ Interactive City Map
                    </div>
                  </div>
                </div>
              </div>

              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-civic-green rounded-full"></div>
                  Filter by category, priority, and location
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-civic-green rounded-full"></div>
                  Assign tasks to specific departments
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-civic-green rounded-full"></div>
                  Generate analytics and reports
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-civic-green rounded-full"></div>
                  SLA monitoring and compliance
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Demo CTAs */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button className="btn-hero-primary group">
              <Play size={20} className="mr-2 group-hover:scale-110 transition-smooth" />
              Try Live Demo
            </Button>
            <Button className="btn-hero-secondary group">
              <Monitor size={20} className="mr-2 group-hover:scale-110 transition-smooth" />
              Schedule Walkthrough
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            No signup required • Full feature access • Mobile-responsive
          </p>
        </div>
      </div>
    </section>
  );
};

export default Demo;