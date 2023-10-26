webpackJsonp([10],{

/***/ "ROTH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/.store/babel-loader@7.1.5/node_modules/babel-loader/lib!./node_modules/.store/vue-loader@13.7.3/node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/from/addUser.vue
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
//
//
//
//
//
//
//

/* harmony default export */ var addUser = ({
  props: {
    data: Array,
    drawer: {
      type: Boolean,
      default: false
    },
    Name: {
      type: String,
      default: "新增客户"
    }

  },
  data: function data() {
    return {
      activeName: "first",
      form: {
        name: '',
        phone: null,
        password: '',
        nickname: '',
        card: '',
        radio: 1,
        id: '',
        value: true,
        value1: '',
        remark: '',
        userId: ''
      }
    };
  },

  computed: {
    visible: {
      get: function get() {
        return this.drawer;
      },
      set: function set(value) {
        console.log(value);
        this.$emit('update:drawer', value);
      }
    }
  },
  methods: {
    handleNodeClick: function handleNodeClick(data) {
      console.log(data);
      this.form.id = data.id, this.form.value1 = data.label;
    },
    getUserInfo: function getUserInfo() {
      var _this = this;

      this.$axios.get("/users/get", {
        params: {
          pageName: 1,
          size: 10,
          condition: this.searchnameInput
        }
      }).then(function (response) {
        console.log(response.data.records);
        _this.tableData = response.data.records;
      }).catch(function (error) {
        _this.$message.error(error.response.data.message);
      });
    },
    eidtUser: function eidtUser() {
      var _this2 = this;

      if (this.form.value === true) {
        this.form.value = 1;
      } else {
        this.form.value = 0;
      }
      this.$axios.post("users/eidt/user", {
        userId: this.form.userId,
        userName: this.form.name,
        phone: this.form.phone,
        nickName: this.form.nickname,
        remarks: this.form.remarks,
        groupId: this.form.id,
        card: this.form.card,
        isAuthentication: this.form.value,
        sex: this.form.radio
      }).then(function (response) {
        _this2.$emit('child-method-executed', '子组件方法执行完成');
      }).catch(function (error) {
        _this2.$message.error(error.response.data.message);
      });
    },
    addUserTo: function addUserTo() {
      var _this3 = this;

      console.log(this.Name);
      if (this.Name === "编辑客户") {
        this.eidtUser();
      } else {
        if (this.form.value === true) {
          this.form.value = 1;
        } else {
          this.form.value = 0;
        }
        this.$axios.post('/users/add/user', {
          userName: this.form.name,
          password: this.form.password,
          groupId: this.form.id,
          sex: this.form.radio,
          phone: this.form.phone,
          nickName: this.form.nickname,
          card: this.form.card,
          isAuthentication: this.form.value,
          remarks: this.form.remark
        }).then(function (response) {
          _this3.$emit('update:drawer', false);
          _this3.$message.success("添加成功");
          _this3.form.name = '', _this3.form.password = '', _this3.form.id = '', _this3.form.phone = '', _this3.form.nickname = '', _this3.form.card = '', _this3.form.value = false, _this3.form.remarks = '', _this3.form.value1 = '', console.log("触发自定义事件"), _this3.$emit('child-method-executed', '子组件方法执行完成');
        }).catch(function (error) {
          _this3.$message.error(error.response.data.message);
        });
      }
    },
    updateData: function updateData(data) {
      console.log(data.userName);
      this.form.phone = data.phone;
      this.form.name = data.userName;
      this.form.nickname = data.nickName;
      this.form.radio = data.sex;
      this.form.card = data.card;
      if (data.isAuthentication === 1) {
        this.form.value = true;
      } else {
        this.form.value = false;
      }
      this.form.id = data.groupId;
      this.form.value1 = data.groupName;
      this.form.remarks = data.remarks;
      this.form.userId = data.userId;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/.store/vue-loader@13.7.3/node_modules/vue-loader/lib/template-compiler?{"id":"data-v-07e2dc23","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/.store/vue-loader@13.7.3/node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/from/addUser.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-drawer',{attrs:{"title":"我是标题","visible":_vm.visible,"with-header":false,"size":"50%"},on:{"update:visible":function($event){_vm.visible=$event}}},[_c('div',{staticStyle:{"height":"50px","line-height":"50px"}},[_c('span',{staticStyle:{"padding-left":"30px"}},[_vm._v(_vm._s(_vm.Name))])]),_vm._v(" "),_c('el-divider',{staticClass:"ssdw"}),_vm._v(" "),_c('el-tabs',{staticClass:"custom-tabs",staticStyle:{"padding-left":"10px"},attrs:{"type":"card"},model:{value:(_vm.activeName),callback:function ($$v) {_vm.activeName=$$v},expression:"activeName"}},[_c('el-tab-pane',{attrs:{"label":"基本信息","name":"first"}},[_c('div',[_c('el-form',{ref:"form",staticClass:"form-min",attrs:{"model":_vm.form,"label-width":"130px"}},[_c('el-form-item',{staticClass:"form-min-a",attrs:{"label":"用户名: ","size":"mini"}},[_c('el-input',{attrs:{"placeholder":"请输入用户名"},model:{value:(_vm.form.name),callback:function ($$v) {_vm.$set(_vm.form, "name", $$v)},expression:"form.name"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"form-min-a",attrs:{"label":"手机号: ","size":"mini"}},[_c('el-input',{attrs:{"placeholder":"请输入手机号"},model:{value:(_vm.form.phone),callback:function ($$v) {_vm.$set(_vm.form, "phone", $$v)},expression:"form.phone"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"form-min-a",attrs:{"label":"密码: ","size":"mini"}},[_c('el-input',{attrs:{"placeholder":"请输入密码"},model:{value:(_vm.form.password),callback:function ($$v) {_vm.$set(_vm.form, "password", $$v)},expression:"form.password"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"form-min-a",attrs:{"label":"昵称: ","size":"mini"}},[_c('el-input',{attrs:{"placeholder":"请输入昵称"},model:{value:(_vm.form.nickname),callback:function ($$v) {_vm.$set(_vm.form, "nickname", $$v)},expression:"form.nickname"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"form-min-a",attrs:{"label":"性别: "}},[_c('el-radio-group',{model:{value:(_vm.form.radio),callback:function ($$v) {_vm.$set(_vm.form, "radio", $$v)},expression:"form.radio"}},[_c('el-radio',{attrs:{"label":1}},[_vm._v("男")]),_vm._v(" "),_c('el-radio',{attrs:{"label":2}},[_vm._v("女")])],1)],1),_vm._v(" "),_c('el-form-item',{staticClass:"form-min-a",attrs:{"label":"身份证号:","size":"mini"}},[_c('el-input',{attrs:{"placeholder":"请输入身份证"},model:{value:(_vm.form.card),callback:function ($$v) {_vm.$set(_vm.form, "card", $$v)},expression:"form.card"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"form-min-a",attrs:{"label":"是否开启实名认证:","size":"mini"}},[_c('el-switch',{model:{value:(_vm.form.value),callback:function ($$v) {_vm.$set(_vm.form, "value", $$v)},expression:"form.value"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"form-min-a",attrs:{"label":"客户分组:","size":"mini"}},[_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.form.value1),callback:function ($$v) {_vm.$set(_vm.form, "value1", $$v)},expression:"form.value1"}},[_c('el-option',{key:_vm.form.id,attrs:{"value":_vm.form.value1,"hidden":""}}),_vm._v(" "),_c('el-tree',{attrs:{"data":_vm.data,"node-key":"form.id","accordion":"","highlight-current":""},on:{"node-click":_vm.handleNodeClick}})],1)],1),_vm._v(" "),_c('el-form-item',{staticClass:"form-min-a",attrs:{"label":"备注:","size":"mini"}},[_c('el-input',{attrs:{"type":"textarea","rows":7,"placeholder":"请输入内容"},model:{value:(_vm.form.remark),callback:function ($$v) {_vm.$set(_vm.form, "remark", $$v)},expression:"form.remark"}})],1),_vm._v(" "),_c('el-button',{staticStyle:{"float":"right","margin-right":"10px","padding-bottom":"10px"},attrs:{"type":"primary"},on:{"click":function($event){return _vm.addUserTo()}}},[_vm._v("确认")])],1)],1)]),_vm._v(" "),_c('el-tab-pane',{attrs:{"label":"配置管理","name":"second"}},[_vm._v("配置管理")])],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var from_addUser = (esExports);
// CONCATENATED MODULE: ./src/components/from/addUser.vue
function injectStyle (ssrContext) {
  __webpack_require__("Z/Ar")
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
  addUser,
  from_addUser,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var components_from_addUser = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "Z/Ar":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("hGnD");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("0j1M")("53972672", content, true, {});

/***/ }),

/***/ "hGnD":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("a09e")(true);
// imports


// module
exports.push([module.i, ".form-min{margin-top:10px}.form-min-a{width:500px;padding-left:60px}.ssdw{padding:0;margin-top:0;margin-bottom:20px}.custom-tabs .el-tabs__header{font-size:10px}.custom-tabs .el-tabs__item{padding:0 20px}", "", {"version":3,"sources":["/Users/a00/Documents/HBuilderProjects/vue-el-dashboard/src/components/from/addUser.vue"],"names":[],"mappings":"AACA,UACI,eAAiB,CACpB,AACD,YACI,YAAa,AACb,iBAAmB,CACtB,AACD,MACI,UAAW,AACX,aAAgB,AAChB,kBAAoB,CACvB,AACD,8BACE,cAAgB,CAEjB,AACD,4BACE,cAAgB,CACjB","file":"addUser.vue","sourcesContent":["\n.form-min{\n    margin-top: 10px;\n}\n.form-min-a{\n    width: 500px;\n    padding-left: 60px;\n}\n.ssdw{\n    padding: 0;\n    margin-top: 0px;\n    margin-bottom: 20px;\n}\n.custom-tabs .el-tabs__header {\n  font-size: 10px;\n  /* height: 50px; */\n}\n.custom-tabs .el-tabs__item {\n  padding: 0 20px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ })

});
//# sourceMappingURL=10.d986644c810abbf099a8.js.map