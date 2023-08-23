"use strict";

const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const tableBodyEl = document.getElementById("tbody");
let deleteElList = document.querySelectorAll(".btn.btn-danger");
const healthyBtn = document.getElementById("healthy-btn");

// hiển thị danh sách thú cưng đã nhập trước đó
renderTableData(petArr);
// Bắt sư kiên khi ấn vào typeinput hiển thị các loại giống dog-cat
typeInput.addEventListener("change", renderBreed);

// hàm hiẻn thị cac loại giống đúng với DOG - CAT
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";

  // nếu type la dog
  if (typeInput.value === "Dog") {
    // Mảng chứa các loại giống Dog
    const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");

    breedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });

    // nếu type là Cat
  } else if (typeInput.value === "Cat") {
    // Mảng chứa các loại giông Cat
    const breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");
    breedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}

//1. Bắt sự kiện Click vào nút "Submit"

submitBtn.addEventListener("click", function (e) {
  //2. Lấy được dữ liệu từ các Input Form

  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  //3. Validate dữ liệu hợp lệ
  const validate = validateData(data);
  if (validate) {
    //4 Them thu cung vao danh sach
    petArr.push(data);
    //5 hien thi danh sach thu cung
    renderTableData(petArr);

    saveToStorage("petArr", petArr);
    //6 xoa cac du lieu nhap trong form input
    clearInput();
  }
  // neu la true thi thuc hien : 4, 5 ,6
  // neu la false thi thong bao loi,...
});

function validateData(data) {
  //khong co truong hop nao bi nhap thieu du lieu

  let isValidate = true;

  if (data.id.trim() === "") {
    alert("please input for Id");
    isValidate = false;
  }

  if (data.name.trim() === "") {
    alert("please input for Name");
    isValidate = false;
  }

  if (isNaN(data.age)) {
    alert("please input for Age");
    isValidate = false;
  }

  if (isNaN(data.weight)) {
    alert("please input for Weight");
    isValidate = false;
  }

  if (isNaN(data.length)) {
    alert("please input for Length");
    isValidate = false;
  }

  // duyet mang petArr va kiem tra
  // kiem tra id co phai la duy nhat hay khong?
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must unique!");
      isValidate = false;
      break;
    }
  }
  // truong chi dc nhap gia tri tu 1 => 15
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15");
    isValidate = false;
  }
  //truong chi dc nhap gia tri tu 1 => 15
  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15");
    isValidate = false;
  }
  //truong chi dc nhap gia tri tu 1 => 100
  if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100");
    isValidate = false;
  }
  //Bắt buộc phải chọn giá trị cho trường Type
  if (data.type === "Select Type") {
    alert("please select Type");
    isValidate = false;
  }
  //Bắt buộc phải chọn giá trị cho trường Breed.
  if (data.breed === "Select Breed") {
    alert("please select Breed");
    isValidate = false;
  }

  return isValidate;
}

// ham hien thi du lieu thu cung
function renderTableData(petArr) {
  // xoa noi dung hien co cua bang
  tableBodyEl.innerHTML = "";

  let date = new Date();

  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${pet.id}</td>
    <td>${pet.name}</td>
    <td>${pet.age}</td>
    <td>${pet.type}</td>
    <td>${pet.weight}</td>
    <td>${pet.length}</td>
    <td>${pet.breed}</td>
    <td>
    <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
    </td>
    <td>
    <i class="bi ${
      pet.vaccinated ? `bi-check-circle-fill` : `bi-x-circle-fill`
    }"></i>
    </td>
    <td>
    <i class="bi ${
      pet.dewormed ? `bi-check-circle-fill` : `bi-x-circle-fill`
    }"></i>
    </td>
    <td>
    <i class="bi ${
      pet.sterilized ? `bi-check-circle-fill` : `bi-x-circle-fill`
    }"></i>
    </td>
    <td>${date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`}/${
      date.getMonth() < 10
        ? `0${date.getMonth() + 1}`
        : `${date.getMonth() + 1}`
    }/${date.getFullYear()}</td>
    <td>
    <button onclick="deletePet('${
      pet.id
    }')" type="button" class="btn btn-danger">Delete</button>
    </td>
    `;
    tableBodyEl.appendChild(row);
  });
}

//6.sau khi them thu cung thanh cong xoa cac du lieu nguoi dung vua nhap vao form..
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#171616";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

//7. Ham Deletepet xoa doi tuong thu cung
function deletePet(petId) {
  const isDelete = confirm("Are you Sure");
  if (isDelete) {
    // thuc hien xoa doi tuong thu cung
    for (let i = 0; i < petArr.length; i++) {
      if (petId == petArr[i].id) {
        // xoa khoi mang
        petArr.splice(i, 1);
        // goi lai ham hien thi
        renderTableData(petArr);
      }
    }
  }
}

//8. hien thi thu cung manh khoe...
let healthyCheck = true;

healthyBtn.addEventListener("click", function () {
  //
  if (healthyCheck === true) {
    // hien thi thu cung manh khoe...
    const healthyPetArr = [];
    // dung vong lap for de duyet mang
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        // them thu cung thu [i] do vao mang healthyPetArr
        healthyPetArr.push(petArr[i]);
      }
    }
    //goi ham hien thi thu cung..
    renderTableData(healthyPetArr);
    //sau do doi nui thanh "show all pet"
    healthyBtn.textContent = "Show All Pet";

    healthyCheck = false;
  } else {
    // hien thi toan bo thu cung..
    renderTableData(petArr);
    //sau do doi nui thanh "Show healthy pet"
    healthyBtn.textContent = "Show Healthy Pet";
  }
});
