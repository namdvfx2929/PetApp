"use strict";

// thêm được Animation khi click vào sidebar

const navEl = document.getElementById("sidebar");
// bắt sự kiện click
navEl.addEventListener("click", function () {
  this.classList.toggle("active");
});

// du lieu cho sẵn
const data1 = {
  id: "P001",
  name: "Tom",
  age: 3,
  type: "Cat",
  weight: 5,
  length: 50,
  color: "red",
  breed: "Tabby",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: new Date(),
};

const data2 = {
  id: "P002",
  name: "Tyke",
  age: 5,
  type: "Dog",
  weight: 3,
  length: 40,
  color: "green",
  breed: "Mixed Breed",
  vaccinated: false,
  dewormed: false,
  sterilized: false,
  date: new Date(),
};

const breed1 = {
  breed: "Mixed Breed",
  type: "Dog",
};

const breed2 = {
  breed: "Tabby",
  type: "Cat",
};

const breed3 = {
  breed: "Alaska",
  type: "Dog",
};

const breed4 = {
  breed: "Meo mun",
  type: "Cat",
};

const breed5 = {
  breed: "bul dog",
  type: "Dog",
};

const breed6 = {
  breed: "meo muop",
  type: "Cat",
};

// lấy dữ liêu petdArr
const petArr = getFromStorage("petArr");
if (!getFromStorage("petArr")) {
  // gán dữ liệu để test
  saveToStorage("petArr", [data1, data2]);
}

// lấy dữ liêu breeddArr
const breedArr = getFromStorage("breedArr");
if (!getFromStorage("breedArr")) {
  // gán dữ liệu để test
  saveToStorage("breedArr", [breed1, breed2, breed3, breed4, breed5, breed6]);
}

//// hàm lấy dữ liệu

function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// hàm lấy dữ liệu

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
