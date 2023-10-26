webpackJsonp([8],{

/***/ "G48i":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("yfbl");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("0j1M")("9bf49ede", content, true, {});

/***/ }),

/***/ "hYS1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/.store/babel-loader@7.1.5/node_modules/babel-loader/lib!./node_modules/.store/vue-loader@13.7.3/node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/upload.vue
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

/* harmony default export */ var upload = ({
  props: {
    imageUrl: String,
    default: ''
  },
  data: function data() {
    return {
      imaUrl: '',
      headers: { Authorization: localStorage.getItem('token') }
    };
  },

  methods: {
    handleAvatarSuccess: function handleAvatarSuccess(res, file) {
      this.imageUrl = "https://img03.sogoucdn.com/app/a/100520021/96793d1c0026caf837a67b22a48eda53";
      console.log(res);
      this.imaUrl = res;
      this.handleClick();
    },
    beforeAvatarUpload: function beforeAvatarUpload(file) {
      var isJPG = file.type === 'image/jpeg';
      var isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleClick: function handleClick() {
      this.$emit('my-event', this.imaUrl);
    }
  },
  mounted: function mounted() {}
});
// CONCATENATED MODULE: ./node_modules/.store/vue-loader@13.7.3/node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4be17133","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/.store/vue-loader@13.7.3/node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/upload.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-upload',{staticClass:"avatar-uploader",attrs:{"action":"http://192.168.3.17:8214/employeeRoleControllerme/upload","headers":_vm.headers,"show-file-list":false,"on-success":_vm.handleAvatarSuccess,"before-upload":_vm.beforeAvatarUpload}},[(_vm.imageUrl)?_c('img',{staticClass:"avatar",attrs:{"src":_vm.imageUrl}}):_c('i',{staticClass:"el-icon-plus avatar-uploader-icon"})])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_upload = (esExports);
// CONCATENATED MODULE: ./src/components/upload.vue
function injectStyle (ssrContext) {
  __webpack_require__("G48i")
}
var normalizeComponent = __webpack_require__("owSs")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  upload,
  components_upload,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_components_upload = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "yfbl":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("a09e")(true);
// imports


// module
exports.push([module.i, ".avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden}.avatar-uploader .el-upload:hover{border-color:#409eff}.avatar-uploader-icon{font-size:28px;color:#8c939d;width:178px;height:178px;line-height:178px;text-align:center}.avatar{width:178px;height:178px;display:block}", "", {"version":3,"sources":["/Users/a00/Documents/HBuilderProjects/vue-el-dashboard/src/components/upload.vue"],"names":[],"mappings":"AACA,4BACE,0BAA2B,AAC3B,kBAAmB,AACnB,eAAgB,AAChB,kBAAmB,AACnB,eAAiB,CAClB,AACD,kCACE,oBAAsB,CACvB,AACD,sBACE,eAAgB,AAChB,cAAe,AACf,YAAa,AACb,aAAc,AACd,kBAAmB,AACnB,iBAAmB,CACpB,AACD,QACE,YAAa,AACb,aAAc,AACd,aAAe,CAChB","file":"upload.vue","sourcesContent":["\n.avatar-uploader .el-upload {\n  border: 1px dashed #d9d9d9;\n  border-radius: 6px;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n}\n.avatar-uploader .el-upload:hover {\n  border-color: #409EFF;\n}\n.avatar-uploader-icon {\n  font-size: 28px;\n  color: #8c939d;\n  width: 178px;\n  height: 178px;\n  line-height: 178px;\n  text-align: center;\n}\n.avatar {\n  width: 178px;\n  height: 178px;\n  display: block;\n}\n"],"sourceRoot":""}]);

// exports


/***/ })

});
//# sourceMappingURL=8.554ede47eedafbc53331.js.map