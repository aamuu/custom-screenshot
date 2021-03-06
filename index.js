const fs = require("fs");
const pixelmatch = require("pixelmatch");
const PNG = require("pngjs").PNG;
const JPEG = require("jpeg-js");

let filename = __dirname + "/ui-tests/";

// const jpegData1 = fs.readFileSync("image1.jpg");
// const img1 = JPEG.decode(jpegData1);

// const jpegData2 = fs.readFileSync("image2.jpg");
// const img2 = JPEG.decode(jpegData2);

let currentImages = [];

function screenshotsTest() {
  fs.readdir("./ui-tests", function (err, files) {
    if (err) throw err;
    let images = [];

    files.forEach(function (file) {
      images.push(file);
    });
    // console.log(images);
    //showImages(images);

    //setInterval(() => console.log(images), 5000);
    // currentImages = setInterval(() => images.splice(0, 1), 5000);
    // console.log('==>', currentImages);


    // if (myArray.length > 0)
    //   myArray.splice(0, 1);
    // else
    //   window.clearInterval(timer);
    let currentImages;

    function updateImages() {
      setInterval(nextImages, 5000);
    }

    function nextImages() {
      currentImages = images.splice(0, 2);
      console.log(currentImages);
      showImages(currentImages);
    }

    updateImages();


  });
}

function showImages(images) {
  console.log('==========>', images.length);
  for (let i = 0; i < images.length - 1; i++) {
    console.log(`Image ${i}: ${filename}${images[i]}`);
    console.log(`Image ${i + 1}: ${filename}${images[i + 1]}`);
    const jpegData1 = fs.readFileSync(`${filename}${images[i]}`);
    const img1 = JPEG.decode(jpegData1);

    const jpegData2 = fs.readFileSync(`${filename}${images[i + 1]}`);
    const img2 = JPEG.decode(jpegData2);

    doneReading(img1, img2);
  }
}

function doneReading(originalImage, updatedImage) {
  let diff = new PNG({
    width: originalImage.width,
    height: originalImage.height
  });

  let numberDifferent = pixelmatch(
      originalImage.data,
      updatedImage.data,
      diff.data,
      originalImage.width,
      originalImage.height,
      {threshold: 0.1}
  );

  let percentage =
      numberDifferent / (originalImage.width * originalImage.height);
  console.log("=>", percentage * 100);

  diff.pack().pipe(fs.createWriteStream("diff.png"));
}

screenshotsTest();
