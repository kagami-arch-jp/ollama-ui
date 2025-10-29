(function() {
      const map={"react":"React","react-dom":"ReactDOM","react-cross-component-state":"createSharedState","react-bootstrap":"ReactBootstrap"}
      const exports={}
      const modules={
      '/src/App.jsx': function(require, exports) {"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
require("/src/App.less");
var _store2 = _interopRequireWildcard(require("/src/store.js"));
var _store = _store2;
var api = _interopRequireWildcard(require("/src/api.js"));
var _index = require("/src/utils/index.js");
var _reactBootstrap = require("react-bootstrap");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
_store.initStore();
function App(props) {
  _store.useAutoSave();
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(StatusBar, null), [/*#__PURE__*/_react["default"].createElement(ChatPanel, null), /*#__PURE__*/_react["default"].createElement(SettingPanel, null), /*#__PURE__*/_react["default"].createElement(HistoryPanel, null)][_store2.store.activeTabIdx.useValue()], /*#__PURE__*/_react["default"].createElement(Dialog, null));
}
function StatusBar(props) {
  var _store$activeTabIdx$u = _store2.store.activeTabIdx.use(),
    _store$activeTabIdx$u2 = _slicedToArray(_store$activeTabIdx$u, 2),
    activeTabIdx = _store$activeTabIdx$u2[0],
    set_activeTabIdx = _store$activeTabIdx$u2[1];
  var historyCount = _store.useHistoryCount();
  return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav, {
    className: "statusbar",
    variant: "tabs",
    defaultActiveKey: activeTabIdx
  }, [/*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("i", {
    "class": "bi bi-person-workspace"
  }), "Chat"), /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("i", {
    "class": "bi bi-gear-fill"
  }), "Setting"), /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("i", {
    "class": "bi bi-clipboard2-fill"
  }), "History", historyCount > 0 && /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Badge, {
    variant: "info",
    className: "history-count"
  }, historyCount))].map(function (txt, idx) {
    return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav.Item, {
      key: idx,
      onClick: function onClick(_) {
        set_activeTabIdx(idx);
      }
    }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav.Link, {
      eventKey: idx
    }, txt));
  }));
}
function Dialog() {
  var _store$dialogData$use = _store2.store.dialogData.use(),
    _store$dialogData$use2 = _slicedToArray(_store$dialogData$use, 2),
    dialogData = _store$dialogData$use2[0],
    set_dialogData = _store$dialogData$use2[1];
  function closeDialog() {
    set_dialogData(_objectSpread(_objectSpread({}, dialogData), {}, {
      show: false
    }));
  }
  return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal, {
    show: dialogData.show,
    onHide: closeDialog,
    size: "lg",
    className: "modal-textarea"
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal.Header, {
    closeButton: true
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal.Title, null, dialogData.title)), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal.Body, null, dialogData.content));
}
function Summary(_ref) {
  var placeHolder = _ref.placeHolder,
    title = _ref.title,
    value = _ref.value,
    onChange = _ref.onChange;
  var Textarea = function Textarea(props) {
    var _React$useState = _react["default"].useState(props.value),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      value = _React$useState2[0],
      set_value = _React$useState2[1];
    return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
      value: value,
      onChange: function onChange(e) {
        var v = e.target.value;
        set_value(v);
        props.onChange(v);
      },
      as: "textarea",
      rows: 6,
      placeHolder: props.placeHolder
    });
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "summary",
    onClick: function onClick(_) {
      _store2.store.dialogData.setValue({
        show: true,
        title: title,
        content: /*#__PURE__*/_react["default"].createElement(Textarea, {
          value: value,
          onChange: onChange
        })
      });
    }
  }, value);
}
function SettingPanel(props) {
  var _store$apiKey$use = _store2.store.apiKey.use(),
    _store$apiKey$use2 = _slicedToArray(_store$apiKey$use, 2),
    apiKey = _store$apiKey$use2[0],
    set_apiKey = _store$apiKey$use2[1];
  var ApiKey = /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Group, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "apikey-config"
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Check, {
    className: "checker",
    type: "switch",
    id: "apiKey-switch",
    label: "Use online api",
    checked: apiKey.enable,
    onChange: function onChange(e) {
      set_apiKey(_objectSpread(_objectSpread({}, apiKey), {}, {
        enable: e.target.checked
      }));
    }
  })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
    value: apiKey.value,
    onChange: function onChange(e) {
      return set_apiKey(_objectSpread(_objectSpread({}, apiKey), {}, {
        value: e.target.value
      }));
    },
    className: (0, _index.cls)('custom-input', apiKey.enable ? '' : 'hide'),
    as: "input",
    placeHolder: "apiKey"
  }));
  var _store$prompt$use = _store2.store.prompt.use(),
    _store$prompt$use2 = _slicedToArray(_store$prompt$use, 2),
    prompt = _store$prompt$use2[0],
    set_prompt = _store$prompt$use2[1];
  var SystemPrompt = /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Group, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Label, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Check, {
    type: "switch",
    id: "system-prompt-switch",
    label: "Use System prompt",
    checked: prompt.enable,
    onChange: function onChange(e) {
      set_prompt(_objectSpread(_objectSpread({}, prompt), {}, {
        enable: e.target.checked
      }));
    }
  })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Group, {
    className: (0, _index.cls)('custom-input', prompt.enable ? '' : 'hide')
  }, /*#__PURE__*/_react["default"].createElement(Summary, {
    placeHolder: 'System prompt',
    title: 'System prompt',
    value: prompt.value,
    onChange: function onChange(v) {
      set_prompt(_objectSpread(_objectSpread({}, prompt), {}, {
        value: v
      }));
    }
  })));
  var _store$contextLength$ = _store2.store.contextLength.use(),
    _store$contextLength$2 = _slicedToArray(_store$contextLength$, 2),
    contextLength = _store$contextLength$2[0],
    set_contextLength = _store$contextLength$2[1];
  var ContextLength = /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Group, {
    controlId: "contextLengthRange"
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Label, {
    className: "range-input"
  }, "Context length: ", Math.round(contextLength / 1024), "k", /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
    type: "range",
    custom: true,
    value: Math.round(contextLength / 1024),
    min: 8,
    step: 4,
    max: 128,
    onChange: function onChange(e) {
      set_contextLength(Math.round(e.target.value * 1024));
    }
  })));
  var _store$temperature$us = _store2.store.temperature.use(),
    _store$temperature$us2 = _slicedToArray(_store$temperature$us, 2),
    temperature = _store$temperature$us2[0],
    set_temperature = _store$temperature$us2[1];
  var Temperature = /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Group, {
    controlId: "temperatureRange"
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Label, {
    className: "range-input"
  }, "Temperature: ", temperature, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
    type: "range",
    custom: true,
    value: temperature,
    min: 0,
    step: .1,
    max: 2,
    onChange: function onChange(e) {
      set_temperature(e.target.value);
    }
  })));
  var _store$model$use = _store2.store.model.use(),
    _store$model$use2 = _slicedToArray(_store$model$use, 2),
    model = _store$model$use2[0],
    set_model = _store$model$use2[1];
  var Model = /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Group, {
    controlId: "model"
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Label, null, "Select model"), model.isLoading ? /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
    variant: "light",
    className: "loading-model btn-sm",
    disabled: true
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Spinner, {
    as: "span",
    animation: "grow",
    size: "sm",
    role: "status",
    "aria-hidden": "true"
  }), "Loading...") : /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
    as: "select",
    custom: true,
    value: model.idx,
    disabled: model.isError,
    onChange: function onChange(e) {
      _store.selectModel(e.target.value);
    }
  }, model.names.length ? model.names.map(function (name, idx) {
    return /*#__PURE__*/_react["default"].createElement("option", {
      value: idx
    }, name);
  }) : /*#__PURE__*/_react["default"].createElement("option", null, "- No model -")));
  var _store$customPrompt$u = _store2.store.customPrompt.use(),
    _store$customPrompt$u2 = _slicedToArray(_store$customPrompt$u, 2),
    customPrompt = _store$customPrompt$u2[0],
    set_customPrompt = _store$customPrompt$u2[1];
  var CustomPrompt = /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Group, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Label, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Check, {
    type: "switch",
    id: "custom-switch-1",
    label: "Use preset prompt",
    checked: customPrompt.enable,
    onChange: function onChange(e) {
      set_customPrompt(_objectSpread(_objectSpread({}, customPrompt), {}, {
        enable: e.target.checked
      }));
    }
  })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Group, {
    className: (0, _index.cls)('custom-input', customPrompt.enable ? '' : 'hide')
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.InputGroup, {
    className: "mb-3"
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.InputGroup.Prepend, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
    variant: "primary",
    onClick: function onClick(_) {
      customPrompt.list.unshift({
        title: 'Untitled',
        content: ''
      });
      customPrompt.idx = 0;
      set_customPrompt(_objectSpread({}, customPrompt));
    }
  }, "New Prompt")), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
    as: "select",
    custom: true,
    value: customPrompt.idx,
    onChange: function onChange(e) {
      customPrompt.idx = e.target.value;
      set_customPrompt(_objectSpread({}, customPrompt));
    }
  }, customPrompt.list.map(function (t, idx) {
    return /*#__PURE__*/_react["default"].createElement("option", {
      value: idx
    }, t.title);
  })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.InputGroup.Prepend, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
    variant: "danger",
    onClick: function onClick(_) {
      if (confirm('delete this prompt?')) {
        customPrompt.list.splice(customPrompt.idx, 1);
        customPrompt.idx = customPrompt.list.length - 1;
        set_customPrompt(_objectSpread({}, customPrompt));
      }
    },
    disabled: customPrompt.list.length < 2
  }, "Delete"))), /*#__PURE__*/_react["default"].createElement(Summary, {
    placeHolder: "<Title>\nPrompt content..",
    title: 'Custom prompt',
    value: function (t) {
      return t ? t.raw : '';
    }(customPrompt.list[customPrompt.idx]),
    onChange: function onChange(value) {
      var _value$match = value.match(/^\s*<(.*?)>\s*([\S\s]*)|$/),
        _value$match2 = _slicedToArray(_value$match, 3),
        title = _value$match2[1],
        content = _value$match2[2];
      var r = customPrompt.list[customPrompt.idx];
      r.title = title || 'Untitled';
      r.content = content || (title ? '' : value);
      r.raw = value;
      set_customPrompt(_objectSpread({}, customPrompt));
    }
  })));
  _react["default"].useEffect(function (_) {
    if (_store.getApikey(true) === model.byApikey) return;
    _store.loadModels();
  }, [apiKey]);
  return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form, {
    className: "main-content-bs setting-form"
  }, ApiKey, Model, SystemPrompt, CustomPrompt, ContextLength, Temperature, /*#__PURE__*/_react["default"].createElement("div", {
    className: "btns"
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
    className: "btn-sm",
    variant: "primary",
    onClick: function onClick(_) {
      _store.exportSetting();
    }
  }, "Export setting"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
    className: "btn-sm",
    variant: "info",
    onClick: function onClick(_) {
      _store.importSetting();
    }
  }, "Import setting")));
}
function EmptyMessage(props) {
  return /*#__PURE__*/_react["default"].createElement("h2", {
    className: "empty-panel"
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: "bi bi-emoji-expressionless-fill"
  }), "No message.");
}
function ChatPanel(props) {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "chat-panel"
  }, /*#__PURE__*/_react["default"].createElement(MsgBox, null), /*#__PURE__*/_react["default"].createElement(InputArea, null));
}
function HistoryPanel(props) {
  var history = _store2.store.messageHistory.useValue();
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "history-panel"
  }, history.length ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Alert, {
    className: "clear-history",
    variant: "danger"
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
    variant: "danger",
    className: "btn-sm",
    onClick: function onClick(_) {
      if (confirm('Delete all histories?')) {
        _store.deleteHistories();
      }
    }
  }, "Delete all histories.")), history.map(function (h) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "msgbox",
      key: h.messages[0].key
    }, h.messages.map(function (msg, i) {
      return /*#__PURE__*/_react["default"].createElement(Msg, {
        msg: msg,
        onDelete: function onDelete(_) {
          if (confirm('Delete this message?')) {
            _store.deleteHistory(i, h);
          }
        }
      });
    }));
  })) : /*#__PURE__*/_react["default"].createElement(EmptyMessage, null));
}
function MsgBox(props) {
  var _list2, _list3;
  var systemPrompt = _store.getPresetPrompt(false);
  var messages = _store2.store.messages.useValue();
  var list = messages.list,
    isResponsing = messages.isResponsing;
  var boxRef = _react["default"].useRef(null);
  _react["default"].useEffect(function (_) {
    var _list;
    if ((_list = list[list.length - 1]) !== null && _list !== void 0 && _list.isPending) {
      boxRef.current.scrollTo(0, 9e9);
    }
  }, [isResponsing, (_list2 = list[list.length - 1]) === null || _list2 === void 0 ? void 0 : _list2.text, (_list3 = list[list.length - 1]) === null || _list3 === void 0 ? void 0 : _list3.thinking]);
  _react["default"].useEffect(function (_) {
    boxRef.current.scrollTo(0, 9e9);
  }, []);
  var lastScrollp = _react["default"].useRef(0);
  var _store$customPrompt$u3 = _store2.store.customPrompt.use(),
    _store$customPrompt$u4 = _slicedToArray(_store$customPrompt$u3, 2),
    customPrompt = _store$customPrompt$u4[0],
    set_customPrompt = _store$customPrompt$u4[1];
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, systemPrompt && /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Accordion, {
    className: "preset-card"
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Card, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Card.Header, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.ButtonGroup, {
    "aria-label": "Basic example"
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Accordion.Toggle, {
    className: "preset-prompt-btn btn-sm",
    as: _reactBootstrap.Button,
    eventKey: "preset-prompt"
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: "bi bi-info-circle-fill"
  }), "Prompt"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
    as: "select",
    size: "sm",
    custom: true,
    className: "btn",
    value: customPrompt.enable ? customPrompt.idx : -1,
    onChange: function onChange(e) {
      var idx = e.target.value;
      if (idx < 0) {
        customPrompt.enable = false;
      } else {
        customPrompt.idx = idx;
        customPrompt.enable = true;
      }
      set_customPrompt(_objectSpread({}, customPrompt));
    }
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: -1
  }, "- Disabled -"), customPrompt.list.map(function (t, idx) {
    return /*#__PURE__*/_react["default"].createElement("option", {
      value: idx
    }, t.title);
  })))), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Accordion.Collapse, {
    eventKey: "preset-prompt"
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Alert, {
    variant: "info",
    className: "preset-prompt"
  }, /*#__PURE__*/_react["default"].createElement("pre", null, systemPrompt))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "msgbox",
    ref: function ref(target) {
      boxRef.current = target;
    }
  }, list.length ? list.map(function (msg, i) {
    return /*#__PURE__*/_react["default"].createElement(Msg, {
      msg: msg,
      onReload: function onReload(_) {
        if (confirm('Reload answer?')) {
          _store.reloadAnswer(i);
        }
      },
      onDelete: function onDelete(_) {
        if (confirm('Delete this message?')) {
          _store.deleteMessage(i);
        }
      }
    });
  }) : /*#__PURE__*/_react["default"].createElement(EmptyMessage, null), isResponsing || !list.length ? null : /*#__PURE__*/_react["default"].createElement("center", null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.OverlayTrigger, {
    overlay: /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Tooltip, {
      id: "tooltip-newchat"
    }, "Start a new chat")
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "d-inline-block"
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
    variant: "success",
    className: "btn-sm",
    onClick: function onClick(_) {
      _store.newChat();
    }
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: "new-ico bi bi-arrow-return-left"
  }), "New chat"))))));
}
function Msg(props) {
  var onReload = props.onReload,
    onDelete = props.onDelete,
    msg = props.msg;
  var key = msg.key,
    isQuestion = msg.isQuestion,
    text = msg.text,
    thinking = msg.thinking,
    html = msg.html,
    time = msg.time,
    user = msg.user,
    model = msg.model,
    isActive = msg.isActive,
    isPending = msg.isPending,
    isError = msg.isError;
  var _React$useState3 = _react["default"].useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    plain = _React$useState4[0],
    set_plain = _React$useState4[1];
  return /*#__PURE__*/_react["default"].createElement("div", {
    key: key,
    "class": (0, _index.cls)('text', isQuestion ? 'question' : 'answer', isActive && 'active')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "info"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "user"
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: (0, _index.cls)('icon', 'bi', isQuestion ? 'bi-person-circle' : 'bi-emoji-smile')
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "li"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "name"
  }, user || model), /*#__PURE__*/_react["default"].createElement("div", {
    className: "time"
  }, time))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "tool-btns"
  }, isQuestion ? null : /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Check, {
    type: "switch",
    id: "answer-source-" + key,
    label: "Show source",
    className: "btn-sm",
    checked: plain,
    onChange: function onChange(e) {
      set_plain(e.target.checked);
    }
  }), isPending ? null : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, isQuestion ? null : onReload && /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
    variant: "info",
    className: "btn-sm",
    onClick: onReload
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: "bi bi-arrow-clockwise"
  })), onDelete && /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
    variant: "danger",
    className: "btn-sm",
    onClick: onDelete
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: "bi bi-x-lg"
  }))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "message"
  }, text || thinking ? isQuestion ? /*#__PURE__*/_react["default"].createElement("pre", {
    className: "user-input"
  }, text) : /*#__PURE__*/_react["default"].createElement(Markdown, {
    text: text,
    html: html,
    plain: plain
  }) : /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Spinner, {
    style: {
      margin: 10
    },
    size: "sm",
    animation: "border"
  })));
}
function Markdown(props) {
  var text = props.text,
    html = props.html,
    plain = props.plain;
  return plain || !html ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "md-text plain"
  }, text) : /*#__PURE__*/_react["default"].createElement("div", {
    className: "md-text",
    dangerouslySetInnerHTML: {
      __html: html
    }
  });
}
function InputArea(props) {
  var _store$inputValue$use = _store2.store.inputValue.use(),
    _store$inputValue$use2 = _slicedToArray(_store$inputValue$use, 2),
    inputValue = _store$inputValue$use2[0],
    set_inputValue = _store$inputValue$use2[1];
  var _React$useState5 = _react["default"].useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    active = _React$useState6[0],
    set_active = _React$useState6[1];
  var messages = _store2.store.messages.useValue();
  var inputRef = _react["default"].useRef(null);
  var model = _store2.store.model.useValue();
  var _store$sendWithHistor = _store2.store.sendWithHistory.use(),
    _store$sendWithHistor2 = _slicedToArray(_store$sendWithHistor, 2),
    sendWithHistory = _store$sendWithHistor2[0],
    set_sendWithHistory = _store$sendWithHistor2[1];
  var _store$enterSend$use = _store2.store.enterSend.use(),
    _store$enterSend$use2 = _slicedToArray(_store$enterSend$use, 2),
    enterSend = _store$enterSend$use2[0],
    set_enterSend = _store$enterSend$use2[1];
  var _store$multiLineInput = _store2.store.multiLineInput.use(),
    _store$multiLineInput2 = _slicedToArray(_store$multiLineInput, 2),
    multiLineInput = _store$multiLineInput2[0],
    set_multiLineInput = _store$multiLineInput2[1];
  _react["default"].useEffect(function (_) {
    if (messages.isResponsing) return;
    api.saveMessages();
    if (!multiLineInput) inputRef.current.focus();
  }, [messages.isResponsing]);
  function send() {
    var v = inputValue.trim();
    if (!v) return false;
    set_inputValue('');
    _store.ask(v);
    return true;
  }
  return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.InputGroup, {
    className: "input-area"
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.FormControl, {
    ref: function ref(target) {
      inputRef.current = target;
    },
    placeholder: "Ask me anything..",
    as: multiLineInput ? "textarea" : "input",
    className: active || inputValue ? 'active' : '',
    value: inputValue,
    onChange: function onChange(e) {
      set_inputValue(e.target.value);
    },
    onFocus: function onFocus(_) {
      set_active(true);
    },
    onBlur: function onBlur(_) {
      set_active(false);
    },
    onKeyPress: function onKeyPress(e) {
      if (!enterSend) return;
      if ((e.charCode == 13 || e.code === 'Enter') && !e.shiftKey) {
        var _inputRef$current;
        if (!send()) return;
        set_active(false);
        (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.blur();
      }
    },
    onMouseOver: function onMouseOver(_) {
      if (!multiLineInput) inputRef.current.focus();
    }
  }), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.InputGroup.Append, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
    variant: "success",
    onClick: send
  }, "Send"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.OverlayTrigger, {
    placement: "top",
    overlay: /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Tooltip, null, sendWithHistory ? 'Send message with history.' : 'Send message without history.')
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
    variant: sendWithHistory ? "danger" : "secondary",
    onClick: function onClick(_) {
      set_sendWithHistory(!sendWithHistory);
    }
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: (0, _index.cls)('bi', sendWithHistory ? 'bi-clock-fill' : 'bi-clock-history')
  }))), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.OverlayTrigger, {
    placement: "top",
    overlay: /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Tooltip, null, enterSend ? 'Send message when enter pressed.' : 'Send message after click send button')
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
    variant: enterSend ? "primary" : "secondary",
    className: "enter-switch",
    onClick: function onClick(_) {
      set_enterSend(!enterSend);
    }
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: (0, _index.cls)('bi', enterSend ? 'bi-sign-turn-right' : 'bi-sign-no-right-turn-fill')
  }))), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.OverlayTrigger, {
    placement: "top",
    overlay: /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Tooltip, null, multiLineInput ? 'Multiline inputbox.' : 'Singleline inputbox.')
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
    variant: multiLineInput ? "info" : "secondary",
    onClick: function onClick(_) {
      set_multiLineInput(!multiLineInput);
    }
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: (0, _index.cls)('bi', multiLineInput ? 'bi-list' : 'bi-dash')
  })))), function (_) {
    if (model.isError) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "stop-btn"
      }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
        variant: "warning",
        onClick: function onClick(_) {
          _store.loadModels();
        }
      }, /*#__PURE__*/_react["default"].createElement("i", {
        "class": "icon bi bi-emoji-dizzy-fill"
      }), "No available model."));
    }
    if (messages.isResponsing) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "stop-btn"
      }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
        variant: "primary",
        onClick: function onClick(_) {
          api.resetOllamaClient();
        }
      }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Spinner, {
        as: "span",
        animation: "grow",
        size: "sm",
        role: "status",
        "aria-hidden": "true",
        className: "icon"
      }), "Click to stop responsing..."));
    }
  }() || null);
}
_reactDom["default"].render(/*#__PURE__*/_react["default"].createElement(App, null), document.getElementById('app'));},
'/src/api.js': function(require, exports) {"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chat = chat;
exports.getModels = getModels;
exports.loadConfig = loadConfig;
exports.loadMessages = loadMessages;
exports.resetOllamaClient = resetOllamaClient;
exports.saveConfig = saveConfig;
exports.saveMessages = saveMessages;
var _index = require("/src/utils/index.js");
var _store2 = _interopRequireWildcard(require("/src/store.js"));
var _store = _store2;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function getModels() {
  return _getModels.apply(this, arguments);
}
function _getModels() {
  _getModels = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", (0, _index.callApi)('listModels'));
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getModels.apply(this, arguments);
}
function resetOllamaClient() {
  return _resetOllamaClient.apply(this, arguments);
}
function _resetOllamaClient() {
  _resetOllamaClient = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", (0, _index.callApi)('resetChat'));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _resetOllamaClient.apply(this, arguments);
}
function chat(_x) {
  return _chat.apply(this, arguments);
}
function _chat() {
  _chat = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(onData) {
    var prompt, modelName, temperature, num_ctx, sendWithHistory, msgs, history, question, messages;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          prompt = _store.getPresetPrompt(true);
          modelName = _store.getModelName();
          temperature = parseFloat(_store2.store.temperature.getValue());
          num_ctx = parseInt(_store2.store.contextLength.getValue());
          sendWithHistory = _store2.store.sendWithHistory.getValue();
          msgs = [{
            isQuestion: true,
            text: prompt
          }];
          history = _store2.store.messages.getValue().list.filter(function (x) {
            return !x.isPending;
          });
          question = history.pop();
          if (sendWithHistory) {
            msgs.push.apply(msgs, _toConsumableArray(history).concat([question]));
          } else {
            msgs.push(question);
          }
          messages = msgs.map(function (_ref) {
            var isQuestion = _ref.isQuestion,
              text = _ref.text,
              thinking = _ref.thinking;
            return {
              role: isQuestion ? 'user' : 'system',
              content: isQuestion && text.indexOf('```') === -1 ? '```plain\n' + text + '\n```' : text,
              thinking: thinking
            };
          });
          return _context3.abrupt("return", (0, _index.callApi)('chat', {
            postData: JSON.stringify({
              model: modelName,
              messages: messages,
              options: {
                temperature: temperature,
                num_ctx: num_ctx
              }
            }),
            onData: onData
          }));
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _chat.apply(this, arguments);
}
function loadConfig() {
  try {
    var _JSON$parse = JSON.parse(localStorage.getItem('ollama-webui-state-config')),
      _JSON$parse2 = _slicedToArray(_JSON$parse, 9),
      apiKey = _JSON$parse2[0],
      prompt = _JSON$parse2[1],
      contextLength = _JSON$parse2[2],
      temperature = _JSON$parse2[3],
      model = _JSON$parse2[4],
      customPrompt = _JSON$parse2[5],
      sendWithHistory = _JSON$parse2[6],
      enterSend = _JSON$parse2[7],
      multiLineInput = _JSON$parse2[8];
    _store2.store.apiKey.setValue(apiKey);
    _store2.store.prompt.setValue(prompt);
    _store2.store.contextLength.setValue(contextLength);
    _store2.store.temperature.setValue(temperature);
    _store2.store.model.setValue(model);
    _store2.store.customPrompt.setValue(customPrompt);
    _store2.store.sendWithHistory.setValue(sendWithHistory);
    _store2.store.enterSend.setValue(enterSend);
    _store2.store.multiLineInput.setValue(multiLineInput);
  } catch (e) {}
}
function saveConfig() {
  var settings = JSON.stringify([_store2.store.apiKey.getValue(), _store2.store.prompt.getValue(), _store2.store.contextLength.getValue(), _store2.store.temperature.getValue(), _store2.store.model.getValue(), _store2.store.customPrompt.getValue(), _store2.store.sendWithHistory.getValue(), _store2.store.enterSend.getValue(), _store2.store.multiLineInput.getValue()]);
  localStorage.setItem('ollama-webui-state-config', settings);
}
function loadMessages() {
  try {
    var _JSON$parse3 = JSON.parse(localStorage.getItem('ollama-webui-state-messages')),
      _JSON$parse4 = _slicedToArray(_JSON$parse3, 2),
      messages = _JSON$parse4[0],
      history = _JSON$parse4[1];
    _store2.store.messages.setValue(messages);
    _store2.store.messageHistory.setValue(history);
  } catch (e) {}
}
function saveMessages() {
  try {
    var messages = _store2.store.messages.getValue();
    var messageHistory = _store2.store.messageHistory.getValue();
    localStorage.setItem('ollama-webui-state-messages', JSON.stringify([messages, messageHistory]));
  } catch (e) {}
}},
'/src/store.js': function(require, exports) {"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ask = ask;
exports.deleteHistories = deleteHistories;
exports.deleteHistory = deleteHistory;
exports.deleteMessage = deleteMessage;
exports.exportSetting = exportSetting;
exports.getApikey = getApikey;
exports.getModelName = getModelName;
exports.getPresetPrompt = getPresetPrompt;
exports.importSetting = importSetting;
exports.initStore = initStore;
exports.loadModels = loadModels;
exports.newChat = newChat;
exports.reloadAnswer = reloadAnswer;
exports.selectModel = selectModel;
exports.store = void 0;
exports.useAutoSave = useAutoSave;
exports.useHistoryCount = useHistoryCount;
var _react = _interopRequireDefault(require("react"));
var _reactCrossComponentState = _interopRequireDefault(require("react-cross-component-state"));
var _index = require("/src/utils/index.js");
var _patch = _interopRequireDefault(require("/src/utils/patch.js"));
var api = _interopRequireWildcard(require("/src/api.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var store = exports.store = {
  activeTabIdx: (0, _reactCrossComponentState["default"])(0),
  apiKey: (0, _reactCrossComponentState["default"])(function (_) {
    return {
      enable: false,
      value: ''
    };
  }),
  prompt: (0, _reactCrossComponentState["default"])(function (_) {
    return {
      enable: false,
      value: ''
    };
  }),
  customPrompt: (0, _reactCrossComponentState["default"])(function (_) {
    return {
      enable: false,
      list: [{
        title: 'Untitled',
        content: ''
      }],
      idx: 0
    };
  }),
  model: (0, _reactCrossComponentState["default"])(function (_) {
    return {
      names: [],
      idx: null,
      selects: {},
      byApikey: '',
      isLoading: true,
      isError: false
    };
  }),
  temperature: (0, _reactCrossComponentState["default"])(0),
  contextLength: (0, _reactCrossComponentState["default"])(8 * 1024),
  messages: (0, _reactCrossComponentState["default"])(function (_) {
    return {
      list: [],
      isResponsing: false
    };
  }),
  messageHistory: (0, _reactCrossComponentState["default"])(function (_) {
    return [];
  }),
  sendWithHistory: (0, _reactCrossComponentState["default"])(true),
  enterSend: (0, _reactCrossComponentState["default"])(false),
  multiLineInput: (0, _reactCrossComponentState["default"])(false),
  inputValue: (0, _reactCrossComponentState["default"])(''),
  dialogData: (0, _reactCrossComponentState["default"])({
    show: false,
    title: null,
    content: null
  })
};
function initStore() {
  return _initStore.apply(this, arguments);
}
function _initStore() {
  _initStore = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          api.resetOllamaClient();
          api.loadConfig();
          api.loadMessages();
          loadModels();
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _initStore.apply(this, arguments);
}
function getModelName() {
  var model = store.model.getValue();
  return model.names[model.idx];
}
function exportSetting() {
  var apiKey = store.apiKey.getValue();
  var prompt = store.prompt.getValue();
  var contextLength = store.contextLength.getValue();
  var temperature = store.temperature.getValue();
  var model = store.model.getValue();
  var customPrompt = store.customPrompt.getValue();
  var ret = {
    prompt: prompt,
    customPrompt: customPrompt
  };
  var _url = URL.createObjectURL(new Blob([encodeURIComponent(JSON.stringify(ret))], {
    type: 'text/plain'
  }));
  var a = document.body.appendChild(document.createElement('a'));
  a.href = _url;
  a.download = 'setting.txt';
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(_url);
}
function importSetting() {
  var inp = document.createElement('input');
  inp.type = 'file';
  inp.accept = '.txt';
  inp.className = 'hidden-btn';
  inp.addEventListener('change', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(event) {
      var file, s, k, _store$k;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            file = event.target.files[0];
            if (!file) {
              _context.next = 19;
              break;
            }
            _context.prev = 2;
            _context.t0 = JSON;
            _context.t1 = decodeURIComponent;
            _context.next = 7;
            return file.text();
          case 7:
            _context.t2 = _context.sent;
            _context.t3 = (0, _context.t1)(_context.t2);
            s = _context.t0.parse.call(_context.t0, _context.t3);
            for (k in s) {
              (_store$k = store[k]) === null || _store$k === void 0 || _store$k.setValue(s[k]);
            }
            inp.remove();
            alert('import config successful!');
            _context.next = 19;
            break;
          case 15:
            _context.prev = 15;
            _context.t4 = _context["catch"](2);
            console.log(_context.t4);
            alert('failed to load config: ' + _context.t4.message);
          case 19:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[2, 15]]);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  inp.click();
  document.body.appendChild(inp);
}
function getApikey(returnFragment) {
  var apiKey = store.apiKey.getValue();
  var e = apiKey.enable && apiKey.value;
  if (!e) return '';
  if (returnFragment) return e.substr(10, 8);
  return e;
}
function newMsg(content) {
  var isQuestion = content ? true : false;
  return {
    key: (0, _index.newUUID)(),
    isQuestion: isQuestion || false,
    text: isQuestion ? content : '',
    user: isQuestion ? 'anonymous' : '',
    thinking: '',
    html: '',
    model: isQuestion ? '' : getModelName(),
    time: (0, _index.formatTime)(),
    isPending: isQuestion ? false : true,
    isError: false,
    isActive: false
  };
}
function ask(question, answer) {
  var messages = store.messages.getValue();
  messages.isResponsing = true;
  var ans = answer || newMsg();
  if (!answer) {
    var msg = newMsg(question);
    messages.list.push(msg, ans);
    setTimeout(function (_) {
      msg.isActive = true;
      store.messages.setValue(_objectSpread({}, messages));
    }, 100);
  }
  setTimeout(function (_) {
    ans.isActive = true;
    store.messages.setValue(_objectSpread({}, messages));
  }, 200);
  var patch = (0, _patch["default"])(getModelName());
  var update = (0, _index.throttle)(function (err, isEnd) {
    ans.html = (0, _index.markdown)((ans.thinking ? "<think>".concat(ans.thinking, "</think>\n") : '') + ans.text);
    if (err || isEnd) {
      api.resetOllamaClient();
      ans.isPending = false;
      messages.isResponsing = false;
    }
    store.messages.setValue(_objectSpread({}, messages));
  }, 200);
  api.chat(function (e, isEnd, ret) {
    if (patch.isEnd) return;
    var _JSON$parse = JSON.parse(ret || '{}'),
      content = _JSON$parse.content,
      thinking = _JSON$parse.thinking;
    if (content) ans.text += content;else if (thinking) ans.thinking += thinking;
    var err = e || (isEnd && !ans.text ? new Error('Unknown error') : null);
    if (err) {
      ans.text += '\n### ' + err.message;
      ans.isError = true;
    } else if (content) {
      var _patch$text = patch.text(ans.text),
        _patch$text2 = _slicedToArray(_patch$text, 2),
        realEnd = _patch$text2[0],
        text = _patch$text2[1];
      if (realEnd) {
        isEnd = true;
        ans.text = text;
      }
    }
    update(err, isEnd);
  });
}
function loadModels() {
  return _loadModels.apply(this, arguments);
}
function _loadModels() {
  _loadModels = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var model, mod, arr, name, idx;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          model = _objectSpread(_objectSpread({}, store.model.getValue()), {}, {
            isLoading: true,
            isError: false,
            byApikey: getApikey(true)
          });
          store.model.setValue(model);
          _context3.next = 4;
          return api.getModels();
        case 4:
          mod = _context3.sent;
          arr = mod === null || mod === void 0 ? void 0 : mod.result;
          if (Array.isArray(arr)) {
            _context3.next = 9;
            break;
          }
          store.model.setValue(_objectSpread(_objectSpread({}, model), {}, {
            isLoading: false,
            isError: true,
            names: [],
            idx: -1
          }));
          return _context3.abrupt("return");
        case 9:
          model.selects = model.selects || {};
          name = model.selects[model.byApikey] || model.names[model.idx];
          idx = arr.findIndex(function (x) {
            return x === name;
          });
          model.selects[model.byApikey] = name;
          store.model.setValue(_objectSpread(_objectSpread({}, model), {}, {
            names: arr,
            idx: idx < 0 ? 0 : idx,
            isLoading: false,
            isError: false
          }));
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _loadModels.apply(this, arguments);
}
function selectModel(idx) {
  var model = store.model.getValue();
  model.idx = idx;
  model.selects[model.byApikey] = model.names[idx];
  store.model.setValue(_objectSpread({}, model));
}
function getPresetPrompt(returnRealtime) {
  var now = new Date().toLocaleString();
  var day = '日月火水木金土'.charAt(new Date().getDay()) + '曜日';
  var systemPrompt = store.prompt.getValue();
  var customPrompt = store.customPrompt.getValue();
  return [returnRealtime && "\u4ECA\u306F\u300C".concat(now, "\u300D\u3067\u3059\u3002\u4ECA\u65E5\u306F\u300C").concat(day, "\u300D\u3067\u3059\u3002"), systemPrompt.enable && systemPrompt.value, customPrompt.enable && customPrompt.list[customPrompt.idx].content].filter(Boolean).join('\n');
}
function newChat() {
  var messages = store.messages.getValue();
  var messageHistory = store.messageHistory.getValue();
  store.messageHistory.setValue([].concat(_toConsumableArray(messageHistory), [{
    messages: messages.list,
    sendWithHistory: store.sendWithHistory.getValue(),
    enterSend: store.enterSend.getValue(),
    multiLineInput: store.multiLineInput.getValue()
  }]));
  store.messages.setValue(_objectSpread(_objectSpread({}, messages), {}, {
    list: [],
    isResponsing: false
  }));
  api.saveMessages();
}
function deleteMessage(i) {
  var messages = store.messages.getValue();
  messages.list.splice(i, 1);
  store.messages.setValue(_objectSpread({}, messages));
  api.saveMessages();
}
function useHistoryCount() {
  var messageHistory = store.messageHistory.useValue();
  return messageHistory.reduce(function (n, h) {
    return n + h.messages.length;
  }, 0);
}
function deleteHistory(i, history) {
  var messageHistory = store.messageHistory.getValue();
  history.messages.splice(i, 1);
  messageHistory = messageHistory.filter(function (x) {
    return x.messages.length;
  });
  store.messageHistory.setValue(_toConsumableArray(messageHistory));
  api.saveMessages();
}
function useAutoSave() {
  var throttleSave = _react["default"].useCallback((0, _index.throttle)(api.saveConfig, 1e3), []);
  _react["default"].useEffect(throttleSave, [store.apiKey.useValue(), store.prompt.useValue(), store.contextLength.useValue(), store.temperature.useValue(), store.model.useValue(), store.customPrompt.useValue(), store.sendWithHistory.useValue(), store.enterSend.useValue(), store.multiLineInput.useValue()]);
}
function deleteHistories() {
  store.messageHistory.setValue([]);
  api.saveMessages();
}
function reloadAnswer(i) {
  var messages = store.messages.getValue();
  messages.list[i] = newMsg();
  ask(messages.list[i - 1].text, messages.list[i]);
  store.messages.setValue(_objectSpread({}, messages));
}},
'/src/utils/index.js': function(require, exports) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callApi = callApi;
exports.cls = cls;
exports.formatTime = formatTime;
exports.loadCss = loadCss;
exports.loadScript = loadScript;
exports.markdown = markdown;
exports.newUUID = newUUID;
exports.throttle = throttle;
var _store = require("/src/store.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function cls() {
  for (var _len = arguments.length, c = new Array(_len), _key = 0; _key < _len; _key++) {
    c[_key] = arguments[_key];
  }
  return c.filter(Boolean).join(' ');
}
var sessid = 0;
var key_prefix = (Date.now() + Math.random()).toString(36).replace(/\./g, '-') + '-';
function newUUID() {
  return key_prefix + '-' + (sessid++).toString(36);
}
function formatTime() {
  var a = new Date();
  return a.toLocaleString();
}
function callApi(_x, _x2) {
  return _callApi.apply(this, arguments);
}
function _callApi() {
  _callApi = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(action, opt) {
    var _ref, postData, onData, _store$apiKey$getValu, enable, value, option, req, response, reader, dec, _loop;
    return _regeneratorRuntime().wrap(function _callee$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _ref = opt || {}, postData = _ref.postData, onData = _ref.onData;
          _store$apiKey$getValu = _store.store.apiKey.getValue(), enable = _store$apiKey$getValu.enable, value = _store$apiKey$getValu.value;
          option = {
            headers: {
              'x-ollama-apikey': enable && value || ''
            }
          };
          if (postData) {
            Object.assign(option, {
              method: 'POST',
              body: postData
            });
          }
          req = fetch('/' + action, option);
          if (!onData) {
            _context2.next = 25;
            break;
          }
          _context2.prev = 6;
          _context2.next = 9;
          return req;
        case 9:
          response = _context2.sent;
          reader = response.body.getReader();
          dec = new TextDecoder();
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var _yield$reader$read, done, value;
            return _regeneratorRuntime().wrap(function _loop$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return reader.read();
                case 2:
                  _yield$reader$read = _context.sent;
                  done = _yield$reader$read.done;
                  value = _yield$reader$read.value;
                  if (value) {
                    dec.decode(value).split('\n').map(function (val) {
                      try {
                        if (JSON.parse(val)) onData(null, done, val);
                      } catch (e) {}
                    });
                  } else {
                    onData(null, done, null);
                  }
                  if (!done) {
                    _context.next = 8;
                    break;
                  }
                  return _context.abrupt("return", 1);
                case 8:
                case "end":
                  return _context.stop();
              }
            }, _loop);
          });
        case 13:
          return _context2.delegateYield(_loop(), "t0", 14);
        case 14:
          if (!_context2.t0) {
            _context2.next = 16;
            break;
          }
          return _context2.abrupt("break", 18);
        case 16:
          _context2.next = 13;
          break;
        case 18:
          _context2.next = 23;
          break;
        case 20:
          _context2.prev = 20;
          _context2.t1 = _context2["catch"](6);
          onData(_context2.t1);
        case 23:
          _context2.next = 28;
          break;
        case 25:
          _context2.next = 27;
          return req;
        case 27:
          return _context2.abrupt("return", _context2.sent.json());
        case 28:
        case "end":
          return _context2.stop();
      }
    }, _callee, null, [[6, 20]]);
  }));
  return _callApi.apply(this, arguments);
}
function markdown(str) {
  var _marked = new marked.Marked(markedHighlight.markedHighlight({
    emptyLangClass: 'hljs language-hljs-plaintext',
    langPrefix: 'hljs language-',
    highlight: function highlight(code, lang, info) {
      var language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, {
        language: language
      }).value;
    }
  }));
  _marked.use({
    renderer: {
      html: function html(x) {
        return x.raw.replace(/<br\s*>/g, '\n').replace(/<\/?think|</g, function (_) {
          if (_ === '<') return '&lt;';else if (_ === '<think') return '<div class="think"';else if (_ === '</think') return '</div';
        }).replace(/\n/g, '<br />');
      },
      code: function code(e, lang) {
        return "<pre><code class=\"hljs language-".concat(lang || 'markdown', "\">").concat(e.trim(), "</code></pre>");
      }
    }
  });
  return _marked.parse(str, {
    mangle: false,
    headerIds: false,
    silent: true
  });
}
function loadScript(_x3, _x4, _x5) {
  return _loadScript.apply(this, arguments);
}
function _loadScript() {
  _loadScript = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(src, isModule, jscode) {
    return _regeneratorRuntime().wrap(function _callee2$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", new Promise(function (resolve, reject) {
            var s = document.createElement('script');
            if (src) s.src = resolvePath(src);else if (jscode) s.innerHTML = jscode;
            s.type = isModule ? 'module' : 'text/javascript';
            s.onload = function (_) {
              return resolve();
            };
            s.onerror = function (_) {
              return reject();
            };
            document.body.appendChild(s);
          }));
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee2);
  }));
  return _loadScript.apply(this, arguments);
}
function loadCss(src) {
  var e = document.createElement('link');
  e.rel = 'stylesheet';
  e.href = resolvePath(src);
  e.type = 'text/css';
  document.body.appendChild(e);
}
function throttle(fn, interval) {
  var t = 0,
    e = 0;
  var _fn2 = function _fn() {
    for (var _len2 = arguments.length, x = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      x[_key2] = arguments[_key2];
    }
    clearTimeout(e);
    var _t = Date.now();
    if (_t - t < interval) {
      e = setTimeout(function (_) {
        return _fn2.apply(void 0, x);
      }, interval);
      return;
    }
    fn.apply(void 0, x);
    t = _t;
  };
  return _fn2;
}},
'/src/utils/patch.js': function(require, exports) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = buildChatPatch;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function buildChatPatch(model) {
  var patch = {
    isEnd: false,
    text: function text(x) {
      return [false, x];
    }
  };
  if (model.indexOf('gemma') > -1) {
    patch.text = function (x) {
      var _patchGemmaModelRespo = patchGemmaModelResponse(x),
        _patchGemmaModelRespo2 = _slicedToArray(_patchGemmaModelRespo, 2),
        isEnd = _patchGemmaModelRespo2[0],
        text = _patchGemmaModelRespo2[1];
      patch.isEnd = isEnd;
      return [isEnd, text];
    };
  }
  return patch;
}
function patchGemmaModelResponse(text) {
  var flags = ['</end_of_turn>', '<end_of_turn>', '</start_of_turn>', '<start_of_turn>'];
  for (var _i = 0, _flags = flags; _i < _flags.length; _i++) {
    var d = _flags[_i];
    var i = text.indexOf(d);
    if (i === -1) continue;
    return [true, text.substr(0, i)];
  }
  return [false, text];
}}
    }
    function injectCSS(code) {
      const newStyle=document.createElement('style')
      newStyle.textContent=code
      document.head.appendChild(newStyle)
    }
    function require(x) {
      if(modules[x]) {
        if(!exports[x]) {
          const exp={}
          exports[x]={result: exp}
          modules[x](require, exp)
        }
        return exports[x].result
      }
      return window[x] || window[map[x]]
    }
    injectCSS("html,\nbody {\n  margin: 0;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  background: #000;\n  width: 100%;\n  font-size: 16Px;\n}\nhtml .modal-textarea .modal-dialog,\nbody .modal-textarea .modal-dialog {\n  position: absolute;\n  transform: none;\n  bottom: 0;\n  top: 0;\n  left: 0;\n  right: 0;\n}\nhtml .modal-textarea .modal-dialog .modal-content,\nbody .modal-textarea .modal-dialog .modal-content {\n  height: 100%;\n}\nhtml .modal-textarea .modal-dialog .modal-content textarea,\nbody .modal-textarea .modal-dialog .modal-content textarea {\n  height: 100%;\n}\nhtml #app,\nbody #app {\n  width: 100%;\n  background: #fff;\n  margin: 0;\n  flex-direction: column;\n  height: 100%;\n  overflow: auto;\n  display: flex;\n}\nhtml #app .empty-panel,\nbody #app .empty-panel {\n  display: flex;\n  justify-content: center;\n  margin: 3rem 0;\n  color: #ddd;\n}\nhtml #app .empty-panel .bi,\nbody #app .empty-panel .bi {\n  margin-right: 0.6rem;\n}\nhtml #app .statusbar,\nbody #app .statusbar {\n  margin: 0.3rem 0.6rem;\n  position: sticky;\n  top: 0;\n  background: #fff;\n  z-index: 99;\n  box-shadow: 0 0 1.2rem #eee;\n}\nhtml #app .statusbar .nav-link,\nbody #app .statusbar .nav-link {\n  display: flex;\n  align-items: center;\n}\nhtml #app .statusbar .nav-link .bi,\nbody #app .statusbar .nav-link .bi {\n  font-size: 0.72rem;\n  margin-right: 0.24rem;\n}\nhtml #app .statusbar .nav-link .history-count,\nbody #app .statusbar .nav-link .history-count {\n  margin-left: 0.3rem;\n}\nhtml #app .main-content-bs,\nbody #app .main-content-bs {\n  margin: 0.3rem 0.6rem;\n}\nhtml #app .main-content-bs.setting-form,\nbody #app .main-content-bs.setting-form {\n  margin: 0rem 0.8999999999999999rem;\n  margin-top: 0.6rem;\n  display: flex;\n  height: 100%;\n  padding-left: 0.3rem;\n  flex-direction: column;\n  overflow-y: scroll;\n  overflow-x: hidden;\n}\nhtml #app .main-content-bs.setting-form label,\nbody #app .main-content-bs.setting-form label {\n  user-select: none;\n}\nhtml #app .main-content-bs.setting-form .apikey-config,\nbody #app .main-content-bs.setting-form .apikey-config {\n  display: flex;\n  margin-bottom: 0.6rem;\n}\nhtml #app .main-content-bs.setting-form .apikey-config .checker,\nbody #app .main-content-bs.setting-form .apikey-config .checker {\n  margin-right: 1.2rem;\n}\nhtml #app .main-content-bs.setting-form .summary,\nbody #app .main-content-bs.setting-form .summary {\n  background: #eee;\n  color: #666;\n  padding: 0.18rem;\n  height: 1.7999999999999998rem;\n  overflow: hidden;\n  border: 0.06rem solid #ccc;\n  border-radius: 0.24rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  cursor: pointer;\n}\nhtml #app .main-content-bs.setting-form .loading-model,\nbody #app .main-content-bs.setting-form .loading-model {\n  margin-left: 0.6rem;\n}\nhtml #app .main-content-bs.setting-form .form-group,\nbody #app .main-content-bs.setting-form .form-group,\nhtml #app .main-content-bs.setting-form .input-group,\nbody #app .main-content-bs.setting-form .input-group {\n  margin-top: 0.6rem;\n  margin-bottom: 0.6rem;\n}\nhtml #app .main-content-bs.setting-form .form-group .custom-input,\nbody #app .main-content-bs.setting-form .form-group .custom-input,\nhtml #app .main-content-bs.setting-form .input-group .custom-input,\nbody #app .main-content-bs.setting-form .input-group .custom-input {\n  transition: 0.3s;\n}\nhtml #app .main-content-bs.setting-form .form-group .custom-input.hide,\nbody #app .main-content-bs.setting-form .form-group .custom-input.hide,\nhtml #app .main-content-bs.setting-form .input-group .custom-input.hide,\nbody #app .main-content-bs.setting-form .input-group .custom-input.hide {\n  height: 0;\n  padding: 0;\n  margin: -0.3rem;\n  overflow: hidden;\n  opacity: 0;\n}\nhtml #app .main-content-bs.setting-form .form-group .range-input,\nbody #app .main-content-bs.setting-form .form-group .range-input,\nhtml #app .main-content-bs.setting-form .input-group .range-input,\nbody #app .main-content-bs.setting-form .input-group .range-input {\n  display: flex;\n  white-space: nowrap;\n}\nhtml #app .main-content-bs.setting-form .form-group .range-input input,\nbody #app .main-content-bs.setting-form .form-group .range-input input,\nhtml #app .main-content-bs.setting-form .input-group .range-input input,\nbody #app .main-content-bs.setting-form .input-group .range-input input {\n  margin-left: 0.6rem;\n  margin-right: 0.6rem;\n}\nhtml #app .main-content-bs.setting-form .btns,\nbody #app .main-content-bs.setting-form .btns {\n  position: sticky;\n  bottom: 0;\n  background: #fff;\n  padding: 0.6rem 0;\n  margin-top: -0.6rem;\n  z-index: 10;\n}\nhtml #app .main-content-bs.setting-form .btns .btn,\nbody #app .main-content-bs.setting-form .btns .btn {\n  margin-right: 0.6rem;\n}\nhtml #app .chat-panel,\nbody #app .chat-panel {\n  display: flex;\n  height: 100%;\n  flex-direction: column;\n  width: 100%;\n  overflow: hidden;\n  background: #fff;\n}\nhtml #app .chat-panel .input-area,\nbody #app .chat-panel .input-area {\n  align-items: flex-end;\n  padding: 0.6rem;\n}\nhtml #app .chat-panel .input-area .stop-btn,\nbody #app .chat-panel .input-area .stop-btn {\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  backdrop-filter: blur(0.06rem);\n  z-index: 10;\n}\nhtml #app .chat-panel .input-area .stop-btn .icon,\nbody #app .chat-panel .input-area .stop-btn .icon {\n  margin-right: 0.3rem;\n}\nhtml #app .chat-panel .input-area .enter-switch,\nbody #app .chat-panel .input-area .enter-switch {\n  transform: rotate(180deg);\n  transform-origin: center;\n}\nhtml #app .chat-panel .input-area textarea,\nbody #app .chat-panel .input-area textarea {\n  height: 2.37rem;\n  resize: none;\n  transition: 0.3s;\n  overflow: hidden;\n}\nhtml #app .chat-panel .input-area textarea.active,\nbody #app .chat-panel .input-area textarea.active {\n  height: 45vh;\n  min-height: 6rem;\n  overflow: auto;\n}\nhtml #app .preset-prompt,\nbody #app .preset-prompt {\n  white-space: break-spaces;\n  line-height: 1.6;\n  margin-bottom: 0;\n}\nhtml #app .preset-card,\nbody #app .preset-card {\n  margin: 0 0.6rem;\n}\nhtml #app .preset-card pre,\nbody #app .preset-card pre {\n  margin-bottom: 0;\n  white-space: pre-wrap;\n}\nhtml #app .preset-prompt-btn,\nbody #app .preset-prompt-btn {\n  white-space: nowrap;\n}\nhtml #app .preset-prompt-btn .bi,\nbody #app .preset-prompt-btn .bi {\n  margin-right: 0.36rem;\n}\nhtml #app .msgbox,\nbody #app .msgbox {\n  margin: 0.3rem 0;\n  scroll-behavior: smooth;\n  height: 100%;\n  overflow: auto;\n  padding-bottom: 1.2rem;\n}\nhtml #app .msgbox .tool-btns,\nbody #app .msgbox .tool-btns {\n  display: flex;\n  white-space: nowrap;\n}\nhtml #app .msgbox .tool-btns .btn,\nbody #app .msgbox .tool-btns .btn {\n  margin: 0 0.18rem;\n  border-radius: 100%;\n}\nhtml #app .msgbox .new-ico,\nbody #app .msgbox .new-ico {\n  margin-right: 0.24rem;\n  font-size: 0.72rem;\n}\nhtml #app .msgbox .alert,\nbody #app .msgbox .alert {\n  margin-bottom: 0;\n}\nhtml #app .msgbox .preset-prompt,\nbody #app .msgbox .preset-prompt {\n  overflow: auto;\n  white-space: break-spaces;\n  font-size: 0.72rem;\n  line-height: 1.2;\n}\nhtml #app .msgbox .text,\nbody #app .msgbox .text {\n  padding: 0.48rem;\n  margin: 0 0.48rem;\n  display: flex;\n  flex-direction: column;\n  transition: 0.45s cubic-bezier(1, -0.22, 0, 1.15);\n  transform: scale(0);\n}\nhtml #app .msgbox .text.active,\nbody #app .msgbox .text.active {\n  transform: scale(1);\n}\nhtml #app .msgbox .text .message,\nbody #app .msgbox .text .message {\n  position: relative;\n  border-radius: 0.3rem;\n  padding: 0.48rem;\n  white-space: normal;\n  word-break: break-all;\n  overflow: auto;\n  line-height: 1.7;\n}\nhtml #app .msgbox .text .info,\nbody #app .msgbox .text .info {\n  position: sticky;\n  z-index: 10;\n  top: 0;\n  left: 0;\n  backdrop-filter: blur(0.18rem);\n  background: rgba(255, 255, 255, 0.8);\n  padding: 0 0.3rem;\n  display: flex;\n  align-items: center;\n  overflow: hidden;\n  white-space: nowrap;\n  border-radius: 0.3rem;\n  padding: 0.36rem 0.3rem;\n  justify-content: space-between;\n}\nhtml #app .msgbox .text .info .user,\nbody #app .msgbox .text .info .user {\n  margin: 0 0.24rem;\n  white-space: nowrap;\n  overflow: hidden;\n  display: flex;\n}\nhtml #app .msgbox .text .info .user .icon,\nbody #app .msgbox .text .info .user .icon {\n  margin-right: 0.48rem;\n  font-size: 1.5rem;\n}\nhtml #app .msgbox .text .info .user .li .name,\nbody #app .msgbox .text .info .user .li .name {\n  color: #333;\n  font-size: 0.84rem;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  margin-bottom: 0.12rem;\n}\nhtml #app .msgbox .text .info .user .li .time,\nbody #app .msgbox .text .info .user .li .time {\n  font-size: 0.48rem;\n  color: #777;\n}\nhtml #app .msgbox .text.question,\nbody #app .msgbox .text.question {\n  transform-origin: right bottom;\n  align-items: flex-end;\n}\nhtml #app .msgbox .text.question .message,\nbody #app .msgbox .text.question .message {\n  background: #eff;\n  color: #344;\n}\nhtml #app .msgbox .text.question .message .user-input,\nbody #app .msgbox .text.question .message .user-input {\n  margin: 0;\n  white-space: break-spaces;\n}\nhtml #app .msgbox .text.answer,\nbody #app .msgbox .text.answer {\n  transform-origin: left bottom;\n}\nhtml #app .msgbox .text.answer .message,\nbody #app .msgbox .text.answer .message {\n  background: #ffe;\n  color: #226;\n}\nhtml #app .msgbox .text .message,\nbody #app .msgbox .text .message {\n  font-size: 0.96rem;\n  line-height: 1.5;\n}\nhtml #app .msgbox .md-text.plain,\nbody #app .msgbox .md-text.plain {\n  white-space: break-spaces;\n}\nhtml #app .msgbox .md-text h1,\nbody #app .msgbox .md-text h1 {\n  font-size: 1.92rem;\n}\nhtml #app .msgbox .md-text h2,\nbody #app .msgbox .md-text h2 {\n  font-size: 1.68rem;\n}\nhtml #app .msgbox .md-text h3,\nbody #app .msgbox .md-text h3 {\n  font-size: 1.44rem;\n}\nhtml #app .msgbox .md-text h4,\nbody #app .msgbox .md-text h4 {\n  font-size: 1.3199999999999998rem;\n}\nhtml #app .msgbox .md-text h5,\nbody #app .msgbox .md-text h5 {\n  font-size: 1.2rem;\n}\nhtml #app .msgbox .md-text h6,\nbody #app .msgbox .md-text h6 {\n  font-size: 1.08rem;\n}\nhtml #app .msgbox .md-text h1,\nbody #app .msgbox .md-text h1,\nhtml #app .msgbox .md-text h2,\nbody #app .msgbox .md-text h2,\nhtml #app .msgbox .md-text h3,\nbody #app .msgbox .md-text h3 {\n  font-weight: 700;\n}\nhtml #app .msgbox .md-text h1,\nbody #app .msgbox .md-text h1,\nhtml #app .msgbox .md-text h2,\nbody #app .msgbox .md-text h2,\nhtml #app .msgbox .md-text h3,\nbody #app .msgbox .md-text h3,\nhtml #app .msgbox .md-text h4,\nbody #app .msgbox .md-text h4,\nhtml #app .msgbox .md-text h5,\nbody #app .msgbox .md-text h5,\nhtml #app .msgbox .md-text h6,\nbody #app .msgbox .md-text h6 {\n  line-height: 1.8;\n  margin-bottom: 0;\n}\nhtml #app .msgbox .md-text table,\nbody #app .msgbox .md-text table,\nhtml #app .msgbox .md-text th,\nbody #app .msgbox .md-text th,\nhtml #app .msgbox .md-text td,\nbody #app .msgbox .md-text td {\n  border: 0.06rem solid #ccc;\n  border-collapse: collapse;\n}\nhtml #app .msgbox .md-text .think,\nbody #app .msgbox .md-text .think {\n  font-size: 0.72rem;\n  line-height: 1.5;\n  color: #999;\n  font-style: italic;\n  margin: 0.3rem;\n}\nhtml #app .msgbox .md-text .think:before,\nbody #app .msgbox .md-text .think:before {\n  content: 'Thinking:';\n}\nhtml #app .msgbox .md-text table,\nbody #app .msgbox .md-text table {\n  background: #ccc;\n  text-align: left;\n  border-spacing: 0.06rem;\n}\nhtml #app .msgbox .md-text table th,\nbody #app .msgbox .md-text table th {\n  padding: 0.3rem;\n  background: #eee;\n}\nhtml #app .msgbox .md-text table td,\nbody #app .msgbox .md-text table td {\n  padding: 0.3rem;\n  background: #fff;\n}\nhtml #app .msgbox .md-text p,\nbody #app .msgbox .md-text p {\n  margin: 0.12rem 0;\n  white-space: break-spaces;\n}\nhtml #app .msgbox .md-text ul,\nbody #app .msgbox .md-text ul {\n  padding-left: 1.2rem;\n}\nhtml #app .msgbox .md-text pre code,\nbody #app .msgbox .md-text pre code {\n  background: #333;\n  color: #fff;\n  display: block;\n  padding: 0.3rem 0.6rem;\n  overflow: auto;\n  white-space: pre;\n  word-break: break-word;\n}\nhtml #app .msgbox .md-text code,\nbody #app .msgbox .md-text code {\n  background: #333;\n  color: #ed2;\n  white-space: break-spaces;\n  word-break: break-word;\n  padding: 0.24rem;\n  border-radius: 0.24rem;\n}\nhtml #app .msgbox .md-text .language-markdown,\nbody #app .msgbox .md-text .language-markdown,\nhtml #app .msgbox .md-text .language-hljs-plaintext,\nbody #app .msgbox .md-text .language-hljs-plaintext {\n  white-space: break-spaces;\n}\nhtml #app .history-panel,\nbody #app .history-panel {\n  height: 100%;\n  overflow: auto;\n}\nhtml #app .history-panel .clear-history,\nbody #app .history-panel .clear-history {\n  margin: 0 0.6rem;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\nhtml #app .history-panel .msgbox,\nbody #app .history-panel .msgbox {\n  height: unset;\n}\nhtml #app .history-panel .msgbox + .msgbox,\nbody #app .history-panel .msgbox + .msgbox {\n  border-top: 0.06rem solid #ccc;\n}\nhtml .hidden-btn,\nbody .hidden-btn {\n  width: 0.6rem;\n  height: 0.6rem;\n  position: absolute;\n  top: -6rem;\n  left: -6rem;\n}\n")
    ; modules['undefined'](require)
    })()