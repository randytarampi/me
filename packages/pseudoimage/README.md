# ʕつ◕ᴥ◕ʔつ 📷 → Your application's pseudolocales' image folders

[![npm versions](https://img.shields.io/npm/v/@randy.tarampi/pseudoimage.svg?style=flat-square)](https://www.npmjs.com/package/@randy.tarampi/pseudoimage) [![npm downloads](https://img.shields.io/npm/dt/@randy.tarampi/pseudoimage.svg?style=flat-square)](https://www.npmjs.com/package/@randy.tarampi/pseudoimage) [![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/react.svg?style=flat-square)](https://www.npmjs.com/package/@randy.tarampi/pseudoimage) [![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/react.svg?style=flat-square)](https://www.npmjs.com/package/@randy.tarampi/pseudoimage) [![npm license](https://img.shields.io/npm/l/@randy.tarampi/pseudoimage.svg?registry_uri=https%3A%2F%2Fregistry.npmjs.com&style=flat-square)](https://www.npmjs.com/package/@randy.tarampi/pseudoimage) [![Waffle.io board](https://badge.waffle.io/randytarampi/randytarampi.github.io.svg?columns=all&style=flat-square)](https://waffle.io/randytarampi/randytarampi.github.io) [![Analytics](https://ga-beacon.appspot.com/UA-50921068-1/github/randytarampi/me/tree/master/packages/pseudoimage?flat&useReferrer)](https://github.com/igrigorik/ga-beacon)

[![Install @randy.tarampi/pseudoimage](https://nodeico.herokuapp.com/@randy.tarampi/pseudoimage.svg)](https://www.npmjs.com/package/@randy.tarampi/pseudoimage)

This uses [lwip](https://github.com/EyalAr/lwip) to modify your images to create a fake, which gets saved somewhere.

## Usage

```javascript
let Pseudoimage = require("@randy.tarampi/pseudoimage");
let sourceDirectory = "/Users/randy.tarampi/Desktop/images";
let destinationDirectory = "/Users/randy.tarampi/Desktop/fakeImages";
let expect = require("chai").expect;

let pseudoimage = new Pseudoimage(sourceDirectory, destinationDirectory);
pseudoimage.generatePseudoImages();

// There should be a copy for each supported image in `sourceDirectory` in `destinationDirectory`
let files = fs.readdirSync(sourceDirectory);
files.map((file) => {
	openImage(file)
		.then((image) => {
			expect(images[0].width()).to.eql(images[1].width());
			expect(images[0].height()).to.eql(images[1].height());
		})
		.catch((error) => {
			console.error(error); // Shouldn't see any errors
		});
});

function openImage(imagePath) {
	return new Promise((resolve, reject) => {
		lwip.open(imagePath, (error, image) => {
			if (error) {
				reject(error);
				return;
			}
			resolve(image);
		})
	});
}
```
