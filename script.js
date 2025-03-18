document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".image");
  let draggedItem = null;

  // Set background images correctly
  const imageURLs = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/seed/picsum/200/300",
    "https://picsum.photos/200/300?grayscale",
    "https://picsum.photos/200/300/",
    "https://picsum.photos/200/300.jpg",
    "https://picsum.photos/id/102/200/300"
  ];

  images.forEach((image, index) => {
    image.style.backgroundImage = `url(${imageURLs[index]})`;
  });

  // Drag start
  images.forEach((image) => {
    image.addEventListener("dragstart", function (e) {
      draggedItem = this;
      setTimeout(() => this.classList.add("selected"), 0);
    });

    // Drag end
    image.addEventListener("dragend", function () {
      setTimeout(() => {
        this.classList.remove("selected");
        draggedItem = null;
      }, 0);
    });

    // Drag over
    image.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    // Drag enter
    image.addEventListener("dragenter", function (e) {
      e.preventDefault();
      if (this !== draggedItem) {
        this.classList.add("selected");
      }
    });

    // Drag leave
    image.addEventListener("dragleave", function () {
      if (this !== draggedItem) {
        this.classList.remove("selected");
      }
    });

    // Drop
    image.addEventListener("drop", function (e) {
      e.preventDefault();

      if (!draggedItem || this === draggedItem) return;

      // Swap background images
      let draggedBackground = draggedItem.style.backgroundImage;
      let droppedOnBackground = this.style.backgroundImage;
      draggedItem.style.backgroundImage = droppedOnBackground;
      this.style.backgroundImage = draggedBackground;

      // Swap text content
      let draggedText = draggedItem.textContent;
      let droppedText = this.textContent;
      draggedItem.textContent = droppedText;
      this.textContent = draggedText;

      // Remove highlight
      this.classList.remove("selected");
    });
  });
});
