import { Dismiss } from "flowbite";

// Define the showToast function globally
window.showToast = function () {
    const $toastEl = document.getElementById("toast-default");
    const $triggerEl = null;
    const options = {
        transition: "transition-opacity",
        duration: 1000,
        timing: "ease-out",
        onHide: (context, targetEl) => {},
    };
    const instanceOptions = {
        id: "toast-default",
        override: true,
    };
    const dismiss = new Dismiss($toastEl, $triggerEl, options, instanceOptions);

    $toastEl.classList.remove("hidden"); // Assuming "hidden" class is used to hide the toast
    setTimeout(() => {
        dismiss.hide();
    }, 3000); // Adjust the delay as needed
};
