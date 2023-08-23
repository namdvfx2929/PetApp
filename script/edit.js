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
const formEl = document.getElementById("container-form");

// hien thi du lieu ca thu cung vao bang
renderTableData(petArr);

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
    <button onclick="editPet('${
      pet.id
    }')" type="button" style="background-color: #ffc107; color: #000;" class="btn btn-danger">Edit</button>
    </td>
    `;
    tableBodyEl.appendChild(row);
  });
}

// ham hien thi thoi gian
function displayTime(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
}

// ham sua du lieu thong tin thu cung
function editPet(id) {
  // hien lai form nhap du lieu
  formEl.classList.remove("hide");

  // tim du lieu cua thu cung can edit
  const pet = petArr.find((petItem) => petItem.id === id);

  // hien thi mang thong tin cua thu cung len form nhap
  idInput.value = id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;

  // de hien thi dung cac loai giong cho tung loai Dog-cat khi nguoi dung tien hanh sua doi du lieu
  renderBreed();
  // hien thi du lieu loai giong thu cung (du lieu ban dau truoc khi edit)
  breedInput.value = `${pet.breed}`;
}

// su kien nhap chuot vao typeInput, sau do hien thi cac loai giong dung voi tung loai Dog- cat
typeInput.addEventListener("change", renderBreed);

// ham hien thi giong thu cung theo tung loai (dog - cat) nhat dinh
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
  const breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");

  // neu la Dog
  if (typeInput.value === "Dog") {
    breedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  } // neu la Cat
  else if (typeInput.value === "Cat") {
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

  const isValidate = validate(data);

  if (isValidate) {
    const index = petArr.findIndex((pet) => pet.id === data.id);

    // câpj nhật lại dư liệu của thú cưng
    petArr[index] = data;
    saveToStorage("petArr", petArr);

    // ẩn form đi và hiển thị lại bảng dư liệu thú cưng
    formEl.classList.add("hide");
    renderTableData(petArr);
  }
});

// validate dữ liệu hợp lệ
// trả về true nếu dữ liệu hợp lệ , false nếu ko hợp lệ
function validate(data) {
  let isValidate = true;

  //  nếu nhập vào một chuỗi trống hoặc 1 chuỗi toàn khoảng trắng thì báo lỗi
  if (nameInput.value.trim().length === "") {
    alert("Please input for name");
    isValidate = false;
  }
  // nếu không phải là số hợp lệ thì báo lỗi
  if (isNaN(data.age)) {
    alert("Please input for age");
    isValidate = false;
  }

  if (isNaN(data.weight)) {
    alert("Please input for weight");
    isValidate = false;
  }

  if (isNaN(data.length)) {
    alert("Please input for length");
    isValidate = false;
  }

  // trường Age chỉ được nhập giá trị trong khoảng 1 đến 15
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15");
    isValidate = false;
  }
  // trường weight chỉ được nhập giá trị trong khoảng 1 đến 15
  if (data.weight < 1 || data.weight > 15) {
    alert("weight must be between 1 and 15");
    isValidate = false;
  }

  // trường length chỉ được nhập giá trị trong khoảng 1 đến 100
  if (data.length < 1 || data.length > 100) {
    alert("Age must be between 1 and 100");
    isValidate = false;
  }

  // bắt buộc phải chọn giá trị cho trường type
  if (data.type === "Select Type") {
    alert("Please select Type");
    isValidate = false;
  }

  // bắt buộc phải chọn giá trị cho trường Breed
  if (data.breed === "Select Breed") {
    alert("Please select Breed");
    isValidate = false;
  }

  return isValidate;
}
