const images = document.querySelectorAll("img");

images.forEach(img => {
    img.addEventListener("dragstart", dragStart);
    img.addEventListener("dragover", dragOver);
    img.addEventListener("drop", drop);
    img.addEventListener("dragenter", preventDefault);
    img.addEventListener("dragleave", preventDefault);
});

let dragSource = null;

function dragStart(e) {
    dragSource = this;
    e.dataTransfer.setData("text/plain", this.id);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const dragTarget = this;

    if (dragSource && dragSource !== dragTarget) {
        // Swap images
        const sourceParent = dragSource.parentNode;
        const targetParent = dragTarget.parentNode;

        targetParent.replaceChild(dragSource, dragTarget);
        sourceParent.appendChild(dragTarget);
    }
}

function preventDefault(e) {
    e.preventDefault();
}