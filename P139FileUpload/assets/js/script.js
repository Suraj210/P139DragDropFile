"use strict";

let fileInput = document.querySelector(".file-input");
let table = document.querySelector(".table");
let tableBody = document.querySelector(".table-area .table tbody");
let fileAlert = document.querySelector(".file-alert");
let clearBtn = document.querySelector(".clear-btn");
let uploadBox = document.querySelector(".upload");
let uploadIcon = document.querySelector(".upload i");

uploadIcon.addEventListener("click", function () {
  fileInput.click()
});

uploadBox.addEventListener("dragover", function (e) {
  e.preventDefault();
});

uploadBox.addEventListener("drop", function (e) {
  e.preventDefault();
  fileInput.files = e.dataTransfer.files;
  handleFileUpload();
});

fileInput.addEventListener("change", handleFileUpload);

function handleFileUpload() {
  for (const file of fileInput.files) {
    let fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      let base64Img = e.currentTarget.result;

      tableBody.innerHTML += `<tr>
          <td><img src="${base64Img}" alt="" /></td>
          <td>${file.name}</td>
          <td>${Math.round(file.size / 1024)} kb</td>
        </tr>`;
    };
    fileReader.readAsDataURL(file);
  }

  fileAlert.classList.add("d-none");
  clearBtn.classList.remove("d-none");
  table.classList.remove("d-none");
}

clearBtn.addEventListener("click", function () {
  fileAlert.classList.remove("d-none");
  table.classList.add("d-none");
  this.classList.add("d-none");
  tableBody.innerHTML = "";
});
