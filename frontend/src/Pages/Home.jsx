import React, { useEffect, useState, useRef } from 'react';
import { Navbar, Footer, PolaroidImage } from '../Components';
import { Link } from 'react-router-dom';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const Home = () => {
  const [images, setImages] = useState([]);
  const [sliderRef, slider] = useKeenSlider(
    images.length > 0
      ? {
        loop: true,
        slides: { perView: 1, spacing: 10, origin: 'center' },
      }
      : null // Don't initialize until images are ready
  );

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/images');
        const data = await res.json();
        setImages(data.images);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (!slider) return;

    const interval = setInterval(() => {
      slider.current?.next();
    }, 5000);

    return () => clearInterval(interval);
  }, [slider]);

  return (
    <>
      <Navbar />
      <div style={{ backgroundImage: "url('https://images.pexels.com/photos/3616764/pexels-photo-3616764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
        {/* HERO CAROUSEL */}
        <section className="relative h-screen w-full overflow-hidden ">
          <div ref={sliderRef} className="keen-slider h-full">
            {images?.slice(0, 5).map((img) => (
              <div
                key={img._id}
                className="keen-slider__slide h-full w-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${img.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}

              >
                {/* Your slide content */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white text-center p-4 shadow-lg">
                  <h2 className="text-3xl md:text-4xl font-semibold mb-4 drop-shadow-lg tracking-wide">
                    Discover the Artistry of RA Studio
                  </h2>
                  <p className="text-lg md:text-xl italic mb-4 drop-shadow-lg text-gray-100">
                    Frames from my Story.
                  </p>
                  <Link to="/gallery" className="bg-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition">
                    Explore Gallery →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* About Section */}
        <section className="bg-white/55 py-16 px-6 text-center">
          <div className='max-w-4xl mx-auto'>
            <h3 className="text-2xl font-bold mb-4">About RA Studio</h3>
            <p className="text-gray-700 leading-relaxed">
              Founded by Richa Anand, RA Studio is a personal gallery where passion meets perspective. Each photograph is a quiet reflection of the moments and details that move us — capturing stillness, motion, nature, and human emotion through a mindful lens.
            </p>
          </div>
        </section>

        {/* Featured Preview */}
        <section className="py-12 px-6">
          <h3 className="text-2xl font-bold text-center mb-8">Visual Favorites</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {images?.slice(9, 15).map((img) => (
              <PolaroidImage
                key={img._id}
                url={img.url}
                caption={img.caption}
                location={img.location}
                className="shadow-lg"
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/gallery" className="text-black font-semibold hover:underline">
              View full gallery →
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
          <h4 className="text-3xl font-semibold mb-4">
            Want to collaborate or license a photo?
          </h4>
          <p className="mb-6">
            Get in touch to discuss commissions, prints, or partnerships.
          </p>
          <a
            href="/contact"
            className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Contact Me
          </a>
        </section>

      </div>


      <Footer />
    </>
  );
};

export default Home;
