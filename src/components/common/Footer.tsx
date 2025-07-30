import Link from 'next/link';
import { RiGithubFill, RiTwitterFill, RiLinkedinFill } from 'react-icons/ri';
import Image from 'next/image';

export default function Footer() {
    return (
        // FIX: Replaced theme-aware classes with static dark theme classes
        <footer className="bg-gray-900 text-gray-400">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div className="md:col-span-1">
                        <div className="mb-4">
                            <Image 
                              src="/logo.png" 
                              alt="Cricdar Logo" 
                              width={120} 
                              height={40}
                            />
                        </div>
                        <p className="text-sm">Your ultimate cricket companion. Get live scores, match schedules, series information, and more.</p>
                        {/* <div className="flex mt-4 space-x-4">
                            <a href="#" className="hover:text-white"><RiGithubFill className="w-6 h-6" /></a>
                            <a href="#" className="hover:text-white"><RiTwitterFill className="w-6 h-6" /></a>
                            <a href="#" className="hover:text-white"><RiLinkedinFill className="w-6 h-6" /></a>
                        </div> */}
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold uppercase tracking-wider mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/matches" className="hover:text-white">Matches</Link></li>
                            <li><Link href="/series" className="hover:text-white">Series</Link></li>
                            {/* <li><Link href="/news" className="hover:text-white">News</Link></li> */}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="text-white font-semibold uppercase tracking-wider mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Cricdar. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}