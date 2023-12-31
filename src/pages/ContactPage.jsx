import React, {useState} from "react";
import { Link } from "react-router-dom";
import './ContactPage.css'

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name:'',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        setIsSubmitted(true);
        // handle form submission(send data to api or email service if possible)
    };

    if (isSubmitted) {
        return <div className="thank-you-message">
            <h1>Thank you!</h1>
            <p>Your message has been sent.</p>
            <Link to="/" className="exit">Back to Homepage</Link>
            </div>
    }

    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit} className="contact-form">
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
                <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} />
                <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
                <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} />
                <button type="submit">Send Message</button>
            </form>
                {/* possibly add contact info and FAQ section here */}
        </div>
    )
}

export default ContactPage; 