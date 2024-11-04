let slot_screen = document.getElementById("slot-screen");
let reel = document.getElementsByClassName("reel");
let reels = document.getElementsByClassName("reels");
let stop_btn = document.getElementsByClassName("stop-btn");
let start_btn = document.getElementById("start-btn");

let sec = 500;
let stopReelFlag = [];
let reelCounts = [];
let slotFrameHeight;
let slotReelsHeight;
let slotReelItemHeight;
let slotReelStartHeight;

let slot = {
    init: function() {
        stopReelFlag = [false, false, false];
        reelCounts = [0, 0, 0];
    },

    start: function() {
        slot.init();
        for (let index = 0; index < 3; index++) {
            slot.animation(index);
        }
    },

    stop: function(i) {
        stopReelFlag[i] = true;

        // Check if all reels are stopped
        if (stopReelFlag.every(flag => flag === true)) {
            start_btn.removeAttribute("disabled");
            for (let btn of stop_btn) {
                btn.setAttribute("disabled", true);
            }

            // Check if all three reels have the same image
            if (this.checkWin()) {
                alert("Congratulations! You won!");
            }
        }
    },

    // Function to check if all three reels display the same image
    checkWin: function() {
        const reelImages = [];

        for (let i = 0; i < reels.length; i++) {
            // Get the currently visible image in each reel
            const reelItems = reels[i].getElementsByTagName("li");
            const visibleImage = reelItems[reelCounts[i] % reelItems.length].getElementsByTagName("img")[0].src;
            reelImages.push(visibleImage);
        }

        // Check if all images in reelImages array are the same
        return reelImages.every((img, _, arr) => img === arr[0]);
    },

    resetLocationInfo: function() {
        slotFrameHeight = slot_screen.offsetHeight;
        slotReelsHeight = reels[0].offsetHeight;
        slotReelItemHeight = reel[0].offsetHeight;
        slotReelStartHeight = -slotReelsHeight + slotFrameHeight - (slotFrameHeight / 2) + (slotReelItemHeight * 3 / 2);
        
        for (let i = 0; i < reels.length; i++) {
            reels[i].style.top = slotReelStartHeight + "px";
        }
    },

    animation: function(index) {
        if (reelCounts[index] >= 10) {
            reelCounts[index] = 0;
        }
        
        reels[index].style.transition = `top ${sec}ms linear`;
        reels[index].style.top = `${slotReelStartHeight + (reelCounts[index] * slotReelItemHeight)}px`;

        setTimeout(() => {
            if (!stopReelFlag[index]) {
                reelCounts[index]++;
                slot.animation(index);
            }
        }, sec);
    }
};

window.onload = function() {
    slot.init();
    slot.resetLocationInfo();

    start_btn.addEventListener("click", function(e) {
        e.target.setAttribute("disabled", true);
        slot.start();

        for (let btn of stop_btn) {
            btn.removeAttribute("disabled");
        }
    });

    for (let i = 0; i < stop_btn.length; i++) {
        stop_btn[i].addEventListener("click", function(e) {
            slot.stop(parseInt(e.target.getAttribute("data-val")));
        });
    }
};
