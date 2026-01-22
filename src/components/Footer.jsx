import { useState } from 'react';
import { motion } from 'framer-motion';
import { socialLinks, whatsappNumber } from '../config/socialLinks.jsx';

const Footer = ({ onOpenModal }) => {
  const policyLinks = [
    { id: 'terms', label: 'Terms & Conditions' },
    { id: 'privacy', label: 'Privacy Notice' },
    { id: 'delivery', label: 'Pickup & Delivery Policy' },
    { id: 'return', label: 'Return Policy' },
    { id: 'about', label: 'About Us' },
  ];

  return (
    <footer className="bg-primary text-white" role="contentinfo" itemScope itemType="https://schema.org/Organization">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Social Media Links */}
        <div className="mb-8">
          <nav aria-label="Social media links" role="navigation">
            <ul className="flex flex-wrap items-center justify-center gap-4" role="list" itemProp="sameAs">
              {socialLinks.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.label}`}
                    className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-full text-white hover:bg-secondary hover:text-primary transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary border-2 border-transparent hover:border-yellow-400 animate-pulse-slow relative"
                    itemProp="url"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Address */}
          <div itemScope itemType="https://schema.org/LocalBusiness">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-xl" aria-hidden="true">M</span>
              </div>
              <span className="text-2xl font-bold" itemProp="name">Maxzi</span>
            </div>
            <div className="space-y-2 text-white/80">
              <p className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <span itemProp="streetAddress">33 Oky</span><br />
                  <span itemProp="addressLocality">Lagos</span>, <span itemProp="addressCountry">Nigeria</span>
                </span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <nav aria-label="Quick links" role="navigation">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => document.getElementById('store')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-white/80 hover:text-secondary transition-colors text-left focus:outline-none focus:underline"
                  >
                    Store
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById('in-store')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-white/80 hover:text-secondary transition-colors text-left focus:outline-none focus:underline"
                  >
                    In-Store Products
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById('on-demand')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-white/80 hover:text-secondary transition-colors text-left focus:outline-none focus:underline"
                  >
                    On-Demand Products
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact & Policies */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            
            {/* WhatsApp Contact Button */}
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary text-primary font-semibold px-4 py-2 rounded-lg hover:bg-secondary-dark transition-colors mb-6 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary"
              itemProp="url"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>

            {/* Policy Links */}
            <nav aria-label="Policy links" role="navigation">
              <div className="space-y-2">
                {policyLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => onOpenModal(link.id)}
                    className="block text-white/80 hover:text-secondary transition-colors text-sm text-left focus:outline-none focus:underline"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Maxzi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
