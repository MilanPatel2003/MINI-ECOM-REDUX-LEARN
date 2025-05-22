import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-6">Welcome to Mini Ecom</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Discover our amazing collection of products at great prices.
                </p>
                <Link to="/products">
                    <Button size="lg">Shop Now</Button>
                </Link>
            </div>
        </div>
    );
} 