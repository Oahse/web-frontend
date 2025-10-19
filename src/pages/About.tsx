import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, CheckIcon } from 'lucide-react';

export const About: React.FC = () => {
  // Team members data
  const teamMembers = [
    {
      name: 'Amara Okafor',
      position: 'Founder & CEO',
      bio: 'Amara founded Banwee with a vision to connect African producers with global markets while ensuring fair compensation and sustainable practices.',
      image: 'https://randomuser.me/api/portraits/women/23.jpg',
    },
    {
      name: 'David Mensah',
      position: 'Chief Operating Officer',
      bio: 'David oversees day-to-day operations and our partnerships with producer cooperatives across Africa.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Fatima Diallo',
      position: 'Head of Sustainability',
      bio: 'Fatima ensures that all our products and practices meet the highest standards of environmental and social responsibility.',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    {
      name: 'Michael Osei',
      position: 'Product Director',
      bio: 'Michael leads our product curation team, discovering exceptional African products and bringing them to our customers.',
      image: 'https://randomuser.me/api/portraits/men/67.jpg',
    },
  ];

  // Values data
  const values = [
    { title: 'Quality', description: 'We curate only the finest products that meet our rigorous standards for excellence.' },
    { title: 'Sustainability', description: 'Environmental stewardship guides every decision we make, from sourcing to packaging.' },
    { title: 'Fair Trade', description: 'We ensure producers receive fair compensation and work in safe, ethical conditions.' },
    { title: 'Transparency', description: 'We share the complete story behind each product, from origin to impact.' },
    { title: 'Community', description: 'We invest in the communities we work with through education and infrastructure.' },
    { title: 'Innovation', description: 'We continuously seek new ways to showcase African excellence to the world.' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 text-copy">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm">
        <Link to="/" className="text-copy-lighter hover:text-primary">
          Home
        </Link>
        <ChevronRightIcon size={16} className="mx-2" />
        <span className="text-copy">About Us</span>
      </nav>

      {/* Hero Section */}
      <div className="relative mb-16">
        <div className="h-[300px] md:h-[400px] w-full">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1595356161904-6708c97be89c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
            alt="African farmers working in a field"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h1>
              <p className="text-lg">
                Connecting African producers with global markets through ethical, sustainable, and transparent trade.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-copy mb-4">Our Mission & Vision</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-copy mb-4">Our Mission</h3>
            <p className="text-copy-light mb-4">
              Banwee exists to create sustainable economic opportunities for African producers by connecting them with
              global markets through ethical trade practices.
            </p>
            <p className="text-copy-light">
              We are committed to ensuring that our producers receive fair compensation, work in safe conditions, and
              can invest in their communities and futures.
            </p>
          </div>
          <div className="bg-surface p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-copy mb-4">Our Vision</h3>
            <p className="text-copy-light mb-4">
              We envision a world where African products are recognized globally for their exceptional quality and where
              the people who create them prosper through fair and direct trade relationships.
            </p>
            <p className="text-copy-light">
              We believe in a future where sustainability and profitability go hand in hand, creating lasting positive
              impact for all stakeholders.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-copy mb-4">The Banwee Journey</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
        </div>
        <div className="bg-surface p-8 rounded-lg shadow-sm">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-copy mb-3">The Beginning</h3>
            <p className="text-copy-light mb-4">
              Banwee began in 2019 when our founder, Amara Okafor, returned to her ancestral home in Ghana and
              witnessed the incredible quality of local products that struggled to reach international markets.
            </p>
            <p className="text-copy-light">
              Recognizing both the exceptional craftsmanship and the economic challenges faced by producers, Amara set
              out to create a bridge between these skilled artisans and global consumers seeking authentic,
              sustainable products.
            </p>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-bold text-copy mb-3">Growth & Impact</h3>
            <p className="text-copy-light mb-4">
              What started with a single cooperative of women producing shea butter has grown into partnerships with
              over 25 producer groups across 8 African countries. Today, Banwee offers a diverse range of products,
              from gourmet foods to skincare to home goods.
            </p>
            <p className="text-copy-light">
              Along the way, we've remained committed to our core values of fair trade, sustainability, and
              transparency. Every product tells a story, and we ensure that the story includes fair compensation,
              sustainable practices, and community investment.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-copy mb-3">Looking Forward</h3>
            <p className="text-copy-light mb-4">
              As we continue to grow, we're expanding our impact through educational initiatives, infrastructure
              development, and increased market access for our producer partners.
            </p>
            <p className="text-copy-light">
              We're also innovating in sustainable packaging, carbon-neutral shipping, and digital traceability to
              ensure that our environmental footprint remains as positive as our social impact.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-copy mb-4">Our Values</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <div key={index} className="flex">
              <div className="mr-4 mt-1">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckIcon size={16} className="text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-copy mb-2">{value.title}</h3>
                <p className="text-copy-light">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Team */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-copy mb-4">Meet Our Team</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-copy-light max-w-2xl mx-auto">
            Our diverse team brings together expertise in sustainable development, international trade, product
            curation, and community building.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-surface rounded-lg shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/3">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 sm:w-2/3">
                  <h3 className="font-bold text-copy text-lg mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.position}</p>
                  <p className="text-copy-light">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Stats */}
      <div className="bg-primary/10 py-12 mb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-copy mb-4">Our Impact</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1,000+</div>
              <p className="text-copy-light font-medium">Producers Supported</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">8</div>
              <p className="text-copy-light font-medium">African Countries</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">12</div>
              <p className="text-copy-light font-medium">Community Projects</p>
            </div>
          </div>
        </div>
      </div>

      {/* Join Us CTA */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-copy mb-4">Join Our Journey</h2>
        <p className="text-copy-light mb-6 max-w-2xl mx-auto">
          Be part of our mission to support sustainable development in Africa while enjoying exceptional products with
          authentic stories.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/products"
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors">
            Shop Our Products
          </Link>
          <Link
            to="/subscription"
            className="bg-surface border border-primary text-primary hover:bg-primary/5 px-6 py-3 rounded-md transition-colors">
            Subscribe Monthly
          </Link>
        </div>
      </div>
    </div>
  );
};