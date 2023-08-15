import React, { useEffect, useMemo, useRef } from "react";
import cloud1 from "./Cloud1.png";
import cloud2 from "./Cloud2.png";
import sky from "./sky.png";
import stars from "./Stars.png";
import sun from "./Sun2.png";
import shades from "./shades.png";
import ray from "./Ray.png";
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
        console.log(rayOffset);
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
    const skyRotation = useMemo(() => ({ current: 0 }), [])
    const canvasRef = useRef<HTMLCanvasElement>();
    const animate = (rays:RayAnimate[]=[]) => {
        if (!canvasRef?.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        ctx.drawImage(Sky, 0, 0, window.innerWidth, window.innerHeight);
        ctx.drawImage(Stars, 0, 0, window.innerWidth, window.innerHeight)

        rays.forEach((_Ray)=>_Ray.animate());


        ctx.drawImage(Sun, 0, 0, window.innerWidth, window.innerHeight)
        ctx.drawImage(Shades, 0, 0, window.innerWidth, window.innerHeight);
        ctx.drawImage(Cloud2, 0, 0, window.innerWidth, window.innerHeight);
        ctx.drawImage(Cloud1, 0, 0, window.innerWidth, window.innerHeight);
        requestAnimationFrame(()=>animate(rays));
    }
    useEffect(() => {
        if (canvasRef.current) {
            const rays = [
                new RayAnimate(-800, canvasRef.current.getContext("2d")),
                new RayAnimate(-400, canvasRef.current.getContext("2d")),
                new RayAnimate(0, canvasRef.current.getContext("2d")),
                new RayAnimate(400, canvasRef.current.getContext("2d")),
                new RayAnimate(800, canvasRef.current.getContext("2d"))
            ]
            animate(rays);

        }
    }, [canvasRef.current])


    return (
        <canvas style={{ height: "100vh", width: "100vw", position: "fixed", top: 0, left: 0 }} ref={canvasRef} />
    )
}