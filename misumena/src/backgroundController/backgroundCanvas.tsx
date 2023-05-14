import React, { useEffect, useRef } from "react";
import cloud1 from "./Cloud1.png";
import cloud2 from "./Cloud2.png";
import sky from "./sky.png";
import stars from "./Stars.png";
import sun from "./Sun2.png";
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
export const BackgroundCanvas = () => {

    const canvasRef = useRef<HTMLCanvasElement>();
    useEffect(() => {
        if (!canvasRef?.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.height = 1080;
        canvas.width = 1970;
        ctx.drawImage(Sky, 0, 0, 1970, 1080);
        ctx.drawImage(Stars, 0, 0, 1970, 1080)
        ctx.drawImage(Sun, 0, 0, 1970, 1080)
        ctx.drawImage(Cloud2, 0, 0, 1970, 1080);
        ctx.drawImage(Cloud1, 0, 0, 1970, 1080);

    }, [canvasRef])


    return (
        <canvas  style={{ height:"100vh", width:"100vw", position: "fixed", top: 0, left: 0 }} ref={canvasRef} />
    )
}