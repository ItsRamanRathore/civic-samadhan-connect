import { Button } from './ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="relative">
      <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-12 text-center lg:gap-8">
          <div className="space-y-8">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Civic Samadhan Connect
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Empowering citizens to voice their concerns and connect with local authorities for faster resolution of civic issues.
            </p>
          </div>
          <div className="space-x-4">
            <Button asChild>
              <Link to="/file-complaint">File a Complaint</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/track-complaint">Track Complaint</Link>
            </Button>
          </div>
          <div className="relative w-full">
            <img
              src="/hero-civic-care.jpg"
              alt="Civic Care"
              className="mx-auto rounded-lg object-cover shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero