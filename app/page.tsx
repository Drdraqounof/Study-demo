"use client";

import { ArrowRight, Clock, ListChecks, BarChart3, Brain, Sparkles, Database } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              StudyFlow
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all">
              Get Started
            </button>
            <button
              onClick={() => window.location.href = '/questions'}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all"
            >
              Go to Questions
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-3xl -z-10"></div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Built by students, for students
          </div>
          
          <h2 className="text-6xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
            Study Smarter,
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Not Harder
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 mb-4 max-w-3xl mx-auto leading-relaxed">
            The ultimate productivity app for students who struggle with focus, organization, and time management.
          </p>
          
          <p className="text-slate-500 mb-8 max-w-2xl mx-auto">
            Perfect for high schoolers and college students juggling multiple subjects, deadlines, and distractions.
          </p>
          
          <button 
            onClick={() => window.location.href = '/questions'}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            Start Studying Smarter
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full blur-2xl opacity-50 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-200 rounded-full blur-3xl opacity-50 animate-pulse delay-700"></div>
        </div>

        {/* Problem Statement Card */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200/50 p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-50 -z-10"></div>
            
            <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
              The Student Struggle is Real
            </h2>
            
            <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
              <p>
                As students, we face constant challenges: social media notifications pull us away from homework, 
                multiple assignments pile up with conflicting deadlines, and we often don't know where to start 
                or how long we've actually been studying.
              </p>
              <p>
                <strong className="text-slate-900 font-semibold">The result?</strong> Last-minute cramming, all-nighters before exams, 
                forgotten assignments, and the constant stress of feeling behind.
              </p>
              <p>
                <strong className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                  StudyFlow solves this
                </strong> by combining proven productivity 
                techniques with modern task management and progress tracking—all in one place.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-24">
          <h2 className="text-center text-4xl font-bold text-slate-900 mb-4">
            How StudyFlow Helps You Succeed
          </h2>
          <p className="text-center text-slate-600 mb-12 text-lg">
            Everything you need to take control of your studies
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: 'Focus Timer',
                description: 'Use the Pomodoro technique to study in focused 25-minute sessions with built-in breaks.',
                gradient: 'from-indigo-500 to-indigo-600',
                bgColor: 'bg-indigo-50'
              },
              {
                icon: ListChecks,
                title: 'Task Management',
                description: 'Keep track of all your assignments with due dates and subjects in one organized place.',
                gradient: 'from-purple-500 to-purple-600',
                bgColor: 'bg-purple-50'
              },
              {
                icon: BarChart3,
                title: 'Progress Tracking',
                description: 'See exactly how much time you spend on each subject and track your study patterns.',
                gradient: 'from-green-500 to-green-600',
                bgColor: 'bg-green-50'
              },
              {
                icon: Brain,
                title: 'Stay Motivated',
                description: 'Visual feedback and completion stats help you build consistent study habits.',
                gradient: 'from-orange-500 to-orange-600',
                bgColor: 'bg-orange-50'
              },
              {
                icon: Sparkles,
                title: 'AI-Powered Research',
                description: 'Upload images, documents, or files to get instant AI-powered analysis and summaries.',
                gradient: 'from-yellow-500 to-yellow-600',
                bgColor: 'bg-yellow-50'
              },
              {
                icon: Database,
                title: 'Secure Storage',
                description: 'All your notes, tasks, and progress are securely stored and synced using a modern database.',
                gradient: 'from-cyan-500 to-cyan-600',
                bgColor: 'bg-cyan-50'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`} strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who Benefits Section */}
        <div className="max-w-5xl mx-auto mb-24">
          <h2 className="text-center text-4xl font-bold text-slate-900 mb-12">
            Who Will Benefit Most?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'High School Students',
                description: 'Managing 5-7 classes with different homework assignments and test schedules',
                gradient: 'from-indigo-600 to-indigo-700'
              },
              {
                title: 'College Students',
                description: 'Balancing coursework, projects, and part-time jobs while maintaining independence',
                gradient: 'from-purple-600 to-purple-700'
              },
              {
                title: 'Easily Distracted Learners',
                description: 'Anyone who struggles to focus or stay on task for extended periods',
                gradient: 'from-pink-600 to-pink-700'
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${benefit.gradient} rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all`}
              >
                <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-white/90 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur-2xl opacity-20"></div>
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Study Habits?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are studying smarter, not harder
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                Try StudyFlow Now
              </button>
              <button className="px-8 py-4 bg-green-500 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                Feature Page
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}