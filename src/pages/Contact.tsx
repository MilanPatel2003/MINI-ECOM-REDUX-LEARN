import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle the form submission
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const contactInfo = [
        {
            icon: <Mail className="h-6 w-6" />,
            title: "Email",
            content: "support@miniecom.com"
        },
        {
            icon: <Phone className="h-6 w-6" />,
            title: "Phone",
            content: "+1 (555) 123-4567"
        },
        {
            icon: <MapPin className="h-6 w-6" />,
            title: "Address",
            content: "123 E-Commerce St, Digital City, 12345"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold text-center mb-12">Contact Us</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Input
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Input
                                    name="subject"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="min-h-[150px]"
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Send Message
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Contact Information */}
                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                            {info.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">{info.title}</h3>
                                            <p className="text-gray-600">{info.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-semibold mb-4">Business Hours</h2>
                            <div className="space-y-2">
                                <p className="flex justify-between">
                                    <span>Monday - Friday:</span>
                                    <span>9:00 AM - 6:00 PM</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>Saturday:</span>
                                    <span>10:00 AM - 4:00 PM</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>Sunday:</span>
                                    <span>Closed</span>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
} 