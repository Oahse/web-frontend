import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, CheckIcon } from 'lucide-react';

export const Subscription: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const plans = {
    monthly: {
      price: 39.99,
      savings: '0%',
      period: 'month',
      shipping: 'Free shipping',
      features: ['4-6 African products each month', 'Detailed product information cards', 'Cancel anytime', 'Monthly newsletter']
    },
    quarterly: {
      price: 37.99,
      savings: '5%',
      period: 'month',
      shipping: 'Free shipping + priority delivery',
      features: ['4-6 African products each month', 'Detailed product information cards', 'Exclusive seasonal products', 'Quarterly special gift', 'Cancel anytime', 'Monthly newsletter']
    },
    yearly: {
      price: 33.99,
      savings: '15%',
      period: 'month',
      shipping: 'Free shipping + priority delivery',
      features: ['4-6 African products each month', 'Detailed product information cards', 'Exclusive seasonal products', 'Quarterly special gift', 'Annual premium gift box', 'Cancel anytime', 'Monthly newsletter', 'Early access to new products']
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-copy">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm">
        <Link to="/" className="text-copy-lighter hover:text-primary">
          Home
        </Link>
        <ChevronRightIcon size={16} className="mx-2" />
        <span className="text-copy">Subscription Box</span>
      </nav>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-copy mb-4">Banwee Subscription Box</h1>
          <p className="text-lg text-copy-light max-w-2xl mx-auto">
            Discover the best of Africa delivered to your doorstep monthly. Each box contains premium, ethically-sourced
            products.
          </p>
        </div>

        {/* Subscription Box Preview */}
        <div className="bg-surface rounded-lg shadow-md overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Banwee Subscription Box"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-copy mb-4">What's Inside?</h2>
              <p className="text-copy-light mb-6">
                Each month, we curate 4-6 premium products from across Africa, including:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckIcon size={20} className="text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Organic skincare products</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon size={20} className="text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Gourmet foods and spices</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon size={20} className="text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Handcrafted home goods</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon size={20} className="text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Artisanal teas and coffees</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon size={20} className="text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Seasonal specialty items</span>
                </li>
              </ul>
              <p className="text-copy-light mb-6">
                Each box includes detailed information about the products, their origins, and the artisans who created
                them.
              </p>
              <div className="bg-primary/10 p-4 rounded-md">
                <p className="text-primary font-medium">
                  Your subscription directly supports over 1,000 African artisans and farmers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Plan Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-copy mb-6 text-center">Choose Your Plan</h2>
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-background rounded-lg">
              <button
                className={`px-6 py-2 rounded-md ${
                  selectedPlan === 'monthly' ? 'bg-primary text-white' : 'text-copy hover:bg-border'
                }`}
                onClick={() => setSelectedPlan('monthly')}>
                Monthly
              </button>
              <button
                className={`px-6 py-2 rounded-md ${
                  selectedPlan === 'quarterly' ? 'bg-primary text-white' : 'text-copy hover:bg-border'
                }`}
                onClick={() => setSelectedPlan('quarterly')}>
                Quarterly
              </button>
              <button
                className={`px-6 py-2 rounded-md ${
                  selectedPlan === 'yearly' ? 'bg-primary text-white' : 'text-copy hover:bg-border'
                }`}
                onClick={() => setSelectedPlan('yearly')}>
                Yearly
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Monthly Plan */}
            <div
              className={`bg-surface rounded-lg shadow-md p-6 border-2 ${
                selectedPlan === 'monthly' ? 'border-primary' : 'border-transparent'
              }`}>
              <h3 className="text-xl font-bold text-copy mb-2">Monthly Plan</h3>
              <div className="flex items-end mb-4">
                <span className="text-3xl font-bold text-primary">${plans.monthly.price}</span>
                <span className="text-copy-light ml-1">/{plans.monthly.period}</span>
              </div>
              <p className="text-sm text-copy-light mb-4">Billed monthly</p>
              <p className="font-medium text-copy mb-2">{plans.monthly.shipping}</p>
              <ul className="space-y-2 mb-6">
                {plans.monthly.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm text-copy-light">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2 rounded-md ${
                  selectedPlan === 'monthly'
                    ? 'bg-primary text-white'
                    : 'bg-background text-copy hover:bg-border'
                }`}
                onClick={() => setSelectedPlan('monthly')}>
                {selectedPlan === 'monthly' ? 'Selected' : 'Select Plan'}
              </button>
            </div>

            {/* Quarterly Plan */}
            <div
              className={`bg-surface rounded-lg shadow-md p-6 border-2 ${
                selectedPlan === 'quarterly' ? 'border-primary' : 'border-transparent'
              }`}>
              <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium inline-block mb-3">
                Popular Choice
              </div>
              <h3 className="text-xl font-bold text-copy mb-2">Quarterly Plan</h3>
              <div className="flex items-end mb-4">
                <span className="text-3xl font-bold text-primary">${plans.quarterly.price}</span>
                <span className="text-copy-light ml-1">/{plans.quarterly.period}</span>
              </div>
              <p className="text-sm text-copy-light mb-1">Billed quarterly</p>
              <p className="text-sm text-green-600 mb-4">Save {plans.quarterly.savings}</p>
              <p className="font-medium text-copy mb-2">{plans.quarterly.shipping}</p>
              <ul className="space-y-2 mb-6">
                {plans.quarterly.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm text-copy-light">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2 rounded-md ${
                  selectedPlan === 'quarterly'
                    ? 'bg-primary text-white'
                    : 'bg-background text-copy hover:bg-border'
                }`}
                onClick={() => setSelectedPlan('quarterly')}>
                {selectedPlan === 'quarterly' ? 'Selected' : 'Select Plan'}
              </button>
            </div>

            {/* Yearly Plan */}
            <div
              className={`bg-surface rounded-lg shadow-md p-6 border-2 ${
                selectedPlan === 'yearly' ? 'border-primary' : 'border-transparent'
              }`}>
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium inline-block mb-3">
                Best Value
              </div>
              <h3 className="text-xl font-bold text-copy mb-2">Yearly Plan</h3>
              <div className="flex items-end mb-4">
                <span className="text-3xl font-bold text-primary">${plans.yearly.price}</span>
                <span className="text-copy-light ml-1">/{plans.yearly.period}</span>
              </div>
              <p className="text-sm text-copy-light mb-1">Billed yearly</p>
              <p className="text-sm text-green-600 mb-4">Save {plans.yearly.savings}</p>
              <p className="font-medium text-copy mb-2">{plans.yearly.shipping}</p>
              <ul className="space-y-2 mb-6">
                {plans.yearly.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm text-copy-light">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2 rounded-md ${
                  selectedPlan === 'yearly'
                    ? 'bg-primary text-white'
                    : 'bg-background text-copy hover:bg-border'
                }`}
                onClick={() => setSelectedPlan('yearly')}>
                {selectedPlan === 'yearly' ? 'Selected' : 'Select Plan'}
              </button>
            </div>
          </div>
        </div>

        {/* Subscribe Button */}
        <div className="text-center">
          <Link
            to="/checkout?subscription=true"
            className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-md font-medium transition-colors">
            Subscribe Now
          </Link>
          <p className="text-sm text-copy-light mt-2">No commitment. Cancel anytime.</p>
        </div>

        {/* FAQs */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-copy mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-surface rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-copy mb-2">When will my box ship?</h3>
              <p className="text-copy-light">
                Subscription boxes ship on the 5th of each month. New subscriptions placed after the 1st will begin the
                following month.
              </p>
            </div>
            <div className="bg-surface rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-copy mb-2">Can I skip a month?</h3>
              <p className="text-copy-light">
                Yes! You can easily skip a month from your account dashboard. Just make sure to do so before the 1st of
                the month.
              </p>
            </div>
            <div className="bg-surface rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-copy mb-2">How do I cancel my subscription?</h3>
              <p className="text-copy-light">
                You can cancel your subscription anytime from your account settings. There are no cancellation fees or
                hidden charges.
              </p>
            </div>
            <div className="bg-surface rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-copy mb-2">Can I customize my box?</h3>
              <p className="text-copy-light">
                While our standard boxes are curated experiences, subscribers can set preferences (e.g., dietary
                restrictions) from their account dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-copy mb-8 text-center">What Our Subscribers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface rounded-lg shadow-sm p-6">
              <div className="flex text-yellow-400 mb-3">{'★'.repeat(5)}</div>
              <p className="text-copy-light mb-4 italic">
                "I've been a subscriber for 6 months now, and each box is a delightful surprise. The quality of the
                products is exceptional, and I love learning about their origins."
              </p>
              <div className="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/women/12.jpg"
                  alt="Customer"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium text-copy">Sarah T.</p>
                  <p className="text-xs text-copy-light">Subscriber since 2023</p>
                </div>
              </div>
            </div>
            <div className="bg-surface rounded-lg shadow-sm p-6">
              <div className="flex text-yellow-400 mb-3">{'★'.repeat(5)}</div>
              <p className="text-copy-light mb-4 italic">
                "The yearly subscription is such great value. I especially love the quarterly special gifts. The shea
                butter from Ghana completely transformed my skincare routine!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Customer"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium text-copy">Michael R.</p>
                  <p className="text-xs text-copy-light">Subscriber since 2022</p>
                </div>
              </div>
            </div>
            <div className="bg-surface rounded-lg shadow-sm p-6">
              <div className="flex text-yellow-400 mb-3">{'★'.repeat(5)}</div>
              <p className="text-copy-light mb-4 italic">
                "I love the story behind each product. It's not just about getting nice things, but also about
                supporting artisans and sustainable practices. The coffee from Tanzania was amazing!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/women/45.jpg"
                  alt="Customer"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium text-copy">Jessica L.</p>
                  <p className="text-xs text-copy-light">Subscriber since 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};