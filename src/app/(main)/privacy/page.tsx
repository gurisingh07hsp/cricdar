import React from 'react';
import Link from 'next/link';
import { RiArrowLeftSLine, RiShieldLine, RiEyeLine, RiLockLine, RiUserLine, RiMailLine } from 'react-icons/ri';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-app-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="flex items-center space-x-2 text-app-text-muted hover:text-app-text-base transition-colors mb-6">
            <RiArrowLeftSLine className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-3 mb-4">
            <RiShieldLine className="w-8 h-8 text-app-primary" />
            <h1 className="text-3xl font-bold text-app-text-base">Privacy Policy</h1>
          </div>
          <p className="text-app-text-muted">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-app-surface border border-app-border rounded-lg p-8">
            
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-app-text-base mb-4">Introduction</h2>
              <p className="text-app-text-muted leading-relaxed mb-4">
                At Cricdar, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our website and services.
              </p>
              <p className="text-app-text-muted leading-relaxed">
                By using Cricdar, you agree to the collection and use of information in accordance with this policy. If you have any questions about this privacy policy, please contact us.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-app-text-base mb-4 flex items-center">
                <RiEyeLine className="w-6 h-6 mr-2 text-app-primary" />
                Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-app-text-base mb-2">Personal Information</h3>
                  <p className="text-app-text-muted leading-relaxed">
                    We may collect personal information such as your name, email address, and preferences when you:
                  </p>
                  <ul className="list-disc list-inside text-app-text-muted mt-2 space-y-1">
                    <li>Create an account or profile</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Contact us for support</li>
                    <li>Participate in surveys or promotions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-app-text-base mb-2">Usage Data</h3>
                  <p className="text-app-text-muted leading-relaxed">
                    We automatically collect information about how you interact with our website, including:
                  </p>
                  <ul className="list-disc list-inside text-app-text-muted mt-2 space-y-1">
                    <li>Pages visited and time spent on each page</li>
                    <li>Browser type and device information</li>
                    <li>IP address and location data</li>
                    <li>Search queries and preferences</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-app-text-base mb-4">How We Use Your Information</h2>
              <p className="text-app-text-muted leading-relaxed mb-4">
                We use the collected information for various purposes:
              </p>
              <ul className="list-disc list-inside text-app-text-muted space-y-2">
                <li>Provide and maintain our cricket services</li>
                <li>Personalize your experience and content</li>
                <li>Send you updates, newsletters, and notifications</li>
                <li>Improve our website and services</li>
                <li>Analyze usage patterns and trends</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
            </section>

            {/* Data Protection */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-app-text-base mb-4 flex items-center">
                <RiLockLine className="w-6 h-6 mr-2 text-app-primary" />
                Data Protection
              </h2>
              <p className="text-app-text-muted leading-relaxed mb-4">
                We implement appropriate security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-app-text-muted space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
                <li>Secure data storage practices</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>

            {/* Third-Party Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-app-text-base mb-4">Third-Party Services</h2>
              <p className="text-app-text-muted leading-relaxed mb-4">
                We may use third-party services that collect, monitor, and analyze data:
              </p>
              <ul className="list-disc list-inside text-app-text-muted space-y-2">
                <li>Google Analytics for website analytics</li>
                <li>Social media platforms for sharing features</li>
                <li>Payment processors for transactions</li>
                <li>Email service providers for communications</li>
              </ul>
              <p className="text-app-text-muted leading-relaxed mt-4">
                These third-party services have their own privacy policies, and we encourage you to review them.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-app-text-base mb-4 flex items-center">
                <RiUserLine className="w-6 h-6 mr-2 text-app-primary" />
                Your Rights
              </h2>
              <p className="text-app-text-muted leading-relaxed mb-4">
                You have the following rights regarding your personal data:
              </p>
              <ul className="list-disc list-inside text-app-text-muted space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-app-text-base mb-4">Cookies</h2>
              <p className="text-app-text-muted leading-relaxed mb-4">
                We use cookies and similar technologies to enhance your experience:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-app-text-base mb-2">Essential Cookies</h3>
                  <p className="text-app-text-muted leading-relaxed">
                    Required for basic website functionality and security.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-app-text-base mb-2">Analytics Cookies</h3>
                  <p className="text-app-text-muted leading-relaxed">
                    Help us understand how visitors use our website.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-app-text-base mb-2">Preference Cookies</h3>
                  <p className="text-app-text-muted leading-relaxed">
                    Remember your settings and preferences.
                  </p>
                </div>
              </div>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-app-text-base mb-4">Children's Privacy</h2>
              <p className="text-app-text-muted leading-relaxed">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            {/* Changes to This Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-app-text-base mb-4">Changes to This Policy</h2>
              <p className="text-app-text-muted leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-app-text-base mb-4 flex items-center">
                <RiMailLine className="w-6 h-6 mr-2 text-app-primary" />
                Contact Us
              </h2>
              <p className="text-app-text-muted leading-relaxed mb-4">
                If you have any questions about this privacy policy or our data practices, please contact us:
              </p>
              <div className="bg-app-bg border border-app-border rounded-lg p-4">
                <div className="space-y-2">
                  <p className="text-app-text-base"><strong>Email:</strong> privacy@cricdar.com</p>
                  <p className="text-app-text-base"><strong>Address:</strong> Cricdar Inc., 123 Cricket Street, Sports City, SC 12345</p>
                  <p className="text-app-text-base"><strong>Phone:</strong> +1 (555) 123-4567</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="border-t border-app-border pt-6 mt-8">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <p className="text-sm text-app-text-muted">
                  This privacy policy is effective as of {new Date().toLocaleDateString()}
                </p>
                <div className="flex space-x-4 text-sm">
                  <Link href="/terms" className="text-app-primary hover:text-app-primary-hover">
                    Terms of Service
                  </Link>
                  <Link href="/cookies" className="text-app-primary hover:text-app-primary-hover">
                    Cookie Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}