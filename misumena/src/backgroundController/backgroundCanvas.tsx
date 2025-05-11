// import React, { useEffect, useMemo, useRef, useState } from "react";
// import cloud1 from "./Cloud1.png";
// import cloud2 from "./Cloud2.png";
// import sky from "./sky.png";
// import stars from "./Stars.png";
// import sun from "./Sun2.png";
// import shades from "./shades.png";
// import ray from "./Ray.png";
// import "./backgroundCanvas.css";
// import { easeInOutCubic, lerp } from "src/utils/utils";
// const Sky = new Image();
// Sky.src = sky;
// const Cloud1 = new Image();
// Cloud1.src = cloud1;
// const Cloud2 = new Image();
// Cloud2.src = cloud2;
// const Stars = new Image();
// Stars.src = stars;
// const Sun = new Image();
// Sun.src = sun;
// const Shades = new Image();
// Shades.src = shades;
// const Ray = new Image();
// Ray.src = ray;
// Ray.height = window.innerHeight;
// const w = window.innerWidth;
// const h = window.innerHeight;


// class RayAnimate {
//     offset: number = 0;
//     ctx: CanvasRenderingContext2D;
//     constructor(offset: number, ctx: CanvasRenderingContext2D) {
//         this.offset = offset
//         this.ctx = ctx;
//     }
//     animate() {
//         const { ctx } = this;
//         ctx.save();
//         const rayOffset = window.innerWidth / 2;
//         ctx.translate(rayOffset, window.innerHeight + 50);
//         ctx.rotate(degToRad(this.offset));
//         ctx.translate(-rayOffset, -window.innerHeight - 50);
//         ctx.drawImage(Ray, window.innerWidth / 2 - Ray.width, 50, Ray.width, Ray.height);
//         ctx.restore();
//         this.offset = this.offset > 1200 ? -800 : this.offset + 1;
//     }

// }

// const degToRad = (deg: number) => {
//     return deg / 180 / Math.PI
// }

// export const BackgroundCanvas = () => {
//     const canvasRef = useRef<HTMLCanvasElement>();
//     const raysRef = useRef<RayAnimate[]>([])
//     const nightProgress = useRef(0);
//     const animationIdRef = useRef<number | null>(null);
//     // const canvasRef = useRef<HTMLCanvasElement>();
//     const [night, setNight] = useState<boolean>(false);
//     const maxFrames = 20

//     useEffect(() => {
//         const resize = () => {
//             if (canvasRef.current) {
//                 canvasRef.current.width = window.innerWidth;
//                 canvasRef.current.height = window.innerHeight;
//             }
//         };
//         resize();
//         window.addEventListener("resize", resize);
//         return () => window.removeEventListener("resize", resize);
//     }, []);

//     useEffect(() => {
//         if (!canvasRef.current) return;
//         const ctx = canvasRef.current.getContext("2d");
//         if (!ctx) return;

//         raysRef.current = [
//             new RayAnimate(-800, ctx),
//             new RayAnimate(-400, ctx),
//             new RayAnimate(0, ctx),
//             new RayAnimate(400, ctx),
//             new RayAnimate(800, ctx),
//         ];

//         const animate = (frame = 0) => {
//             const canvas = canvasRef.current;
//             const p = nightProgress.current
//             if (!canvas || !ctx) return;
//             ctx.clearRect(0, 0, canvas.width, canvas.height);

//             // Sky and base filter
//             ctx.filter = `hue-rotate(${lerp(0, -66, p)}deg) saturate(${lerp(1, 0.9, p)}) brightness(${lerp(1, 0.8, p)})`;
//             ctx.drawImage(Sky, 0, 0, w, h);
//             ctx.drawImage(Sun, 0, 0, w, h);
//             ctx.drawImage(Shades, 0, 0, w, h);

//             // Stars – only draw when needed
//             if (p > 0.01) {
//                 ctx.filter = `opacity(${lerp(0, 1, p)})`;
//                 ctx.drawImage(Stars, 0, 0, w, h);
//             }

//             // Reset for rays
//             ctx.filter = "none";
//             raysRef.current.forEach(ray => ray.animate());

//             // Clouds
//             ctx.filter = `brightness(${lerp(1, 0.7, p)}) hue-rotate(${lerp(0, -50, p)}deg)`;
//             ctx.drawImage(Cloud2, 0, 0, w, h);
//             ctx.drawImage(Cloud1, 0, 0, w, h);


//             requestAnimationFrame(() => animate(frame + 1));
//         };

//         animate()
//         setTimeout(() => setNight(true), 1500)

//     }, []);


//     return (
//         <>
//             <canvas className={`bgCanvas`} ref={canvasRef} />
//             {/* <canvas className={`starCanvas`} ref={starCanvasRef} /> */}
//         </>
//     )
// }

import React, { useEffect, useRef, useState } from "react";
import cloud1 from "./Cloud1.png";
import cloud2 from "./Cloud2.png";
import sky from "./sky.png";
import stars from "./Stars.png";
import sun from "./Sun2.png";
import shades from "./shades.png";
import ray from "./Ray.png";
import "./backgroundCanvas.css";


const lerp = (a, b, t) => a + (b - a) * t;
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

