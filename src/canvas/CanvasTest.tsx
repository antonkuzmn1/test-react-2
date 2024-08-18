import {useEffect, useRef, useState} from 'react';
import './CanvasTest.scss';

const CanvasTest = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [clicked, setClicked] = useState(false);

    const onMouseDown = (ev: MouseEvent) => {
        setClicked(true);
    }

    const onMouseMove = (ev: MouseEvent) => {
        if (!clicked) {
            return;
        }
        // console.log(ev);
        const x = ev.clientX;
        const y = ev.clientY;

        const ref = canvasRef.current;
        if (!ref) {
            return;
        }

        const ctx = ref.getContext("2d");
        if (!ctx) {
            return;
        }

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }

    const onMouseUp = (ev: MouseEvent) => {
        setClicked(false);
    }

    useEffect(() => {
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        }
    })

    return (
        <canvas
            ref={canvasRef}
            className="CanvasTest"
            width={window.innerWidth}
            height={window.innerHeight}
        />
    );
};

export default CanvasTest;
