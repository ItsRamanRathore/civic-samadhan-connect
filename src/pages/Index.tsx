import Hero from '../components/Hero'
import About from '../components/About'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Demo from '../components/Demo'
import Footer from '../components/Footer'

const Index = () => {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <Demo />
      <Footer />
    </main>
  )
}

export default Index