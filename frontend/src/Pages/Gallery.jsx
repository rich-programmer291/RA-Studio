import React, { useState, useEffect } from 'react';
import { PolaroidImage, Footer } from '../Components';
import { MapPin, X, ChevronLeft, ChevronRight, ArrowLeft, Text, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const GalleryPage = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('/api/images'); // Your backend endpoint
                const data = await res.json();
                setImages(data.images);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching images:', error);
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImage) return;
            if (e.key === 'ArrowRight') {
                setSelectedIndex((prev) => (prev + 1) % images.length);
            } else if (e.key === 'ArrowLeft') {
                setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
            } else if (e.key === 'Escape') {
                setSelectedIndex(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, images.length]);

    const handleNext = () => setSelectedIndex((prev) => (prev + 1) % images.length);
    const handlePrev = () => setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);

    const isImageLiked = (imageId) => {
        const likedImages = JSON.parse(localStorage.getItem("likedImages")) || [];
        return likedImages.includes(imageId);
    };

    const toggleLike = async (imageId) => {
        const likedImages = JSON.parse(localStorage.getItem("likedImages")) || [];
        const isLiked = likedImages.includes(imageId);
        let updatedLikes;

        if (!isLiked) {
            updatedLikes = [...likedImages, imageId];
            localStorage.setItem("likedImages", JSON.stringify(updatedLikes));
            await fetch("/api/images/like", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imageId })
            });
        } else {
            updatedLikes = likedImages.filter(id => id !== imageId);
            localStorage.setItem("likedImages", JSON.stringify(updatedLikes));
            await fetch("/api/images/unlike", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imageId })
            });
        }

        setImages([...images]); // force re-render
    };

    return (
        <>
            <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1573828718637-233537e3b9e2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
                className="p-6 min-h-screen text-black bg-gray-200">

                <Link to="/" className="flex items-center text-black-700 bg-white/65 p-1 rounded-full mb-4 w-[max-content]">
                    <ArrowLeft />
                </Link>
                <h1 className="text-3xl font-bold mb-6 text-center">Photo Gallery</h1>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <ShimmerCard key={index} />
                        ))}
                    </div>
                ) : images?.length === 0 ? (
                    <p className="text-center text-gray-500">No images uploaded yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {images?.map((img, index) => (
                            <div key={img._id} onClick={() => setSelectedIndex(index)}>
                                <PolaroidImage id={img._id} url={img.url} caption={img.caption} location={img.location} />
                            </div>
                        ))}
                    </div>
                )}

                {selectedImage && (
                    <div className="fixed inset-0 z-[50] bg-black bg-opacity-90 flex items-center justify-center">
                        <div className="relative md:max-w-[fit-content] max-h-screen w-full px-2">

                            <button
                                onClick={() => setSelectedIndex(null)}
                                className="absolute top-2 left-4 text-white text-4xl font-bold z-[101]"
                            >
                                <X />
                            </button>

                            <button
                                onClick={handlePrev}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl px-2 z-[101]"
                            >
                                <ChevronLeft />
                            </button>

                            <button
                                onClick={handleNext}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl px-2 z-[101]"
                            >
                                <ChevronRight />
                            </button>

                            <div className="relative">
                                <img
                                    src={selectedImage.url}
                                    alt={selectedImage.caption || 'Image'}
                                    onContextMenu={(e) => e.preventDefault()}
                                    draggable={false}
                                    className="w-auto max-h-[calc(100vh-30px)] rounded shadow-lg"
                                />
                                <button
                                    onClick={() => toggleLike(selectedImage._id)}
                                    className="mt-2 absolute top-1 right-2 hover:bg-red-100 hover:rounded-full p-1 transition duration-300"
                                >
                                    {isImageLiked(selectedImage._id) ? (
                                        <Heart className="text-red-500 fill-red-500" />
                                    ) : (
                                        <Heart className="text-gray-500" />
                                    )}
                                </button>
                                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/60 to-transparent text-left text-white p-2 z-10">
                                    {selectedImage.caption && (
                                        <p className="flex items-center gap-1 text-lg leading-tight italic mb-1">                                            <Text className="text-blue-500" size={16} />
                                            {selectedImage.caption}
                                        </p>
                                    )}
                                    {selectedImage.location && (
                                        <p className="text-sm text-gray-300 flex items-center gap-1">
                                            <MapPin className="text-blue-500" size={16} />
                                            {selectedImage.location}
                                        </p>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

const ShimmerCard = () => (
    <div className="bg-white rounded overflow-hidden shadow-2xl animate-pulse">
        <div className="bg-gray-300 h-[400px] w-full" />
    </div>
);

export default GalleryPage;
