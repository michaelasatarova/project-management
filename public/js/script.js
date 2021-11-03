
function toggleModal(){
  const modalProject = document.getElementById("modal-add-project");
  modalProject.classList.toggle("d-flex");
}

function toggleModalUser(){
  const modalProject = document.getElementById("modal-add-user");
  modalProject.classList.toggle("d-flex");
}
function toggleModalAddProjectToUser(){
  const modalProjectToUser = document.getElementById("modal-add-project-to-user");
  modalProjectToUser.classList.toggle("d-flex");
}






$(document).ready(function() {
  let imagesPreview = function(input, placeToInsertImagePreview) {
    if (input.files) {
      let filesAmount = input.files.length;
      for (i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        reader.onload = function(event) {
          $($.parseHTML("<img>"))
            .attr("src", event.target.result)
            .appendTo(placeToInsertImagePreview);
        };
        reader.readAsDataURL(input.files[i]);
      }
    }
  };
  $("#input-files").on("change", function() {
    imagesPreview(this, "div.preview-images");
  });
});


