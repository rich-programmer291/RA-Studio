import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Footer, Navbar } from '../Components';

const Credits = () => {
    const resources = [
        { name: 'Icons8', url: 'https://icons8.com/', items: 'Icons' },
        { name: 'Flaticon', url: 'https://www.flaticon.com/', items: 'Icons' },
        { name: 'Pexels', url: 'https://www.pexels.com/', items: 'Background Images' },
        { name: 'Unsplash', url: 'lash.com/photos/black-camera-lens-on-white-background-QYVCzK-bnYU', items: 'Background Image' },
    ];

    return (
        <>
            <div style={{ backgroundImage: "url('https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')", backgroundSize: "cover", backgroundPosition: "center" }}
                className="min-h-screen">
                <div className='rounded-full p-4 w-[max-content] rouned-full '>
                    <Link
                        to="/"
                        className=""
                        aria-label="Go back"
                    >
                        <ArrowLeft size={24} className='' />
                    </Link>
                </div>
                <div className="rounded-md bg-white/50 border border-white px-6 py-10 shadow-lg max-w-xl mx-auto mt-10">
                    <div className="flex flex-col items-center mb-6">

                        <h2 className="text-3xl font-semibold text-center flex-1 ">
                            Credits & Resources</h2>
                        <p className='text-sm text-center text-gray-600 mt-2'>
                            Thank you to all the creators and resource providers that made this project possible!
                        </p>
                    </div>

                    <div className="bg-white/75 rounded-md shadow-inner p-6 border border-gray-200">
                        <ul className="space-y-4">
                            {resources?.map((resource, index) => (
                                <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-blue-700 hover:text-blue-900 font-medium transition duration-200"
                                >
                                    💙 {resource.name} - {resource.items}
                                </a>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
            <Footer />
        </>

    );
};

export default Credits;
