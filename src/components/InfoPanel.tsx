import React from 'react';

interface InfoPanelProps {
    title?: string;
    model?: string;
    file?: string;
    enableXR?: boolean;
    isXR?: boolean;
    onARButtonClick?: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ title = "3D Viewer", model = "Bonsai", file = "bonsai_trimmed.ksplat", onARButtonClick = undefined }) => {
    return (
        <div className="fixed bottom-4 left-4 right-4 bg-gray-800 bg-opacity-50 text-white p-4 z-10 rounded-lg shadow-lg flex justify-between items-center">
            <div>
            <h1 className="text-lg font-bold">{title}</h1>
            <p>Model: {model}</p>
            <p>File: {file}</p>
            </div>
            <button onClick={() => onARButtonClick?.()} className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                назад
            </button>
            {/* {enableXR && (
                <button onClick={() => onARButtonClick?.()} className="7g-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    {isXR ? 'Go back to view' : 'View in AR' }
                </button>
            )} */}
        </div>
    );
};

export default InfoPanel;