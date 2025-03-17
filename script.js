document.addEventListener('DOMContentLoaded', function () {
  const divs = document.querySelectorAll('.draggable');

  divs.forEach(div => {
    div.addEventListener('dragstart', dragStart);
    div.addEventListener('dragover', dragOver);
    div.addEventListener('drop', drop);
  });

  function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
  }

  function dragOver(event) {
    event.preventDefault();
  }

  function drop(event) {
    event.preventDefault();
  var draggedId = event.dataTransfer.getData('text/plain');
  var draggedElement = document.getElementById(draggedId);
  var targetElement = event.target;
  
  if (draggedElement && targetElement && draggedElement !== targetElement && targetElement.classList.contains('draggable')) {
    var clonedDragged = draggedElement.cloneNode(true);
    var clonedTarget = targetElement.cloneNode(true);
    
    targetElement.replaceWith(clonedDragged);
    draggedElement.replaceWith(clonedTarget);
    
    clonedDragged.addEventListener('dragstart', dragStart);
    clonedDragged.addEventListener('dragover', dragOver);
    clonedDragged.addEventListener('drop', drop);
    
    clonedTarget.addEventListener('dragstart', dragStart);
    clonedTarget.addEventListener('dragover', dragOver);
    clonedTarget.addEventListener('drop', drop);
  }
  }
});