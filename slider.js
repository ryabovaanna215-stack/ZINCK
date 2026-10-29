document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider_welcome");
    const track = document.querySelector("#track_header");
    const dotsContainer = document.querySelector(".slider_welcome .dots");
    const dots = document.querySelectorAll(".slider_welcome .dot");
    const cards = document.querySelectorAll("#track_header .conteiner_header");

    if (!track || !slider || !dotsContainer || cards.length === 0) {
        console.warn("Слайдер приветствия: не найдены нужные элементы");
        return;
    }

    const countCards = cards.length;
    let currentNumber = 1;

    const getCardWidth = () => slider.clientWidth;

    dots[0]?.classList.add("active");

    function updateDots() {
        dots.forEach(dot => {
            dot.classList.toggle(
                "active",
                +dot.getAttribute("data-number") === currentNumber
            );
        });
    }

    function goToSlide(n, animate = true) {
        currentNumber = Math.min(Math.max(n, 1), countCards);
        updateDots();
        const shift = -((currentNumber - 1) * getCardWidth());
        track.style.transition = animate ? "transform 0.6s ease" : "none";
        track.style.transform = `translateX(${shift}px)`;
    }

    // ===== Клик по точкам =====
    dotsContainer.addEventListener("click", (event) => {
        const newDot = event.target.closest(".dot");
        if (!newDot) return;
        goToSlide(+newDot.getAttribute("data-number"));
    });

    // ===== Drag & Drop (Pointer Events) =====
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let startTransform = 0;

    slider.addEventListener("pointerdown", (e) => {
        if (e.target.closest(".dots")) return;
        if (e.pointerType === "mouse" && e.button !== 0) return;

        isDragging = true;
        startX = currentX = e.clientX;
        startTransform = -((currentNumber - 1) * getCardWidth());

        track.style.transition = "none";
        slider.classList.add("dragging");
        slider.setPointerCapture(e.pointerId);
    });

    slider.addEventListener("pointermove", (e) => {
        if (!isDragging) return;
        currentX = e.clientX;
        const diff = currentX - startX;
        track.style.transform = `translateX(${startTransform + diff}px)`;
    });

    function endDrag(e) {
        if (!isDragging) return;
        isDragging = false;
        slider.classList.remove("dragging");

        if (e && slider.hasPointerCapture?.(e.pointerId)) {
            slider.releasePointerCapture(e.pointerId);
        }

        const diff = currentX - startX;
        const threshold = getCardWidth() * 0.15;

        if (diff < -threshold) {
            currentNumber = currentNumber < countCards ? currentNumber + 1 : 1;
        } else if (diff > threshold) {
            currentNumber = currentNumber > 1 ? currentNumber - 1 : countCards;
        }

        goToSlide(currentNumber, true);
    }

    slider.addEventListener("pointerup", endDrag);
    slider.addEventListener("pointercancel", endDrag);
    slider.addEventListener("pointerleave", (e) => {
        if (isDragging) endDrag(e);
    });

    // ===== Ресайз =====
    window.addEventListener("resize", () => goToSlide(currentNumber, false));

    let autoTimer = null;

    function startAuto() {
        stopAuto();
        autoTimer = setInterval(() => {
            if (!isDragging) {
                goToSlide(currentNumber < countCards ? currentNumber + 1 : 1);
            }
        }, 5000);
    }

    function stopAuto() {
        if (autoTimer) clearInterval(autoTimer);
        autoTimer = null;
    }

    // Пауза при взаимодействии
    slider.addEventListener("pointerdown", stopAuto);
    slider.addEventListener("pointerup", startAuto);
    dotsContainer.addEventListener("click", startAuto);

    startAuto();
});