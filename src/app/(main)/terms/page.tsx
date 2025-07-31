import React from 'react';
import Link from 'next/link';
import { RiArrowLeftSLine, RiFileTextLine, RiShieldLine, RiUserLine, RiGlobeLine, RiMailLine } from 'react-icons/ri';

export default function TermsOfServicePage() {
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
            <RiFileTextLine className="w-8 h-8 text-app-primary" />
            <h1 className="text-3xl font-bold text-app-text-base">Terms of Service</h1>
          </div>
          <p className="text-app-text-muted">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-app-surface border border-app-border rounded-lg p-8">
            
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-app-text-base mb-4">Agreement to Terms</h2>
              <p className="text-app-text-muted leading-relaxed mb-4">
                These Terms of Service ("Terms") govern your use of the Cricdar website and services. By accessing or using our services, you agree to be bound by these Terms and our Privacy Policy.
              </p>
              <p className="text-app-text-muted leading-relaxed">
                If you do not agree to these Terms, please do not use our services. We reserve the right to modify these Terms at any time, and such modifications will be effective immediately upon posting.
              </p>
            </section>

            {/* Services Description */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-app-text-base mb-4">Our Services</h2>
              <p className="text-app-text-muted leading-relaxed mb-4">
                Cricdar provides cricket-related information and services, including:
              </p>
              <ul className="list-disc list-inside text-app-text-muted space-y-2">
                <li>Live cricket scores and match updates</li>
                <li>Series and tournament information</li>
                <li>Cricket news and analysis</li>
                <li>Player statistics and rankings</li>
                <li>Team information and schedules</li>
                <li>Mobile applications and notifications</li>
              </ul>
            </section>

            {/* User Accounts */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-app-text-base mb-4 flex items-center">
                <RiUserLine className="w-6 h-6 mr-2 text-app-primary" />
                User Accounts
              </h2>
              <div className="space-y-4">
                <p className="text-app-text-muted leading-relaxed">
                  When you create an account with us, you must provide accurate and complete information. You are responsible for:
                </p>
                <ul className="list-disc list-inside text-app-text-muted space-y-2">
                  <li>Maintaining the security of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                  <li>Ensuring your account information is up to date</li>
                </ul>
                <p className="text-app-text-muted leading-relaxed">
                  We reserve the right to terminate accounts that violate these Terms or for any other reason at our discretion.
                </p>
              </div>
            </section>

            {/* Acceptable Use */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-app-text-base mb-4">Acceptable Use</h2>
              <p className="text-app-text-muted leading-relaxed mb-4">
                You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc list-inside text-app-text-muted space-y-2">
                <li>Use our services for any illegal or unauthorized purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt our services</li>
                <li>Transmit viruses, malware, or other harmful code</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Use automated systems to access our services without permission</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-app-text-base mb-4">Intellectual Property</h2>
              <p className="text-app-text-muted leading-relaxed mb-4">
                Our services and content are protected by copyright, trademark, and other intellectual property laws. You may not:
              </p>
              <ul className="list-disc list-inside text-app-text-muted space-y-2">
                <li>Copy, reproduce, or distribute our content without permission</li>
                <li>Modify or create derivative works</li>
                <li>Remove or alter copyright notices</li>
                <li>Use our trademarks without written consent</li>
              </ul>
              <p className="text-app-text-muted leading-relaxed mt-4">
                You retain ownership of any content you submit to our services, but you grant us a license to use, display, and distribute such content.
              </p>
            </section>

            {/* Privacy and Data */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-app-text-base mb-4 flex items-center">
                <RiShieldLine className="w-6 h-6 mr-2 text-app-primary" />
                Privacy and Data
              </h2>
              <p className="text-app-text-muted leading-relaxed">
                Your privacy is important to us. Our collection and use of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
            </section>

            {/* Disclaimers */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-app-text-base mb-4">Disclaimers</h2>
              <p className="text-app-text-muted leading-relaxed mb-4">
                Our services are provided "as is" and "as available" without warranties of any kind. We do not guarantee:
              </p>
              <ul className="list-disc list-inside text-app-text-muted space-y-2">
                <li>The accuracy or completeness of information</li>
                <li>Uninterrupted or error-free service</li>
                <li>That our services will meet your specific requirements</li>
                <li>That our services will be secure or free from viruses</li>
              </ul>
              <p className="text-app-text-muted leading-relaxed mt-4">
                We are not responsible for any decisions made based on the information provided through our services.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-app-text-base mb-4">Limitation of Liability</h2>
              <p className="text-app-text-muted leading-relaxed">
                To the maximum extent permitted by law, Cricdar shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or relating to your use of our services.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-app-text-base mb-4">Termination</h2>
              <p className="text-app-text-muted leading-relaxed mb-4">
                We may terminate or suspend your access to our services immediately, without prior notice, for any reason, including if you breach these Terms.
              </p>
              <p className="text-app-text-muted leading-relaxed">
                Upon termination, your right to use our services will cease immediately, and we may delete your account and data.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-app-text-base mb-4 flex items-center">
                <RiGlobeLine className="w-6 h-6 mr-2 text-app-primary" />
                Governing Law
              </h2>
              <p className="text-app-text-muted leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Cricdar operates, without regard to its conflict of law provisions.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-app-text-base mb-4">Changes to Terms</h2>
              <p className="text-app-text-muted leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on our website. Your continued use of our services after such changes constitutes acceptance of the new Terms.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-app-text-base mb-4 flex items-center">
                <RiMailLine className="w-6 h-6 mr-2 text-app-primary" />
                Contact Us
              </h2>
              <p className="text-app-text-muted leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-app-bg border border-app-border rounded-lg p-4">
                <div className="space-y-2">
                  <p className="text-app-text-base"><strong>Email:</strong> legal@cricdar.com</p>
                  <p className="text-app-text-base"><strong>Address:</strong> Cricdar Inc., 123 Cricket Street, Sports City, SC 12345</p>
                  <p className="text-app-text-base"><strong>Phone:</strong> +1 (555) 123-4567</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="border-t border-app-border pt-6 mt-8">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <p className="text-sm text-app-text-muted">
                  These terms of service are effective as of {new Date().toLocaleDateString()}
                </p>
                <div className="flex space-x-4 text-sm">
                  <Link href="/privacy" className="text-app-primary hover:text-app-primary-hover">
                    Privacy Policy
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