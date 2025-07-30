export default function AboutPage() {
    return (
        <div className="bg-app-bg text-app-text-base">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-app-primary tracking-tight">
                        For the Love of the Game
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-app-text-muted">
                        Cricdar was born from a single, simple passion: an unconditional love for cricket. We are a team of dedicated fans, developers, and data enthusiasts who believe that following the sport should be a seamless, engaging, and enriching experience.
                    </p>
                </div>

                {/* Our Mission Section */}
                <div className="mt-20 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Mission</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="prose prose-lg text-app-text-muted max-w-none">
                            <p>
                                In a world of cluttered screens and complex stats, our mission is to be your ultimate cricket companion—clean, fast, and always reliable.
                            </p>
                            <p>
                                We understand the roar of the crowd, the thrill of a last-ball finish, and the quiet satisfaction of analyzing a day's play. That’s why we’ve built Cricdar to be the one-stop destination for everything you need, without the noise.
                            </p>
                        </div>
                        <div className="bg-app-card-bg p-8 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-app-primary mb-4">What We Offer</h3>
                            <ul className="space-y-3 text-app-text-base">
                                <li className="flex items-start">
                                    <span className="text-app-primary font-bold mr-2">✓</span>
                                    <span><strong>Live Scores & Updates:</strong> Real-time, ball-by-ball updates that keep you at the heart of the action.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-app-primary font-bold mr-2">✓</span>
                                    <span><strong>Comprehensive Schedules:</strong> Know when and where the next big game is, from international tours to major T20 leagues.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-app-primary font-bold mr-2">✓</span>
                                    <span><strong>Clean, User-First Design:</strong> An interface that is modern, responsive, and easy to navigate on any device.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Our Vision Section */}
                <div className="text-center max-w-3xl mx-auto mt-20">
                    <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                    <p className="text-lg text-app-text-muted">
                        Our goal is to continuously innovate and enhance your connection to cricket. We envision a platform that not only delivers data but also builds a community where fans can share their passion. Thank you for choosing Cricdar.
                    </p>
                </div>

            </div>
        </div>
    );
}