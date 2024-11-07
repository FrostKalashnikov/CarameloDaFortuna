window.onload = function() {
    const wheel = document.querySelector(".wheel");
    const startButton = document.querySelector(".button");

    let deg = 0;

    startButton.addEventListener("click", () => {
        const audio = new Audio('sound.mp3');
        audio.play().catch(error => console.log("Erro ao reproduzir áudio:", error));

        startButton.style.pointerEvents = "none";

        deg = Math.floor(5000 + Math.random() * 5000);
        wheel.style.transition = "transform 10s ease";
        wheel.style.transform = `rotate(${deg}deg)`;
        wheel.classList.add("blur");

        setTimeout(() => {
            startButton.style.pointerEvents = "auto";
            wheel.classList.remove("blur");
            
            const finalDeg = deg % 360;
            const result = Math.floor(finalDeg / (360 / 37));
            document.getElementById("result").innerText = `Resultado: ${result}`;
        }, 10000);
    });
}
