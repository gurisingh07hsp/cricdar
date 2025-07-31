import Link from 'next/link';
import { 
  RiTwitterFill, 
  RiFacebookFill, 
  RiInstagramFill, 
  RiYoutubeFill,
  RiDownloadLine,
  RiSmartphoneLine,
  RiArrowRightSLine,
  RiShieldLine,
  RiTrophyLine,
  RiGlobeLine,
  RiUserLine
} from 'react-icons/ri';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    
                    {/* Company Info & App Download */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <Image 
                              src="/logo.png" 
                              alt="Cricdar Logo" 
                              width={140} 
                              height={50}
                              className="mb-4"
                            />
                            <p className="text-sm leading-relaxed mb-6">
                                Your ultimate cricket companion. Get live scores, match schedules, series information, and comprehensive cricket news from around the world.
                            </p>
                        </div>
                        
                        {/* App Download Section */}
                        <div className="bg-gradient-to-r from-app-primary/10 to-app-secondary/10 border border-app-primary/20 rounded-lg p-4 mb-6">
                            <div className="flex items-center space-x-3 mb-3">
                                <RiSmartphoneLine className="w-6 h-6 text-app-primary" />
                                <h4 className="font-semibold text-white">Download Our App</h4>
                            </div>
                            <p className="text-xs text-gray-400 mb-4">
                                Get instant notifications, live scores, and exclusive content on your mobile device.
                            </p>
                            <div className="flex space-x-2">
                                <button className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg text-xs hover:bg-gray-800 transition-colors">
                                    <RiDownloadLine className="w-4 h-4" />
                                    <span>App Store</span>
                                </button>
                                <button className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg text-xs hover:bg-gray-800 transition-colors">
                                    <RiDownloadLine className="w-4 h-4" />
                                    <span>Google Play</span>
                                </button>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h4 className="text-white font-semibold mb-3">Follow Us</h4>
                            <div className="flex space-x-3">
                                <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-app-primary rounded-lg flex items-center justify-center transition-colors">
                                    <RiTwitterFill className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-app-primary rounded-lg flex items-center justify-center transition-colors">
                                    <RiFacebookFill className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-app-primary rounded-lg flex items-center justify-center transition-colors">
                                    <RiInstagramFill className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-app-primary rounded-lg flex items-center justify-center transition-colors">
                                    <RiYoutubeFill className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Cricket Features */}
                    <div>
                        <h4 className="text-white font-semibold uppercase tracking-wider mb-4 flex items-center">
                            <RiTrophyLine className="w-4 h-4 mr-2" />
                            Cricket Features
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/matches" className="flex items-center hover:text-white transition-colors group">
                                    <RiArrowRightSLine className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                                    Live Matches
                                </Link>
                            </li>
                            <li>
                                <Link href="/series" className="flex items-center hover:text-white transition-colors group">
                                    <RiArrowRightSLine className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                                    Series & Tournaments
                                </Link>
                            </li>
                            <li>
                                <Link href="/news" className="flex items-center hover:text-white transition-colors group">
                                    <RiArrowRightSLine className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                                    Cricket News
                                </Link>
                            </li>
                            <li>
                                <Link href="/rankings" className="flex items-center hover:text-white transition-colors group">
                                    <RiArrowRightSLine className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                                    Team Rankings
                                </Link>
                            </li>
                            <li>
                                <Link href="/players" className="flex items-center hover:text-white transition-colors group">
                                    <RiArrowRightSLine className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                                    Player Profiles
                                </Link>
                            </li>
                            <li>
                                <Link href="/stats" className="flex items-center hover:text-white transition-colors group">
                                    <RiArrowRightSLine className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                                    Statistics
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company & Support */}
                    <div>
                        <h4 className="text-white font-semibold uppercase tracking-wider mb-4 flex items-center">
                            <RiUserLine className="w-4 h-4 mr-2" />
                            Company
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/about" className="flex items-center hover:text-white transition-colors group">
                                    <RiArrowRightSLine className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="flex items-center hover:text-white transition-colors group">
                                    <RiArrowRightSLine className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="flex items-center hover:text-white transition-colors group">
                                    <RiArrowRightSLine className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="/press" className="flex items-center hover:text-white transition-colors group">
                                    <RiArrowRightSLine className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                                    Press Kit
                                </Link>
                            </li>
                            <li>
                                <Link href="/partners" className="flex items-center hover:text-white transition-colors group">
                                    <RiArrowRightSLine className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                                    Partners
                                </Link>
                            </li>
                            <li>
                                <Link href="/advertise" className="flex items-center hover:text-white transition-colors group">
                                    <RiArrowRightSLine className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                                    Advertise With Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal & Help */}
                    <div>
                        <h4 className="text-white font-semibold uppercase tracking-wider mb-4 flex items-center">
                            <RiShieldLine className="w-4 h-4 mr-2" />
                            Legal & Help
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/privacy" className="flex items-center hover:text-white transition-colors group">
                                    <RiArrowRightSLine className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="flex items-center hover:text-white transition-colors group">
                                    <RiArrowRightSLine className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className="flex items-center hover:text-white transition-colors group">
                                    <RiArrowRightSLine className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/help" className="flex items-center hover:text-white transition-colors group">
                                    <RiArrowRightSLine className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="flex items-center hover:text-white transition-colors group">
                                    <RiArrowRightSLine className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/feedback" className="flex items-center hover:text-white transition-colors group">
                                    <RiArrowRightSLine className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                                    Send Feedback
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Subscription */}
                <div className="bg-gradient-to-r from-app-primary/10 to-app-secondary/10 border border-app-primary/20 rounded-lg p-6 mb-8">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
                            <p className="text-gray-300 text-sm">
                                Get the latest cricket news, match updates, and exclusive content delivered to your inbox.
                            </p>
                        </div>
                        <div className="flex space-x-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent"
                            />
                            <button className="bg-app-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-app-primary-hover transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-6 text-sm">
                            <span>&copy; {new Date().getFullYear()} Cricdar. All rights reserved.</span>
                            <div className="flex items-center space-x-1">
                                <RiGlobeLine className="w-4 h-4" />
                                <span>English</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-6 text-sm">
                            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
                            <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
                            <Link href="/security" className="hover:text-white transition-colors">Security</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}