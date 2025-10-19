import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, MapPinIcon, PhoneIcon, MailIcon, ClockIcon, CheckCircleIcon } from 'lucide-react';
import { Input } from '../components/forms/Input';
import { Textarea } from '../components/forms/Textarea';
import { Select } from '../components/forms/Select';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Form submitted:', formData);
    // Show success message
    setFormSubmitted(true);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    // Hide success message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  const subjectOptions = [
    { value: '', label: 'Select a subject' },
    { value: 'Product Inquiry', label: 'Product Inquiry' },
    { value: 'Order Status', label: 'Order Status' },
    { value: 'Shipping & Delivery', label: 'Shipping & Delivery' },
    { value: 'Returns & Refunds', label: 'Returns & Refunds' },
    { value: 'Subscription Box', label: 'Subscription Box' },
    { value: 'Partnership Opportunity', label: 'Partnership Opportunity' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 text-copy">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm">
        <Link to="/" className="text-copy-lighter hover:text-primary">
          Home
        </Link>
        <ChevronRightIcon size={16} className="mx-2" />
        <span className="text-copy">Contact Us</span>
      </nav>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-copy mb-4">Get In Touch</h1>
          <p className="text-copy-light max-w-2xl mx-auto">
            Have questions about our products, shipping, or anything else? We're here to help. Fill out the form
            below or contact us directly.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Form */}
          <div className="lg:w-2/3">
            <div className="bg-surface rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-copy mb-6">Send Us a Message</h2>
              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <CheckCircleIcon size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Input
                      label="Your Name *"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Your Email *"
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <Select
                      label="Subject *"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      options={subjectOptions}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <Textarea
                      label="Your Message *"
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:w-1/3">
            <div className="bg-surface rounded-lg shadow-sm p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-copy mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <MapPinIcon size={20} className="text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-copy mb-1">Our Location</h3>
                    <p className="text-copy-light">
                      1234 Fashion Street, Suite 567
                      <br />
                      New York, NY 10001
                      <br />
                      United States
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <PhoneIcon size={20} className="text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-copy mb-1">Phone Number</h3>
                    <p className="text-copy-light">
                      Customer Service: (212) 555-1234
                      <br />
                      Wholesale Inquiries: (212) 555-5678
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <MailIcon size={20} className="text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-copy mb-1">Email Address</h3>
                    <p className="text-copy-light">
                      Customer Support:{' '}
                      <a href="mailto:support@banwee.com" className="text-primary hover:underline">
                        support@banwee.com
                      </a>
                      <br />
                      Business Inquiries:{' '}
                      <a href="mailto:info@banwee.com" className="text-primary hover:underline">
                        info@banwee.com
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <ClockIcon size={20} className="text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-copy mb-1">Working Hours</h3>
                    <p className="text-copy-light">
                      Monday - Friday: 9:00 AM - 6:00 PM EST
                      <br />
                      Saturday: 10:00 AM - 4:00 PM EST
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* FAQ Link */}
            <div className="bg-primary/10 rounded-lg p-6">
              <h3 className="font-bold text-copy mb-2">Have a Question?</h3>
              <p className="text-copy-light mb-4">
                Check our frequently asked questions for quick answers to common inquiries.
              </p>
              <Link to="/faq" className="inline-block text-primary hover:underline font-medium">
                View FAQs
              </Link>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12">
          <div className="bg-surface rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-copy mb-6">Find Us</h2>
            <div className="h-80 bg-border rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425872418978!3d40.74076097138946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1685290225594!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Banwee Store Location"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};