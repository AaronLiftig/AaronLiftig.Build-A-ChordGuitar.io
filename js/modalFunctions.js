function openModal(modal) {
    if (modal == null) return;
    modal.classList.add("active");
    overlay.classList.add("active");
}


function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove("active");
    overlay.classList.remove("active");
}


function addCloseEventListenersToButtonAndOverlay() {
    const closeModalButtons = document.querySelectorAll("[data-close-button]");
    const overlay = document.getElementById("overlay");

    overlay.addEventListener("click", () => {
        const modals = document.querySelectorAll(".modalDiv.active");
        modals.forEach(modal => {
            closeModal(modal);
        })
    })

    closeModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest(".modalDiv");
            closeModal(modal);
        })
    })
}