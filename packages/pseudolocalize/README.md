#Text-to-ʕ•ᴥ•ʔ translations

[![Build Status](https://img.shields.io/travis/randytarampi/woof.pseudolocalize.svg?style=flat-square)](https://travis-ci.org/randytarampi/woof.pseudolocalize) [![Coverage Status](https://img.shields.io/coveralls/randytarampi/woof.pseudolocalize.svg?style=flat-square)](https://coveralls.io/github/randytarampi/woof.pseudolocalize?branch=master) [![Dependency Status](https://img.shields.io/david/randytarampi/woof.pseudolocalize.svg?style=flat-square)](https://david-dm.org/randytarampi/woof.pseudolocalize) [![Ready](https://img.shields.io/waffle/label/randytarampi/woof.pseudolocalize/ready.svg?style=flat-square&label=Ready)](http://waffle.io/randytarampi/woof.pseudolocalize) [![In Progress](https://img.shields.io/waffle/label/randytarampi/woof.pseudolocalize/in%20progress.svg?style=flat-square&label=In%20Progress)](http://waffle.io/randytarampi/woof.pseudolocalize)

Or, otherwise user defined pseudolocalizations...

##Usage

```javascript
let Pseudolocalizer = require("woof.pseudolocalize");

let pseudolocalizer = new Pseudolocalizer();
console.log(pseudolocalizer.pseudolocalize("ᴥ")); // "ʕつ•ᴥ•ʔつ"
console.log(pseudolocalizer.pseudolocalize("woof")); // "ʕつ•w•ʔつ"
console.log(pseudolocalizer.pseudolocalize("woof woof woof woof woof")); // "ʕつ•woof woof woof woof woof•ʔつ"

let open = "\uFF5F";
let close = "\uFF60";

let CJKPadding = "纬横糸씨"; // From "纬", "横糸", and "씨"
let CJKPseudolocalizer = new Pseudolocalizer(0.8, open, close, CJKPadding, CJKPadding);
console.log(CJKPseudolocalizer.pseudolocalize("woof")); // "｟纬w纬｠"
console.log(CJKPseudolocalizer.pseudolocalize("woof woof woof woof woof")); // "｟纬w纬｠"

let LCGPadding = "sгυ"; // From "subtegmine", "гав", and "υφάδι"
let LCGPseudolocalizer = new Pseudolocalizer(1.2, open, close, LCGPadding, LCGPadding);
console.log(LCGPseudolocalizer.pseudolocalize("woof")); // "｟sws｠"
console.log(LCGPseudolocalizer.pseudolocalize("woof woof woof woof woof")); // "｟swoof woof woof woof woofs｠"

let AFBPadding = "نپব"; // From "نسيج" and "پود" and "বুনন"
let AFBPseudolocalizer = new Pseudolocalizer(1.5, open, close, AFBPadding, AFBPadding);
console.log(AFBPseudolocalizer.pseudolocalize("woof")); // "｟نwن｠"
console.log(AFBPseudolocalizer.pseudolocalize("woof woof woof woof woof")); // "｟نپবنپwoof woof woof woof woofنپবنپ｠"

```
