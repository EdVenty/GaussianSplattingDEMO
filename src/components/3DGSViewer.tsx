import React, { useEffect } from 'react';
import { use3DGS } from '../hooks/use3DGS';


interface ViewerProps extends React.HTMLProps<HTMLDivElement> {
    /**
     * The path to the splat scene to load.
     */
    src: string;
    xr?: boolean;
}


export const Viewer = ({
    src,
    xr = false,
    ...props
}: ViewerProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const { viewer, addSplatScene } = use3DGS(ref, xr);

    useEffect(() => {
        if(viewer) {
            console.log('Viewer initialized');
            addSplatScene(src);
        }
    }, [viewer]);


    return <div ref={ref} {...props}></div>;
}