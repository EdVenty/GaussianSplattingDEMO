import React from 'react';
import { useNavigate } from 'react-router-dom';

const models = [
    {
        "name": "Здание",
        "file": "b2.ksplat",
        "image": "b2.png"
    },
    {
        "name": "Ferrari Monza",
        "file": "car2.ksplat",
        "image": "car2.png"
    },
    {
        "name": "Lotus Emira",
        "file": "car1.ksplat",
        "image": "car1.png"
    },
    {
        "name": "Ferrari Monza (сжатый)",
        "file": "car2c.ksplat",
        "image": "car2.png"
    }
];

const ListPage: React.FC = () => {
    const navigate = useNavigate();

    const handleModelClick = (model: { file: string }) => {
        navigate(`/viewer/${model.file}`);
    }

    const [currentIndex, setCurrentIndex] = React.useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % models.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + models.length) % models.length
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center relative">
            {/* Fullscreen image modal */}

            <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-6 text-center text-white">
                    Выберите сплат модель
                </h1>
                <div className="relative flex items-center">
                    <button
                        type="button"
                        onClick={prevSlide}
                        className="absolute left-0 z-10 bg-blue-700 hover:bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center"
                    >
                        ‹
                    </button>
                    <div className="w-full flex justify-center">
                        <div className="bg-gray-700 rounded-lg shadow-md p-4 flex flex-col items-center">
                            <img
                                src={models[currentIndex].image}
                                alt={models[currentIndex].name}
                                className="w-70 h-70 object-cover mb-4 rounded cursor-pointer"
                                onClick={() => handleModelClick(models[currentIndex])}
                            />
                            <button
                                type="button"
                                className="w-70 py-2 px-4 bg-blue-700 hover:bg-blue-600 text-white rounded transition duration-200"
                                onClick={() => handleModelClick(models[currentIndex])}
                            >
                                {models[currentIndex].name}
                            </button>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={nextSlide}
                        className="absolute right-0 z-10 bg-blue-700 hover:bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center"
                    >
                        ›
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ListPage;
