import React, { useEffect, useMemo, useRef, useState } from "react";
import cloud1 from "./Cloud1.png";
import cloud2 from "./Cloud2.png";
import sky from "./sky.png";
import stars from "./Stars.png";
import sun from "./Sun2.png";
import shades from "./shades.png";
import ray from "./Ray.png";
import "./backgroundCanvas.css";
const Sky = new Image();
Sky.src = sky;
const Cloud1 = new Image();
Cloud1.src = cloud1;
const Cloud2 = new Image();
Cloud2.src = cloud2;
const Stars = new Image();
Stars.src = stars;
const Sun = new Image();
Sun.src = sun;
const Shades = new Image();
Shades.src = shades;
const Ray = new Image();
Ray.src = ray;
Ray.height = window.innerHeight;


class RayAnimate {
    offset: number = 0;
    ctx: CanvasRenderingContext2D;
    constructor(offset: number, ctx: CanvasRenderingContext2D) {
        this.offset = offset
        this.ctx = ctx;
    }
    animate() {
        const { ctx } = this;
        ctx.save();
        const rayOffset = window.innerWidth / 2;
        ctx.translate(rayOffset, window.innerHeight + 50);
        ctx.rotate(degToRad(this.offset));
        ctx.translate(-rayOffset, -window.innerHeight - 50);
        ctx.drawImage(Ray, window.innerWidth / 2 - Ray.width, 50, Ray.width, Ray.height);
        ctx.restore();
        this.offset = this.offset > 1200 ? -800 : this.offset+1;
    }

}

const degToRad = (deg: number) => {
    return deg / 180 / Math.PI
}

export const BackgroundCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>();
    const raysRef= useRef<RayAnimate[]>([])
    // const canvasRef = useRef<HTMLCanvasElement>();
    const [night, setNight] = useState<boolean>(false);

    useEffect(() => {
        const resize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
    
        raysRef.current = [
            new RayAnimate(-800, ctx),
            new RayAnimate(-400, ctx),
            new RayAnimate(0, ctx),
            new RayAnimate(400, ctx),
            new RayAnimate(800, ctx),
        ];
    
        const animate = (frame = 0) => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");
            if (!canvas || !ctx) return;
    
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(Sky, 0, 0, window.innerWidth, window.innerHeight);
            const opacity = Math.max((frame / 80) - 1, 0);
            ctx.filter = `opacity(${opacity})`;
            ctx.drawImage(Stars, 0, 0, window.innerWidth, window.innerHeight);
            ctx.filter = "none";
            raysRef.current.forEach(ray => ray.animate());
            ctx.drawImage(Sun, 0, 0, window.innerWidth, window.innerHeight);
            ctx.drawImage(Shades, 0, 0, window.innerWidth, window.innerHeight);
            ctx.drawImage(Cloud2, 0, 0, window.innerWidth, window.innerHeight);
            ctx.drawImage(Cloud1, 0, 0, window.innerWidth, window.innerHeight);
            requestAnimationFrame(() => animate(frame + 1));
        };
        setTimeout(()=>setNight(true), 1500)
        animate();
    }, []);


    return (
        <>
        <canvas className={`bgCanvas ${night && "night"}`} ref={canvasRef} />
        {/* <canvas className={`starCanvas`} ref={starCanvasRef} /> */}
        </>
    )
}