import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gray-50 border-t">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Mini Ecom</h3>
                        <p className="text-gray-600">
                            Your one-stop shop for all your needs. Quality products, great prices, and excellent service.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-600 hover:text-primary">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-gray-600 hover:text-primary">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-600 hover:text-primary">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-gray-600">
                                <Mail className="h-4 w-4" />
                                support@miniecom.com
                            </li>
                            <li className="text-gray-600">
                                +1 (555) 123-4567
                            </li>
                            <li className="text-gray-600">
                                123 E-Commerce St, Digital City, 12345
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Follow Us</h3>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-600 hover:text-primary">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-primary">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-primary">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t mt-8 pt-8 text-center text-gray-600">
                    <p>&copy; {new Date().getFullYear()} Mini Ecom. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
} 