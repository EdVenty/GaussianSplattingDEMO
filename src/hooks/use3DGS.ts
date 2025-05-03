// @ts-ignore
import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d'; 
import { useEffect, useState } from 'react';
// @ts-ignore
import * as THREE from 'three';

export function use3DGS(ref: React.RefObject<HTMLElement | null>, xr: boolean = false) {
    const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
    const [viewer, setViewer] = useState<GaussianSplats3D.Viewer | null>(null);

    useEffect(() => {
        if (!renderer) return;

        console.log('Creating viewer');

        if (!ref.current) {
            console.error('Ref is not set');
            return;
        }

        ref.current.appendChild(renderer.domElement);

        const resizeRenderer = () => {
            if (ref.current && renderer) {
                const { clientWidth, clientHeight } = ref.current;
                renderer.setSize(clientWidth, clientHeight);
            }
        };

        resizeRenderer(); // Initial resize
        window.addEventListener('resize', resizeRenderer);

        if(xr) console.log('XR mode enabled');

        const _viewer = new GaussianSplats3D.Viewer({
            'renderer': renderer,
            'cameraUp': [0, -1, -0.6],
            'initialCameraPosition': [-3, -1, -2],
            'initialCameraLookAt': [0, 1, 0],
            'webXRMode': xr ? GaussianSplats3D.WebXRMode.AR : null
        });
        setViewer(_viewer);

        return () => {
            window.removeEventListener('resize', resizeRenderer);
        };
    }, [renderer, xr]);

    useEffect(() => {
        console.log('use3DGS called');

        if (!ref.current) {
            console.error('Ref is not set');
            return;
        }

        if (!renderer) {
            console.log('Creating renderer');
            const _renderer = new THREE.WebGLRenderer({
                antialias: false
            });
            setRenderer(_renderer);

            const canvas = _renderer.domElement as HTMLCanvasElement;
            canvas.className += 'w-full h-full';
        }

        return () => {
            console.log('Cleaning up 3DGS');
            ref.current?.removeChild(renderer?.domElement as HTMLCanvasElement);
        };
    }, [ref]);

    function addSplatScene(path: string) {
        viewer.addSplatScene(path, {
            'splatAlphaRemovalThreshold': 5,
            'showLoadingUI': true,
            'position': [0, 1, 0],
            'rotation': [0, 0, 0, 1],
            'scale': [1.5, 1.5, 1.5]
        })
        .then(() => {
            viewer.start();
        });
        return () => {
            viewer.stop();
        };
    }

    return { viewer, addSplatScene };
}