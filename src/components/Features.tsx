import { 
  Smartphone, 
  Shield, 
  Map, 
  Zap, 
  BarChart3, 
  UserCheck,
  MapPin,
  Bell
} from "lucide-react";

const Features = () => {
  const citizenFeatures = [
    {
      icon: Smartphone,
      title: "Mobile-First App",
      description: "Easy photo upload, location auto-detect, and voice notes for quick issue reporting on the go."
    },
    {
      icon: MapPin,
      title: "Smart Location",
      description: "GPS auto-tagging ensures accurate location data for faster municipal response and routing."
    },
    {
      icon: Bell,
      title: "Live Notifications", 
      description: "Real-time updates on complaint status, progress tracking, and resolution confirmations."
    },
    {
      icon: UserCheck,
      title: "Complaint Tracking",
      description: "Track your complaint status anytime using your unique registration number and get detailed progress updates."
    }
  ];

  const adminFeatures = [
    {
      icon: Shield,
      title: "Admin Dashboard",
      description: "Comprehensive dashboard to filter issues by category, priority, assign tasks, and update statuses efficiently."
    },
    {
      icon: Zap,
      title: "Automated Routing",
      description: "AI-powered system automatically routes complaints to relevant departments based on issue type and location."
    },
    {
      icon: Map,
      title: "Interactive City Map",
      description: "Live heatmap visualization of civic problems across the city with real-time status updates and analytics."
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Track response times, monitor trends, SLA compliance, and generate comprehensive performance reports."
    }
  ];

  const FeatureGrid = ({ features, title, gridClass }: { features: any[], title: string, gridClass: string }) => (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-center text-gradient">{title}</h3>
      <div className={gridClass}>
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="feature-card group">
              <div className="space-y-4">
                <div className="icon-civic">
                  <Icon size={28} />
                </div>
                <h4 className="text-xl font-semibold text-foreground group-hover:text-primary transition-smooth">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Powerful <span className="text-gradient">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need for efficient civic issue management - from citizen reporting 
            to municipal administration and real-time analytics.
          </p>
        </div>

        <div className="space-y-20">
          {/* Citizen Features */}
          <FeatureGrid 
            features={citizenFeatures}
            title="For Citizens"
            gridClass="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          />

          {/* Admin Features */}
          <FeatureGrid 
            features={adminFeatures}
            title="For Municipal Administrators"
            gridClass="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          />
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-feature rounded-3xl p-8 border border-border shadow-card">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Transform Your City?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join the civic revolution and make your community more responsive, 
              transparent, and efficient than ever before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-hero-primary">
                Try Demo App
              </button>
              <button className="btn-hero-secondary">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;