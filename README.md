#Text-to-ʕ•ᴥ•ʔ translations

[![Build Status](https://img.shields.io/travis/randytarampi/pseudolocalize.woof.svg?style=flat-square)](https://travis-ci.org/randytarampi/pseudolocalize.woof) [![Coverage Status](https://img.shields.io/coveralls/randytarampi/pseudolocalize.woof.svg?style=flat-square)](https://coveralls.io/github/randytarampi/pseudolocalize.woof?branch=master) [![Dependency Status](https://img.shields.io/david/randytarampi/pseudolocalize.woof.svg?style=flat-square)](https://david-dm.org/randytarampi/pseudolocalize.woof.svg) [![Backlog](https://img.shields.io/waffle/label/randytarampi/pseudolocalize.woof/Backlog.svg?style=flat-square)](http://waffle.io/randytarampi/pseudolocalize.woof) [![Ready](https://img.shields.io/waffle/label/randytarampi/pseudolocalize.woof/Ready.svg?style=flat-square)](http://waffle.io/randytarampi/pseudolocalize.woof) [![In Progress](https://img.shields.io/waffle/label/randytarampi/pseudolocalize.woof/In%20Progress.svg?style=flat-square)](http://waffle.io/randytarampi/pseudolocalize.woof)

Or, otherwise user defined pseudolocalizations...

##Usage

```javascript
let Pseudolocalizer = require("pseudolocalize.woof");

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
