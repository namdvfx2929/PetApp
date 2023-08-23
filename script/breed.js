"use strict";

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");
let deleteElList = document.querySelectorAll(".btn.btn-danger");

// hien thi danh sach
renderTableBreed(breedArr);

// bat su kien an vao nut sub mit
btnSubmit.addEventListener("click", function () {
  // lay du lieu tu from
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  // validate du lieu
  const isValidate = validate(data);

  if (isValidate) {
    // them vao du lieu vao mang cac breed
    breedArr.push(data);
    // luu du lieu va cap nhat du lieu
    saveToStorage("breedArr", breedArr);

    // hien thi lai bang thong tin Breed
    renderTableBreed(breedArr);

    // xoa thong tin tu from nhap
    deleteForm();
  }
});

function validate(data) {
  let isValidate = true;

  // neu nhap vao 1 chuoi trong hac 1 chuoi toan khoang trang thi bao loi
  if (breedInput.value.trim().length === 0) {
    alert("Please input for breed!");
    isValidate = false;
  }

  // bat loi phai chon type
  if (data.type === "Select Type") {
    alert("Please select Type!");
    isValidate = false;
  }
  return isValidate;
}

// Ham : xoa thong tin form
function deleteForm() {
  breedInput.value = "";
  typeInput.value = "Select type";
}

// Ham hien thi thong tin cac breed
function renderTableBreed() {
  tableBodyEl.innerHTML = "";

  // cu moi loai breed ta se them 1 dong du lieu vao bang
  breedArr.forEach(function (breedItem, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td scope="col">${index + 1}</td>
        <td scope="col">${breedItem.breed}</td>
        <td scope="col">${breedItem.type}</td>
        <td>
        <button type="button" onclick="deleteBreed('${
          breedItem.breed
        }')" class="btn btn-danger">Delete</button>
        </td>`;

    tableBodyEl.appendChild(row);
  });
}

/// hàm xóa các breed
function deleteBreed(breed) {
  const isDelete = confirm("Are you sure?");

  if (isDelete) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].breed) {
        breedArr.splice(i, 1);
        saveToStorage("breedArr", breedArr);
        renderTableBreed(breedArr);
      }
    }
  }
}
