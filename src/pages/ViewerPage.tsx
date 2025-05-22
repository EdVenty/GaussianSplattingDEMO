import React from 'react';
import { Viewer } from '../components/3DGSViewer'
import { useNavigate, useParams } from 'react-router-dom';
import Back from '../components/Back';

const ViewerPage: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();

    return (
        <div className="viewer-page w-full h-full">
            {/* <InfoPanel
                title="Clock"
                model="Vintage"
                file="clock.ksplat"
            /> */}
            
            {params.splat ? 
            <Viewer
                src={`/${params.splat}`}
                // skyboxSrc="alex.jpg"
                className="w-full h-full"
            />
            : <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-500">No model selected</p>
            </div>}

            <Back handleClick={() => navigate('/')} />
            {/* <InfoPanel
                title="Clock"
                model="Vintage"
                file="clock.ksplat"
                onARButtonClick={() => navigate('/')}
            /> */}
        </div>
    );
};

export default ViewerPage;