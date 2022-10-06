"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_views_Company_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/views/Company.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/views/Company.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    var _ref;

    return _ref = {
      visible: false,
      parameter: '',
      value: '',
      infos: [],
      errors: null,
      parameters: ['Company Website', 'Product / Service']
    }, _defineProperty(_ref, "infos", []), _defineProperty(_ref, "company", []), _defineProperty(_ref, "user_id", []), _ref;
  },
  created: function created() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.getData();

            case 2:
              _this.removeSavedParameter();

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  methods: {
    addNew: function addNew() {
      var _this2 = this;

      if (this.visible === false) {
        this.visible = true;
      } else {
        axios.post('/info', {
          parameter: this.parameter,
          value: this.value,
          user_id: this.user_id,
          company_id: this.company.id
        }).then(function (response) {
          _this2.infos.push(response.data.information);
        })["catch"](function (error) {
          _this2.errors = error.response.data.errors;
        });
        this.removeParameter(this.parameter);
        this.parameter = '';
        this.value = '';
      }
    },
    goToDashboard: function goToDashboard() {
      window.location.href = '/dashboard';
    },
    removeParameter: function removeParameter(parameter) {
      var _this3 = this;

      // remove parameter if is already set
      this.parameters.map(function (x) {
        if (parameter === x) {
          return _this3.parameters.splice(_this3.parameters.indexOf(x), 1);
        }
      });
    },
    removeSavedParameter: function removeSavedParameter() {
      var _this4 = this;

      this.infos.map(function (x) {
        if (_this4.parameters.includes(x.parameter)) return _this4.parameters.splice(_this4.parameters.indexOf(x.parameter), 1);
      });
    },
    showEditCompanyModal: function showEditCompanyModal() {
      this.$modal.show('new-company-modal');
    },
    editCompany: function editCompany(companyEdit) {
      this.company = companyEdit;
    },
    deleteCompany: function deleteCompany() {
      axios.post("/company/".concat(this.company.id, "?_method=DELETE")).then(function (response) {
        location.href = '/dashboard';
      });
    },
    openDeleteModal: function openDeleteModal() {
      var _this5 = this;

      this.$modal.show('dialog', {
        title: 'Delete company',
        text: 'Are you sure you want to delete this company? All the data assosiated with this company will be permanently removed.',
        buttons: [{
          title: 'Cancel',
          handler: function handler() {
            _this5.$modal.hide('dialog');
          }
        }, {
          title: 'DELETE',
          handler: function handler() {
            _this5.deleteCompany();
          }
        }]
      });
    },
    getData: function getData() {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return axios.get("/company/".concat(_this6.$route.params.id, "/info")).then(function (response) {
                  _this6.company = response.data.company;
                  _this6.infos = response.data.infos;
                  _this6.user_id = response.data.user_id;
                })["catch"](function (e) {
                  // company does not exist, redirect
                  window.location.href = '/dashboard';
                });

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  },
  watch: {
    parameters: function parameters() {
      if (this.parameters.length === 0) this.visible = false;
    }
  }
});

/***/ }),

