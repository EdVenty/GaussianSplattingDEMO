import React, { useEffect } from 'react';
import { use3DGS } from '../hooks/use3DGS';


interface ViewerProps extends React.HTMLProps<HTMLDivElement> {
    /**
     * The path to the splat scene to load.
     */
    src: string;
    skyboxSrc?: string;
    xr?: boolean;
    onLoaded?: () => any;
}


export const Viewer = ({
    src,
    skyboxSrc = undefined,
    xr = false,
    onLoaded,
    ...props
}: ViewerProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const { viewer, addSplatScene, setSkybox, modelLoaded } = use3DGS(ref, xr);

    

    useEffect(() => {
        if(modelLoaded){
            onLoaded?.();
            console.log('Model loaded');
        }
    }, [modelLoaded, onLoaded]);

    useEffect(() => {
        if(viewer) {
            console.log('Viewer initialized');
            if (skyboxSrc) {
                setSkybox(skyboxSrc);
            }
            addSplatScene(src);
        }
    }, [viewer]);


    return <div ref={ref} {...props} className='bg-gray-900 w-full h-full'>
        {!modelLoaded && <div 
            className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
        </div>}
    </div>;
}