import { Button } from "./ui/button"
import { Link } from "react-router-dom"

const Features = () => {
  const features = [
    {
      title: "Easy Complaint Filing",
      description:
        "Submit your civic complaints with our user-friendly interface. Add details, location, and photos to help authorities understand the issue better.",
    },
    {
      title: "Real-time Tracking",
      description:
        "Track the status of your complaints in real-time. Get updates on the progress and resolution of your issues.",
    },
    {
      title: "Interactive Map",
      description:
        "View and report issues on an interactive map. See what problems others have reported in your area.",
    },
    {
      title: "Direct Communication",
      description:
        "Communicate directly with local authorities through our platform. Get updates and provide additional information when needed.",
    },
    {
      title: "Data Analytics",
      description:
        "Access data-driven insights about civic issues in your area. Help authorities identify patterns and prioritize solutions.",
    },
    {
      title: "Mobile Friendly",
      description:
        "File and track complaints on the go with our mobile-responsive design. Access all features from any device.",
    },
  ]

  return (
    <section className="w-full bg-gray-50 py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Features that Empower You
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to report and track civic issues in your community
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-lg border bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="mb-4 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild>
            <Link to="/file-complaint">Start Using Now</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Features