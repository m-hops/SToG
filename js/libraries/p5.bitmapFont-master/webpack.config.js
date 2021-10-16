const path = require('path');

module.exports = {
	entry: './src/p5.bitmapFont.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'p5.bitmapfont.js',
		libraryTarget: 'umd'
	}
};