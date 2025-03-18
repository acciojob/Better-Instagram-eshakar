// Select all images
const images = document.querySelectorAll('.image');
let draggedItem = null;

// Assign IDs to the image divs (since they're missing in the HTML)
images.forEach((image, index) => {
  image.id = `div${index + 1}`;
});

// Add event listeners for drag operations to each image
images.forEach(image => {
  // When drag starts
  image.addEventListener('dragstart', function(e) {
    draggedItem = this;
    setInterval(() => {
      this.classList.add('selected');
    }, 0);
  });
  
  // When drag ends
  image.addEventListener('dragend', function() {
    setTimeout(() => {
      this.classList.remove('selected');
      draggedItem = null;
    }, 0);
  });
  
  // When dragging over a drop target
  image.addEventListener('dragover', function(e) {
    e.preventDefault();
  });
  
  // When entering a drop target
  image.addEventListener('dragenter', function(e) {
    e.preventDefault();
    if (this !== draggedItem) {
      this.classList.add('selected');
    }
  });
  
  // When leaving a drop target
  image.addEventListener('dragleave', function() {
    if (this !== draggedItem) {
      this.classList.remove('selected');
    }
  });
  
  // When dropping an item
  image.addEventListener('drop', function(e) {
    e.preventDefault();
    
    if (this !== draggedItem) {
      // Get the background image of both elements
      const draggedBackground = window.getComputedStyle(draggedItem).backgroundImage;
      const droppedOnBackground = window.getComputedStyle(this).backgroundImage;
      
      // Swap the background images
      draggedItem.style.backgroundImage = droppedOnBackground;
      this.style.backgroundImage = draggedBackground;
      
      // Swap the text content too
      const draggedText = draggedItem.textContent;
      const droppedText = this.textContent;
      draggedItem.textContent = droppedText;
      this.textContent = draggedText;
      
      // Remove the selected class
      this.classList.remove('selected');
    }
  });
});