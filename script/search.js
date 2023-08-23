"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const findBtn = document.getElementById("find-btn");
const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");

// hiển thị dữ liệu thú cưng
renderTableData(petArr);

// bắt sự kiện ấn vào nút find
// Tìm kiếm thú cưng theo điều kiện nhâp vào và hiển thị thông tin
findBtn.addEventListener("click", function () {
  let petArrFind = petArr;

  //nếu nhập vào id thì tìm theo id
  if (idInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
  }

  // nếu nhập vào name thi tìm theo name
  if (nameInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.id.includes(nameInput.value));
  }

  // nếu chọn vào type thì tim theo type
  if (typeInput.value !== "Select Type") {
    petArrFind = petArrFind.filter((pet) => pet.type === typeInput.value);
  }

  // nếu chọn vào breed thì tim theo breed
  if (breedInput.value !== "Select Breed") {
    petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
  }

  //nếu tích chọn vaccinatedInput
  if (vaccinatedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  }

  //nếu tích chọn dewormedInput
  if (dewormedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
  }

  //nếu tích chọn sterilizedInput
  if (sterilizedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
  }

  // hiển thị các thú cưng thỏa điều kiện tìm kiếm
  renderTableData(petArrFind);
});

// hàm hiển thị danh sách thú cưng
function renderTableData(petArr) {
  // xóa nội dung hiện có của bảng
  tableBodyEl.innerHTML = "";

  let date = new Date();

  // với mỗi thú cưng có trong petArr, ta taoj 1 hàng chứa dữ liệu thú cưng đó trên bảng
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${pet.id}</th>
    <td>${pet.name}</td>
    <td>${pet.age}</td>
    <td>${pet.type}</td>
    <td>${pet.weight}</td>
    <td>${pet.length}</td>
    <td>${pet.breed}</td>
    <td>
    <i class="bi bi-square-fill" style="color: ${pet.color}"></i></td>
    <td>
    <i class="bi ${
      pet.vaccinated ? `bi-check-circle-fill` : `bi-x-circle-fill`
    }"></i>
    </td>
    <td>
    <i class="bi ${
      pet.dewormed ? `bi-check-circle-fill` : `bi-x-circle-fill`
    }"></i></td>
    <td>
    <i class="bi ${
      pet.sterilized ? `bi-check-circle-fill` : `bi-x-circle-fill`
    }"></i></td>
    <td>${date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`}/${
      date.getMonth() < 10
        ? `0${date.getMonth() + 1}`
        : `${date.getMonth() + 1}`
    }/${date.getFullYear()}</td>
    `;
    tableBodyEl.appendChild(row);
  });
}

// hiển thị các loại giống breed
renderBreed();

//// hàm hiển thị tất cả các loại giống breed
// tất cả các loại thú cưng không phân biêt chó mèo
function renderBreed() {
  breedArr.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}
