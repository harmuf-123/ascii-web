const ASCII = "@%#*+=-:. ";

const width = 90;

const gambar = [
    "foto1.jpg",
    "foto2.jpg"
];

const output = document.getElementById("ascii");

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

function gambarKeASCII(src){

    const img = new Image();

    img.src = src;

    img.onload = ()=>{

        const ratio = img.height / img.width;

        canvas.width = width;
        canvas.height = Math.floor(width * ratio * 0.55);

        ctx.drawImage(img,0,0,canvas.width,canvas.height);

        const data = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        ).data;

        let html = "";

        for(let y=0;y<canvas.height;y++){

            for(let x=0;x<canvas.width;x++){

                const index = (y*canvas.width+x)*4;

                const r=data[index];
                const g=data[index+1];
                const b=data[index+2];

                const gray=(r+g+b)/3;

                const c=ASCII[Math.floor(gray/255*(ASCII.length-1))];

                html += `<span style="color:rgb(${r},${g},${b})">${c}</span>`;
            }

            html+="\n";
        }

        output.innerHTML=html;

    }

}

let i=0;

gambarKeASCII(gambar[0]);

setInterval(()=>{

    i++;

    gambarKeASCII(gambar[i%gambar.length]);

},700);