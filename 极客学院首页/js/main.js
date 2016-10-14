define(function(require, exports, module) {

	// 通过 require 引入依赖
	var $ = require('jquery');
	// console.log(123);
	require('jikeHoverEvent').hoverEvent();
	require('jikeClick').clickEvent();
	require('jikeAuto').autoPlay();
	// require('jikeAuto').autoPlay();
	// // 通过 exports 对外提供接口
	// exports.doSomething = ...

	// // 或者通过 module.exports 提供整个接口
	// module.exports = ...
});