class RayAnimate {
    offset = 0;
    ctx;
    Ray
    constructor(Ray, offset, ctx) {
        this.offset = offset;
        this.ctx = ctx;
        this.Ray = Ray
    }
    animate() {
        const ctx = this.ctx;
        ctx.save();
        const rayOffset = window.innerWidth / 2;
        ctx.translate(rayOffset, window.innerHeight + 50);
        ctx.rotate((this.offset / 180) * Math.PI);
        ctx.translate(-rayOffset, -window.innerHeight - 50);
        ctx.drawImage(this.Ray, window.innerWidth / 2 - this.Ray.width, 50, this.Ray.width, this.Ray.height);
        ctx.restore();
        this.offset = this.offset > 1200 ? -800 : this.offset + .5;
    }
}

const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });

export const BackgroundCanvasController = () => {
    const [images, setImages] = useState<{
        Sky: HTMLImageElement;
        Cloud1: HTMLImageElement;
        Cloud2: HTMLImageElement;
        Stars: HTMLImageElement;
        Sun: HTMLImageElement;
        Shades: HTMLImageElement;
        Ray: HTMLImageElement;
    } | null>(null);

    useEffect(() => {
        const loadAllImages = async () => {
            try {
                const [Sky, Cloud1, Cloud2, Stars, Sun, Shades, Ray] = await Promise.all([
                    loadImage(sky),
                    loadImage(cloud1),
                    loadImage(cloud2),
                    loadImage(stars),
                    loadImage(sun),
                    loadImage(shades),
                    loadImage(ray),
                ]);
                setImages({ Sky, Cloud1, Cloud2, Stars, Sun, Shades, Ray });
            } catch (err) {
                console.error("Failed to load one or more images", err);
            }
        };

        loadAllImages();
    }, []);

    if (!images) {
        return <p>Loading background…</p>;
    }

    return <BackgroundCanvas {...images} />;
};

export const BackgroundCanvas = ({ Sky, Cloud1, Cloud2, Stars, Sun, Shades, Ray }) => {
    const skyRef = useRef<HTMLCanvasElement>();
    const starsRef = useRef<HTMLCanvasElement>();
    const raysRef = useRef<HTMLCanvasElement>();
    const cloudRef = useRef<HTMLCanvasElement>();
    const nightProgress = useRef(0);
    const rays = useRef([]);
    const [night, setNight] = useState(false);

    useEffect(() => {
        const resize = () => {
            [skyRef, starsRef, raysRef, cloudRef].forEach((ref) => {
                if (ref.current) {
                    ref.current.width = 1920;
                    ref.current.height = 947;
                }
            });
        };
        resize();
        // window.addEventListener("resize", resize);
        // return () => window.removeEventListener("resize", resize);
    }, []);

    const drawSky = () => {
        const ctx = skyRef.current?.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, skyRef.current.width, skyRef.current.height);
        ctx.drawImage(Sky, 0, 0, skyRef.current.width, skyRef.current.height);
        ctx.drawImage(Shades, 0, 0, skyRef.current.width, skyRef.current.height);
    }

    const drawStars = () => {
        const ctx = starsRef.current.getContext("2d");
        ctx.clearRect(0, 0, starsRef.current.width, starsRef.current.height);
        ctx.drawImage(Stars, 0, 0, starsRef.current.width, starsRef.current.height);
        ctx.globalAlpha = 1;
        // if (frame < maxFrames) {
        //     frame++;
        //     requestAnimationFrame(drawStars);
        // }
    }

    const drawRays = () => {
        const ctx = raysRef.current.getContext("2d");
        rays.current = [
            new RayAnimate(Ray, -800, ctx),
            new RayAnimate(Ray, -400, ctx),
            new RayAnimate(Ray, 0, ctx),
            new RayAnimate(Ray, 400, ctx),
            new RayAnimate(Ray, 800, ctx),
        ];

        const animateRays = () => {
            ctx.clearRect(0, 0, raysRef.current.width, raysRef.current.height);
            // ctx.filter = `hue-rotate(${lerp(0, -66, nightProgress.current)}deg) brightness(${lerp(1, 0.9, nightProgress.current)})`;
            rays.current.forEach(ray => ray.animate());
            requestAnimationFrame(animateRays);
        };
        animateRays();
    }

    const drawClouds = () => {
        const ctx = cloudRef.current.getContext("2d");
        ctx.clearRect(0, 0, cloudRef.current.width, cloudRef.current.height);
        //   ctx.filter = `hue-rotate(${lerp(0, -50, nightProgress.current)}deg)`;
        ctx.drawImage(Sun, 0, 0, skyRef.current.width, skyRef.current.height);
        ctx.drawImage(Cloud2, 0, 0, cloudRef.current.width, cloudRef.current.height);
        ctx.drawImage(Cloud1, 0, 0, cloudRef.current.width, cloudRef.current.height);
    }

    useEffect(() => {
        drawSky()
        drawStars();
        drawRays()
        drawClouds()
    }, []);


    useEffect(() => {
        setTimeout(() => setNight(true), 1500);
    }, []);

    return (
        <div style={{ zIndex: -1, position: "fixed" }}>
            <canvas ref={skyRef} className={"bgCanvas sky " + (night && "night")} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }} />
            <canvas ref={starsRef} className={"bgCanvas stars " + (night && "night")} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
            <canvas ref={raysRef} className={"bgCanvas rays " + (night && "night")} style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }} />
            <canvas ref={cloudRef} className={"bgCanvas clouds " + (night && "night")} style={{ position: 'absolute', top: 0, left: 0, zIndex: 3 }} />
        </div>
    );
};
