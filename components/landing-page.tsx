import React from 'react'
import { Button } from './ui/button'
import { ArrowRight, Calendar, Globe, Users } from 'lucide-react'
import { Input } from './ui/input'
import Link from 'next/link'

const LandingPage = () => {
  return (
    <main className="flex-1">
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Your Conference, Your Way
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  List your event or discover amazing conferences. ConferenceHub makes it easy to connect, learn, and
                  grow.
                </p>
              </div>
              <div className="space-x-4">
                <Button>List Your Conference</Button>
                <Button variant="outline">Find Events</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Why Choose ConferenceHub?
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center">
                <Calendar className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Easy Listing</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  List your conference in minutes with our intuitive interface.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Connect with Attendees</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Engage with your audience before, during, and after the event.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Globe className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Global Reach</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Expand your conference's visibility to a worldwide audience.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of organizers and attendees on ConferenceHub today.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Link href="/profile" className="flex justify-center space-x-2">
                  
                  <Button type="submit">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="/terms">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
  )
}

export default LandingPage