/***/ "./resources/js/components/views/Company.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/views/Company.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Company_vue_vue_type_template_id_037508fe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Company.vue?vue&type=template&id=037508fe& */ "./resources/js/components/views/Company.vue?vue&type=template&id=037508fe&");
/* harmony import */ var _Company_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Company.vue?vue&type=script&lang=js& */ "./resources/js/components/views/Company.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Company_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Company_vue_vue_type_template_id_037508fe___WEBPACK_IMPORTED_MODULE_0__.render,
  _Company_vue_vue_type_template_id_037508fe___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/Company.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/Company.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/views/Company.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Company_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Company.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/views/Company.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Company_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/Company.vue?vue&type=template&id=037508fe&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/views/Company.vue?vue&type=template&id=037508fe& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Company_vue_vue_type_template_id_037508fe___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Company_vue_vue_type_template_id_037508fe___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Company_vue_vue_type_template_id_037508fe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Company.vue?vue&type=template&id=037508fe& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/views/Company.vue?vue&type=template&id=037508fe&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/views/Company.vue?vue&type=template&id=037508fe&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/views/Company.vue?vue&type=template&id=037508fe& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "company-dashboard lg:mx-8" },
    [
      _c("v-nav", {
        staticClass: "dashboard-nav",
        attrs: {
          title: _vm.company.name,
          isCompany: true,
          backLink: "/dashboard"
        }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "dashboard mt-6" }, [
        _c(
          "div",
          { staticClass: "dashboard-data-company" },
          [
            _c("div", { staticClass: "edit-company-details" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-primary next-button noborder",
                  attrs: { type: "button" },
                  on: { click: _vm.showEditCompanyModal }
                },
                [_vm._v("Edit")]
              ),
              _vm._v(" "),
               false
                ? 0
                : _vm._e()
            ]),
            _vm._v(" "),
            _c("info", {
              attrs: { parameter: "Company Name", value: _vm.company.name }
            }),
            _vm._v(" "),
            _c("info", {
              attrs: { parameter: "Company Email", value: _vm.company.email }
            }),
            _vm._v(" "),
            _c("info", {
              attrs: {
                parameter: "Company Address",
                value: _vm.company.address
              }
            }),
            _vm._v(" "),
            _vm._l(_vm.infos, function(info) {
              return _c("info", {
                key: info.parameter,
                attrs: { parameter: info.parameter, value: info.value }
              })
            })
          ],
          2
        ),
        _vm._v(" "),
        _vm.visible
          ? _c(
              "form",
              {
                staticClass: "block new-value-form",
                attrs: { method: "POST", action: "/info" },
                on: {
                  submit: function($event) {
                    $event.preventDefault()
                  }
                }
              },
              [
                _vm._t("default"),
                _vm._v(" "),
                _c("div", { staticClass: "flex space-x-2 new-values" }, [
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.parameter,
                          expression: "parameter"
                        }
                      ],
                      staticClass: "select-parameter",
                      on: {
                        change: function($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function(o) {
                              return o.selected
                            })
                            .map(function(o) {
                              var val = "_value" in o ? o._value : o.value
                              return val
                            })
                          _vm.parameter = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        }
                      }
                    },
                    [
                      _c("option", { attrs: { disabled: "", value: "" } }, [
                        _vm._v("New info")
                      ]),
                      _vm._v(" "),
                      _vm._l(_vm.parameters, function(parameter) {
                        return _c("option", [
                          _vm._v(
                            "\n                        " +
                              _vm._s(parameter) +
                              "\n                    "
                          )
                        ])
                      })
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.value,
                        expression: "value"
                      }
                    ],
                    staticClass:
                      "w-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                    attrs: {
                      type: "text",
                      placeholder: "New value",
                      name: "value",
                      id: "value"
                    },
                    domProps: { value: _vm.value },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.value = $event.target.value
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c(
                  "ul",
                  _vm._l(_vm.errors, function(error) {
                    return _c("li", [_vm._v(_vm._s(error))])
                  }),
                  0
                ),
                _vm._v(" "),
                _c("div", { staticClass: "dashboard-button" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-primary next-button noborder",
                      attrs: {
                        type: "submit",
                        disabled: _vm.parameter == "" || _vm.value == ""
                      },
                      on: { click: _vm.addNew }
                    },
                    [_vm._v("Confirm")]
                  )
                ])
              ],
              2
            )
          : _vm._e(),
        _vm._v(" "),
        _c("div", { staticClass: "dashboard-button" }, [
          _c(
            "button",
            {
              staticClass: "btn btn-secondary ml-1 noborder",
              attrs: { type: "button" },
              on: { click: _vm.goToDashboard }
            },
            [_vm._v("Cancel")]
          ),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "btn btn-primary next-button noborder",
              attrs: { type: "button" },
              on: { click: _vm.showEditCompanyModal }
            },
            [_vm._v("Edit")]
          ),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "btn btn-danger noborder",
              attrs: { type: "button" },
              on: { click: _vm.openDeleteModal }
            },
            [_vm._v("Delete")]
          ),
          _vm._v(" "),
          !_vm.visible && _vm.parameters.length > 0
            ? _c(
                "button",
                {
                  staticClass: "btn btn-primary next-button noborder",
                  attrs: { type: "submit" },
                  on: { click: _vm.addNew }
                },
                [_vm._v("New parameter")]
              )
            : _vm._e()
        ])
      ]),
      _vm._v(" "),
      _c(
        "modal",
        {
          attrs: {
            name: "new-company-modal",
            adaptive: true,
            maxWidth: 600,
            height: 500
          }
        },
        [
          _c("edit-details-form", {
            attrs: { company: _vm.company, infos: _vm.infos },
            on: { companyEdited: _vm.editCompany }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("V-dialog")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);