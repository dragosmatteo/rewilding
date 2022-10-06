"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_views_DownloadPage_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/views/DownloadPage.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/views/DownloadPage.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _classes_Contract_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classes/Contract.js */ "./resources/js/classes/Contract.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      documents: []
    };
  },
  mounted: function mounted() {
    this.getDocuments(); // console.log('this.documents');
    // console.log(this.documents);

    this.loading = false;
  },
  methods: {
    downloadAll: function downloadAll(contracts) {
      var contract = new _classes_Contract_js__WEBPACK_IMPORTED_MODULE_1__.Contract('/download-all', 'post', contracts, "Contracts - ".concat(contracts[0].company, ".zip"), true);
    },
    download: function download(contract) {
      var name = "".concat(contract.name, ".").concat(contract.extension);
      var documents = new _classes_Contract_js__WEBPACK_IMPORTED_MODULE_1__.Contract("/download/".concat(name), 'get', null, name, true);
    },
    getDocuments: function getDocuments() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var contract, documents;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                contract = new _classes_Contract_js__WEBPACK_IMPORTED_MODULE_1__.Contract('/download', 'post', _this.$route.query, 'docx', false); // console.log('this.$route.query');
                // console.log(this.$route.query);
                // console.log(typeof this.$route.query);
                // console.log('contract');
                // console.log(contract);
                // console.log('AFTER contract');

                _context.next = 3;
                return contract.get();

              case 3:
                documents = _context.sent;
                // console.log('documents');
                // console.log(documents);
                // console.log('AFTER documents');
                _this.documents = documents; // console.log('this.documents');
                // console.log(this.documents);
                // console.log('AFTER this.documents');

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }
});

/***/ }),

/***/ "./resources/js/components/views/DownloadPage.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/views/DownloadPage.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DownloadPage_vue_vue_type_template_id_fdff8a3a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DownloadPage.vue?vue&type=template&id=fdff8a3a& */ "./resources/js/components/views/DownloadPage.vue?vue&type=template&id=fdff8a3a&");
/* harmony import */ var _DownloadPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DownloadPage.vue?vue&type=script&lang=js& */ "./resources/js/components/views/DownloadPage.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DownloadPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DownloadPage_vue_vue_type_template_id_fdff8a3a___WEBPACK_IMPORTED_MODULE_0__.render,
  _DownloadPage_vue_vue_type_template_id_fdff8a3a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/DownloadPage.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/DownloadPage.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/views/DownloadPage.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DownloadPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DownloadPage.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/views/DownloadPage.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DownloadPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/DownloadPage.vue?vue&type=template&id=fdff8a3a&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/views/DownloadPage.vue?vue&type=template&id=fdff8a3a& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DownloadPage_vue_vue_type_template_id_fdff8a3a___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DownloadPage_vue_vue_type_template_id_fdff8a3a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DownloadPage_vue_vue_type_template_id_fdff8a3a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DownloadPage.vue?vue&type=template&id=fdff8a3a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/views/DownloadPage.vue?vue&type=template&id=fdff8a3a&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/views/DownloadPage.vue?vue&type=template&id=fdff8a3a&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/views/DownloadPage.vue?vue&type=template&id=fdff8a3a& ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "dashboard h-screen" }, [
    _c(
      "div",
      { staticClass: "dashboard-title flex align-center justify-between" },
      [
        _c("h2", { staticClass: "font-semibold text-lg px-4 py-1 mb-0" }, [
          _vm._v("Your contracts")
        ]),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "company-button pr-4",
            attrs: { type: "button" },
            on: {
              click: function($event) {
                return _vm.downloadAll(_vm.documents)
              }
            }
          },
          [_vm._v("Download all")]
        )
      ]
    ),
    _vm._v(" "),
    _vm.documents.length
      ? _c(
          "div",
          {
            staticClass: "grid gap-4 w-75 mx-auto mt-4 md:grid-cols-3 md:w-50"
          },
          _vm._l(_vm.documents, function(document) {
            return _c(
              "div",
              {
                staticClass:
                  "rounded-md shadow-md transform hover:scale-105 transition ease-in-out duration-200"
              },
              [
                _c(
                  "div",
                  {
                    staticClass:
                      "flex justify-between items-center bg-site rounded-t-md"
                  },
                  [
                    _c(
                      "h3",
                      {
                        staticClass:
                          "text-sm font-semibold py-1 px-3 mb-0 text-white"
                      },
                      [_vm._v(_vm._s(document.name))]
                    ),
                    _vm._v(" "),
                    _c("img", {
                      staticClass: "w-5 h-5 mr-3 cursor-pointer",
                      attrs: {
                        src: "images/download.png",
                        alt: "download image",
                        title: "Download " + document.name
                      },
                      on: {
                        click: function($event) {
                          return _vm.download(document)
                        }
                      }
                    })
                  ]
                ),
                _vm._v(" "),
                _c(
                  "p",
                  { staticClass: "bg-neutral-500 my-1 px-3 py-2 text-xs" },
                  [_vm._v(_vm._s(document.company))]
                )
              ]
            )
          }),
          0
        )
      : _vm._e(),
    _vm._v(" "),
    !_vm.documents.length
      ? _c(
          "div",
          { staticClass: "h-2/6 flex items-center justify-center" },
          [_c("b-spinner", { staticClass: "text-site" })],
          1
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);