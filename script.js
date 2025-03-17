//your code here
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
    // Get the parent node of the drop target
    const dropTargetParent = this.parentNode;

    // Get the next sibling of the drop target
    const dropTargetNextSibling = this.nextSibling;

    // Get the parent node of the dragged item
    const draggedItemParent = draggedItem.parentNode;

    // Remove the dragged item and the drop target from their original positions
    draggedItemParent.removeChild(draggedItem);
    dropTargetParent.removeChild(this);

    // Insert the dragged item to the drop target's original position
    dropTargetParent.insertBefore(draggedItem, dropTargetNextSibling);

    // Insert the drop target to the dragged item's original position
    draggedItemParent.appendChild(this);

    // Remove the selected class
    this.classList.remove('selected');
  }
});
});