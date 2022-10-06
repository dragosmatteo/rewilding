"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_views_Additional_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/views/Additional.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/views/Additional.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _classes_Form_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classes/Form.js */ "./resources/js/classes/Form.js");
/* harmony import */ var _classes_Contract_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../classes/Contract.js */ "./resources/js/classes/Contract.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
      form: new _classes_Form_js__WEBPACK_IMPORTED_MODULE_1__.Form({
        businessName: '',
        tradingName: '',
        tradingAddress: '',
        jurisdictionCountry: '',
        generateDocs: [],
        contractType: 'additional'
      }),
      minimumAgeOptions: ['18', '13', 'any age'],
      jurisdictions: [],
      steps: [{
        number: 1,
        completed: false
      }, {
        number: 2,
        completed: false
      }, {
        number: 3,
        completed: false
      }],
      fakeBusinessName: '<business_name>',
      currentStep: 1,
      prefillCompany: {},
      companyInfos: [],
      companyWebsite: {},
      productService: {}
    };
  },
  created: function created() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_typeof(_this.$route.query) == 'object' && Object.keys(_this.$route.query).length != 0 || _this.$route.query != null && _this.$route.query != undefined) {
                _this.prefillCompany = _this.$route.query;
              }

              if (!(_this.$route.query && _this.$route.query != null && _this.$route.query != undefined && _this.$route.query.id)) {
                _context.next = 6;
                break;
              }

              _context.next = 4;
              return _this.getCompanyInfos();

            case 4:
              _context.next = 7;
              break;

            case 6:
              console.log('no prefil');

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  mounted: function mounted() {
    var _this2 = this;

    axios.get('api/jurisdictions').then(function (response) {
      _this2.jurisdictions = response.data.filter(function (el) {
        return el.type == 'dir';
      }).flatMap(function (_ref) {
        var name = _ref.name;
        return name !== 'README.md' ? name : [];
      });
    });
    this.$refs.tradingName.$refs.label.textContent = "What's the trading name of the " + this.fakeBusinessName + '?';
    this.$refs.tradingAddress.$refs.label.textContent = "What's the " + this.fakeBusinessName + " trading address?"; // if((typeof this.$route.query == 'object' &&  Object.keys(this.$route.query).length != 0)){
    //     this.steps[0].completed = true;
    // }
  },
  methods: {
    getQuestionData: function getQuestionData(question) {
      if (question.id == 1) {
        this.form.businessName = this.fakeBusinessName = question.response;
        this.form.businessName == '' ? this.fakeBusinessName = '<business_name>' : [];
      } else if (question.id == 2) {
        this.form.tradingName = question.response;
      } else if (question.id == 3) {
        this.form.registeredAddress = question.response;
      } else if (question.id == 4) {
        this.form.tradingAddress = question.response;
      } else if (question.id == 5) {
        this.form.websiteAddress = question.response;
      } else if (question.id == 6) {
        this.form.generalEmail = question.response;
      } else if (question.id == 7) {
        this.form.generalTel = question.response;
      } else if (question.id == 8) {
        this.form.servicesDescription = question.response;
      }

      this.form.tradingAddress !== '' && this.form.tradingName !== '' && this.form.businessName !== '' ? this.steps[0].completed = true : this.steps[0].completed = false;
    },
    getCompanyInfos: function getCompanyInfos() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_this3.$route.query.id != undefined && _this3.$route.query.id != null && _this3.$route.query.id)) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 3;
                return axios.get("/company/".concat(_this3.$route.query.id, "/info")).then(function (response) {
                  _this3.companyInfos = _toConsumableArray(response.data.infos);
                  _this3.companyWebsite = response.data.infos.find(function (info) {
                    return info.parameter == 'Company Website';
                  });
                  _this3.productService = response.data.infos.find(function (info) {
                    return info.parameter == 'Product / Service';
                  });

                  if (_this3.companyInfos && _this3.companyWebsite && _this3.productService && _typeof(_this3.companyInfos) === 'object' && Object.keys(_this3.companyInfos).length !== 0 && _typeof(_this3.companyInfos) === 'object' && Object.keys(_this3.productService).length !== 0 && _typeof(_this3.companyInfos) === 'object' && Object.keys(_this3.companyWebsite).length !== 0 && _this3.companyInfos != undefined && _this3.companyWebsite != undefined && _this3.productService != undefined && _this3.companyInfos != null && _this3.companyWebsite != null && _this3.productService != null) {
                    _this3.steps[0].completed = true;
                  }
                })["catch"](function (e) {
                  // company does not exist, redirect
                  window.location.href = '/dashboard';
                });

              case 3:
                _this3.form.businessName = _this3.$route.query.name;
                _this3.form.tradingName = _this3.$route.query.name;
                _this3.form.registeredAddress = _this3.$route.query.address;
                _this3.form.tradingAddress = _this3.$route.query.address;
                _this3.form.websiteAddress = _this3.companyWebsite;
                _this3.form.generalEmail = _this3.$route.query.email;
                _this3.form.generalTel = _this3.$route.query.address;
                _this3.form.servicesDescription = _this3.productService;
                _this3.form.minimumAge = '18';

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    getJurisdictionCountry: function getJurisdictionCountry(name) {
      this.form.jurisdictionCountry = name;
      this.form.jurisdictionCountry ? this.steps[1].completed = true : this.steps[1].completed = false;
    },
    getMinimumAge: function getMinimumAge(age) {
      this.form.minimumAge = age; // (this.form.minimumAge) ? this.steps[1].completed = true : this.steps[1].completed = false;
    },
    getGenerateDocs: function getGenerateDocs(docs) {
      this.form.generateDocs = docs;
      this.form.generateDocs.length ? this.steps[2].completed = true : this.steps[2].completed = false;
    },
    updateStep: function updateStep(step) {
      this.currentStep = step;
    },
    download: function download(extension) {
      this.$refs.form.submit();
      this.form.output = extension;
      var name = "".concat(this.form.businessName); // if user wants to create one single doc, download it directly
      // otherwise create a new page with individual downloads

      if (this.form.generateDocs.length > 1) {
        var params = new URLSearchParams(this.form);
        var query = params.toString(); // console.log('type is ');
        // console.log(typeof query);

        this.$router.push({
          name: 'download-page',
          query: query
        });
      } else {
        var contract = new _classes_Contract_js__WEBPACK_IMPORTED_MODULE_2__.Contract('/download', 'post', this.form, name);
      }
    }
  },
  watch: {
    fakeBusinessName: function fakeBusinessName() {
      this.$refs.tradingName.$refs.label.textContent = "What's the trading name of the " + this.fakeBusinessName + '?';
      this.$refs.tradingAddress.$refs.label.textContent = "What's the " + this.fakeBusinessName + " trading address?";
    }
  },
  computed: {
    getCompanyWebsite: function getCompanyWebsite() {
      if (this.companyWebsite && this.companyWebsite != undefined && this.companyWebsite != null && this.companyWebsite.value) return this.companyWebsite.value;else return '';
    },
    getCompanyProductServices: function getCompanyProductServices() {
      if (this.productService && this.productService != undefined && this.productService != null && this.productService.value) return this.productService.value;else return '';
    }
  }
});

