import { motion, AnimatePresence } from 'framer-motion';

const PolicyModal = ({ policyId, isOpen, onClose }) => {
  const policies = {
    terms: {
      title: 'Terms & Conditions',
      content: `
        <h3 class="font-semibold mb-2">1. Acceptance of Terms</h3>
        <p class="mb-4">By accessing and using Maxzi's online store, you accept and agree to be bound by the terms and provisions of this agreement.</p>

        <h3 class="font-semibold mb-2">2. Product Availability</h3>
        <p class="mb-4">All products are subject to availability. We reserve the right to limit quantities or discontinue products at any time.</p>

        <h3 class="font-semibold mb-2">3. Pricing</h3>
        <p class="mb-4">Prices are subject to change without notice. We strive to display accurate pricing, but errors may occur.</p>

        <h3 class="font-semibold mb-2">4. Orders & Payment</h3>
        <p class="mb-4">Orders are processed through WhatsApp. Payment is handled directly with the store owner via the payment methods discussed in chat.</p>

        <h3 class="font-semibold mb-2">5. Limitation of Liability</h3>
        <p>Maxzi shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products.</p>
      `
    },
    privacy: {
      title: 'Privacy Notice',
      content: `
        <h3 class="font-semibold mb-2">1. Information We Collect</h3>
        <p class="mb-4">We collect information you provide directly to us, including name, contact information, and order details when you place an order via WhatsApp.</p>

        <h3 class="font-semibold mb-2">2. How We Use Your Information</h3>
        <p class="mb-4">We use your information to process orders, communicate with you, improve our services, and comply with legal obligations.</p>

        <h3 class="font-semibold mb-2">3. Information Sharing</h3>
        <p class="mb-4">We do not sell your personal information. We may share your information with service providers who assist in our operations.</p>

        <h3 class="font-semibold mb-2">4. Data Security</h3>
        <p class="mb-4">We implement appropriate security measures to protect your personal information from unauthorized access.</p>

        <h3 class="font-semibold mb-2">5. Your Rights</h3>
        <p>You have the right to access, correct, or delete your personal information by contacting us directly.</p>
      `
    },
    delivery: {
      title: 'Pickup & Delivery Policy',
      content: `
        <h3 class="font-semibold mb-2">1. In-Store Pickup</h3>
        <p class="mb-4">Products marked "In-Store" are available for same-day pickup at our location: 33 Oky, Lagos. You will receive a notification when your order is ready.</p>

        <h3 class="font-semibold mb-2">2. Delivery Options</h3>
        <p class="mb-4">We offer delivery within Lagos and surrounding areas. Delivery fees and times will be confirmed via WhatsApp based on your location.</p>

        <h3 class="font-semibold mb-2">3. On-Demand Orders</h3>
        <p class="mb-4">On-Demand products require special ordering and may take 3-7 days for delivery. We will provide estimated delivery times during checkout.</p>

        <h3 class="font-semibold mb-2">4. Delivery Tracking</h3>
        <p class="mb-4">You will receive updates on your delivery status via WhatsApp.</p>

        <h3 class="font-semibold mb-2">5. Unsuccessful Delivery</h3>
        <p>If delivery is unsuccessful due to incorrect address or unavailability, additional charges may apply for re-delivery.</p>
      `
    },
    return: {
      title: 'Return Policy',
      content: `
        <h3 class="font-semibold mb-2">1. Return Eligibility</h3>
        <p class="mb-4">Returns are accepted within 7 days of purchase for defective or incorrect items. Perishable goods cannot be returned.</p>

        <h3 class="font-semibold mb-2">2. Condition Requirements</h3>
        <p class="mb-4">Items must be in original condition, unused, and with all tags/labels attached. Items must have proof of purchase.</p>

        <h3 class="font-semibold mb-2">3. Return Process</h3>
        <p class="mb-4">Contact us via WhatsApp to initiate a return. We will provide return instructions and address.</p>

        <h3 class="font-semibold mb-2">4. Refunds</h3>
        <p class="mb-4">Refunds are processed within 5-7 business days after we receive and inspect the returned item.</p>

        <h3 class="font-semibold mb-2">5. Exchange Options</h3>
        <p>We offer exchanges for items of equal or greater value. Difference in price will be charged or refunded accordingly.</p>
      `
    },
    about: {
      title: 'About Us',
      content: `
        <h3 class="font-semibold mb-2">Welcome to Maxzi</h3>
        <p class="mb-4">Maxzi is your premier destination for quality products with flexible shopping options. Whether you prefer to shop in-store or order on-demand, we've got you covered.</p>

        <h3 class="font-semibold mb-2">Our Mission</h3>
        <p class="mb-4">To provide exceptional products and service with convenience and transparency. We believe in making shopping simple, honest, and accessible.</p>

        <h3 class="font-semibold mb-2">What Sets Us Apart</h3>
        <ul class="list-disc list-inside mb-4 space-y-2">
          <li>Wide range of products for all needs</li>
          <li>Flexible shopping: In-Store or On-Demand</li>
          <li>Easy WhatsApp ordering and support</li>
          <li>Quality guaranteed</li>
        </ul>

        <h3 class="font-semibold mb-2">Contact Us</h3>
        <p>Visit us at 33 Oky, Lagos or reach out via WhatsApp. We're here to help!</p>
      `
    }
  };

  const policy = policies[policyId];

  if (!policy) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg w-full md:rounded-2xl bg-white z-50 md:max-h-[80vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-text">{policy.title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: policy.content }}
              />
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={onClose}
                className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PolicyModal;
