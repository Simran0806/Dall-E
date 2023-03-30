import React from 'react'


export default function Edit() {



    const fileSelected = (event) => {
        const file = event.target.files[0]
        console.log(file);
        const img = new Image()
        img.src = URL.createObjectURL(file)
        img.onload = () => {
            if (img.width !== img.height) {
                const minVal = Math.min(img.width, img.height)
                setup(img, 0, 0, minVal, minVal)
            } else {
                setup(img, 0, 0, img.width, img.height)
            }
        }
    }

    const setup = (img, x, y, width, height) => {
        const node = document.getElementById("PictureLayer");
        
        if (node && node.parentNode) {
            node.parentNode.removeChild(node);
        }

        var can = document.createElement('canvas');
        can.id = "PictureLayer"
        can.width = window.innerWidth /5
        can.height = window.innerWidth /5
        can.style = 'margin:auto;'
        const outerCanvas = document.getElementById('outer-canvas')
        outerCanvas.appendChild(can)

        var ctx = can.getContext("2d")
        ctx.drawImage(img, x, y, width, height, 0, 0, can.width, can.height);
        ctx.lineCap = "round";
        ctx.lineWidth = 50;
        ctx.globalCompositeOperation = 'destination-out'
        let isDrawing = false

        const startDrawing = (event) => {
            isDrawing = true
            const pos = getPos(event)
            console.log('start erasing', pos)
            points.setStart(pos.x, pos.y)
        }
        const stopDrawing = () => {
            console.log('stop erasing')
            isDrawing = false
        }
        const draw = (event) => {
            if (!isDrawing) return
            const pos = getPos(event)
            points.newPoint(pos.x, pos.y)
        }

        var points = function () {
            var queue = [], qi = 0;

            function clear() {
                queue = [];
                qi = 0;
            }

            function setStart(x, y) {
                clear();
                newPoint(x, y);
            }

            function newPoint(x, y) {
                queue.push([x, y]);
            }

            function tick() {
                var k = 20; // adjust to limit points drawn per cycle
                if (queue.length - qi > 1) {
                    ctx.beginPath();
                    if (qi === 0)
                        ctx.moveTo(queue[0][0], queue[0][1]);
                    else
                        ctx.moveTo(queue[qi - 1][0], queue[qi - 1][1]);

                    for (++qi; --k >= 0 && qi < queue.length; ++qi) {
                        ctx.lineTo(queue[qi][0], queue[qi][1]);
                    }
                    ctx.stroke();
                }
            }

            setInterval(tick, 50); // adjust cycle time

            return {
                setStart: setStart,
                newPoint: newPoint
            };
        }()

        window.addEventListener("touchstart", startDrawing)
        window.addEventListener("mouseup", stopDrawing)
        can.addEventListener("touchend", stopDrawing)
        can.addEventListener("mousedown", startDrawing)
        can.addEventListener("mousemove", draw)
        can.addEventListener("touchmove", draw)

        function getPos(e) {
            var rect = can.getBoundingClientRect();
            if (e.touches) {
                return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top }
            }
            return { x: e.clientX - rect.left, y: e.clientY - rect.top }
        }
        setOriginalImage(can.toDataURL())
    }

    var originalImage = null
    const setOriginalImage = (img) => {
        originalImage = img
        console.log(img);
    }
    const downloadOriginal = () => {
        console.log('download original')
        const node = document.getElementById("PictureLayer")
        if (!node) return
        var link = document.createElement('a')
        link.download = 'original.png'
        link.href = originalImage
        link.click()
    }

    const downloadMask = () => {
        console.log('download mask')
        const node = document.getElementById("PictureLayer")
        if (!node) return
        var link = document.createElement('a')
        link.download = 'mask.png'
        link.href = node.toDataURL()
        link.click()
    }

    return (
        <>
            <input type="file" accept="image/*" onChange={fileSelected} />
            <div id='outer-canvas' />
            <div>
                <button onClick={downloadMask}>MASK</button>
                <button onClick={downloadOriginal}>ORIGINAL</button>
            </div>
        </>

    )
}
