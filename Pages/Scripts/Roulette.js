window.onload = function() {
    const wheel = document.querySelector(".wheel");
    const startButton = document.querySelector(".button");

    let deg = 0;
    const totalSections = 37; // Número de seções da roleta

    startButton.addEventListener("click", () => {
        const audio = new Audio('sound.mp3');
        audio.play().catch(error => console.log("Erro ao reproduzir áudio:", error));

        startButton.style.pointerEvents = "none";

        // Gera um valor aleatório de rotação (entre 5000 e 10000 graus)
        deg = Math.floor(5000 + Math.random() * 5000);
        wheel.style.transition = "transform 10s ease";
        wheel.style.transform = `rotate(${deg}deg)`;
        wheel.classList.add("blur");

        setTimeout(() => {
            startButton.style.pointerEvents = "auto";
            wheel.classList.remove("blur");

            // Aqui, calculamos o ângulo final
            const finalDeg = deg % 360;
            
            // Divida o ângulo final pela quantidade de seções (37), 
            // e arredonde para pegar o número correspondente à seção.
            const resultIndex = Math.floor(finalDeg / (360 / totalSections));

            // Exibe o resultado
            document.getElementById("result").innerText = `Resultado: ${resultIndex}`;
        }, 10000);
    });
}
