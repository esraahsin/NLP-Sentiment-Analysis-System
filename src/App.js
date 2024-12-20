import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Components/Navbar';
import SentimentForm from './Components/SentimentForm';
import Header from './Components/Header';
import HomeSection from './Components/HomeSection';
import AboutSection from './Components/AboutSection';
import ProductsSection from './Components/ProductsSection';
import ReviewSection from './Components/ReviewSection';
import ContactSection from './Components/ContactSection';
import Footer from './Components/Footer';
function App() {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/analyze', { text });
      setAnalysis(response.data);
    } catch (error) {
      console.error('Error analyzing text:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Navbar/>
      <Header/>

      <HomeSection/>
      <AboutSection/>
      <ProductsSection/>
      <ReviewSection/>
      <ContactSection/>
      <Footer/>
   </div>
  );
}

export default App;
