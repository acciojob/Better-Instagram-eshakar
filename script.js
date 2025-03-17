// Get the parent container
const parent = document.getElementById('parent');
// Get all image divs
const images = document.querySelectorAll('.image');

// Assign proper IDs to each image div as required by the tests
images.forEach((image, index) => {
  image.id = `drag${index + 1}`;
});

// Variables to track dragged elements
let draggedItem = null;
let dragSource = null;

// Add event listeners for drag operations
images.forEach(image => {
  // When drag starts
  image.addEventListener('dragstart', function(e) {
    draggedItem = this;
    dragSource = this;
    
    // Required for Firefox
    e.dataTransfer.setData('text/plain', this.id);
    
    // Add visual feedback with delay (helps with rendering)
    setTimeout(() => {
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
    // Prevent default to allow drop
    e.preventDefault();
  });
  
  // When entering a drop target
  image.addEventListener('dragenter', function(e) {
    e.preventDefault();
    if (this !== dragSource) {
      this.classList.add('selected');
    }
  });
  
  // When leaving a drop target
  image.addEventListener('dragleave', function() {
    if (this !== dragSource) {
      this.classList.remove('selected');
    }
  });
  
  // When dropping an item
  image.addEventListener('drop', function(e) {
    e.preventDefault();
    
    // Remove highlighting
    this.classList.remove('selected');
    
    // Don't do anything if dropped on self
    if (this === dragSource) return;
    
    // Get the background image of both elements
    const draggedBackground = window.getComputedStyle(dragSource).backgroundImage;
    const droppedOnBackground = window.getComputedStyle(this).backgroundImage;
    
    // Swap the background images
    dragSource.style.backgroundImage = droppedOnBackground;
    this.style.backgroundImage = draggedBackground;
    
    // Swap the text content too
    const draggedText = dragSource.textContent;
    const droppedText = this.textContent;
    dragSource.textContent = droppedText;
    this.textContent = draggedText;
  });
});