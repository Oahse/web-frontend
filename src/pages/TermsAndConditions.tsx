import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';

export const TermsAndConditions: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-copy">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm">
        <Link to="/" className="text-copy-lighter hover:text-primary">
          Home
        </Link>
        <ChevronRightIcon size={16} className="mx-2" />
        <span className="text-copy">Terms & Conditions</span>
      </nav>

      <div className="max-w-4xl mx-auto bg-surface p-8 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-main mb-6">Terms & Conditions</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-main mb-4">1. Introduction</h2>
          <p className="text-copy-light mb-4">
            Welcome to Banwee. These Terms and Conditions govern your use of our website and the purchase of any
            products from us. By accessing or using our website, you agree to be bound by these Terms and Conditions
            and our Privacy Policy.
          </p>
          <p className="text-copy-light">
            Please read these Terms carefully before using our services. If you do not agree with any part of these
            Terms, you must not use our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-main mb-4">2. Intellectual Property</h2>
          <p className="text-copy-light mb-4">
            All content on this website, including text, graphics, logos, images, and software, is the property of
            Banwee or its content suppliers and is protected by international copyright laws.
          </p>
          <p className="text-copy-light">
            You may not reproduce, distribute, modify, display, or create derivative works from any content on this
            site without our prior written consent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-main mb-4">3. Product Information</h2>
          <p className="text-copy-light mb-4">
            We strive to ensure that all product descriptions, images, and prices displayed on our website are
            accurate. However, we do not guarantee that they are error-free, complete, or current. We reserve the
            right to correct any errors, inaccuracies, or omissions and to change or update information at any time
            without prior notice.
          </p>
          <p className="text-copy-light">
            All products are subject to availability, and we cannot guarantee that items will be in stock.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-main mb-4">4. Orders and Payments</h2>
          <p className="text-copy-light mb-4">
            By placing an order through our website, you warrant that you are legally capable of entering into binding
            contracts. All orders are subject to acceptance by us. We will confirm acceptance by sending you an email
            confirming that the product has been dispatched.
          </p>
          <p className="text-copy-light">
            Payment must be made in full before dispatch of products. We accept various payment methods as indicated
            on our website. Prices are subject to change without notice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-main mb-4">5. Shipping and Delivery</h2>
          <p className="text-copy-light mb-4">
            We aim to dispatch products within the estimated delivery times. However, delivery times are estimates
            only and we are not responsible for any delays caused by third-party shipping carriers.
          </p>
          <p className="text-copy-light">
            Risk of loss and title for items purchased from us pass to you upon our delivery to the carrier.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-main mb-4">6. Returns and Refunds</h2>
          <p className="text-copy-light mb-4">
            Our returns and refunds policy is detailed separately on our website. Please refer to that policy for
            information on how to return products and receive refunds.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-main mb-4">7. Limitation of Liability</h2>
          <p className="text-copy-light mb-4">
            To the fullest extent permitted by law, Banwee shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or
            indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your
            access to or use of or inability to access or use the website; (b) any conduct or content of any third
            party on the website; (c) any content obtained from the website; and (d) unauthorized access, use or
            alteration of your transmissions or content, whether based on warranty, contract, tort (including
            negligence) or any other legal theory, whether or not we have been informed of the possibility of such
            damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-main mb-4">8. Governing Law</h2>
          <p className="text-copy-light mb-4">
            These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your
            Country/State], without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-main mb-4">9. Changes to Terms</h2>
          <p className="text-copy-light mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
            is material, we will provide at least 30 days' notice prior to any new terms taking effect. What
            constitutes a material change will be determined at our sole discretion.
          </p>
          <p className="text-copy-light">
            By continuing to access or use our website after any revisions become effective, you agree to be bound by
            the revised terms. If you do not agree to the new terms, you are no longer authorized to use the website.
          </p>
        </section>
      </div>
    </div>
  );
};