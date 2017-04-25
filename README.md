# postcss-toc

### Usage

```js
var fs = require('fs');
var path = require('path');
var postcss = require('postcss');
var toc = require('postcss-toc');

var css = fs.readFileSync('./css/style.css', 'utf8');

postcss([toc(opts)])
	.process(css, {
		from: './css/style.css',
		to: './dist/style.css'
	})
	.then(function(result) {
		fs.writeFileSync('./dist/style.css', result.css);
	});
```

**Result**

```css
/* Input */

/* ------------------------------------------------------------ *\
	Button
\* ------------------------------------------------------------ */

.btn { display: inline-block; vertical-align: middle; text-align: center; cursor: pointer; border-radius: 0; color: #999; font-size: 16px; font-weight: 500; padding: 9px 10px 5px; }

.btn:hover { transform: scale(.95); color: #999; }

/*  Button Border  */
.btn--border { border: 1px solid #ccc; }

/*  Button Medium  */
.btn--medium { min-width: 170px; }

/*  Button Block  */
.btn-block { display: block; padding-left: 0; padding-right: 0; }

/* ------------------------------------------------------------ *\
	Slider
\* ------------------------------------------------------------ */

.slider .slides { list-style: none outside none; }

/* ---------------- */

/* Output */

/*
Table of Contents

1. Button ------------------------------------
    Button Border ----------------------------
    Button Medium ----------------------------
    Button Block -----------------------------
2. Slider ------------------------------------

 */

/* ------------------------------------------------------------ *\
	Button
\* ------------------------------------------------------------ */

.btn { display: inline-block; vertical-align: middle; text-align: center; cursor: pointer; border-radius: 0; color: #999; font-size: 16px; font-weight: 500; padding: 9px 10px 5px; }

.btn:hover { transform: scale(.95); color: #999; }

/*  Button Border  */
.btn--border { border: 1px solid #ccc; }

/*  Button Medium  */
.btn--medium { min-width: 170px; }

/*  Button Block  */
.btn-block { display: block; padding-left: 0; padding-right: 0; }

/* ------------------------------------------------------------ *\
	Slider
\* ------------------------------------------------------------ */

.slider .slides { list-style: none outside none; }
```
