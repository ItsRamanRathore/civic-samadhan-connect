import { Camera, MapPin, Bell, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Camera,
      title: "Report Issue",
      description: "Citizens click 'Report Issue' → add photo, location (auto-tag), description/voice note",
      step: "01"
    },
    {
      icon: MapPin,
      title: "Smart Routing", 
      description: "System routes issue to relevant department automatically using AI-powered categorization",
      step: "02"
    },
    {
      icon: Bell,
      title: "Real-time Updates",
      description: "Municipal staff update status → citizen gets instant notifications and progress tracking",
      step: "03"
    },
    {
      icon: CheckCircle,
      title: "Resolution Tracking",
      description: "Resolved issues appear on live city map with completion details and citizen feedback",
      step: "04"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-feature">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A streamlined process that connects citizens with their local government 
            for faster issue resolution and better civic engagement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="step-card">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="icon-civic">
                      <Icon size={28} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-primary bg-accent px-2 py-1 rounded-full">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-smooth">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Flow Visual */}
        <div className="hidden lg:flex justify-center items-center mt-12 gap-8">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              {index < steps.length - 1 && (
                <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;