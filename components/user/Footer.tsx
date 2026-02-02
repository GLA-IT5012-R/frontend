import React from 'react';

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 gap-8">
                    {/* Column 1 */}
                    <div>
                        <div className="mb-6">
                            <h3 className="text-white font-semibold mb-3">Product</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white">Features</a></li>
                                <li><a href="#" className="hover:text-white">Pricing</a></li>
                                <li><a href="#" className="hover:text-white">Security</a></li>
                                <li><a href="#" className="hover:text-white">Updates</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <div className="mb-6">
                            <h3 className="text-white font-semibold mb-3">Company</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white">About</a></li>
                                <li><a href="#" className="hover:text-white">Blog</a></li>
                                <li><a href="#" className="hover:text-white">Careers</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-700 mt-8 pt-8">
                    <p className="text-center text-sm">&copy; 2026 Glasgow IT Course Group R. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
