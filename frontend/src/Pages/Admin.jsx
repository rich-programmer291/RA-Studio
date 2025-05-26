import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, MapPin, Text, LogOut, ArrowLeft } from 'lucide-react';
import { Footer } from '../Components';


const AdminPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const login = localStorage.getItem('token');
    if (!login) {
      toast.error('Please login first');
      navigate('/');
    }
  }, [navigate]);

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);



  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://ra-studio.onrender.com/api/images');
        const data = await response.json();
        setImages(data.images);
      } catch (err) {
        toast.error('Failed to fetch images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleUpload = async () => {
    if (!selectedImage) return toast.error('Please select an image');

    const formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('caption', caption);
    formData.append('location', location);

    try {
      setLoading(true);
      const response = await fetch('https://ra-studio.onrender.com/api/images/upload', {
        method: 'POST',
        body: formData,
      });
      setDisable(true);

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast.success('Image uploaded successfully!');
        setDisable(false);
        setImages([...images, data.image]);
        setSelectedImage(null);
        setCaption('');
        setLocation('');
      } else {
        toast.error(data.message || 'Failed to upload image');
      }
    } catch (err) {
      toast.error('Upload error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imageId) => {
    try {
      setLoading(true);
      const res = await fetch('https://ra-studio.onrender.com/api/images/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_id: imageId }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success('Image deleted');
        setImages(images.filter((img) => img.public_id !== imageId));
      } else {
        toast.error(data.message || 'Deletion failed');
      }
    } catch (err) {
      toast.error('Delete error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out Successfully!');
    navigate('/login');
  };

  return (
    <>
      <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550353185-761a5da3ee96?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-5xl mx-auto bg-white/40 backdrop-blur-sm p-6 border-l border-r border-white">

          <div className="my-4 justify-right text-right flex justify-between">
            <Link to="/" className="" title='Go to Home'>
              <ArrowLeft size={24} className="text-black" />  </Link>
            <button
              onClick={handleLogout}
              alt="Logout"
              title='Logout'
              className=""
            >
              <LogOut />
            </button>
          </div>
          <h1 className="text-3xl font-bold mb-6 text-center">Manage Images</h1>

          {/* Upload Form */}
          <div className="mb-6 space-y-4 items-center justify-center text-center">
            <input
              type="file"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              className="block"
            />
            <input
              type="text"
              placeholder="Caption (optional)"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="block w-full border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Location (optional)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="block w-full border border-gray-300 rounded px-3 py-2"
            />
            <button
              onClick={handleUpload}
              className="bg-blue-600 text-white py-2 px-4 rounded"
              disabled={disable}
            >
              Upload Image
            </button>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, index) => (
                  <ShimmerCard key={index} />
                ))}
              </div>
            ) : (
              images?.map((image) => (
                <div key={image.public_id} className="relative group cursor-pointer">
                  <img
                    src={image.url}
                    alt={image.caption || 'Uploaded Image'}
                    className="w-full h-48 object-cover rounded"
                  />
                  <div className='absolute inset-0 flex flex-col justify-end p-4 bg-black/30 opacity-0 group-hover:bg-opacity-100 group-hover:opacity-100 duration-300'>
                    {image.caption && <p className="mt-1 text-sm text-white flex items-center">
                      <Text className='mr-1 text-blue-300' size={12} />
                      {image.caption}</p>}
                    {image.location && <p className="text-[0.8rem] text-white mt-1 flex items-center">
                      <MapPin className='text-blue-300  mr-1' size={12} />{image.location}</p>}
                  </div>

                  <button
                    onClick={() => handleDelete(image.public_id)}
                    title='Delete this Image'
                    className="absolute top-2 right-2 text-white p-2 rounded-full"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
            <Footer />
    </>
  );
};

const ShimmerCard = () => (
  <div className="rounded overflow-hidden shadow animate-pulse bg-white">
    <div className="bg-gray-300 h-48 w-full rounded-t" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);


export default AdminPage;
