export default function PrivacyPolicyPage() {
    return (
        <div className="bg-app-bg text-app-text-base">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="max-w-3xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-app-primary tracking-tight">
                            Privacy Policy
                        </h1>
                        <p className="mt-4 text-sm text-app-text-muted">Last Updated: July 21, 2025</p>
                    </div>

                    <div className="prose prose-lg text-app-text-muted max-w-none space-y-8">
                        <p>
                            Your privacy is important to us. This Privacy Policy explains how Cricdar ("we," "us," or "our") collects, uses, and protects your information when you use our website. By using our service, you agree to the collection and use of information in accordance with this policy.
                        </p>

                        <div>
                            <h2 className="text-2xl font-bold text-app-text-base mb-4">Information We Collect</h2>
                            <p>We collect information to provide and improve our services. The types of information we collect are:</p>
                            <ul className="mt-4 list-disc pl-5 space-y-2">
                                <li>
                                    <strong>Information You Provide:</strong> When you use our contact form, we collect your name, email address, and the message you send. We use this information solely to respond to your inquiries.
                                </li>
                                <li>
                                    <strong>Usage Data:</strong> Like most websites, we may collect basic, non-personally identifiable information that web browsers make available, such as your browser type, language preference, and the date and time of each visit. This helps us understand how our visitors use the website.
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-app-text-base mb-4">How We Use Your Information</h2>
                            <p>We use the information we collect for the following purposes:</p>
                            <ul className="mt-4 list-disc pl-5 space-y-2">
                                <li>To provide, operate, and maintain our website.</li>
                                <li>To improve and personalize your experience.</li>
                                <li>To respond to your comments, questions, and support requests.</li>
                            </ul>
                            <p className="mt-4">We will not use your personal information for marketing purposes without your explicit consent.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-app-text-base mb-4">Data Security</h2>
                            <p>
                                The security of your data is a priority. We use secure methods to protect your information, such as using environment variables to keep sensitive credentials safe on our server. However, remember that no method of transmission over the Internet is 100% secure.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-app-text-base mb-4">Changes to This Privacy Policy</h2>
                            <p>
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this page periodically for any changes.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-app-text-base mb-4">Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please <a href="/contact" className="text-app-primary hover:underline">contact us</a>.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}