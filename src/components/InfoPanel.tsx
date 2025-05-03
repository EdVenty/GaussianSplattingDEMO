import React from 'react';

interface InfoPanelProps {
    title?: string;
    model?: string;
    file?: string;
    onViewInAR?: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ title = "3D Viewer", model = "Bonsai", file = "bonsai_trimmed.ksplat", onViewInAR }) => {
    return (
        <div className="fixed bottom-4 left-4 right-4 bg-white bg-opacity-50 text-black p-4 z-10 rounded-lg shadow-lg flex justify-between items-center">
            <div>
            <h1 className="text-lg font-bold">{title}</h1>
            <p>Model: {model}</p>
            <p>File: {file}</p>
            </div>
            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition" onClick={() => onViewInAR?.()}>
            View in AR
            </button> */}
        </div>
    );
};

export default InfoPanel;