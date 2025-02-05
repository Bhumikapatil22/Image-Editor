const fileInput = document.querySelector(".file-input"),
  chooseImgBtn = document.querySelector(".choose-img"),
  saveImgBtn = document.querySelector(".save-img"),
  resetFilterBtn = document.querySelector(".reset-filter"),
  previewBtn = document.querySelector(".preview-img img"),
  filterName = document.querySelector(".filter-info .name"),
  filterValue = document.querySelector(".filter-info .value"),
  filterSlider = document.querySelector(".slider input"),
  filterOptions = document.querySelectorAll(".filter button"),
  rotateOptions = document.querySelectorAll(".rotate button");

let brightness = 100,
  saturation = 100,
  grayscale = 0,
  inversion = 0,
  contrast = 100,
  blur = 0,
  opacity = 100,
  sepia = 0;
let rotate = 0,
  flipHorizontal = 1,
  flipVertical = 1;

const applyFilters = () => {
  previewBtn.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal} , ${flipVertical})`;
   previewBtn.style.filter = `brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale}%) invert(${inversion}%) contrast(${contrast}%) blur(${blur}px) opacity(${opacity}%) sepia(${sepia}%) `;
};

const loadImage = () => {
  let file = fileInput.files[0]; //getting file from user
  if (!file) return; //return if file not choosen
  previewBtn.src = URL.createObjectURL(file);
  previewBtn.addEventListener("load", () => {
    document.querySelector(".container").classList.remove("disable");
  });
};

filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");
    filterName.innerText = option.innerText;
if (option.id === "brightness") {
      filterSlider.max = "200";
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`;
    } else if (option.id === "saturation") {
      filterSlider.max = "200";
      filterSlider.value = saturation;
      filterValue.innerText = `${saturation}%`;
    } else if (option.id === "inversion") {
      filterSlider.max = "100";
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    } else if (option.id === "contrast") {
      filterSlider.max = "200";
      filterSlider.value = contrast;
      filterValue.innerText = `${contrast}%`;
    } else if (option.id === "blur") {
      filterSlider.max = "50";
      filterSlider.value = blur;
      filterValue.innerText = `${blur}%`;
    } else if (option.id === "opacity") {
      filterSlider.max = "100";
      filterSlider.value = opacity;
      filterValue.innerText = `${opacity}%`;
    } else if (option.id === "sepia") {
      filterSlider.max = "100";
      filterSlider.value = sepia;
      filterValue.innerText = `${sepia}%`;
    } else {
      filterSlider.max = "100";
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    }
  });
});

const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  const selectedFilter = document.querySelector(".filter .active");
  if (selectedFilter.id === "brightness") {
    brightness = filterSlider.value;
  } else if (selectedFilter.id === "saturation") {
    saturation = filterSlider.value;
  } else if (selectedFilter.id === "inversion") {
    inversion = filterSlider.value;
  } else if (selectedFilter.id === "contrast") {
    contrast = filterSlider.value;
  } else if (selectedFilter.id === "blur") {
    blur = filterSlider.value;
  } else if (selectedFilter.id === "opacity") {
    opacity = filterSlider.value;
  } else if (selectedFilter.id === "sepia") {
    sepia = filterSlider.value;
  } else {
    grayscale = filterSlider.value;
  }
  applyFilters();
};
   


rotateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    if (option.id === "left") {
      rotate = rotate - 90; //left rotate
    } else if (option.id === "right") {
      rotate = rotate + 90; //left rotate
    } else if (option.id === "horizontal") {
      flipHorizontal = flipHorizontal === 1 ? -1 : 1; // if  flipHorizontal is 1 set it to -1 else 1;
    } else {
      flipVertical = flipVertical === 1 ? -1 : 1;
    }

    applyFilters();
  });
});

const resetFilter = () => {
  brightness = 100;
  saturation = 100;
  grayscale = 0;
  inversion = 0;
  contrast = 100;
  blur = 0;
  opacity = 100;
  sepia = 0;
  rotate = 0;
  flipHorizontal = 1;
  flipVertical = 1;
  filterOptions[0].click();
  applyFilters();
};

const saveImage = () => {
  const canvas = document.createElement("canvas"); //creating canvas element
  const ctx = canvas.getContext("2d"); //canvas.getContext() return a drawing context on canvas
  canvas.width = previewBtn.naturalWidth;
  canvas.height = previewBtn.naturalHeight;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (rotate != 0) {
    ctx.rotate((rotate * Math.PI) / 180);
  }
  ctx.scale(flipHorizontal, flipVertical);
  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale}%) invert(${inversion}%) contrast(${contrast}%) blur(${blur}px) opacity(${opacity}%) sepia(${sepia}%) `;
  ctx.drawImage(
    previewBtn,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  ); //dx,dy,width,height
 
  const link=document.createElement("a");
  link.download="image.jpg";
  link.href=canvas.toDataURL();
  link.click();
};

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());
