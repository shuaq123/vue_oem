webpackJsonp([9],{

/***/ "SUuL":
/***/ (function(module, exports) {

throw new Error("Module build failed: CssSyntaxError: /Users/a00/Documents/HBuilderProjects/vue-el-dashboard/src/components/login/SliderVerification.vue:85:19: Unknown word\n    at Input.error (/Users/a00/Documents/HBuilderProjects/vue-el-dashboard/node_modules/.store/postcss@6.0.23/node_modules/postcss/lib/input.js:119:22)\n    at Parser.unknownWord (/Users/a00/Documents/HBuilderProjects/vue-el-dashboard/node_modules/.store/postcss@6.0.23/node_modules/postcss/lib/parser.js:506:26)\n    at Parser.other (/Users/a00/Documents/HBuilderProjects/vue-el-dashboard/node_modules/.store/postcss@6.0.23/node_modules/postcss/lib/parser.js:171:18)\n    at Parser.parse (/Users/a00/Documents/HBuilderProjects/vue-el-dashboard/node_modules/.store/postcss@6.0.23/node_modules/postcss/lib/parser.js:84:26)\n    at parse (/Users/a00/Documents/HBuilderProjects/vue-el-dashboard/node_modules/.store/postcss@6.0.23/node_modules/postcss/lib/parse.js:24:16)\n    at new LazyResult (/Users/a00/Documents/HBuilderProjects/vue-el-dashboard/node_modules/.store/postcss@6.0.23/node_modules/postcss/lib/lazy-result.js:70:24)\n    at Processor.process (/Users/a00/Documents/HBuilderProjects/vue-el-dashboard/node_modules/.store/postcss@6.0.23/node_modules/postcss/lib/processor.js:117:12)\n    at /Users/a00/Documents/HBuilderProjects/vue-el-dashboard/node_modules/.store/vue-loader@13.7.3/node_modules/vue-loader/lib/style-compiler/index.js:61:10");

/***/ }),

/***/ "oAOX":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/.store/babel-loader@7.1.5/node_modules/babel-loader/lib!./node_modules/.store/vue-loader@13.7.3/node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/login/SliderVerification.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SliderVerification = ({
  data: function data() {
    return {
      sliderX: 0,
      isDragging: false,
      isVerified: false,
      bigImageBase64: 'your_big_image_base64_data', // 替换为后端给的大图的base64数据
      smallImageBase64: 'your_small_image_base64_data' // 替换为后端给的小图的base64数据
    };
  },

  computed: {
    computedBase64Data: function computedBase64Data() {
      return function (base64Data) {
        return 'data:image/jpeg;base64,' + base64Data;
      };
    }
  },
  methods: {
    startDrag: function startDrag(event) {
      this.startX = event.clientX || event.touches[0].clientX;
      this.isDragging = true;
    },
    handleDrag: function handleDrag(event) {
      if (!this.isDragging) return;
      var x = event.clientX || event.touches[0].clientX;
      this.sliderX = Math.min(Math.max(0, x - this.startX), 300); // 根据需求调整滑块可移动的范围
    },
    endDrag: function endDrag() {
      this.isDragging = false;
      this.isVerified = this.sliderX >= 200; // 根据需求调整完成验证的滑块位置
    }
  }
});
// CONCATENATED MODULE: ./node_modules/.store/vue-loader@13.7.3/node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3f77e602","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/.store/vue-loader@13.7.3/node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/login/SliderVerification.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"slider-verification"},[_c('div',{staticClass:"slider-wrapper"},[_c('img',{attrs:{"src":_vm.computedBase64Data(_vm.bigImageBase64),"alt":"Big Image"}}),_vm._v(" "),_c('div',{staticClass:"slider",style:({ transform: 'translateX(' + _vm.sliderX + 'px)' }),on:{"mousedown":_vm.startDrag,"touchstart":_vm.startDrag,"mousemove":_vm.handleDrag,"touchmove":_vm.handleDrag,"mouseup":_vm.endDrag,"touchend":_vm.endDrag}}),_vm._v(" "),_c('img',{attrs:{"src":_vm.computedBase64Data(_vm.smallImageBase64),"alt":"Small Image"}})]),_vm._v(" "),(_vm.isVerified)?_c('p',{staticClass:"verification-text"},[_vm._v("验证成功！")]):_c('p',{staticClass:"verification-text"},[_vm._v("请拖动滑块完成验证")])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var login_SliderVerification = (esExports);
// CONCATENATED MODULE: ./src/components/login/SliderVerification.vue
function injectStyle (ssrContext) {
  __webpack_require__("uUKl")
}
var normalizeComponent = __webpack_require__("owSs")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3f77e602"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  SliderVerification,
  login_SliderVerification,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var components_login_SliderVerification = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "uUKl":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("SUuL");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("0j1M")("7ecf2d85", content, true, {});

/***/ })

});
//# sourceMappingURL=9.380b028ca0865ddae302.js.map