/***/ }),

/***/ "./resources/js/classes/Form.js":
/*!**************************************!*\
  !*** ./resources/js/classes/Form.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Form": () => (/* binding */ Form)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Form = function Form(data) {
  _classCallCheck(this, Form);

  for (var field in data) {
    this[field] = data[field];
  }
};

/***/ }),

/***/ "./resources/js/components/views/Additional.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/views/Additional.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Additional_vue_vue_type_template_id_8151965a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Additional.vue?vue&type=template&id=8151965a& */ "./resources/js/components/views/Additional.vue?vue&type=template&id=8151965a&");
/* harmony import */ var _Additional_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Additional.vue?vue&type=script&lang=js& */ "./resources/js/components/views/Additional.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Additional_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Additional_vue_vue_type_template_id_8151965a___WEBPACK_IMPORTED_MODULE_0__.render,
  _Additional_vue_vue_type_template_id_8151965a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/Additional.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/Additional.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/views/Additional.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Additional_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Additional.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/views/Additional.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Additional_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/Additional.vue?vue&type=template&id=8151965a&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/views/Additional.vue?vue&type=template&id=8151965a& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Additional_vue_vue_type_template_id_8151965a___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Additional_vue_vue_type_template_id_8151965a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Additional_vue_vue_type_template_id_8151965a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Additional.vue?vue&type=template&id=8151965a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/views/Additional.vue?vue&type=template&id=8151965a&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/views/Additional.vue?vue&type=template&id=8151965a&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/views/Additional.vue?vue&type=template&id=8151965a& ***!
  \****************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    {
      staticClass: "w-100 mt-6 selector-form",
      staticStyle: { display: "flex" }
    },
    [
      _c(
        "div",
        { staticClass: "mx-auto form-wrapper", staticStyle: { width: "35%" } },
        [
          _c("iframe", {
            staticStyle: { display: "none" },
            attrs: { name: "download" }
          }),
          _vm._v(" "),
          _c(
            "form",
            {
              ref: "form",
              attrs: { target: "download", action: "javascript:void(0)" }
            },
            [
              _c(
                "step",
                {
                  staticClass: "jurisdiction",
                  attrs: {
                    completed: _vm.steps[0].completed,
                    currentStep: _vm.currentStep,
                    title: "Initial Questions",
                    number: "1",
                    next: true,
                    back: false
                  },
                  on: {
                    stepChanged: function($event) {
                      return _vm.updateStep($event)
                    }
                  }
                },
                [
                  _c("qbox", {
                    attrs: {
                      prefillCompany: this.$route.query.name,
                      placeholder: "business_name",
                      question: "What's the legal name of the business?",
                      questionNumber: "1"
                    },
                    on: {
                      setData: function($event) {
                        return _vm.getQuestionData($event)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("qbox", {
                    ref: "tradingName",
                    attrs: {
                      prefillCompany: this.$route.query.name,
                      questionNumber: "2"
                    },
                    on: {
                      setData: function($event) {
                        return _vm.getQuestionData($event)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("qbox6", {
                    ref: "registeredAddress",
                    attrs: {
                      prefillCompany: this.$route.query.address,
                      question:
                        "What is " +
                        _vm.form.businessName +
                        " registered address?",
                      questionNumber: "3"
                    },
                    on: {
                      setData: function($event) {
                        return _vm.getQuestionData($event)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("qbox6", {
                    ref: "tradingAddress",
                    attrs: {
                      prefillCompany: this.$route.query.address,
                      question:
                        "What is " +
                        _vm.form.businessName +
                        " trading address?",
                      questionNumber: "4"
                    },
                    on: {
                      setData: function($event) {
                        return _vm.getQuestionData($event)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("qbox", {
                    ref: "websiteAddress",
                    attrs: {
                      prefillCompany: _vm.getCompanyWebsite,
                      question: "What is the address of your website?",
                      questionNumber: "5"
                    },
                    on: {
                      setData: function($event) {
                        return _vm.getQuestionData($event)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("qbox", {
                    ref: "generalEmail",
                    attrs: {
                      prefillCompany: this.$route.query.email,
                      question: "What is your general email address?",
                      questionNumber: "6"
                    },
                    on: {
                      setData: function($event) {
                        return _vm.getQuestionData($event)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("qbox", {
                    ref: "generalTel",
                    attrs: {
                      prefillCompany: this.$route.query.address,
                      question: "What is your contact telephone number?",
                      questionNumber: "7"
                    },
                    on: {
                      setData: function($event) {
                        return _vm.getQuestionData($event)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("qbox", {
                    ref: "servicesDescription",
                    attrs: {
                      prefillCompany: _vm.getCompanyProductServices,
                      question:
                        "Please provide a short description of your website and its services.",
                      questionNumber: "8"
                    },
                    on: {
                      setData: function($event) {
                        return _vm.getQuestionData($event)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("dbox", {
                    ref: "minimumAge",
                    attrs: {
                      prefillCompany: this.$route.query.address,
                      minimumAgeOptions: _vm.minimumAgeOptions,
                      question: "What is the minimum age tp use your website?"
                    },
                    on: {
                      setMinimumAge: function($event) {
                        return _vm.getMinimumAge($event)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _vm.form.businessName && !_vm.form.tradingName
                    ? _c("support-message", {
                        attrs: {
                          message:
                            "Provider means <b>" +
                            _vm.form.businessName +
                            "</b>."
                        }
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.form.businessName &&
                  _vm.form.tradingName &&
                  !_vm.form.tradingAddress
                    ? _c("support-message", {
                        attrs: {
                          message:
                            "Provider means <b>" +
                            _vm.form.businessName +
                            "</b> doing business as <b>" +
                            _vm.form.tradingName +
                            "</b>."
                        }
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.form.businessName &&
                  _vm.form.tradingName &&
                  _vm.form.tradingAddress
                    ? _c("support-message", {
                        attrs: {
                          message:
                            "Provider means <b>" +
                            _vm.form.businessName +
                            "</b> doing business as <b>" +
                            _vm.form.tradingName +
                            "</b> whose principal place of business is <b>" +
                            _vm.form.tradingAddress +
                            "</b>."
                        }
                      })
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "step",
                {
                  staticClass: "jurisdiction",
                  attrs: {
                    completed: _vm.steps[1].completed,
                    currentStep: _vm.currentStep,
                    title: "Jurisdiction",
                    number: "2",
                    next: true,
                    back: true
                  },
                  on: {
                    stepChanged: function($event) {
                      return _vm.updateStep($event)
                    }
                  }
                },
                [
                  _c("dbox", {
                    attrs: {
                      jurisdictions: _vm.jurisdictions,
                      question:
                        "What is the country (legal jurisdiction) where " +
                        _vm.form.businessName +
                        " is based?"
                    },
                    on: {
                      setJurisdictionCountry: function($event) {
                        return _vm.getJurisdictionCountry($event)
                      }
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "step",
                {
                  staticClass: "jurisdiction",
                  attrs: {
                    completed: _vm.steps[2].completed,
                    currentStep: _vm.currentStep,
                    title: "Documents",
                    number: "3",
                    next: false,
                    back: true,
                    generate: true
                  },
                  on: {
                    stepChanged: function($event) {
                      return _vm.updateStep($event)
                    },
                    newContract: _vm.download
                  }
                },
                [
                  _c("sbox", {
                    attrs: {
                      question: "What documents would you like to generate?"
                    },
                    on: {
                      setGenerateDocs: function($event) {
                        return _vm.getGenerateDocs($event)
                      }
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        ]
      ),
      _vm._v(" "),
      _c("div", {
        staticClass: "mx-auto form-wrapper",
        staticStyle: { width: "35%" },
        attrs: { id: "descriptions" }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);