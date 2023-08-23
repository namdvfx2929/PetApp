"use strict";

const btnExport = document.getElementById("export-btn");
const btnImport = document.getElementById("import-btn");
const fileInput = document.getElementById("input-file");

// bắt sự kiện nhấn vào nút Export
btnExport.addEventListener("click", function () {
  const isExport = confirm("bạn có muốn Export ?");
  if (isExport) {
    saveStaticDataToFile();
  }
});

/// hàm lưu dữ liệu xuống file
function saveStaticDataToFile() {
  // tạo dư liệu để lưu file xuống
  const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
    type: "application/json",
  });
  // lưu file
  saveAs(blob, "petData.json");
  // Dùng thư viện FileSaver.js (đặt trong thư mục File_Library) theo hướng dẫn đề bai
}

// bắt sự kiện nhấn vào nút Import
btnImport.addEventListener("click", function () {
  // kiểm tra xem người dùng có chọn tập tin chưa
  if (!fileInput.value) {
    alert("Vui lòng chọn file muốn Import");
  } else {
    // xác nhận Import
    const isImport = confirm("Bạn có muốn Import ?");
    if (isImport) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      // load dữ liẹu từ file lên
      reader.addEventListener(
        "load",
        function () {
          // kiểm tra file có hợp lệ với dạng yêu cầu không
          const isValidateFile = checkFile(JSON.parse(reader.result));
          if (isValidateFile) {
            // lưu dữ liệu xuống localStorage
            saveToStorage("petArr", JSON.parse(reader.result));
            // thông báo import thanh công
            alert("Import thành công ");
          }
        },
        false
      );
      if (file) {
        reader.readAsText(file);
      }

      // reset file input
      fileInput.value = "";
    }
  }
});
