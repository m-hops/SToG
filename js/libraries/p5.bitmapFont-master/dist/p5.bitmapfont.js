(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
  p5.BitmapFont
  Andor Saga
  Oct 2017

  Render text using a bitmap with P5.js
*/


let BitmapFont = function(p5) {

    this._p5 = p5;
    this.glyphs = [];
    this.glyphMetaData = [];
    this.kernings = new Map;
    this.usingGrid = true;
    this.ready = false;
    this.kernSeparator = '_';

    /*
     */
    this.splitImageInGrid = function(img, cfg) {
        img.loadPixels();
        this.usingGrid = true;

        Object.assign(this, cfg);

        let charCode = 0;

        for (let y = 0; y < cfg.rows; ++y) {
            for (let x = 0; x < cfg.cols; ++x) {

                let xPos = x * (this.glyphWidth + this.glyphBorder);
                let yPos = y * (this.glyphHeight + this.glyphBorder);

                this.glyphs[charCode] = img.get(xPos, yPos, this.glyphWidth, this.glyphHeight);

                charCode++;
            }
        }
        this.ready = true;
    };

    /*
     */
    this.splitImageWithMetaData = function(img, cfg) {
        let that = this;

        img.loadPixels();
        this.usingGrid = false;

        let chars = cfg.chars.char;

        // Data could potentially not include any kerning data
        if (cfg.kerning) {
            let kerning = cfg.kerning.chars;

            for (let k of kerning) {
                this.kernings.set(`${k.first}${this.kernSeparator}${k.second}`, k.amount);
            }
        }

        //
        for (let c of chars) {
            let meta = this.glyphMetaData;
            let scale = cfg.info.scale || 1;

            // The conversion from XML to JSON may have made the 
            // values strings, so convert them to Numbers with '+'.
            meta[c.id] = c;
            meta[c.id].yoffset = +c.yoffset * scale;
            meta[c.id].xadvance = +c.xadvance * scale;
            meta[c.id].width = +c.width;
            meta[c.id].height = +c.height;

            let origImg = img.get(c.x, c.y, c.width, c.height);

            // Ignore any chars with invalid dimensions
            if(c.height === 0 || c.width === 0){
                continue;
            }

            //
            if (scale === 1) {
                this.glyphs[c.id] = origImg;
            }
            // 
            else {
                // Some characters (esp. space) may be represented 
                // as a 0x0 image, so account for that.
                if (c.width > 0 && c.height > 0) {

                    let outImg = that._p5.createImage(c.width * scale, c.height * scale);

                    origImg.loadPixels();
                    outImg.loadPixels();

                    let x, y, u, v;

                    // Copied from my texture demo 
                    // https://www.openprocessing.org/sketch/437855
                    for (let i = 0; i < outImg.pixels.length; ++i) {

                        x = (i % outImg.width) / outImg.width;
                        y = Math.floor(i / outImg.width) / outImg.height;

                        u = Math.ceil(x * origImg.width);
                        v = Math.ceil(y * origImg.height);

                        // TODO: rename
                        let textureIdx = (4 * v * origImg.width) + (4 * u);

                        outImg.pixels[4 * i + 0] = origImg.pixels[textureIdx + 0];
                        outImg.pixels[4 * i + 1] = origImg.pixels[textureIdx + 1];
                        outImg.pixels[4 * i + 2] = origImg.pixels[textureIdx + 2];
                        outImg.pixels[4 * i + 3] = origImg.pixels[textureIdx + 3];
                    }
                    this.glyphs[c.id] = outImg;
                    this.glyphs[c.id].updatePixels();
                }
            }
        }
        this.ready = true;
    };


    /*
      {Number} code
    */
    this.getGlyph = function(code) {
        return this.glyphs[code];
    };
};

/*
  We can either init with the path to the image and a config object
  OR
  We can pass in the image and a metadata file

  {String}         data       - path to image or p5Image
  {Object|String}  p2         - metadata
  {Function}       callback   - Called once font is ready
*/
let loadBitmapFont = function(data, p2, callback) {
    let that = this;
    let newFont = new BitmapFont(this);

    this._incrementPreload();

    function done() {
        that._decrementPreload();
        callback && callback();
    }

    // USING: png & json
    // loadBitmapFont('font.png', 'font.json');
    if (typeof p2 === 'string') {
        fetch(p2)
            .then(res => res.json())
            .then(json => that.loadImage(data, function(img) {
                newFont.splitImageWithMetaData(img, json);
                done();
            }));
    }

    // USING: image & obj
    // loadBitmapFont('font.png', {...});
    else if (typeof data === 'string') {
        that.loadImage(data, function(img) {
            newFont.splitImageInGrid(img, p2);
            done();
        });
    }

    // USING: p5Image & obj
    // let pImg = new p5.Image();
    // ...
    // loadBitmapFont(pImg);
    else {
        newFont.splitImageInGrid(data, p2);
        done();
    }

    return newFont;
};
p5.prototype.loadBitmapFont = loadBitmapFont;

/*
    TODO: refactor
 */
let bitmapTextFont = function(font) {
    this.currFont = font;
};
p5.prototype.bitmapTextFont = bitmapTextFont;

/*
  Copying the Processing API, but how should this
  accomplish the user intent...
*/
let bitmapTextSize = function() {};


/*
  Intentially similar to text() in Processing.

  TODO: add static option to improve efficiency.

  {String} str          - string to render
  {Number} xScreenPos   - render from left to right
  {Number} yScreenPos   - baseline
*/
let bitmapText = function(str, xScreenPos, yScreenPos) {
    let that = this;

    if (this.currFont === undefined || this.currFont === null || !this.currFont.ready) {
        return;
    }

    // If user tries to pass in zero,
    // nothing renders, so let's just convert to a string.
    if (typeof str === 'number') {
        str = '' + str;
    }

    if (this.currFont.usingGrid === true) {
        for (let i = 0, len = str.length; i < len; ++i) {
            // TODO: comment on magic number
            let code = str[i].charCodeAt(0) - 32;
            let glyph = this.currFont.getGlyph(code);

            that.image(glyph, xScreenPos + (i * (this.currFont.glyphWidth + (this.currFont.charSpacing|| 0) )), yScreenPos);
        }
    }
    // 
    else {
        let xAdvance = 0;
        let lastChar = null;

        for (let i = 0, len = str.length; i < len; ++i) {
            let char = str[i].charCodeAt(0);
            let glyph = this.currFont.getGlyph(char);
            let xKerning = 0;

            // If we are at least after the second character
            if (i > 0) {
                let key = `${lastChar}${this.currFont.kernSeparator}${char}`;
                xKerning = this.currFont.kernings.get(key) || 0;
            }

            let yoffset = this.currFont.glyphMetaData[char].yoffset;
            let xTotal = xScreenPos + xAdvance + xKerning;

            if (glyph) {
                that.image(glyph, xTotal, yScreenPos + yoffset);
            }

            // TODO: remove magic number
            xAdvance += this.currFont.glyphMetaData[char].xadvance;
            lastChar = char;
        }
    }
};
p5.prototype.bitmapText = bitmapText;

module.exports = function setup(p5) {
  p5.prototype.loadBitmapFont = loadBitmapFont;
  p5.prototype.bitmapTextFont = bitmapTextFont;
  p5.prototype.bitmapText = bitmapText 
}

/***/ })
/******/ ]);
});