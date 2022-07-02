let colorInput = document.querySelector("#color");

colorInput.value = localStorage.getItem("color") == null ? "#008000" : localStorage.getItem("color")


colorInput.addEventListener("input", () => {
    localStorage.setItem("color", colorInput.value);
});