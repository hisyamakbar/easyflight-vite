const toggleBtn = document.getElementById("toggleBtn");
const groupElement = toggleBtn.closest(".group");
const svgContainer = groupElement.querySelector("svg").parentElement;
const textElement = groupElement.querySelector("p");
const logo = document.getElementById("logo");

toggleBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark", toggleBtn.checked);
});

const todayDate = document.getElementById("todayDate");
const currentDate = new Date();
const options = { month: "long", day: "numeric", year: "numeric" };
todayDate.textContent = currentDate.toLocaleDateString(undefined, options);

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("submit", function (event) {
    event.preventDefault();
    const inputText = searchBar.querySelector("input").value;
    showToast(inputText);
    searchBar.querySelector("input").value = "";
});

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
