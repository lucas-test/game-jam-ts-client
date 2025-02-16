import { io } from "socket.io-client";

const adress = "http://localhost:3033";
console.log("connecting to: ", adress);
const socket = io(adress);

// Quand la souris bouge on envoie au serveur sa position
// On peut mettre n'importe quoi à la place de "setPosition" mais il faut concorder avec le serveur
window.onmousemove = (mouseEvent: MouseEvent) => {
    const x = mouseEvent.pageX;
    const y = mouseEvent.pageY;
    socket.emit("setPosition", x, y);
}

const players = new Map<string, HTMLDivElement>();


socket.on("setPosition", (id: string, x: number, y: number) => {
    console.log("setPosition", id, x, y);
    const player = players.get(id);
    if (typeof player == "undefined"){
        const div = document.createElement("div")
        div.classList.add("player")
        document.body.appendChild(div);
        div.style.top = `${y}px`
        div.style.left = `${x}px`
        players.set(id, div);
    } else {
        player.style.top = `${y}px`
        player.style.left = `${x}px`
    }
})