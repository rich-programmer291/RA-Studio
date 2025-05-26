import React, { useState, useEffect } from 'react';
import { Text, MapPin, Heart } from 'lucide-react';

const PolaroidImage = ({ id, url, caption, location }) => {
    const [orientation, setOrientation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            const aspectRatio = img.width / img.height;
            setOrientation(aspectRatio > 1 ? 'landscape' : 'portrait');
            setLoading(false);
        };
    }, [url]);

   

    return (
        <div className="bg-white rounded overflow-hidden shadow-2xl transform hover:scale-105 hover:saturate-140 transition-all duration-300 cursor-pointer group">
            <div className="relative">
                {/* Image container with different height for portrait and landscape */}
                <div>
                    <img
                        src={url}
                        alt={caption || 'Gallery image'}
                        style={{ filter: "saturate(1.2) sharpen(1.3)" }}
                        className={`w-full object-cover h-[400px] transition-all duration-300 border-none outline-none `}
                    />
                    
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-opacity duration-300 p-2 flex flex-col justify-end  text-white">
                    <div className='bg-black bg-opacity-75 p-2 rounded-t'>
                        {location && (
                            <p className="text-xs text-gray-300 flex items-center gap-1 tracking-wide font-light">
                                <MapPin className="text-white" size={12} />
                                {location}
                            </p>
                        )}
                        {caption && (<p className="text-[0.7rem] flex gap-1 items-center tracking-wide font-semibold italic">
                            <Text className="text-white " size={12} />
                            {caption}</p>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PolaroidImage;
