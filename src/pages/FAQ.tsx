import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, PlusIcon, MinusIcon, SearchIcon } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);

  // FAQ categories
  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'orders', name: 'Orders & Shipping' },
    { id: 'products', name: 'Products' },
    { id: 'subscription', name: 'Subscription Box' },
    { id: 'returns', name: 'Returns & Refunds' },
    { id: 'account', name: 'Account & Payment' },
  ];

  // FAQ questions and answers
  const faqItems = [
    {
      id: 'faq-550e8400-e29b-41d4-a716-446655440001',
      question: 'How long does shipping take?',
      answer:
        'Standard shipping within the United States takes 3-5 business days. International shipping typically takes 7-14 business days, depending on the destination country and customs processing.',
      category: 'orders',
    },
    {
      id: 'faq-550e8400-e29b-41d4-a716-446655440002',
      question: 'Do you ship internationally?',
      answer:
        'Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. You can see the shipping options available to your country during checkout.',
      category: 'orders',
    },
    {
      id: 'faq-550e8400-e29b-41d4-a716-446655440003',
      question: 'How can I track my order?',
      answer:
        "Once your order ships, you'll receive a tracking number via email. You can also view your order status and tracking information in your account dashboard under \"Order History\".",
      category: 'orders',
    },
    {
      id: 'faq-550e8400-e29b-41d4-a716-446655440004',
      question: 'Are your products organic?',
      answer:
        'Many of our products are certified organic, while others follow organic practices but may not have formal certification due to the costs involved for small producers. Each product page specifies whether the item is certified organic or follows organic practices.',
      category: 'products',
    },
    {
      id: 'faq-550e8400-e29b-41d4-a716-446655440005',
      question: 'Where do your products come from?',
      answer:
        'Our products come from 8 African countries: Ghana, Kenya, Tanzania, Ethiopia, Morocco, South Africa, Rwanda, and Uganda. Each product page provides specific information about the origin and the producers behind the item.',
      category: 'products',
    },
    {
      id: 'faq-550e8400-e29b-41d4-a716-446655440006',
      question: 'How do I know if a product is fair trade?',
      answer:
        'All of our products are sourced through fair trade practices, ensuring producers receive fair compensation. Many items carry official Fair Trade certification, which is noted on the product page.',
      category: 'products',
    },
    {
      id: 'faq-550e8400-e29b-41d4-a716-446655440007',
      question: 'What comes in the subscription box?',
      answer:
        'Each monthly subscription box contains 4-6 premium African products, which may include food items, skincare products, home goods, and seasonal specialties. The exact contents vary each month to provide a diverse experience.',
      category: 'subscription',
    },
    {
      id: 'faq-550e8400-e29b-41d4-a716-446655440008',
      question: 'Can I skip a month or cancel my subscription?',
      answer:
        'Yes, you can skip a month or cancel your subscription anytime from your account dashboard. To skip a month, make the change before the 1st of the month. There are no fees for skipping or canceling.',
      category: 'subscription',
    },
    {
      id: 'faq-550e8400-e29b-41d4-a716-446655440009',
      question: 'When does my subscription box ship?',
      answer:
        'Subscription boxes ship on the 5th of each month. New subscriptions placed after the 1st will begin the following month.',
      category: 'subscription',
    },
    {
      id: 'faq-550e8400-e29b-41d4-a716-446655440010',
      question: 'What is your return policy?',
      answer:
        'We accept returns of unused, unopened items within 30 days of delivery. Food items and personal care products that have been opened cannot be returned for health and safety reasons. Please contact our customer service team to initiate a return.',
      category: 'returns',
    },
    {
      id: 'faq-550e8400-e29b-41d4-a716-446655440011',
      question: 'How do I request a refund?',
      answer:
        'To request a refund, please contact our customer service team at support@banwee.com with your order number and reason for the refund. Approved refunds are processed within 5-7 business days to your original payment method.',
      category: 'returns',
    },
    {
      id: 'faq-550e8400-e29b-41d4-a716-446655440012',
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and Apple Pay. For subscription orders, we require a credit card or PayPal account.',
      category: 'account',
    },
    {
      id: 'faq-550e8400-e29b-41d4-a716-446655440013',
      question: 'How do I update my account information?',
      answer:
        'You can update your account information, including shipping address, payment methods, and communication preferences, by logging into your account and navigating to the "Account Settings" section.',
      category: 'account',
    },
    {
      id: 'faq-550e8400-e29b-41d4-a716-446655440014',
      question: 'Is my personal information secure?',
      answer:
        'Yes, we take data security seriously. We use industry-standard encryption for all transactions and never store complete credit card information on our servers. Our privacy policy details how we collect, use, and protect your personal information.',
      category: 'account',
    },
  ];

  // Toggle question open/closed
  const toggleQuestion = (id: string) => {
    if (openQuestions.includes(id)) {
      setOpenQuestions(openQuestions.filter((qId) => qId !== id));
    } else {
      setOpenQuestions([...openQuestions, id]);
    }
  };

  // Filter questions based on search term and active category
  const filteredQuestions = faqItems.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8 text-copy">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm">
        <Link to="/" className="text-copy-lighter hover:text-primary">
          Home
        </Link>
        <ChevronRightIcon size={16} className="mx-2" />
        <span className="text-copy">Frequently Asked Questions</span>
      </nav>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-copy mb-4">Frequently Asked Questions</h1>
          <p className="text-copy-light max-w-2xl mx-auto">
            Find answers to common questions about our products, shipping, returns, and more. Can't find what you're
            looking for? Contact our support team.
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for questions..."
              className="w-full px-4 py-3 pl-12 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-copy-lighter" />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-surface text-copy hover:bg-border'
                }`}
                onClick={() => setActiveCategory(category.id)}>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((item) => (
              <div key={item.id} className="bg-surface rounded-lg shadow-sm border border-border-light overflow-hidden">
                <button
                  className="flex justify-between items-center w-full p-6 text-left"
                  onClick={() => toggleQuestion(item.id)}>
                  <h3 className="font-medium text-copy text-lg">{item.question}</h3>
                  {openQuestions.includes(item.id) ? (
                    <MinusIcon size={20} className="text-primary flex-shrink-0" />
                  ) : (
                    <PlusIcon size={20} className="text-primary flex-shrink-0" />
                  )}
                </button>
                {openQuestions.includes(item.id) && (
                  <div className="px-6 pb-6">
                    <div className="pt-2 border-t border-border-light">
                      <p className="text-copy-light mt-4">{item.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-surface rounded-lg shadow-sm">
              <div className="mx-auto w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4">
                <SearchIcon size={24} className="text-copy-lighter" />
              </div>
              <h3 className="text-lg font-medium text-copy mb-2">No results found</h3>
              <p className="text-copy-light">
                Try adjusting your search or filter to find what you're looking for
              </p>
            </div>
          )}
        </div>

        {/* Contact section */}
        <div className="mt-16 bg-primary/10 rounded-lg p-6 md:p-8 text-center">
          <h2 className="text-xl font-bold text-copy mb-4">Still have questions?</h2>
          <p className="text-copy-light mb-6 max-w-md mx-auto">
            If you couldn't find the answer you were looking for, our support team is here to help.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};