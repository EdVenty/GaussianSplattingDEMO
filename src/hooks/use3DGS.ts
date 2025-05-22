// @ts-ignore
import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d'; 
import { useEffect, useState } from 'react';
// @ts-ignore
import * as THREE from 'three';

export function use3DGS(ref: React.RefObject<HTMLElement | null>, xr: boolean = false) {
    const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
    const [scene, setScene] = useState<THREE.Scene | null>(null);
    const [viewer, setViewer] = useState<GaussianSplats3D.Viewer | null>(null);
    const [modelLoaded, setModelLoaded] = useState(false);
    const [backgroundTexture, setBackgroundTexture] = useState<THREE.Texture | null>(null);

    setBackgroundTexture

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

        

        const boxColor = 0xBBBBBB;
        const boxGeometry = new THREE.BoxGeometry(0, 0, 0);
        const boxMesh = new THREE.Mesh(boxGeometry, new THREE.MeshBasicMaterial({'color': boxColor}));
        boxMesh.position.set(0, 0, 0);

        if (!scene) {
            console.warn('Scene is not set');
            return;
        }
        // scene.add(boxMesh);

        const _viewer = new GaussianSplats3D.Viewer({
            'renderer': renderer,
            'cameraUp': [0, 1, 0],
            'initialCameraPosition': [-8, 6, -8],
            'initialCameraLookAt': [0, 0, 0],
            'webXRMode': xr ? GaussianSplats3D.WebXRMode.AR : null,
            antialiased: true,
            sphericalHarmonicsDegree: 2,
            'halfPrecisionCovariancesOnGPU': false,
            splatRenderMode: GaussianSplats3D.SplatRenderMode.ThreeD,
            // 'sphericalHarmonicsDegree': 3,
            // 'gpuAcceleratedSort': true,
            // 'integerBasedSort': true,
            // 'threeScene': scene
        });
        setViewer(_viewer);

        return () => {
            window.removeEventListener('resize', resizeRenderer);
        };
    }, [renderer]);

    // useEffect(() => {
    //     if(xr) {
    //         console.log('XR mode enabled');
    //         if (viewer) {
    //             viewer.setWebXRMode({});
    //         }
    //     }
    // }, [xr, viewer]);

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

            const threeScene = new THREE.Scene();
            setScene(threeScene);

            const canvas = _renderer.domElement as HTMLCanvasElement;
            canvas.className += 'w-full h-full';
        }

        return () => {
            console.log('Cleaning up 3DGS');
            viewer?.stop();
            viewer?.dispose();
            ref.current?.removeChild(renderer?.domElement as HTMLCanvasElement);
        };
    }, [ref]);

    function setSkybox(path: string) {
        if (!renderer) return;
        console.log('Setting skybox', path);
        const loader = new THREE.TextureLoader();
        const bgTexture = loader.load(
            path,
            () => {
            console.log('Skybox loaded', bgTexture);
            bgTexture.mapping = THREE.EquirectangularReflectionMapping;
            bgTexture.colorSpace = THREE.SRGBColorSpace;

            
            },
            undefined,
            (error) => {
            console.error('Error loading skybox texture', error);
            }
        );
    }

    function addSplatScene(path: string) {
        viewer.addSplatScene(path, {
            // 'splatAlphaRemovalThreshold': 5,
            'progressiveLoad': false,
            'position': [0, -1, 0],
            'rotation': [ -0.258819, 0, 0.9659258, 0 ],
            'scale': [1.5, 1.5, 1.5]
        })
        .then(() => {
            
            viewer.start();
            if (scene) {
                scene.background = backgroundTexture;
            }
            setModelLoaded(true);
        });
        return () => {
            viewer.stop();
        };
    }

    return { viewer, addSplatScene, setSkybox, modelLoaded };
}