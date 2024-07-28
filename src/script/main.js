document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggleBtn");
    const groupElement = toggleBtn.closest(".group");
    const svgContainer = groupElement.querySelector("svg").parentElement;
    const textElement = groupElement.querySelector("p");
    const logo = document.getElementById("logo");

    const lightModeSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 3C10.8065 4.19347 10.136 5.81217 10.136 7.5C10.136 9.18783 10.8065 10.8065 12 12C13.1935 13.1935 14.8122 13.864 16.5 13.864C18.1878 13.864 19.8065 13.1935 21 12C21 13.78 20.4722 15.5201 19.4832 17.0001C18.4943 18.4802 17.0887 19.6337 15.4442 20.3149C13.7996 20.9961 11.99 21.1743 10.2442 20.8271C8.49836 20.4798 6.89472 19.6226 5.63604 18.364C4.37737 17.1053 3.5202 15.5016 3.17294 13.7558C2.82567 12.01 3.0039 10.2004 3.68509 8.55585C4.36628 6.91131 5.51983 5.50571 6.99987 4.51677C8.47991 3.52784 10.22 3 12 3Z" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>`;

    const darkModeSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 2V4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 20V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.92993 4.93005L6.33993 6.34005" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17.6599 17.66L19.0699 19.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12H4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20 12H22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.33993 17.66L4.92993 19.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19.0699 4.93005L17.6599 6.34005" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;

    toggleBtn.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark", toggleBtn.checked);
        updateUI();
    });

    function updateUI() {
        const isDarkMode = document.documentElement.classList.contains("dark");
        svgContainer.innerHTML = isDarkMode ? darkModeSVG : lightModeSVG;
        textElement.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
        logo.src = isDarkMode ? "public/logo/Logo-dark.svg" : "public/logo/Logo.svg";
    }

    // Initial load
    updateUI();

    // Helper function to get the name of the day
    function getDayName(date) {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[date.getDay()];
    }

    // Function to add dates and days to Swiper
    function populateDates(numberOfDaysBefore, numberOfDaysAfter, swiper) {
        const today = new Date();

        function createSlide(date) {
            const dayName = getDayName(date);
            const dateNum = date.getDate();

            const slideDiv = document.createElement("div");
            slideDiv.className = "swiper-slide";

            const dayParagraph = document.createElement("p");
            dayParagraph.className = "swiperText";
            dayParagraph.textContent = dayName;

            const dateParagraph = document.createElement("p");
            dateParagraph.className = "swiperText";
            dateParagraph.textContent = dateNum;

            slideDiv.appendChild(dayParagraph);
            slideDiv.appendChild(dateParagraph);

            return slideDiv;
        }

        const slides = [];

        // Add previous days
        for (let i = numberOfDaysBefore; i > 0; i--) {
            const previousDate = new Date(today);
            previousDate.setDate(today.getDate() - i);
            slides.push(createSlide(previousDate));
        }

        // Add today
        slides.push(createSlide(today));

        // Add next days
        for (let i = 1; i <= numberOfDaysAfter; i++) {
            const nextDate = new Date(today);
            nextDate.setDate(today.getDate() + i);
            slides.push(createSlide(nextDate));
        }

        // Append slides to Swiper
        swiper.appendSlide(slides);

        // Update Swiper to reflect the new slides
        swiper.update();
    }

    // Function to update visibility based on the active slide
    function updateVisibility() {
        const today = new Date();
        const dayNameToday = getDayName(today);

        const activeSlide = document.querySelector(".swiper-slide-active p:first-child");
        const bdoData = document.getElementById("bdoData");
        const bdoDataNo = document.getElementById("bdoDataNo");

        if (activeSlide && activeSlide.textContent.trim() === dayNameToday) {
            bdoData.classList.remove("hide");
            bdoData.classList.add("transition", "show");
            bdoDataNo.classList.remove("show");
            bdoDataNo.classList.add("transition", "hide");
        } else {
            bdoData.classList.remove("show");
            bdoData.classList.add("transition", "hide");
            bdoDataNo.classList.remove("hide");
            bdoDataNo.classList.add("transition", "show");
        }
    }

    // Initialize Swiper
    const swiper = new Swiper(".swiper-container", {
        slidesPerView: 7,
        spaceBetween: 0,
        centeredSlides: true,
        grabCursor: true,
        initialSlide: 15,
        on: {
            init: function () {
                // Ensure Swiper is fully initialized before updating visibility
                this.on("transitionEnd", function () {
                    updateVisibility();
                });
                updateVisibility();
            },
            slideChange: function () {
                updateVisibility();
            },
        },
    });

    // Call the function to fill dates and days
    populateDates(15, 15, swiper);

    // Update visibility after a brief delay to ensure Swiper is ready
    setTimeout(() => updateVisibility(), 0);

    // BDO Slider functionality
    const slider = document.querySelector(".slider");
    const imageAfter = document.querySelector(".image-after");
    const container = document.querySelector(".bdoContainer");
    let isDragging = false;

    slider.addEventListener("mousedown", function (e) {
        isDragging = true;
        e.preventDefault(); // Prevent selection
    });

    document.addEventListener("mouseup", function () {
        isDragging = false;
    });

    document.addEventListener("mousemove", function (e) {
        if (!isDragging) return;

        const rect = container.getBoundingClientRect();
        let offsetY = e.clientY - rect.top;

        offsetY = Math.max(0, Math.min(offsetY, rect.height));
        const percentage = (offsetY / rect.height) * 100;
        updateSliderAndImage(percentage);
    });

    // Prevent selection while dragging
    container.addEventListener("dragstart", function (e) {
        e.preventDefault();
    });

    document.addEventListener("selectstart", function (e) {
        if (isDragging) e.preventDefault();
    });

    function updateSliderAndImage(percentage) {
        slider.style.top = `${percentage}%`;
        imageAfter.style.clipPath = `polygon(0 0, 100% 0, 100% ${percentage}%, 0% ${percentage}%)`;
    }

    // Initialize slider and image position
    updateSliderAndImage(60);
});
