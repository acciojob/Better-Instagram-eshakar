
let dragindex = 0;
let dropindex = 0;
let clone = "";

const images = document.querySelectorAll(".image");

function drag(e) {
  e.dataTransfer.setData("text", e.target.id);
}

function allowDrop(e) {
  e.preventDefault();
}

function drop(e) {
  clone = e.target.cloneNode(true);
  let data = e.dataTransfer.getData("text");
  let nodelist = document.getElementById("parent").childNodes;
  console.log(data, e.target.id);
  for (let i = 0; i < nodelist.length; i++) {
    if (nodelist[i].id == data) {
      dragindex = i;
    }
  }

  dragdrop(clone);

  document
    .getElementById("parent")
    .replaceChild(document.getElementById(data), e.target);

  document
    .getElementById("parent")
    .insertBefore(
      clone,
      document.getElementById("parent").childNodes[dragindex]
    );
}

const dragdrop = (image) => {
  image.ondragstart = drag;
  image.ondragover = allowDrop;
  image.ondrop = drop;
};

images.forEach(dragdrop);