import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Sparkles, Truck, Shield } from "lucide-react";

export default function Home() {
    const features = [
        {
            icon: <ShoppingBag className="h-6 w-6" />,
            title: "Wide Selection",
            description: "Browse through thousands of products across multiple categories"
        },
        {
            icon: <Truck className="h-6 w-6" />,
            title: "Fast Delivery",
            description: "Quick and reliable shipping to your doorstep"
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: "Secure Shopping",
            description: "Your data is protected with our secure payment system"
        },
        {
            icon: <Sparkles className="h-6 w-6" />,
            title: "Quality Products",
            description: "We only offer the best quality products to our customers"
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Welcome to Mini Ecom
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Discover our amazing collection of products at great prices.
                            Shop the latest trends with confidence.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/products">
                                <Button size="lg" className="w-full sm:w-auto">
                                    Shop Now
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
} 