const About = () => {
  return (
    <section className="py-20 px-4 bg-gradient-feature">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              About <span className="text-gradient">Civic Care</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Bridging the gap between citizens and local government through technology
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">The Problem</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Local governments face significant delays in identifying and addressing civic issues 
                  due to lack of proper reporting tools. Citizens often struggle to report problems 
                  effectively, leading to prolonged response times and decreased civic satisfaction.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Our Solution</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Civic Care provides a streamlined, citizen-first mobile application combined with 
                  a powerful government portal. Our platform enables instant issue reporting, 
                  automated routing, and real-time tracking for better civic engagement.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">AI</div>
                  <div className="text-sm text-muted-foreground">Powered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">Real-time</div>
                  <div className="text-sm text-muted-foreground">Updates</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="feature-card">
                <h4 className="text-xl font-semibold text-foreground mb-3">Citizen Registration</h4>
                <p className="text-muted-foreground">
                  Secure user registration system allows citizens to create accounts, 
                  login safely, and file complaints with full tracking capabilities.
                </p>
              </div>

              <div className="feature-card">
                <h4 className="text-xl font-semibold text-foreground mb-3">Complaint Tracking</h4>
                <p className="text-muted-foreground">
                  Every complaint gets a unique registration number for easy tracking. 
                  Citizens can monitor progress, receive updates, and provide feedback.
                </p>
              </div>

              <div className="feature-card">
                <h4 className="text-xl font-semibold text-foreground mb-3">Smart Cities Initiative</h4>
                <p className="text-muted-foreground">
                  Part of the broader smart cities movement, leveraging technology 
                  to create more responsive, efficient, and citizen-centric governance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;