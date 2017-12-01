(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.SansTypo = factory());
}(this, (function () { 'use strict';

var namespace = '/Parcello/exported';

var exported = window[namespace];
if (!(namespace in window)) {
	exported = {};
	Object.defineProperty(window, namespace, {
		configurable: true,
		enumerable: false,
		writable: true,
		value: exported
	});
}

var exported$1 = exported;

function exports$1(code) {
	if (arguments.length < 1) {
		return false;
	}
	return {
		as: function as(name) {
			if (!(typeof name === 'string')) {
				return false;
			}
			if (exported$1.hasOwnProperty(name)) {
				//throw warning
				return false;
			}
			exported$1[name] = code;
			return true;
		}
	};
}

exports$1(exports$1).as('/Parcello/exports');
exports$1(exported$1).as('/Parcello/exported');

//Utilities
var prefix = '';
var current = 0;
var max = Number.MAX_SAFE_INTEGER - 1;
function uid() {
	if (current > max) {
		prefix += current;
		current = 0;
	}
	return prefix + current++;
}

exports$1(uid).as('JSUI/Source/1.0.0/Utilities/General/uid');

//Utilities
var hasSymbol = typeof Symbol == 'function';
function symbolish(name) {
	var id = uid();
	return hasSymbol ? Symbol(name) : 'Symbol(' + name + ')@' + id;
}

exports$1(symbolish).as('JSUI/Source/1.0.0/Utilities/Properties/symbolish');

//Utilities
var symbol = symbolish('private');
exports$1(symbol).as('JSUI/Source/1.0.0/Constants/Keys/General/private');

//Utilities
var symbol$1 = symbolish('Extensible.add');
exports$1(symbol$1).as('JSUI/Source/1.0.0/Constants/Keys/Extensible/add');

//Utilities
var symbol$2 = symbolish('destructor');
exports$1(symbol$2).as('JSUI/Source/1.0.0/Constants/Keys/General/destructor');

//Utilities
var symbol$3 = symbolish('Extensible.remove');
exports$1(symbol$3).as('JSUI/Source/1.0.0/Constants/Keys/Extensible/remove');

//Utilities
var symbol$4 = symbolish('Stateful.state');
exports$1(symbol$4).as('JSUI/Source/1.0.0/Constants/Keys/Stateful/state');

//Utilities
var symbol$5 = symbolish('Eventful.on');
exports$1(symbol$5).as('JSUI/Source/1.0.0/Constants/Keys/Eventful/on');

//Utilities
var symbol$6 = symbolish('Eventful.trigger');
exports$1(symbol$6).as('JSUI/Source/1.0.0/Constants/Keys/Eventful/trigger');

//Utilities
var symbol$7 = symbolish('Mixins.Eventful.isStatic');
exports$1(symbol$7).as('JSUI/Source/1.0.0/Constants/Keys/TypeChecks/Eventful/isStatic');

//Utilities
var symbol$8 = symbolish('Mixins.Eventful.isInstance');
exports$1(symbol$8).as('JSUI/Source/1.0.0/Constants/Keys/TypeChecks/Eventful/isInstance');

//Utilities
function isString(u) {
	return typeof u === 'string';
}

exports$1(isString).as('JSUI/Source/1.0.0/TypeChecks/isString');

//Utilities
function isFunction$1(u) {
	return typeof u === 'function';
}

exports$1(isFunction$1).as('JSUI/Source/1.0.0/TypeChecks/isFunction');

//Utilities
function isArray(u) {
	return Array.isArray(u);
}

exports$1(isArray).as('JSUI/Source/1.0.0/TypeChecks/isArray');

//Utilities
var symbol$9 = symbolish('Mixins.JSUIFunction.isInstance');
exports$1(symbol$9).as('JSUI/Source/1.0.0/Constants/Keys/TypeChecks/JSUIFunction/isInstance');

//Constants
//Utilities
function isJSUIFunction(u) {
	if (!u) {
		return false;
	}
	return !!u[symbol$9];
}

exports$1(isJSUIFunction).as('JSUI/Source/1.0.0/TypeChecks/isJSUIFunction');

//TypeChecks
//Utilities
function isExecutable(method) {
	return isFunction$1(method) || isJSUIFunction(method);
}

exports$1(isExecutable).as('JSUI/Source/1.0.0/TypeChecks/isExecutable');

//Utilities
var symbol$10 = symbolish('exposable');
exports$1(symbol$10).as('JSUI/Source/1.0.0/Constants/Keys/General/exposable');

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

//Constants
//TypeChecks
//Utilities
var Class = function () {
	function Class() {
		classCallCheck(this, Class);
	}

	createClass(Class, [{
		key: 'construct',

		//methods
		value: function construct(name, args) {
			var _this = this;

			if (isArray(name)) {
				var results = {};
				name.forEach(function (constructor) {
					if (!isString(constructor)) {
						//throw warn
						return;
					}
					results[constructor] = _this.construct(constructor, args);
				});
				return results;
			}

			var constructor = 'construct_' + name;
			if (!isFunction$1(this[constructor])) {
				//throw warning
				return;
			}
			return this[constructor](args);
		}
	}, {
		key: 'instantiate',
		value: function instantiate() {
			return this;
		}

		//static properties

	}], [{
		key: 'implements',
		value: function _implements() {
			var result = this;

			for (var i = 0; i < arguments.length; i++) {
				var mixin = arguments[i];
				result = mixin(result);
			}

			return result;
		}
	}, {
		key: 'exposes',
		value: function exposes() {
			var _arguments = arguments,
			    _this2 = this;

			var result = this;

			var _loop = function _loop(i) {
				var mixin = _arguments[i];
				var exposes = mixin.exposable;
				if (!exposes) {
					return 'continue';
				}
				Object.keys(exposes).forEach(function (key) {
					var symbol = exposes[key];
					if (symbol in _this2.prototype) {
						var parent = Object.getPrototypeOf(_this2);
						var descriptor = false;
						while (!descriptor && parent) {
							descriptor = Object.getOwnPropertyDescriptor(parent.prototype, symbol);
							if (!descriptor) {
								parent = Object.getPrototypeOf(parent);
							}
						}
						if (descriptor) {
							Object.defineProperty(parent.prototype, key, descriptor);
						}
					}
					//add static descriptors
					if (symbol in _this2) {
						var _parent = Object.getPrototypeOf(_this2);
						var _descriptor = false;
						while (!_descriptor && _parent) {
							_descriptor = Object.getOwnPropertyDescriptor(_parent, symbol);
							if (!_descriptor) {
								_parent = Object.getPrototypeOf(_parent);
							}
						}
						Object.defineProperty(_parent, key, _descriptor);
					}
				});
			};

			for (var i = 0; i < arguments.length; i++) {
				var _ret = _loop(i);

				if (_ret === 'continue') continue;
			}

			return result;
		}
	}, {
		key: 'instantiate',
		value: function instantiate() {
			return new this();
		}
	}]);
	return Class;
}();

exports$1(Class).as('JSUI/Source/1.0.0/Classes/Core/Class');

var symbol$12 = symbolish('Mixins.Privatelike.private');

//Utilities
var symbol$13 = symbolish('Mixins.Privatelike.isStatic');
exports$1(symbol$13).as('JSUI/Source/1.0.0/Constants/Keys/TypeChecks/Privatelike/isStatic');

//Utilities
var symbol$14 = symbolish('Mixins.Privatelike.isInstance');
exports$1(symbol$14).as('JSUI/Source/1.0.0/Constants/Keys/TypeChecks/Privatelike/isInstance');

//Utilities
function isNull(u) {
	return u === null;
}

exports$1(isNull).as('JSUI/Source/1.0.0/TypeChecks/isNull');

//Utilities
function isObject(u) {
	return (typeof u === 'undefined' ? 'undefined' : _typeof(u)) === 'object' && u !== null;
}

exports$1(isObject).as('JSUI/Source/1.0.0/TypeChecks/isObject');

//Utilities
function addHiddenValue(obj, prop, value) {
	Object.defineProperty(obj, prop, {
		configurable: true,
		enumerable: false,
		writable: true,
		value: value
	});
}

exports$1(addHiddenValue).as('JSUI/Source/1.0.0/Utilities/Properties/addHiddenValue');

//Classes
//Utilities
function isClass$1(u) {
	return u instanceof Class;
}

exports$1(isClass$1).as('JSUI/Source/1.0.0/TypeChecks/isClass');

//TypeChecks
//Utilities
function extend(a) {
	if (!isObject(a)) {
		return a;
	}
	return {
		with: function _with(b) {
			if (!isObject(b) || isClass$1(b)) {
				return a;
			}
			Object.keys(b).forEach(function (key) {
				if (isObject(b[key]) && !isClass$1(b[key])) {
					if (!isObject(a[key])) {
						a[key] = {};
					}
					a[key] = Object.create(a[key]);
					a[key] = extend(a[key]).with(b[key]);
					return;
				}
				a[key] = b[key];
			});
			return a;
		}
	};
}

exports$1(extend).as('JSUI/Source/1.0.0/Utilities/Objects/extend');

//Constants
//TypeChecks
//Utilities
var Privatelike = function Privatelike(descendant) {
	return function (_descendant) {
		inherits(PrivatelikeMixin, _descendant);

		function PrivatelikeMixin() {
			classCallCheck(this, PrivatelikeMixin);

			var _this = possibleConstructorReturn(this, (PrivatelikeMixin.__proto__ || Object.getPrototypeOf(PrivatelikeMixin)).call(this));

			addHiddenValue(_this, symbol$12, {});
			return _this;
		}

		//methods


		createClass(PrivatelikeMixin, [{
			key: 'destructor',
			value: function destructor() {
				delete this[symbol$12];
			}

			//properties

		}, {
			key: symbol,
			get: function get$$1() {
				return this[symbol$12];
			},
			set: function set$$1(v) {
				if (isObject(v)) {
					extend(this[symbol$12]).with(v);
					return;
				}
				if (isNull(v)) {
					delete this[symbol$12];
					return;
				}
			}

			//type checks

		}, {
			key: symbol$14,
			get: function get$$1() {
				return true;
			}
		}], [{
			key: symbol$13,
			get: function get$$1() {
				return true;
			}
		}]);
		return PrivatelikeMixin;
	}(descendant);
};

//exposable
Privatelike.exposable = { private: symbol };

exports$1(Privatelike).as('JSUI/Source/1.0.0/Mixins/Privatelike');

//Classes
//Mixins
//Utilities
var Receipt = function (_Class$implements) {
	inherits(Receipt, _Class$implements);

	function Receipt() {
		classCallCheck(this, Receipt);
		return possibleConstructorReturn(this, (Receipt.__proto__ || Object.getPrototypeOf(Receipt)).apply(this, arguments));
	}

	return Receipt;
}(Class.implements(Privatelike));

exports$1(Receipt).as('JSUI/Source/1.0.0/Classes/Core/Receipt');

//Utilities
var symbol$15 = symbolish('Mixins.Enableable.isStatic');
exports$1(symbol$15).as('JSUI/Source/1.0.0/Constants/Keys/TypeChecks/Enableable/isStatic');

//Utilities
var symbol$16 = symbolish('Mixins.Enableable.isInstance');
exports$1(symbol$16).as('JSUI/Source/1.0.0/Constants/Keys/TypeChecks/Enableable/isInstance');

//Constants
//Utilities
var Enableable = function Enableable(descendant) {
	return function (_descendant) {
		inherits(EnableableMixin, _descendant);

		function EnableableMixin() {
			classCallCheck(this, EnableableMixin);

			var _this = possibleConstructorReturn(this, (EnableableMixin.__proto__ || Object.getPrototypeOf(EnableableMixin)).call(this));

			_this[symbol] = {
				state: {
					enabled: true
				}
			};
			return _this;
		}

		//properties


		createClass(EnableableMixin, [{
			key: 'enabled',
			get: function get$$1() {
				return this[symbol].state.enabled;
			},
			set: function set$$1(v) {
				this[symbol].state.enabled = !!v;
			}

			//type checks

		}, {
			key: symbol$16,
			get: function get$$1() {
				return true;
			}
		}], [{
			key: symbol$15,
			get: function get$$1() {
				return true;
			}
		}]);
		return EnableableMixin;
	}(descendant);
};

exports$1(Enableable).as('JSUI/Source/1.0.0/Mixins/Enableable');

//Utilities
function remove$1() {
	delete this.pool[this.id];
}

exports$1(remove$1).as('JSUI/Source/1.0.0/Utilities/Events/remove');

//Utilities
function removeAll() {
	var _this = this;

	Object.keys(this.pool).forEach(function (eid) {
		delete _this.pool[eid];
	});
}

exports$1(removeAll).as('JSUI/Source/1.0.0/Utilities/Events/removeAll');

//Classes
//Constants
//Mixins
//Utilities
var OnEventBoundReceipt = function (_Receipt$implements) {
	inherits(OnEventBoundReceipt, _Receipt$implements);

	function OnEventBoundReceipt(pool) {
		classCallCheck(this, OnEventBoundReceipt);

		var _this = possibleConstructorReturn(this, (OnEventBoundReceipt.__proto__ || Object.getPrototypeOf(OnEventBoundReceipt)).call(this));

		_this[symbol] = {
			uid: uid()
		};
		_this[symbol].pool = pool;
		return _this;
	}

	//methods


	createClass(OnEventBoundReceipt, [{
		key: 'debounce',
		value: function debounce(time) {
			var method = this.pool[this.uid];
			method.debounce(time);
			return this;
		}
	}, {
		key: 'limit',
		value: function limit(count) {
			var method = this.pool[this.uid];
			method.limit = count;
			return this;
		}
	}, {
		key: 'once',
		value: function once() {
			return this.limit(1);
		}
	}, {
		key: 'remove',
		value: function remove() {
			return remove$1.call(this);
		}
	}, {
		key: 'removeAll',
		value: function removeAll$$1() {
			return removeAll.call(this);
		}
	}, {
		key: 'throttle',
		value: function throttle(time) {
			var method = this.pool[this.uid];
			method.throttle(time);
			return this;
		}

		//properties

	}, {
		key: 'enabled',
		get: function get$$1() {
			var method = this.pool[this.uid];
			return method.enabled;
		},
		set: function set$$1(v) {
			var method = this.pool[this.uid];
			method.enabled = !!v;
		}
	}, {
		key: 'pool',
		get: function get$$1() {
			return this[symbol].pool;
		},
		set: function set$$1(v) {
			this[symbol].pool = v;
		}
	}, {
		key: 'uid',
		get: function get$$1() {
			return this[symbol].uid;
		},
		set: function set$$1(id) {
			this[symbol].uid = id;
		}
	}]);
	return OnEventBoundReceipt;
}(Receipt.implements(Enableable));

exports$1(OnEventBoundReceipt).as('JSUI/Source/1.0.0/Classes/Receipts/OnEventBound');

//Utilities
function isDOM(u) {
	return u instanceof Element;
}

exports$1(isDOM).as('JSUI/Source/1.0.0/TypeChecks/isDOM');

//Utilities
function dispatch(context, pool) {
	var _arguments = arguments;

	Array.prototype.splice.call(arguments, 0, 2);
	Object.keys(pool).forEach(function (uid) {
		var method = pool[uid];
		method.apply(context, _arguments);
	});
}

exports$1(dispatch).as('JSUI/Source/1.0.0/Utilities/Events/dispatch');

function imports(dependency) {
	if (!(typeof dependency === 'string')) {
		return false;
	}
	if (!exported$1.hasOwnProperty(dependency)) {
		return false;
	}
	return exported$1[dependency];
}

exports$1(imports).as('/Parcello/imports');

//Classes
var JSUIFunction = void 0; //import JSUIFunction from 'JSUI/Source/1.0.0/Classes/Core/Function';
//Constants
//TypeChecks
//Utilities
function on$1(name, method) {

	// lazy import, due to circular issues
	JSUIFunction = JSUIFunction || imports('JSUI/Source/1.0.0/Classes/Core/Function');

	if (!isFunction$1(method)) {
		return;
	}
	method = new JSUIFunction(method);
	var events = this[symbol].events;
	var dispatchers = this[symbol].dispatchers;
	var pool = events[name];
	if (!pool) {
		events[name] = {};
		pool = events[name];
		var dispatcher = dispatch.bind(this, this, pool);
		dispatchers[name] = new JSUIFunction(dispatcher);
		var element = this.element;
		if (isDOM(element)) {
			element.addEventListener(name, dispatcher, false);
		}
	}
	var receipt = new OnEventBoundReceipt(pool);
	receipt.uid = method.uid;
	pool[method.uid] = method;
	return receipt;
}

exports$1(on$1).as('JSUI/Source/1.0.0/Utilities/Events/on');

//Utilities
function capitalize(text) {
	return text.charAt(0).toUpperCase() + text.slice(1);
}

exports$1(capitalize).as('JSUI/Source/1.0.0/Utilities/Strings/capitalize');

//Constants
//TypeChecks
//Utilities
var Eventful$2 = function Eventful(descendant) {
	var EventfulMixin = function (_descendant) {
		inherits(EventfulMixin, _descendant);

		function EventfulMixin() {
			classCallCheck(this, EventfulMixin);

			var _this = possibleConstructorReturn(this, (EventfulMixin.__proto__ || Object.getPrototypeOf(EventfulMixin)).call(this));

			_this[symbol] = {
				events: {},
				dispatchers: {}
			};
			return _this;
		}

		//methods


		createClass(EventfulMixin, [{
			key: symbol$5,
			value: function value(name, method) {
				if (isString(name) && isFunction$1(method)) {
					return on$1.call(this, name, method);
				}
			}
		}, {
			key: symbol$6,
			value: function value(event, args) {
				var _this2 = this;

				if (isArray(event)) {
					var results = [];
					event.forEach(function (e) {
						results.push(_this2[symbol$6](e, args));
					});
					return results;
				}

				var dispatchers = this[symbol].dispatchers;
				var dispatcher = dispatchers[event];

				if (isExecutable(dispatcher)) {
					dispatcher.call(this, args);
				}

				event = capitalize(event);
				var native = this['on' + event];
				if (isExecutable(native)) {
					native.call(this, args);
				}
			}

			//type checks

		}, {
			key: symbol$8,
			get: function get$$1() {
				return true;
			}
		}], [{
			key: symbol$7,
			get: function get$$1() {
				return true;
			}
		}]);
		return EventfulMixin;
	}(descendant);

	

	return EventfulMixin;
};

Eventful$2.exposable = { on: symbol$5, trigger: symbol$6 };

exports$1(Eventful$2).as('JSUI/Source/1.0.0/Mixins/Eventful');

//Constants
//TypeChecks
//Utilities
var Serializable = function Serializable(descendant) {
	//check if it's stateful, otherwise throw error
	var SerializableMixin = function (_descendant) {
		inherits(SerializableMixin, _descendant);

		function SerializableMixin() {
			classCallCheck(this, SerializableMixin);
			return possibleConstructorReturn(this, (SerializableMixin.__proto__ || Object.getPrototypeOf(SerializableMixin)).call(this));
		}

		createClass(SerializableMixin, [{
			key: 'fromJSON',
			value: function fromJSON(json) {
				if (!isString(json) && !isObject(json)) {
					//throw error
					return false;
				}
				try {
					var value = isObject(json) ? json : JSON.parse(json);
					if (!isObject(value)) {
						//throw error
						return false;
					}
					this[symbol].state = value;
				} catch (err) {
					//throw error
					return false;
				}
			}
		}, {
			key: 'toJSON',
			value: function toJSON() {
				return this[symbol].state;
			}
		}]);
		return SerializableMixin;
	}(descendant);

	
	return SerializableMixin;
};

exports$1(Serializable).as('JSUI/Source/1.0.0/Mixins/Serializable');

//Classes
//Constants
//Utilities
var StateChangeReceipt = function (_Receipt) {
	inherits(StateChangeReceipt, _Receipt);

	function StateChangeReceipt() {
		var changes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		classCallCheck(this, StateChangeReceipt);

		var _this = possibleConstructorReturn(this, (StateChangeReceipt.__proto__ || Object.getPrototypeOf(StateChangeReceipt)).call(this));

		_this[symbol] = changes;
		return _this;
	}

	//properties


	createClass(StateChangeReceipt, [{
		key: 'new',
		get: function get$$1() {
			return this[symbol].new;
		},
		set: function set$$1(v) {
			this[symbol].new = v;
		}
	}, {
		key: 'old',
		get: function get$$1() {
			return this[symbol].old;
		},
		set: function set$$1(v) {
			this[symbol].old = v;
		}
	}, {
		key: 'owner',
		get: function get$$1() {
			return this[symbol].owner;
		},
		set: function set$$1(v) {
			this[symbol].owner = v;
		}
	}, {
		key: 'property',
		get: function get$$1() {
			return this[symbol].property;
		},
		set: function set$$1(v) {
			this[symbol].property = v;
		}
	}]);
	return StateChangeReceipt;
}(Receipt);

exports$1(StateChangeReceipt).as('JSUI/Source/1.0.0/Classes/Receipts/StateChange');

//Utilities
function isUndefined$1(u) {
	return typeof u === 'undefined';
}

exports$1(isUndefined$1).as('JSUI/Source/1.0.0/TypeChecks/isUndefined');

//Classes
//Constants
//TypeChecks
//Utilities
var Stateful$2 = function Stateful(descendant) {
	var StatefulMixin = function (_descendant) {
		inherits(StatefulMixin, _descendant);

		function StatefulMixin() {
			classCallCheck(this, StatefulMixin);

			var _this = possibleConstructorReturn(this, (StatefulMixin.__proto__ || Object.getPrototypeOf(StatefulMixin)).call(this));

			_this[symbol] = {
				state: {}
			};
			return _this;
		}

		//methods


		createClass(StatefulMixin, [{
			key: symbol$4,
			value: function value(property, _value) {
				var count = arguments.length;
				if (count < 2) {
					return StatefulMixin.state(this, property);
				}
				return StatefulMixin.state(this, property, _value);
			}

			//properties

		}], [{
			key: 'state',
			value: function state(context, property, value) {
				var state = context[symbol].state;
				var current = state[property];
				var isDefault = false;

				var defaults$$1 = (context.constructor || this)[property];
				if (!isUndefined$1(defaults$$1)) {
					isDefault = current === defaults$$1;
					current = property in state ? current : defaults$$1;
				}

				if (arguments.length === 2) {
					return current;
				}

				var hasChanged = current !== value;

				if (hasChanged) {
					state[property] = value;

					var data = new StateChangeReceipt({
						isDefault: isDefault,
						new: value,
						old: current,
						owner: context,
						property: property
					});

					if (!context[symbol$6]) {
						return hasChanged;
					}
					context[symbol$6]([property + 'Changed', 'Changed'], data);
				}

				return hasChanged;
			}
		}]);
		return StatefulMixin;
	}(descendant);

	

	return StatefulMixin;
};

Stateful$2.exposable = { state: symbol$4 };

exports$1(Stateful$2).as('JSUI/Source/1.0.0/Mixins/Stateful');

//Classes
//Constants
//Mixins
//Utilities
var Stateful = function (_Class$implements) {
	inherits(Stateful, _Class$implements);

	function Stateful() {
		classCallCheck(this, Stateful);
		return possibleConstructorReturn(this, (Stateful.__proto__ || Object.getPrototypeOf(Stateful)).apply(this, arguments));
	}

	createClass(Stateful, [{
		key: 'state',


		//methods
		value: function state() {
			return this[symbol$4].apply(this, arguments);
		}
	}]);
	return Stateful;
}(Class.implements(Privatelike, Stateful$2, Serializable));

exports$1(Stateful).as('JSUI/Source/1.0.0/Classes/Core/Stateful');

//Constants
//Mixins
//Utilities
var Eventful = function (_Stateful$implements) {
	inherits(Eventful, _Stateful$implements);

	function Eventful() {
		classCallCheck(this, Eventful);
		return possibleConstructorReturn(this, (Eventful.__proto__ || Object.getPrototypeOf(Eventful)).apply(this, arguments));
	}

	createClass(Eventful, [{
		key: 'on',


		//methods
		value: function on$$1() {
			return this[symbol$5].apply(this, arguments);
		}
	}, {
		key: 'trigger',
		value: function trigger$$1() {
			return this[symbol$6].apply(this, arguments);
		}
	}]);
	return Eventful;
}(Stateful.implements(Eventful$2));

exports$1(Eventful).as('JSUI/Source/1.0.0/Classes/Core/Eventful');

//Utilities
var symbol$17 = symbolish('Mixins.Extensible.isInstance');
exports$1(symbol$17).as('JSUI/Source/1.0.0/Constants/Keys/TypeChecks/Extensible/isInstance');

//Utilities
var symbol$18 = symbolish('Mixins.Extensible.isStatic');
exports$1(symbol$18).as('JSUI/Source/1.0.0/Constants/Keys/TypeChecks/Extensible/isStatic');

//Constants
//Utilities
function isUEventful(u) {
	if (!u) {
		return false;
	}
	return !!u[symbol$7];
}

exports$1(isUEventful).as('JSUI/Source/1.0.0/TypeChecks/isUEventful');

//Classes
//Constants
//TypeChecks
//Utilities
var Extensible$2 = function Extensible(descendant) {
	if (!isUEventful(descendant)) {
		//throw warning
	}

	var ExtensibleMixin = function (_descendant) {
		inherits(ExtensibleMixin, _descendant);

		function ExtensibleMixin() {
			classCallCheck(this, ExtensibleMixin);

			var _this = possibleConstructorReturn(this, (ExtensibleMixin.__proto__ || Object.getPrototypeOf(ExtensibleMixin)).call(this));

			_this[symbol] = {
				events: {},
				dispatchers: {},
				state: {}
			};
			return _this;
		}

		//methods


		createClass(ExtensibleMixin, [{
			key: symbol$1,
			value: function value(item, _value) {
				var _this2 = this;

				if (isString(item)) {
					addProperty(this, item);
					return;
				}

				if (isArray(item)) {
					item.forEach(function (key) {
						(_this2.add || _this2[symbol$1]).call(_this2, key, _value);
					});
					return;
				}

				if (isObject(item)) {
					Object.keys(item).forEach(function (key) {
						(_this2.add || _this2[symbol$1]).call(_this2, key, item[key]);
					});
					return;
				}
			}
		}, {
			key: symbol$2,
			value: function value() {
				var _this3 = this;

				var handle = setTimeout(function () {
					//destory these keys
					Object.keys(_this3).forEach(function (key) {
						delete _this3[key];
					});

					//destroy private data
					var _private = _this3[symbol];
					Object.keys(_private).forEach(function (key) {
						delete _private[key];
					});
				}, 0);
				this[symbol$6]('destructed');
				return handle;
			}
		}, {
			key: symbol$3,
			value: function value(item) {
				var _this4 = this;

				if (isString(item)) {
					delete this[item];
					return;
				}

				if (isArray(item)) {
					item.forEach(function (value) {
						_this4.remove(value);
					});
				}
			}
		}, {
			key: symbol$17,


			//properties
			get: function get$$1() {
				return true;
			}
		}], [{
			key: 'add',
			value: function add(property, value) {
				if (isString(property)) {
					Object.defineProperty(this.prototype, property, {
						get: function get$$1() {
							var v = this[symbol$4](property);
							return isUndefined(v) ? value : v;
						},
						set: function set$$1(v) {
							this[symbol$4](property, v);
						},
						configurable: true,
						enumerable: true
					});
				}
			}
		}, {
			key: symbol$18,
			get: function get$$1() {
				return true;
			}
		}]);
		return ExtensibleMixin;
	}(descendant);

	

	return ExtensibleMixin;
};

Extensible$2.exposable = { add: symbol$1, destructor: symbol$2, remove: symbol$3 };

exports$1(Extensible$2).as('JSUI/Source/1.0.0/Mixins/Extensible');

//Constants
//Mixins
//Utilities
var Extensible = function (_Eventful$implements) {
	inherits(Extensible, _Eventful$implements);

	function Extensible() {
		classCallCheck(this, Extensible);
		return possibleConstructorReturn(this, (Extensible.__proto__ || Object.getPrototypeOf(Extensible)).apply(this, arguments));
	}

	createClass(Extensible, [{
		key: 'add',


		//methods
		value: function add$$1() {
			return this[symbol$1].apply(this, arguments);
		}
	}, {
		key: 'destructor',
		value: function destructor$$1() {
			return this[symbol$2].apply(this, arguments);
		}
	}, {
		key: 'remove',
		value: function remove$$1() {
			return this[symbol$3].apply(this, arguments);
		}
	}, {
		key: 'state',
		value: function state$$1() {
			return this[symbol$4].apply(this, arguments);
		}

		//properties

	}, {
		key: 'private',
		get: function get$$1() {
			return this[symbol];
		}
	}]);
	return Extensible;
}(Eventful.implements(Extensible$2));

exports$1(Extensible).as('JSUI/Source/1.0.0/Classes/Core/Extensible');

//Utilities
var settings = {
	namespace: 'JSUI',
	Development: {
		enabled: false,
		haltOnErrors: true,
		references: true,
		traceErrors: true
	},
	Production: {}
};

exports$1(settings).as('JSUI/Source/1.0.0/Constants/settings');

//Constants
//TypeChecks
//Utilities
var namespace$1 = settings.namespace;

var Identity = function () {
	function Identity(identity) {
		classCallCheck(this, Identity);


		var defaults$$1 = {
			namespace: namespace$1,
			class: 'NoClass',
			major: 0, minor: 0, patch: 0
		};

		if (isObject(identity)) {
			defaults$$1.namespace = identity.namespace || defaults$$1.namespace;
			defaults$$1.class = identity.class || defaults$$1.class;
			defaults$$1.major = identity.major || defaults$$1.major;
			defaults$$1.minor = identity.minor || defaults$$1.minor;
			defaults$$1.patch = identity.patch || defaults$$1.patch;
		}

		if (isString(identity)) {
			defaults$$1.class = identity;
		}

		addHiddenValue(this, symbol, defaults$$1);

		Object.freeze(this[symbol]);
	}

	//properties


	createClass(Identity, [{
		key: 'namespace',
		get: function get$$1() {
			return this[symbol].namespace;
		}
	}, {
		key: 'class',
		get: function get$$1() {
			return this[symbol].class;
		}
	}, {
		key: 'major',
		get: function get$$1() {
			return this[symbol].major;
		}
	}, {
		key: 'minor',
		get: function get$$1() {
			return this[symbol].minor;
		}
	}, {
		key: 'patch',
		get: function get$$1() {
			return this[symbol].patch;
		}
	}]);
	return Identity;
}();

exports$1(Identity).as('JSUI/Source/1.0.0/Classes/Core/Identity');

//Classes
//Constants
//Utilities
var identity$2 = new Identity({
	class: 'Distinct',
	major: 1, minor: 0, patch: 0
});

var Distinct = function (_Extensible) {
	inherits(Distinct, _Extensible);

	function Distinct() {
		classCallCheck(this, Distinct);

		var _this = possibleConstructorReturn(this, (Distinct.__proto__ || Object.getPrototypeOf(Distinct)).call(this));

		_this[symbol].uid = uid();
		_this[symbol].Is = {};
		_this.identity = identity$2;
		return _this;
	}

	createClass(Distinct, [{
		key: 'identity',
		get: function get$$1() {
			return this.state('identity');
		},
		set: function set$$1(identity) {
			this.state('identity', identity);
			if (!this[symbol].Is[identity]) {
				this[symbol].Is[identity.class] = identity;
			}
		}
	}, {
		key: 'Is',
		get: function get$$1() {
			return this[symbol].Is;
		}
	}, {
		key: 'uid',
		get: function get$$1() {
			return this[symbol].uid;
		},
		set: function set$$1(id) {
			this[symbol].uid = id;
		}
	}]);
	return Distinct;
}(Extensible);

exports$1(Distinct).as('JSUI/Source/1.0.0/Classes/Core/Distinct');

//Utilities
var symbol$19 = symbolish('Mixins.Routable.isStatic');
exports$1(symbol$19).as('JSUI/Source/1.0.0/Constants/Keys/TypeChecks/Routable/isStatic');

//Utilities
var symbol$20 = symbolish('Mixins.Routable.isInstance');
exports$1(symbol$20).as('JSUI/Source/1.0.0/Constants/Keys/TypeChecks/Routable/isInstance');

//Classes
//Constants
//TypeChecks
//Utilities
var RouteShortenReceipt = function (_Receipt) {
	inherits(RouteShortenReceipt, _Receipt);

	function RouteShortenReceipt(router, url) {
		classCallCheck(this, RouteShortenReceipt);

		var _this = possibleConstructorReturn(this, (RouteShortenReceipt.__proto__ || Object.getPrototypeOf(RouteShortenReceipt)).call(this));

		_this[symbol] = {
			router: router,
			url: url,
			shortcut: false
		};
		return _this;
	}

	//methods


	createClass(RouteShortenReceipt, [{
		key: 'to',
		value: function to(shortcut) {
			var _private = this[symbol];
			_private.shortcut = shortcut;
			var router = _private.router;
			var url = _private.url;
			if (!isString(shortcut) || !isString(url)) {
				//warn
				return false;
			}
			url = url.trim();
			shortcut = shortcut.trim();
			var shortened = router.shortened;
			var lengthened = router.lengthened;
			if (shortened.hasOwnProperty(shortcut) && shortened[shortcut] !== url) {
				//throw warning regarding duplicates & console.trace
			}
			var shortKey = (shortcut.charAt(0) !== '/' ? '/' : '') + shortcut;
			var longValue = (url.charAt(0) !== '/' ? '/' : '') + url;
			shortened[shortKey] = longValue;
			lengthened[longValue] = shortKey;
		}
	}]);
	return RouteShortenReceipt;
}(Receipt);

exports$1(RouteShortenReceipt).as('JSUI/Source/1.0.0/Classes/Receipts/RouteShorten');

//Utilities
var types = {
	object: {
		application: 'JSUI/Source/1.0.0/TypeChecks/isApplication',
		endpoint: 'JSUI/Source/1.0.0/TypeChecks/isEndpoint',
		feature: 'JSUI/Source/1.0.0/TypeChecks/isFeature',
		page: 'JSUI/Source/1.0.0/TypeChecks/isPage',
		role: 'JSUI/Source/1.0.0/TypeChecks/isRole'
	},
	function: {
		Application: 'JSUI/Source/1.0.0/TypeChecks/isUApplication',
		Endpoint: 'JSUI/Source/1.0.0/TypeChecks/isUEndpoint',
		Feature: 'JSUI/Source/1.0.0/TypeChecks/isUFeature',
		Page: 'JSUI/Source/1.0.0/TypeChecks/isUPage',
		Role: 'JSUI/Source/1.0.0/TypeChecks/isURole'
	}
};

//convert dependency location into lazy loaded property
//this fix was required to get around circular dependency issues
Object.values(types).forEach(function (type) {
	Object.keys(type).forEach(function (subtype) {
		var path = type[subtype];
		delete type[subtype];
		Object.defineProperty(type, subtype, {
			get: function get() {
				delete type[subtype];
				var imported = imports(path);
				type[subtype] = imported;
				return imported;
			},
			enumerable: true,
			configurable: true
		});
	});
});

exports$1(types).as('JSUI/Source/1.0.0/Classes/Core/Router/types');

//Utilities
var types$2 = ['boolean', 'number', 'object', 'string', 'symbol', 'undefined'];

exports$1(types$2).as('JSUI/Source/1.0.0/Constants/JS/types');

//Utilities
function isUStyleSheetRule(u, t) {
	return !!(u && u.prototype && (u.prototype instanceof t || u === t));
}

exports$1(isUStyleSheetRule).as('JSUI/Source/1.0.0/Utilities/TypeChecks/isUStyleSheetRule');

//Classes
//Utilities
function isUClass(u) {
	return isUStyleSheetRule(u, Class);
}

exports$1(isUClass).as('JSUI/Source/1.0.0/TypeChecks/isUClass');

//TypeChecks
//Utilities
function getHandledType(types, u) {
	var type = typeof u === 'undefined' ? 'undefined' : _typeof(u);

	if (type === 'function') {
		type = isUClass(u) ? 'uclass' : type;
	}

	if (type === 'object') {
		type = isClass$1(u) ? 'class' : type;
	}

	var subtypes = types[type];
	if (!subtypes) {
		return type;
	}
	for (var name in subtypes) {
		var subtype = subtypes[name];
		if (subtype(u)) {
			return name;
		}
	}
	return type;
}

exports$1(getHandledType).as('JSUI/Source/1.0.0/Utilities/TypeChecks/getHandledType');

//Handlers
//Constants
//Utilities
function getIdentifiedType(u) {
	var type = getHandledType(types, u);

	if (types$2.includes(type)) {
		type = undefined;
	}

	return type;
}

exports$1(getIdentifiedType).as('JSUI/Source/1.0.0/Classes/Core/Router/getIdentifiedType');

//Classes
//Utilities
function isRoutable(u) {
	if (!u) {
		return false;
	}
	return !!u[symbol$20];
}

exports$1(isRoutable).as('JSUI/Source/1.0.0/TypeChecks/isRoutable');

//Constants
//Utilities
function isURoutable(u) {
	if (!u) {
		return false;
	}
	return !!u[symbol$19];
}

exports$1(isURoutable).as('JSUI/Source/1.0.0/TypeChecks/isURoutable');

//Utilities
function getUrlParams(url) {
	var result = {};
	var index = url.indexOf('?');
	if (!~index) return {};
	var query = url.substr(index + 1);

	query.split('&').forEach(function (part) {
		if (!part) {
			return;
		}
		part = part.split('+').join(' '); // replace every + with space, regexp-free version
		var sign = part.indexOf('=');
		var signed = !!~sign;
		var key = signed ? part.substr(0, sign) : part;
		var val = signed ? decodeURIComponent(part.substr(sign + 1)) : '';
		var from = key.indexOf('[');

		if (!~from) {
			result[decodeURIComponent(key)] = val;
			return;
		}

		var to = key.indexOf(']');
		var index = decodeURIComponent(key.substring(from + 1, to));
		key = decodeURIComponent(key.substring(0, from));
		if (!result[key]) {
			result[key] = [];
		}
		if (!index) {
			result[key].push(val);
			return;
		}
		result[key][index] = val;
	});

	return result;
}

exports$1(getUrlParams).as('JSUI/Source/1.0.0/Utilities/Navigation/getUrlParams');

//Utilities
function getHashParts(url) {
	var hash = url || window.location.hash;
	var params = getUrlParams(url);
	if (url.includes('?')) {
		hash = hash.split('?')[0];
	}
	var path = hash.replace(/#!|#/i, '');
	var routes = path.split('/');
	routes = routes.filter(function (route) {
		return !!route.length;
	});
	if (!routes.length) {
		return false;
	}
	var result = {
		routes: routes,
		parameters: params
	};
	return result;
}

exports$1(getHashParts).as('JSUI/Source/1.0.0/Utilities/Navigation/getHashParts');

//Classes
//Constants
//Handlers
//Mixins
//TypeChecks
//Utilities
var Router$1 = function (_Class$implements) {
	inherits(Router, _Class$implements);

	function Router() {
		classCallCheck(this, Router);

		var _this = possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this));

		_this[symbol] = {
			roots: {},
			last: null,
			instances: {},
			shortened: {},
			lengthened: {},
			missing: function missing() {},
			unauthorized: function unauthorized() {}
		};
		window.addEventListener("hashchange", function (e) {
			_this.onHashChange(e);
		});
		return _this;
	}

	//methods


	createClass(Router, [{
		key: 'add',
		value: function add(routable) {
			if (isURoutable(routable) || isRoutable(routable)) {
				this[symbol].roots[routable.route] = routable;
				return;
			}
			return get(Router.prototype.__proto__ || Object.getPrototypeOf(Router.prototype), 'add', this).call(this, routable);
		}
	}, {
		key: 'instance',
		value: function instance(route, value) {
			var instances = this.instances;
			if (arguments.length > 1) {
				instances[route] = value;
				return value;
			}
			return instances[route];
		}
	}, {
		key: 'navigate',
		value: function navigate(hashpath) {
			var _this2 = this;

			var instances = {};
			var resolved = this.resolve(hashpath);
			var hash = getHashParts(resolved);
			var context = {
				hashpath: hashpath,
				resolved: resolved,
				arguments: undefined,
				parameters: hash.parameters,
				instances: instances,
				Router: this
			};
			this[symbol].last = context;
			var routes = hash.routes;
			if (!routes) {
				return;
			}
			var rootRoute = routes.splice(0, 1)[0];
			var root = this.roots[rootRoute];
			//if the root doesn't exist, 404 and exit
			if (!root) {
				return this.missing(context);
			}
			//get the root route, if uninstanced, instantiate
			root = isURoutable(root) ? new root() : root;
			//if the instance isn't routable, return 
			if (!isRoutable(root)) {
				return;
			}
			//traverse root
			root.Context = context;
			this.traverse(root, context);
			this[symbol].root = root;

			var traversed = "";
			var instance = root;
			for (var index = 0; index < routes.length; index++) {
				var route = routes[index];
				traversed = (!index ? rootRoute + '/' : traversed + '/') + ('' + route);
				var parent = instance;
				var existing = this.instance(traversed);
				instance = existing || (isRoutable(parent) ? parent.subroute(route) : false);
				instance = instance.instantiate ? instance.instantiate() : instance;
				instances[traversed] = instance;
				//if there's no existing instance, destroy the instances not traversed
				if (!existing) {
					(function () {
						var killList = [];
						Object.keys(_this2.instances).forEach(function (route) {
							var instance = instances[route];
							if (instance) {
								return;
							}
							killList.push({ route: route, instance: instance });
						});
						//sort the kill list by shortest path to longest
						killList.sort(function (a, b) {
							return a.route.length - b.route.length;
						});
						killList.forEach(function (entry) {
							var destructor = entry.instance[destructor];
							if (!isFunction$1(destructor)) {
								return;
							}
							destructor();
						});
					})();
				}
				//if there's no instance, 404 and return
				if (!instance) {
					return this.missing(context);
				}
				if (!isRoutable(instance)) {
					return;
				}

				//if unauthorized, run unauth and return
				if (!instance.isRouteAuthorized) {
					return this.unauthorized(context);
				}

				instance.Context = context;
				if (instance.isRouteEndpoint) {
					context.arguments = routes.slice(index + 1);
					return this.traverse(instance, context);
				}
				this.traverse(instance, context);
			}
		}
	}, {
		key: 'remove',
		value: function remove(routable) {
			if (isURoutable(routable) || isRoutable(routable)) {
				delete this[symbol].roots[routable.route];
				return;
			}
			return get(Router.prototype.__proto__ || Object.getPrototypeOf(Router.prototype), 'remove', this).call(this, routable);
		}
	}, {
		key: 'resolve',
		value: function resolve(url) {
			if (!isString(url)) {
				return url;
			}
			url = url.replace(/#!|#/i, '');
			var shortened = this.shortened;
			var shortcuts = Object.keys(shortened).filter(function (a) {
				return !url.indexOf(a);
			});
			if (!shortcuts.length) {
				return url;
			}
			shortcuts.sort(function (a, b) {
				return a.length - b.length;
			});
			url = (url.charAt(0) !== '/' ? '/' : '') + url;
			for (var i = shortcuts.length - 1; i >= 0; i--) {
				var shortcut = shortcuts[i];
				if (!url.indexOf(shortcut)) {
					var actual = shortened[shortcut];
					return url.replace(shortcut, actual);
				}
			}
		}
	}, {
		key: 'shorten',
		value: function shorten(url) {
			if (!isString(url)) {
				return false;
			}
			return new RouteShortenReceipt(this, url);
			//syntax: shorten('/Common/Guest/Authentication/login').to('login');
		}
	}, {
		key: 'shortcutOf',
		value: function shortcutOf(url) {
			if (!isString(url)) {
				return url;
			}
			url = url.replace(/#!|#/i, '');
			var lengthened = this.lengthened;
			var longcuts = Object.keys(lengthened).filter(function (a) {
				return !url.indexOf(a);
			});
			if (!longcuts.length) {
				return url;
			}
			longcuts.sort(function (a, b) {
				return a.length - b.length;
			});
			url = (url.charAt(0) !== '/' ? '/' : '') + url;
			for (var i = longcuts.length - 1; i >= 0; i--) {
				var longcut = longcuts[i];
				if (!url.indexOf(longcut)) {
					var shortened = lengthened[longcut];
					var replaced = url.replace(longcut, shortened);
					if (replaced.length !== shortened.length) {
						var removed = url.replace(longcut, '');
						shortened = shortened.charAt(shortened.length - 1) !== '/' && removed.charAt(0) !== '/' ? shortened + '/' : shortened;
					}
					return url.replace(longcut, shortened);
				}
			}
		}
	}, {
		key: 'traverse',
		value: function traverse(instance, context) {
			if (!isRoutable(instance)) {
				return false;
			}
			var identity = getIdentifiedType(instance);
			if (isString(identity)) {
				context[capitalize(identity)] = instance;
			}

			var activation = instance.isRouteEndpoint ? 'routeCompleted' : 'routeTraversed';
			if (isExecutable(instance.trigger)) {
				instance.trigger.call(instance, activation, context);
				return;
			}
			activation = capitalize(activation);
			instance['on' + activation].call(instance, context);
			return true;
		}
	}, {
		key: 'unshorten',
		value: function unshorten(shortcut) {
			if (!isString(shortcut)) {
				return false;
			}
			var shortened = this[symbol].shortened;
			var lengthened = this[symbol].lengthened;
			if (shortened.hasOwnProperty(shortcut)) {
				var longValue = shortened[shortcut];
				delete shortened[shortcut];
				if (lengthened[longValue] === shortcut) {
					delete lengthened[longValue];
				}
				return true;
			}
		}

		//properties

	}, {
		key: 'onHashChange',


		//pre-defined events
		value: function onHashChange(event) {
			return this.navigate(window.location.hash);
		}
	}, {
		key: 'instances',
		get: function get$$1() {
			return this[symbol].instances;
		},
		set: function set$$1(instances) {
			this[symbol].instances = instances;
		}
	}, {
		key: 'lengthened',
		get: function get$$1() {
			return this[symbol].lengthened;
		}
	}, {
		key: 'missing',
		get: function get$$1() {
			return this[symbol].missing;
		},
		set: function set$$1(method) {
			if (!isFunction$1(method)) {
				method = function method() {};
			}
			this[symbol].missing = method;
		}
	}, {
		key: 'roots',
		get: function get$$1() {
			return this[symbol].roots;
		}
	}, {
		key: 'shortened',
		get: function get$$1() {
			return this[symbol].shortened;
		}
	}, {
		key: 'unauthorized',
		get: function get$$1() {
			return this[symbol].unauthorized;
		},
		set: function set$$1(method) {
			if (!isFunction$1(method)) {
				method = function method() {};
			}
			this[symbol].unauthorized = method;
		}
	}]);
	return Router;
}(Class.implements(Privatelike, Enableable));

exports$1(Router$1).as('JSUI/Source/1.0.0/Classes/Core/Router');

//Classes
//Utilities
var router = new Router$1();
exports$1(router).as('JSUI/Source/1.0.0/Singletons/Navigation/Router');

//Constants
//Singletons
//TypeChecks
//Utilities
var Routable = function Routable(descendant) {
	return function (_descendant) {
		inherits(RoutableMixin, _descendant);

		function RoutableMixin() {
			classCallCheck(this, RoutableMixin);

			var _this = possibleConstructorReturn(this, (RoutableMixin.__proto__ || Object.getPrototypeOf(RoutableMixin)).call(this));

			_this[symbol] = {
				state: {
					route: _this.constructor.route,
					traveled: false,
					Context: {}
				}
			};
			return _this;
		}

		//methods


		createClass(RoutableMixin, [{
			key: 'subroute',
			value: function subroute(name) {
				var subroutes = this.constructor.subroutes;
				if (!isArray(subroutes)) {
					return false;
				}
				for (var i = subroutes.length - 1; i >= 0; i--) {
					var routable = subroutes[i];
					if (!isURoutable(routable)) {
						continue;
					}
					if (routable.route === name) {
						return routable;
					}
				}
				return false;
			}

			//properties

		}, {
			key: 'onRouteTraversed',


			//pre-defined events
			value: function onRouteTraversed(context) {}
		}, {
			key: 'onRouteCompleted',
			value: function onRouteCompleted(context) {}

			//defaults

		}, {
			key: 'Context',
			get: function get$$1() {
				return this[symbol$4]('Context');
			},
			set: function set$$1(context) {
				return this[symbol$4]('Context', context);
			}
		}, {
			key: 'isRootRoute',
			get: function get$$1() {
				return this[symbol$4]('isRootRoute');
			},
			set: function set$$1(bool) {
				if (this[symbol$4]('isRootRoute', bool)) {
					if (bool) {
						router.add(this.route);
						return;
					}
					router.remove(route);
				}
			}
		}, {
			key: 'isRouteAuthorized',
			get: function get$$1() {
				return true;
			}
		}, {
			key: 'isRouteEndpoint',
			get: function get$$1() {
				return this[symbol$4]('isRouteEndpoint');
			},
			set: function set$$1(bool) {
				return this[symbol$4]('isRouteEndpoint', bool);
			}
		}, {
			key: 'route',
			get: function get$$1() {
				return this[symbol$4]('route');
			},
			set: function set$$1(route) {
				var old = this.route;
				if (this[symbol$4]('route', route)) {
					if (this.isRootRoute) {
						router.remove(old);
						router.add(route);
					}
				}
			}
		}, {
			key: 'subroutes',
			get: function get$$1() {
				return this.constructor.subroutes;
			}
		}, {
			key: symbol$20,
			get: function get$$1() {
				return true;
			}
		}], [{
			key: symbol$19,
			get: function get$$1() {
				return true;
			}
		}, {
			key: 'placard',
			get: function get$$1() {
				return false;
			}
		}, {
			key: 'subroutes',
			get: function get$$1() {
				return [];
			}
		}, {
			key: 'route',
			get: function get$$1() {
				return this.name;
			}
		}]);
		return RoutableMixin;
	}(descendant);
};

exports$1(Routable).as('JSUI/Source/1.0.0/Mixins/Routable');

//Utilities
var vendors = ['webkit', 'moz', 'ms', 'o'];
exports$1(vendors).as('JSUI/Source/1.0.0/Constants/CSS/vendors');

//Utilities
function uncapitalize(text) {
	return text.charAt(0).toLowerCase() + text.slice(1);
}

exports$1(uncapitalize).as('JSUI/Source/1.0.0/Utilities/Strings/uncapitalize');

//Constants
//Utilities
//not a real constant, since it is generated
var equivalents = {};
var example = document.createElement('div');

var _loop = function _loop(key) {
	try {
		example.style[key] = 'inherit';
		var name = (example.getAttribute('style') || '').split(':')[0];
		equivalents[key] = name;
		example.setAttribute('style', '');
		vendors.forEach(function (vendor) {
			var prefix = '-' + vendor + '-';
			if (name.includes(prefix)) {
				var w3cKey = key;
				w3cKey = uncapitalize(w3cKey.replace(vendor, ''));
				equivalents[w3cKey] = name;
				equivalents[name.replace(prefix, '')] = name;
			}
		});
	} catch (e) {}
};

for (var key in example.style) {
	_loop(key);
}
exports$1(equivalents).as('JSUI/Source/1.0.0/Constants/CSS/equivalents');

//Utilities
var namespace$3 = 'JSUI.Style.Sheets';

if (!(namespace$3 in window)) {
	addHiddenValue(window, namespace$3, {});
}
var Sheets = window[namespace$3];

exports$1(Sheets).as('JSUI/Source/1.0.0/Singletons/Style/Sheets');

//TypeChecks
//Utilities
function debounce(fn, time) {
	if (isFunction$1(fn)) {
		var dbcTimer = void 0;
		return function () {
			var _arguments = arguments;

			clearTimeout(dbcTimer);
			dbcTimer = setTimeout(function () {
				fn.apply(null, _arguments);
			}, time);
		};
	}
}

exports$1(debounce).as('JSUI/Source/1.0.0/Utilities/Functions/debounce');

//TypeChecks
//Utilities
var searcher = /["']((?:\\.|[^"\\])*)["']/g;
function getCodeStrings(text) {

	if (!isString(text)) {
		return false;
	}
	var matches = text.match(searcher) || [];
	return matches.map(function (parts) {
		return parts.match(/.+/)[0];
	});
}

exports$1(getCodeStrings).as('JSUI/Source/1.0.0/Utilities/Templating/getCodeStrings');

//TypeChecks
//Utilities
var searcher$1 = /{{\s*.+\s*}}/g;
function getVariables(text) {

	if (!isString(text)) {
		return false;
	}

	var matches = text.match(searcher$1) || [];

	return matches.map(function (part) {
		return part.match(/.+/)[0];
	});
}

exports$1(getVariables).as('JSUI/Source/1.0.0/Utilities/Templating/getVariables');

//Utilities
function replaceAll(text, replace, replacement) {
	return text.split(replace).join(replacement);
}

exports$1(replaceAll).as('JSUI/Source/1.0.0/Utilities/Strings/replaceAll');

//Classes
//Singletons
//TypeChecks
//Utilities
var identity$8 = new Identity({
	class: 'StyleVariables',
	major: 1, minor: 0, patch: 0
});

var namespace$2 = 'JSUI.Style.Variables';

var StyleVariables = function (_Distinct) {
	inherits(StyleVariables, _Distinct);

	function StyleVariables() {
		var _ret;

		classCallCheck(this, StyleVariables);

		var _this = possibleConstructorReturn(this, (StyleVariables.__proto__ || Object.getPrototypeOf(StyleVariables)).call(this));

		_this.identity = identity$8;
		_this.onVariableChanged = debounce(_this.onVariableChanged, 1);
		if (!(namespace$2 in window)) {
			addHiddenValue(window, namespace$2, _this);
		}
		return _ret = window[namespace$2], possibleConstructorReturn(_this, _ret);
	}

	createClass(StyleVariables, [{
		key: 'add',
		value: function add(name, value) {
			var _this2 = this;

			if (isString(name)) {
				this.state(name, value);
				this.trigger(['variableAdded', 'variableChanged'], { name: name, value: value });
				return;
			}
			if (isObject(name)) {
				Object.keys(name).forEach(function (key) {
					_this2.add(key, name[key]);
				});
			}
		}
	}, {
		key: 'get',
		value: function get$$1(name) {
			name = name.trim();
			return this.state(name);
		}
	}, {
		key: 'getValue',
		value: function getValue(name) {
			var value = this.state(name);

			if (isFunction$1(value)) {
				value = value();
			}

			return value;
		}
	}, {
		key: 'parse',
		value: function parse(template) {
			var _this3 = this;

			if (!isString(template)) {
				return template;
			}
			var vars = getVariables(template);
			if (!vars.length) {
				return template;
			}
			vars.forEach(function (variable) {
				var contents = variable.trim();
				if (contents.length < 4) {
					return;
				}
				contents = contents.substring(2, contents.length - 2);
				if (contents.includes('||')) {
					var parts = contents.split('||');
					for (var i = 0; i < parts.length; i++) {
						var _value = _this3.resolve(parts[i].trim());
						if (!isUndefined$1(_value)) {
							template = replaceAll(template, variable, _value);
							break;
						}
					}
				}
				var value = _this3.resolve(variable);
				template = replaceAll(template, variable, value);
			});
			return template;
		}
	}, {
		key: 'resolve',
		value: function resolve(value) {
			var literal = getCodeStrings(value);
			if (literal.length) {
				literal = literal[0];
				literal = literal.substring(1, literal.length - 1);
				return literal;
			}
			value = this.getValue(value);
			return value;
		}
	}, {
		key: 'remove',
		value: function remove(name) {
			var _this4 = this;

			if (isString(name)) {
				if (this[name]) {
					delete this[name];
					this.trigger(['variableRemoved', 'variableChanged'], { name: name });
					return true;
				}
				return false;
			}
			if (isArray(name)) {
				name.forEach(function (key) {
					_this4.remove(key);
				});
				return true;
			}
		}
	}, {
		key: 'onVariableChanged',
		value: function onVariableChanged() {
			Object.values(Sheets).forEach(function (sheet) {
				sheet.render();
			});
		}
	}]);
	return StyleVariables;
}(Distinct);

exports$1(StyleVariables).as('JSUI/Source/1.0.0/Classes/Style/Variables');

//Classes
//Utilities
var Variables = new StyleVariables();
exports$1(Variables).as('JSUI/Source/1.0.0/Singletons/Style/Variables');

//TypeChecks
//Utilities
function getCode(fn) {

	if (!isFunction$1(fn)) {
		return false;
	}

	var contents = fn.toString();
	var body = contents.substring(contents.indexOf("{") + 1, contents.lastIndexOf("}"));

	return body;
}

exports$1(getCode).as('JSUI/Source/1.0.0/Utilities/Functions/getCode');

//TypeChecks
//Utilities
function getFunctionVariables(fn) {

	if (!isFunction$1(fn)) {
		return false;
	}

	var vars = getVariables(getCodeStrings(getCode(fn)));
	return vars.map(function (v) {
		return v.trim();
	});
}

exports$1(getFunctionVariables).as('JSUI/Source/1.0.0/Utilities/Templating/getFunctionVariables');

//Classes
//Constants
//Singletons
//TypeChecks
//Utilities
var identity$7 = new Identity({
	class: 'StyleRules',
	major: 1, minor: 0, patch: 0
});

var StyleRules = function (_Distinct) {
	inherits(StyleRules, _Distinct);

	function StyleRules() {
		classCallCheck(this, StyleRules);

		var _this = possibleConstructorReturn(this, (StyleRules.__proto__ || Object.getPrototypeOf(StyleRules)).call(this));

		_this[symbol].styles = {};
		_this.identity = identity$7;
		return _this;
	}

	return StyleRules;
}(Distinct);

//add all the style keys as properties


Object.keys(equivalents).forEach(function (key) {
	var hasVariables = false;
	Object.defineProperty(StyleRules.prototype, key, {
		get: function get$$1() {
			var value = this[symbol].styles[key];
			if (!hasVariables) {
				return value;
			}
			return Variables.parse(value);
		},
		set: function set$$1(value) {
			var old = this[symbol].styles[key];

			if (isString(value)) {
				var vars = getVariables(value);
				hasVariables = !!vars.length;
			}

			if (isFunction$1(value)) {
				var _vars = getFunctionVariables(value);
				hasVariables = !!_vars.length;
			}

			this[symbol].styles[key] = value;
			if (isNull(value)) {
				delete this[symbol].styles[key];
			}
			if (old !== value) {
				var data = new StateChangeReceipt({
					owner: this,
					property: key,
					old: old,
					new: value
				});
				if (this.trigger) {
					this.trigger([key + 'Changed', 'styleChanged'], data);
				}
			}
		},
		configurable: true,
		enumerable: true
	});
});

exports$1(StyleRules).as('JSUI/Source/1.0.0/Classes/Style/Rules');

//Utilities
var symbol$21 = symbolish('Mixins.Behaviorlike.isStatic');
exports$1(symbol$21).as('JSUI/Source/1.0.0/Constants/Keys/TypeChecks/Behaviorlike/isStatic');

//Utilities
var symbol$22 = symbolish('Mixins.Behaviorlike.isInstance');
exports$1(symbol$22).as('JSUI/Source/1.0.0/Constants/Keys/TypeChecks/Behaviorlike/isInstance');

//Constants
//TypeChecks
//Utilities
var Behaviorlike = function Behaviorlike(descendant) {
	return function (_descendant) {
		inherits(BehaviorlikeMixin, _descendant);

		function BehaviorlikeMixin(host) {
			classCallCheck(this, BehaviorlikeMixin);

			//create hosts container
			var _this = possibleConstructorReturn(this, (BehaviorlikeMixin.__proto__ || Object.getPrototypeOf(BehaviorlikeMixin)).call(this));

			_this[symbol].hosts = {};
			if (host) {
				_this.attach(host);
			}
			return _this;
		}

		//methods


		createClass(BehaviorlikeMixin, [{
			key: 'attach',
			value: function attach(host) {
				if (isElement(host)) {
					var id = host.uid;
					if (this[symbol].hosts[id]) {
						return;
					}
					this[symbol].hosts[id] = host;
					var addAs = this.namespace;
					if (addAs) {
						addHiddenValue(host, addAs, this);
					}
					this.trigger('attach', host);
					return {
						as: function (name) {
							delete host[addAs];
							host[name] = this;
						}.bind(this)
					};
				}
			}
		}, {
			key: 'destructor',
			value: function destructor() {
				get(BehaviorlikeMixin.prototype.__proto__ || Object.getPrototypeOf(BehaviorlikeMixin.prototype), 'destructor', this).call(this);
			}
		}, {
			key: 'detach',
			value: function detach(host) {
				var id = void 0;
				if (isElement(host)) {
					id = host.uid;
				}
				host = this[symbol].hosts[id];
				delete this[symbol].hosts[id];
				this.trigger('detach', host);
			}
		}, {
			key: 'hosts',
			value: function hosts(each) {
				var results = [];
				var hasTask = isFunction(each);
				var hosts = this[symbol].hosts;
				Object.keys(hosts).forEach(function (id) {
					var host = hosts[id];
					if (hasTask) {
						each(host);
					}
					results.push(host);
				});
				return results;
			}

			//properties

		}, {
			key: 'namespace',
			get: function get$$1() {
				return 'DefaultBehavior';
			}

			//type checks

		}, {
			key: symbol$22,
			get: function get$$1() {
				return true;
			}
		}], [{
			key: symbol$21,
			get: function get$$1() {
				return true;
			}
		}]);
		return BehaviorlikeMixin;
	}(descendant);
};

exports$1(Behaviorlike).as('JSUI/Source/1.0.0/Mixins/Behaviorlike');

//Constants
//Classes
//Mixins
//Utilities
var identity$9 = new Identity({
	class: 'Behavior',
	major: 1, minor: 0, patch: 0
});

var Behavior = function (_Distinct$implements) {
	inherits(Behavior, _Distinct$implements);

	function Behavior(host) {
		classCallCheck(this, Behavior);

		//setup new props
		var _this = possibleConstructorReturn(this, (Behavior.__proto__ || Object.getPrototypeOf(Behavior)).call(this));

		_this.identity = identity$9;
		return _this;
	}

	return Behavior;
}(Distinct.implements(Behaviorlike));

exports$1(Behavior).as('JSUI/Source/1.0.0/Classes/Core/Behavior');

//Classes
//Utilities
function isBehavior(u) {
	return u instanceof Behavior;
}

exports$1(isBehavior).as('JSUI/Source/1.0.0/TypeChecks/isBehavior');

//Classes
//Constants
//TypeChecks
//Utilities
var identity$6 = new Identity({
	class: 'StyleInline',
	major: 1, minor: 0, patch: 0
});

var StyleInline = function (_StyleRules) {
	inherits(StyleInline, _StyleRules);

	function StyleInline(host) {
		classCallCheck(this, StyleInline);

		var _this = possibleConstructorReturn(this, (StyleInline.__proto__ || Object.getPrototypeOf(StyleInline)).call(this));

		_this[symbol].host = host || false;

		var handler = function handler() {};

		if (isElement(host)) {
			handler = function handler(ev) {
				if (_this[symbol].host && ev.property) {
					_this[symbol].host.element.style[ev.property] = ev.new;
				}
			};
		}

		if (isBehavior(host)) {
			handler = function handler(ev) {
				host.hosts(function (jsui) {
					jsui.element.style[ev.property] = ev.new;
				});
			};
		}

		_this.on('styleChanged', handler);
		_this.identity = identity$6;
		return _this;
	}

	//methods


	createClass(StyleInline, [{
		key: 'set',
		value: function set$$1(name, value) {
			var _this2 = this;

			if (isObject(name)) {
				Object.keys(name).forEach(function (key) {
					var value = name[key];
					_this2[key] = value;
				});
				return;
			}
			if (isString(name)) {
				if (arguments.length > 1) {
					if (isString(value)) {
						this[name] = value;
					}
					//there will be room here for functions and other stuff
				}
			}
		}

		//properties

	}, {
		key: 'host',
		get: function get$$1() {
			return this[symbol].host;
		},
		set: function set$$1(element) {
			if (isElement(element)) {
				this[symbol].host = element.element;
			}
		}
	}]);
	return StyleInline;
}(StyleRules);

exports$1(StyleInline).as('JSUI/Source/1.0.0/Classes/Style/Inline');

//Utilities
function native(nativeClass) {
	function Native() {
		nativeClass.apply(this, arguments);
	}
	Native.prototype = Object.create(nativeClass.prototype);
	Object.setPrototypeOf(Native, nativeClass);

	return Native;
}

exports$1(native).as('JSUI/Source/1.0.0/Utilities/Classes/native');

//Utilities
var JSUIError = function (_native) {
	inherits(JSUIError, _native);

	function JSUIError(title, message, severity) {
		classCallCheck(this, JSUIError);
		return possibleConstructorReturn(this, (JSUIError.__proto__ || Object.getPrototypeOf(JSUIError)).call(this));
	}

	//methods


	createClass(JSUIError, [{
		key: 'throw',
		value: function _throw(title, message, severity) {
			if (window.console && window.console.trace) {
				console.trace(title || '');
			}
		}
	}]);
	return JSUIError;
}(native(Error));

exports$1(JSUIError).as('JSUI/Source/1.0.0/Classes/Core/JSUIError');

//Constants
//Utilities
function rules(a, b) {
	var importance = b.importance - a.importance;
	var created = b[symbol].created - a[symbol].created;
	if (!importance) {
		return created;
	}
	return importance;
}

exports$1(rules).as('JSUI/Source/1.0.0/Sorts/StyleSheet/rules');

//Classes
//Utilities
function isUStyleSheetRule$1(u) {
	return isUStyleSheetRule(u, StyleSheetRule);
}

exports$1(isUStyleSheetRule$1).as('JSUI/Source/1.0.0/TypeChecks/isUStyleSheetRule');

//Classes
//Constants
//Singletons
//Sorts
//TypeChecks
//Utilities
var identity$11 = new Identity({
	class: 'StyleSheet',
	major: 1, minor: 0, patch: 0
});

var StyleSheet = function (_Distinct) {
	inherits(StyleSheet, _Distinct);

	function StyleSheet(context) {
		classCallCheck(this, StyleSheet);

		var _this = possibleConstructorReturn(this, (StyleSheet.__proto__ || Object.getPrototypeOf(StyleSheet)).call(this));

		context = context || 'default';

		_this[symbol] = {
			rules: {},
			timer: false,
			element: false,
			context: context
		};

		var contextSheet = Sheets[context];
		if (contextSheet) {
			var _ret;

			_this[symbol] = contextSheet[symbol];
			return _ret = _this, possibleConstructorReturn(_this, _ret);
		}

		var element = document.createElement('style');
		element.appendChild(document.createTextNode(""));
		element.setAttribute('id', 'style-' + context);
		document.head.appendChild(element);
		_this[symbol].element = element;
		Sheets[context] = _this;

		_this.identity = identity$11;
		return _this;
	}

	//methods


	createClass(StyleSheet, [{
		key: 'add',
		value: function add(rule) {
			if (isStyleSheetRule(rule)) {
				var rules$$1 = this[symbol].rules;
				if (!rules$$1[rule.uid]) {
					rules$$1[rule.uid] = {
						references: 1,
						rule: rule
					};
					return this.render(10);
				}
				rules$$1[rule.uid].references++;
				return true;
			}
			if (isUStyleSheetRule$1(rule)) {
				return this.add(new rule(this.context));
			}
		}
	}, {
		key: 'remove',
		value: function remove(rule) {
			var rules$$1 = this[symbol].rules;
			if (isString(rule)) {
				var entry = rules$$1[rule];
				if (entry) {
					entry.references--;
					if (entry.references < 1) {
						delete rules$$1[rule];
						this.render(true);
					}
				}
				return;
			}
			if (isStyleSheetRule(rule)) {
				this.remove(rule.uid);
			}
		}
	}, {
		key: 'render',
		value: function render(frameSynced) {
			var _this2 = this;

			var entries = this[symbol].rules;
			cancelAnimationFrame(this[symbol].timer);
			if (frameSynced) {
				this[symbol].timer = requestAnimationFrame(function () {
					_this2.render();
				});
				return;
			}

			var entryList = Object.keys(entries);
			//check to see if there are any entries
			if (!entryList.length) {
				document.head.removeChild(this[symbol].element);
				return;
			}

			//create the stylesheet and disable it
			var element = document.createElement('style');
			element.setAttribute('id', 'style-' + this.context);
			element.appendChild(document.createTextNode(""));
			document.head.appendChild(element);
			element.sheet.disabled = true;

			//fetch all the entries and organize them
			var articles = [];
			entryList.forEach(function (uid) {
				var entry = entries[uid];
				articles.push(entry.rule);
			});
			articles.sort(this.sorter);

			//render each rule
			articles.forEach(function (rule) {
				var value = rule.render(_this2.context);
				element.sheet.insertRule(value, 0);
			});

			//enable the new stylesheet and remove the old one
			element.sheet.disabled = false;
			document.head.removeChild(this[symbol].element);
			this[symbol].element = element;
			this.trigger('rendered');
		}

		//properties

	}, {
		key: 'context',
		get: function get$$1() {
			return this[symbol].context;
		}
	}, {
		key: 'sorter',
		get: function get$$1() {
			if (this[symbol].sorter) {
				return this[symbol].sorter;
			}
			return rules;
		},
		set: function set$$1(method) {
			if (isFunction$1(method)) {
				this[symbol].sorter = method;
			}
		}
	}]);
	return StyleSheet;
}(Distinct);

exports$1(StyleSheet).as('JSUI/Source/1.0.0/Classes/Style/Sheet');

//Utilities
function isNumber(u) {
	return !isNaN(u) && typeof u === 'number';
}

exports$1(isNumber).as('JSUI/Source/1.0.0/TypeChecks/isNumber');

//Classes
//Constants
//Singletons
//TypeChecks
//Utilities
var identity$10 = new Identity({
	class: 'StyleSheetRule',
	major: 1, minor: 0, patch: 0
});

var StyleSheetRule = function (_StyleRules) {
	inherits(StyleSheetRule, _StyleRules);

	function StyleSheetRule(selector, properties) {
		classCallCheck(this, StyleSheetRule);

		var _this = possibleConstructorReturn(this, (StyleSheetRule.__proto__ || Object.getPrototypeOf(StyleSheetRule)).call(this));

		_this.identity = identity$10;

		_this[symbol] = {
			importance: 0,
			created: new Date().valueOf(),
			isSwitchable: false,
			isOnByDefault: true
		};

		if (selector) {
			_this.selector = selector;
		}
		if (isObject(properties)) {
			Object.keys(properties).forEach(function (key) {
				_this[key] = properties[key];
			});
		}
		return _this;
	}

	//methods


	createClass(StyleSheetRule, [{
		key: 'addTo',
		value: function addTo(JSUIElement) {
			if (!this.isSwitchable || !this.class) {
				return;
			}
			if (isElement(JSUIElement)) {
				JSUIElement.class(this.class).add();
			}
		}
	}, {
		key: 'removeFrom',
		value: function removeFrom(JSUIElement) {
			if (!this.isSwitchable || !this.class) {
				return;
			}
			if (isElement(JSUIElement)) {
				JSUIElement.class(this.class).remove();
			}
		}
	}, {
		key: 'render',
		value: function render(context) {
			var _this2 = this;

			context = context || this[symbol].context || 'default';
			var sheet = Sheets[context] || new StyleSheet(context);
			if (!sheet[symbol].rules[this.uid]) {
				sheet.add(this);
				return;
			}

			if (!this.selector) {
				var error = new JSUIError();
				error.throw();
			}
			var styles = [];
			var rendered = '';
			Object.keys(this[symbol].styles).forEach(function (key) {
				var name = equivalents[key];
				var value = _this2[key];
				//needs handlers for values
				styles.push(name + ': ' + value + ';');
			});
			var selector = this.selector;
			var media = this.media;
			var tab = media ? '\t' : '';
			//needs handers for selectors
			var styleText = styles.join('\n\t' + tab);
			rendered = '' + tab + selector + ' {\n\t' + tab + styleText + '\n' + tab + '}';
			if (media) {
				rendered = media + ' {\n' + rendered + '\n}';
			}
			return rendered;
		}
	}, {
		key: 'set',
		value: function set$$1(name, value) {
			var _this3 = this;

			if (isObject(name)) {
				Object.keys(name).forEach(function (key) {
					var value = name[key];
					_this3[key] = value;
				});
				return;
			}
			if (isString(name)) {
				if (arguments.length > 1) {
					if (isString(value)) {
						this[name] = value;
					}
					//there will be room here for functions and other stuff
				}
			}
		}

		//properties

	}, {
		key: 'class',
		get: function get$$1() {
			return this[symbol].class;
		},
		set: function set$$1(className) {
			var old = this[symbol].class;
			if (old === className) {
				return;
			}
			this[symbol].class = className;
			var data = new StateChangeReceipt({ old: old, new: className });
			this.trigger('classChanged', data);
		}
	}, {
		key: 'context',
		get: function get$$1() {
			return this[symbol].context || 'default';
		},
		set: function set$$1(context) {
			var old = this[symbol].context;
			if (old === context) {
				return;
			}
			this[symbol].context = context;
			var data = new StateChangeReceipt({ old: old, new: context });
			this.trigger('contextChanged', data);
		}
	}, {
		key: 'importance',
		get: function get$$1() {
			return this[symbol].importance || 0;
		},
		set: function set$$1(zindex) {
			var old = this[symbol].importance;
			if (isNumber(zindex)) {
				if (old === zindex) {
					return;
				}
				this[symbol].importance = zindex;
			}
			var data = new StateChangeReceipt({ old: old, new: zindex });
			this.trigger('importanceChanged', data);
		}
	}, {
		key: 'isOnByDefault',
		get: function get$$1() {
			return this[symbol].isOnByDefault;
		},
		set: function set$$1(bool) {
			var old = this[symbol].isOnByDefault;
			if (old === bool) {
				return;
			}
			this[symbol].isOnByDefault = bool;
			var data = new StateChangeReceipt({ old: old, new: bool });
			this.trigger('isOnByDefaultChanged', data);
		}
	}, {
		key: 'isSwitchable',
		get: function get$$1() {
			return this[symbol].isSwitchable;
		},
		set: function set$$1(bool) {
			var old = this[symbol].isSwitchable;
			if (old === bool) {
				return;
			}
			this[symbol].isSwitchable = bool;
			var data = new StateChangeReceipt({ old: old, new: bool });
			this.trigger('isSwitchableChanged', data);
		}
	}, {
		key: 'media',
		get: function get$$1() {
			return this[symbol].media;
		},
		set: function set$$1(media) {
			var _this4 = this;

			var self = this;
			var changed = function changed() {
				var old = _this4[symbol].media;
				var data = new StateChangeReceipt({
					owner: self,
					old: old,
					new: media
				});
				_this4.trigger('mediaChanged', data);
			};

			if (isString(media)) {
				this[symbol].media = media;
				changed();
				return;
			}
			//will need array and object
		}
	}, {
		key: 'selector',
		get: function get$$1() {
			return this[symbol].selector;
		},
		set: function set$$1(selector) {
			var _this5 = this;

			var self = this;
			var changed = function changed() {
				var old = _this5[symbol].selector;
				var data = new StateChangeReceipt({
					owner: self,
					old: old,
					new: selector
				});
				_this5.trigger('selectorChanged', data);
			};

			if (isString(selector)) {
				this[symbol].selector = selector;
				changed();
				return;
			}
			//will need array and object
		}
	}]);
	return StyleSheetRule;
}(StyleRules);

exports$1(StyleSheetRule).as('JSUI/Source/1.0.0/Classes/Style/SheetRule');

//Classes
//Utilities
function isStyleSheetRule(u) {
	return u instanceof StyleSheetRule;
}

exports$1(isStyleSheetRule).as('JSUI/Source/1.0.0/TypeChecks/isStyleSheetRule');

//Classes
//Constants
//Mixins
//Singletons
//TypeChecks
//Utilities
var identity$5 = new Identity({
	class: 'StyleBehavior',
	major: 1, minor: 0, patch: 0
});

var StyleBehavior = function (_Behaviorlike) {
	inherits(StyleBehavior, _Behaviorlike);

	function StyleBehavior(host) {
		classCallCheck(this, StyleBehavior);

		var _this = possibleConstructorReturn(this, (StyleBehavior.__proto__ || Object.getPrototypeOf(StyleBehavior)).call(this));

		_this[symbol].host = host;
		_this[symbol].context = 'default';
		_this.identity = identity$5;
		return _this;
	}

	createClass(StyleBehavior, [{
		key: 'switch',
		value: function _switch(style) {
			if (isStyleSheetRule(style)) {
				var styleActions = this[symbol].styleActions = this[symbol].styleActions || {};
				var host = this[symbol].host;

				var action = styleActions[style.uid] || {
					on: style.addTo.bind(style, host),
					off: style.removeFrom.bind(style, host)
				};

				return action;
			}
		}
	}, {
		key: 'context',
		get: function get$$1() {
			return this[symbol].context;
		},
		set: function set$$1(context) {
			var _this2 = this;

			var host = this[symbol].host;
			var old = this[symbol].context;

			if (old === context) {
				return;
			}

			this[symbol].context = context;
			Object.keys(host[symbol].style.rules).forEach(function (uid) {
				var entry = host[symbol].style.rules[uid];
				Sheets[old].remove(entry.rule);
				entry.rule.render(_this2[symbol].context);
			});

			host.trigger('StyleContextChanged', {
				old: old,
				new: context
			});
		}
	}, {
		key: 'Inline',
		get: function get$$1() {
			if (!this[symbol].Inline) {
				this[symbol].Inline = new StyleInline(this[symbol].host);
			}
			return this[symbol].Inline;
		}
	}, {
		key: 'namespace',
		get: function get$$1() {
			return false;
		}
	}]);
	return StyleBehavior;
}(Behaviorlike(Distinct));

exports$1(StyleBehavior).as('JSUI/Source/1.0.0/Classes/Behavior/Style');

//Classes
//Constants
//Singletons
//TypeChecks
//Utilities
var identity$4 = new Identity({
	class: 'Styleable',
	major: 1, minor: 0, patch: 0
});

var Styleable = function (_Distinct) {
	inherits(Styleable, _Distinct);

	function Styleable() {
		classCallCheck(this, Styleable);

		var _this = possibleConstructorReturn(this, (Styleable.__proto__ || Object.getPrototypeOf(Styleable)).call(this));

		_this.identity = identity$4;
		_this[symbol].context = 'default';
		_this[symbol].style = {
			rules: {}
		};
		return _this;
	}

	//methods


	createClass(Styleable, [{
		key: 'add',
		value: function add(style) {
			if (isStyleSheetRule(style)) {
				var rules = this[symbol].style.rules;
				var entry = rules[style.uid];
				var Style = this.Style;
				if (!entry) {
					entry = {
						rule: style,
						context: Style.context
					};
					rules[style.uid] = entry;
					style.render(Style.context);
					return;
				}
				if (entry.context !== Style.context) {
					var sheet = Sheets[entry.context];
					if (sheet) {
						sheet.remove(style);
						style.render(Style.context);
					}
					return;
				}
			}
		}

		//properties

	}, {
		key: 'Style',
		get: function get$$1() {
			if (!this[symbol].Style) {
				this[symbol].Style = new StyleBehavior(this);
			}
			return this[symbol].Style;
		}
	}]);
	return Styleable;
}(Distinct);

exports$1(Styleable).as('JSUI/Source/1.0.0/Classes/Core/Styleable');

//Classes
//Constants
//Utilities
var CollectionWhereReceipt = function (_Receipt) {
	inherits(CollectionWhereReceipt, _Receipt);

	function CollectionWhereReceipt() {
		classCallCheck(this, CollectionWhereReceipt);

		var _this = possibleConstructorReturn(this, (CollectionWhereReceipt.__proto__ || Object.getPrototypeOf(CollectionWhereReceipt)).call(this));

		_this[symbol] = {
			selected: new Collection(),
			rejected: new Collection()
		};
		return _this;
	}

	//properties


	createClass(CollectionWhereReceipt, [{
		key: 'selected',
		get: function get$$1() {
			return this[symbol].selected;
		}
	}, {
		key: 'rejected',
		get: function get$$1() {
			return this[symbol].rejected;
		}
	}]);
	return CollectionWhereReceipt;
}(Receipt);

exports$1(CollectionWhereReceipt).as('JSUI/Source/1.0.0/Classes/Receipts/CollectionWhere');

//Utilities
var htmlRegex = /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/;
function isHTML(u) {
	return htmlRegex.test(u);
}

exports$1(isHTML).as('JSUI/Source/1.0.0/TypeChecks/isHTML');

//TypeChecks
//Utilities
function isPath(u) {

	if (!isString(u)) {
		return false;
	}

	var count = u.length;
	if (count < 4) {
		return false;
	}

	return u.charAt(0) === '@' && u.charAt(1) === '{' && u.charAt(count - 1) === '}';
}

exports$1(isPath).as('JSUI/Source/1.0.0/TypeChecks/isPath');

//Utilities
function isRegex(u) {
	return u instanceof RegExp;
}

exports$1(isRegex).as('JSUI/Source/1.0.0/TypeChecks/isRegex');

//TypeChecks
//Utilities
var types$4 = {
	class: {
		element: isElement
	},
	object: {
		array: isArray,
		behavior: isBehavior,
		dom: isDOM,
		null: isNull,
		regex: isRegex
	},
	string: {
		html: isHTML,
		path: isPath
	}
};

exports$1(types$4).as('JSUI/Source/1.0.0/Singletons/TypeChecks/types');

//Singletons
//Utilities
var Types = Object.create(types$4);
exports$1(Types).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Types');

//Handlers
//Utilities
var handler$1 = getHandledType.bind(null, Types);
exports$1(handler$1).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/getHandledType');

//Utilities
function unhandled(args) {
  return args;
}

exports$1(unhandled).as('JSUI/Source/1.0.0/Classes/Core/Handlers/unhandled');

//Classes
//Constants
//Handlers
//TypeChecks
//Utilities
var Collection = function (_native) {
	inherits(Collection, _native);

	function Collection() {
		classCallCheck(this, Collection);
		return possibleConstructorReturn(this, (Collection.__proto__ || Object.getPrototypeOf(Collection)).apply(this, arguments));
	}

	createClass(Collection, [{
		key: 'do',
		value: function _do(method, args) {
			var results = new Collection();
			this.forEach(function (item) {
				if (isFunction$1(item[method])) {
					results.push(item[method].apply(item, args));
				}
			});
			return results;
		}
	}, {
		key: 'where',
		value: function where(selector) {
			var receipt = new CollectionWhereReceipt();
			if (!isFunction$1(selector)) {
				return receipt;
			}

			for (var i = this.length - 1; i >= 0; i--) {
				var item = this[i];
				var action = selector(item) ? 'selected' : 'rejected';
				receipt[action].push(item);
			}

			return receipt;
		}
	}]);
	return Collection;
}(native(Array));

exports$1(Collection).as('JSUI/Source/1.0.0/Classes/Core/Collection');

//Classes
//Utilities
function _array(collection) {
	var _this = this;

	var results = new Collection();

	collection.forEach(function (item) {
		results.push(_this.add(item));
	});

	return results;
}

exports$1(_array).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Add/_array');

//Utilities
function _behavior(instance) {
	return instance.attach(this);
}

exports$1(_behavior).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Add/_behavior');

//Utilities
function _dom(element) {
	if (this.element) {
		this.element.appendChild(element);
	}
}

exports$1(_dom).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Add/_dom');

//Classes
//Utilities
function isUBehavior(u) {
	return isUStyleSheetRule(u, Behavior);
}

exports$1(isUBehavior).as('JSUI/Source/1.0.0/TypeChecks/isUBehavior');

//Classes
//Utilities
function isUElement(u) {
	return isUStyleSheetRule(u, Element$1);
}

exports$1(isUElement).as('JSUI/Source/1.0.0/TypeChecks/isUElement');

//TypeChecks
//Utilities
function _function(method) {

	if (isUElement(method)) {
		return this.add(new method());
	}

	if (isUBehavior(method)) {
		return this.add(new method());
	}
}

exports$1(_function).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Add/_function');

//Utilities
function _html(markup) {
	if (this.element && this.element.appendChild) {

		var fragment = document.createDocumentFragment();
		var root = document.createElement('div');
		root.innerHTML = markup;

		while (root.firstChild) {
			fragment.appendChild(root.firstChild);
		}

		this.element.appendChild(fragment);
	}
}

exports$1(_html).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Add/_html');

//Classes
//Constants
//Utilities
var ElementReceipt = function (_Receipt) {
	inherits(ElementReceipt, _Receipt);

	function ElementReceipt(element) {
		classCallCheck(this, ElementReceipt);

		var _this = possibleConstructorReturn(this, (ElementReceipt.__proto__ || Object.getPrototypeOf(ElementReceipt)).call(this));

		addHiddenValue(_this, symbol, { element: element });
		return _this;
	}

	//properties


	createClass(ElementReceipt, [{
		key: 'element',
		get: function get$$1() {
			return this[symbol].element;
		},
		set: function set$$1(element) {
			this[symbol].element = element;
		}
	}]);
	return ElementReceipt;
}(Receipt);

exports$1(ElementReceipt).as('JSUI/Source/1.0.0/Classes/Receipts/Element');

//TypeChecks
//Utilities
function addClass(el, name) {
	if (!isString(name) || !isDOM(el)) {
		return;
	}
	if (el.classList && el.classList.add) {
		el.classList.add.apply(el.classList, name.split(' '));
		return;
	}
	var classes = el.className.split(' ');
	if (classes.includes(name)) {
		return;
	}
	classes.push(name);
	el.className = classes.join(' ');
}

exports$1(addClass).as('JSUI/Source/1.0.0/Utilities/Elements/addClass');

//Classes
//Constants
//Utilities
var ElementAddedReceipt = function (_ElementReceipt) {
	inherits(ElementAddedReceipt, _ElementReceipt);

	function ElementAddedReceipt(element, addition) {
		classCallCheck(this, ElementAddedReceipt);

		var _this = possibleConstructorReturn(this, (ElementAddedReceipt.__proto__ || Object.getPrototypeOf(ElementAddedReceipt)).call(this, element));

		_this[symbol].addition = addition;
		return _this;
	}

	//methods


	createClass(ElementAddedReceipt, [{
		key: 'as',
		value: function as(name) {
			var element = this[symbol].element;
			var addition = this[symbol].addition;
			var uid = element.uid;

			if (name) {
				element[name] = addition;
				addition[symbol].mapped = addition[symbol].mapped || {};
				var map = addition[symbol].mapped;
				map[uid] = map[uid] || [];
				map[uid].push(name);
				addition.attribute('as', name);
				addClass(addition.element, 'as-' + name);
			}

			return addition;
		}
	}]);
	return ElementAddedReceipt;
}(ElementReceipt);

exports$1(ElementAddedReceipt).as('JSUI/Source/1.0.0/Classes/Receipts/ElementAdded');

//Classes
//Constants
//Utilities
function _element(instance) {
	if (this.element && instance.element) {
		this.element.appendChild(instance.element);
		this[symbol].children = this[symbol].children || {};
		this[symbol].children[instance.uid] = instance;
		instance[symbol].parent = this;

		var Style = instance.Style;
		Style.context = Style.context === 'default' ? this.Style.context : Style.context;
	}
	var receipt = new ElementAddedReceipt(this, instance);
	return receipt;
}

exports$1(_element).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Add/_element');

//Utilities
var symbol$23 = symbolish('trigger');
exports$1(symbol$23).as('JSUI/Source/1.0.0/Constants/Keys/General/trigger');

//Classes
//Constants
//Utilities
function add$1(host, name, defaults) {
	Object.defineProperty(host, name, {
		get: function get() {
			var value = name in this[symbol].state ? this[symbol].state[name] : defaults;
			return value;
		},
		set: function set(v) {
			var value = name in this[symbol].state ? this[symbol].state[name] : defaults;
			var old = value;
			value = v;
			if (old !== v) {
				this[symbol].state[name] = value;
				var data = new StateChangeReceipt({
					owner: this,
					property: name,
					old: old,
					new: value
				});
				var _trigger = (this.trigger || this[symbol$23] || this[_trigger]).bind(this);
				if (_trigger) {
					_trigger([name + 'Changed', 'Changed'], data);
				}
			}
		},
		configurable: true,
		enumerable: true
	});
}

exports$1(add$1).as('JSUI/Source/1.0.0/Utilities/Properties/add');

//Utilities
function _string$1(prop) {
	add$1(this, prop);
}

exports$1(_string$1).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Add/_string');

//Handlers
//Utilities
function _path(prop) {
	return _string$1.call(this, prop);
}

exports$1(_path).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Add/_path');

//Handlers
//Utilities
var Add = {
	array: _array,
	behavior: _behavior,
	dom: _dom,
	function: _function,
	html: _html,
	element: _element,
	path: _path,
	string: _string$1
};

exports$1(Add).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Add');

//Classes
//Utilities
function _array$1(collection) {
  var _this = this;

  var results = new Collection();

  collection.forEach(function (item) {
    results.push(_this.addTo(item));
  });

  return results;
}

exports$1(_array$1).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/AddTo/_array');

//Utilities
function _dom$1(element) {
	if (element) {
		element.appendChild(this.element);
	}
}

exports$1(_dom$1).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/AddTo/_dom');

//Utilities
function _element$1(instance) {
	return instance.add(this);
}

exports$1(_element$1).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/AddTo/_element');

//Handlers
//Utilities
var AddTo = {
	array: _array$1,
	dom: _dom$1,
	element: _element$1
};

exports$1(AddTo).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/AddTo');

//Utilities
function _get_array(collection) {
	var _this = this;

	var results = {};

	collection.forEach(function (attribute) {
		results[attribute] = _this.attribute(attribute);
	});

	return results;
}

exports$1(_get_array).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Attribute/Get/_get_array');

//TypeChecks
//Utilities
function _object(macro, value) {
	var _this = this;

	var result = isObject(value) ? value : {};

	Object.keys(macro).forEach(function (attribute) {
		results[attribute] = _this.attribute(attribute, macro[attribute]);
	});

	return results;
}

exports$1(_object).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Attribute/Set/_object');

//Handlers
//Utilities
function _get_object(macro) {
	return _object.call(this, macro);
}

exports$1(_get_object).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Attribute/Get/_get_object');

//Utilities
function _get_string(name) {
	return this.element.getAttribute(name);
}

exports$1(_get_string).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Attribute/Get/_get_string');

//Handlers
//Utilities
function _get_path() {
	return _get_string.apply(this, arguments);
}

exports$1(_get_path).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Attribute/Get/_get_path');

//TypeChecks
//Utilities
function placeholder() {}
function nodeAttributes(node, callback) {
	if (!isFunction$1(callback)) {
		callback = placeholder;
	}
	if (!isDOM(node)) {
		return;
	}
	var attributeList = node.attributes;
	var attributes = {};
	for (var i = attributeList.length - 1; i >= 0; i--) {
		var attribute = attributeList[i];
		var name = attribute.name;
		var value = attribute.value;
		attributes[name] = value;
		if (callback(name, value, attribute)) {
			break;
		}
	}
	return attributes;
}

exports$1(nodeAttributes).as('JSUI/Source/1.0.0/Utilities/Elements/nodeAttributes');

//Utilities
function _undefined() {
	var results = {};

	nodeAttributes(this.element, function (attribute, value, ref) {
		results[attribute] = value;
	});

	return results;
}

exports$1(_undefined).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Attribute/Get/_undefined');

//Classes
//Utilities
function _array$2(collection, value) {
	var _this = this;

	var results = new Collection();

	collection.forEach(function (attribute) {
		results.push(_this.attribute(attribute, value));
	});

	return results;
}

exports$1(_array$2).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Attribute/Set/_array');

//Typechecks
//Utilities
function _set_string(name, value) {

	if (isUndefined$1(value) || isNull(value)) {
		this.element.removeAttribute(name);
		return true;
	}

	this.element.setAttribute(name, value);
	return true;
}

exports$1(_set_string).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Attribute/Set/_set_string');

//Handlers
//Utilities
function _set_path() {
	return _set_string.apply(this, arguments);
}

exports$1(_set_path).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Attribute/Set/_set_path');

//Get Handlers
//Set Handlers
//Utilities
var Attribute = {
	Get: {
		array: _get_array,
		object: _get_object,
		path: _get_path,
		string: _get_string,
		undefined: _undefined
	},
	Set: {
		array: _array$2,
		object: _object,
		path: _set_path,
		string: _set_string
	}
};

exports$1(Attribute).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Attribute');

//TypeChecks
//Utilities
function getClasses(el) {
	if (!isDOM(el)) {
		return;
	}
	var classes = {};
	if (isString(el.className)) {
		var list = el.className.split(' ');
		if (isArray(list)) {
			list.forEach(function (name) {
				classes[name] = true;
			});
		}
	}
	return classes;
}

exports$1(getClasses).as('JSUI/Source/1.0.0/Utilities/Elements/getClasses');

//Classes
//Constants
//TypeChecks
//Utilities
var ElementClassReceipt = function (_ElementReceipt) {
	inherits(ElementClassReceipt, _ElementReceipt);

	function ElementClassReceipt(element, className) {
		classCallCheck(this, ElementClassReceipt);

		var _this = possibleConstructorReturn(this, (ElementClassReceipt.__proto__ || Object.getPrototypeOf(ElementClassReceipt)).call(this, element));

		_this.element = element;
		var classes = [];
		if (isArray(className)) {
			classes = className;
		}
		if (isString(className)) {
			classes = className.split(' ');
		}
		_this[symbol].classes = classes;
		return _this;
	}

	//methods


	createClass(ElementClassReceipt, [{
		key: 'add',
		value: function add() {
			var existing = getClasses(this.element) || {};
			this[symbol].classes.forEach(function (name) {
				existing[name] = true;
			});
			this.element.className = Object.keys(existing).join(' ');
			return existing;
		}
	}, {
		key: 'exists',
		value: function exists() {
			var existing = getClasses(this.element) || {};
			var classes = this[symbol].classes;
			var count = classes.length;
			for (var i = 0; i < count; i++) {
				var name = classes[i];
				if (!existing[name]) {
					return false;
				}
			}
			return true;
		}
	}, {
		key: 'remove',
		value: function remove() {
			var existing = getClasses(this.element) || {};
			this[symbol].classes.forEach(function (name) {
				delete existing[name];
			});
			this.element.className = Object.keys(existing).join(' ');
			return existing;
		}
	}, {
		key: 'toggle',
		value: function toggle() {
			var existing = getClasses(this.element) || {};
			this[symbol].classes.forEach(function (name) {
				if (existing[name]) {
					delete existing[name];
					return;
				}
				existing[name] = true;
			});
			this.element.className = Object.keys(existing).join(' ');
			return existing;
		}
	}]);
	return ElementClassReceipt;
}(ElementReceipt);

exports$1(ElementClassReceipt).as('JSUI/Source/1.0.0/Classes/Receipts/ElementClass');

//Classes
//Utilities
function _array$3(collection) {
	return new ElementClassReceipt(this.element, collection);
}

exports$1(_array$3).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Class/_array');

//TypeChecks
//Utilities
function _object$1(classes) {
	var className = '';

	Object.keys(classes).forEach(function (name) {
		if (classes[name]) {
			className += name;
		}
	});

	this.element.className = className;
	return className;
}

exports$1(_object$1).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Class/_object');

//Utilities
function isEmptyString(u) {
	return u === "";
}

exports$1(isEmptyString).as('JSUI/Source/1.0.0/TypeChecks/isEmptyString');

//Classes
//TypeChecks
//Utilities
function _string$2(name) {
	if (isEmptyString(name)) {
		return;
	}
	return new ElementClassReceipt(this.element, name);
}

exports$1(_string$2).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Class/_string');

//Handlers
//Utilities
function _path$1() {
	return _string$2.apply(this, arguments);
}

exports$1(_path$1).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Class/_path');

//Utilities
function _undefined$1() {
	return getClasses(this.element);
}

exports$1(_undefined$1).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Class/_undefined');

//Utilities
var Class$2 = {
	array: _array$3,
	object: _object$1,
	path: _path$1,
	string: _string$2,
	undefined: _undefined$1
};

exports$1(Class$2).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Class');

//TypeChecks
//Utilities
function getTagName(el) {
	if (isDOM(el)) {
		return el.tagName.toLowerCase();
	}
	return 'none';
}

exports$1(getTagName).as('JSUI/Source/1.0.0/Utilities/Elements/getTagName');

//Utilities
function _dom$2(el) {
	this.element = el;
	return getTagName(el);
}

exports$1(_dom$2).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Constructor/_dom');

//Utilities
function _string$3(tag) {
	tag = tag || 'div';
	this.element = document.createElement(tag);
	return tag;
}

exports$1(_string$3).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Constructor/_string');

//Handlers
//Utilities
var Constructor = {
	dom: _dom$2,
	string: _string$3
};

exports$1(Constructor).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Constructor');

//Classes
//Utilities
function _array$4(collection) {
	var _this = this;

	var results = new Collection();

	collection.forEach(function (item) {
		results.push(_this.do(item));
	});

	return results;
}

exports$1(_array$4).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Do/_array');

//Utilities
function _function$1(method, args) {
	method.call(this, args);
	return this;
}

exports$1(_function$1).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Do/_function');

//Utilities
function _object$2(macro) {
	var _this = this;

	var results = {};

	Object.keys(macro).forEach(function (command) {
		results[command] = _this.do(command, macro[command]);
	});

	return results;
}

exports$1(_object$2).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Do/_object');

//TypeChecks
//Utilities
function getter(obj, prop) {
	if (!obj || !isObject(obj)) {
		return;
	}
	return obj[prop];
}

exports$1(getter).as('JSUI/Source/1.0.0/Utilities/Paths/getter');

//TypeChecks
//Utilities
function get$1(obj, path) {
	if (isString(path)) {
		return path.substring(1).split('.').reduce(getter, obj);
	}
	if (isArray(path)) {
		return path.reduce(getter, obj);
	}
}

exports$1(get$1).as('JSUI/Source/1.0.0/Utilities/Paths/get');

//Utilities
function getWithContext(obj, path) {
	var parts = path.substring(1).split('.');
	if (!parts.length) {
		return;
	}
	if (parts.length === 1) {
		return {
			context: obj,
			property: parts[0]
		};
	}
	var tail = parts.splice(parts.length - 1, 1);
	var reference = get$1(obj, parts);
	if (reference) {
		return {
			context: reference,
			property: tail[0]
		};
	}
	return false;
}

exports$1(getWithContext).as('JSUI/Source/1.0.0/Utilities/Paths/getWithContext');

//TypeChecks
//Utilities
function _path$2(command, args) {
	var path = getWithContext(this, command);
	if (!path || !path.context || !path.property) {
		return;
	}

	var method = path.context[path.property];
	if (isFunction$1(method)) {
		if (isArray(args)) {
			return method.apply(path.context, args);
		}
		return method.call(path.context, args);
	}
}

exports$1(_path$2).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Do/_path');

//TypeChecks
//Utilities
function _string$4(command, args) {
	if (isFunction$1(this[command])) {
		if (isArray(args)) {
			return this[command].apply(this, args);
		}
		return this[command](args);
	}
}

exports$1(_string$4).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Do/_string');

//Handlers
//Utilities
var Do = {
	array: _array$4,
	function: _function$1,
	object: _object$2,
	path: _path$2,
	string: _string$4
};

exports$1(Do).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Do');

//Classes
//Utilities
function _array$5(collection) {
	var _this = this;

	var results = new Collection();

	collection.forEach(function (item) {
		results.push(_this.find(item));
	});

	return results;
}

exports$1(_array$5).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Find/_array');

//Classes
//Utilities
function _function$2(method) {
	var results = [];
	var isJSUI = Element$1.isPrototypeOf(method.prototype);

	if (isJSUI) {
		var proto = method.prototype;
		this.children(function (child) {
			if (proto.isPrototypeOf(child)) {
				results.push(child);
			}
		});
	}

	return results;
}

exports$1(_function$2).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Find/_function');

//Utilities
function _element$2(proto) {
	var results = [];

	this.children(function (child) {
		if (child instanceof proto) {
			results.push(child);
		}
	});

	return results;
}

exports$1(_element$2).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Find/_element');

//Utilities
function _string$5(query) {
	var results = null;
	results = this.element.querySelectorAll(query);
	results = !results || results === null ? [] : results;
	return results;
}

exports$1(_string$5).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Find/_string');

//Handlers
//Utilities
function _path$3(query) {
	return _string$5.call(this, query);
}

exports$1(_path$3).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Find/_path');

//Utilities
function _regex(expression) {
	var results = [];
	this.children(function (child) {
		if (child.element) {
			var element = child.element;
			var text = element.innerText || element.textContent || '';
			if (expression.test(text)) {
				results.push(child);
			}
		}
	});
	return results;
}

exports$1(_regex).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Find/_regex');

//Utilities
function _undefined$2() {
	var results = [];
	this.children(function (child) {
		results.push(child);
	});
	return results;
}

exports$1(_undefined$2).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Find/_undefined');

//Hanlders
//Utilities
var Find = {
	array: _array$5,
	function: _function$2,
	element: _element$2,
	path: _path$3,
	regex: _regex,
	string: _string$5,
	undefined: _undefined$2
};

exports$1(Find).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Find');

//Classes
//TypeChecks
//Utilities
function _array$6(collection) {
	var _this = this;

	var results = new Collection();
	collection.forEach(function (item) {

		var result = _this.get(item);
		results.push(result);

		if (isString(item)) {
			results[item] = result;
		}
	});
	return results;
}

exports$1(_array$6).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Get/_array');

//Utilities
function _path$4(path) {
	return get$1(this, path);
}

exports$1(_path$4).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Get/_path');

//Utilities
function _string$6(property) {
	if (!property) {
		return;
	}
	return this[property];
}

exports$1(_string$6).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Get/_string');

//Handlers
//Utilities
var Get = {
	array: _array$6,
	path: _path$4,
	string: _string$6
};

exports$1(Get).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Get');

//Classes
//Utilities
function _array$7(collection, method) {
	var _this = this;

	var results = new Collection();

	collection.forEach(function (item) {
		results.push(_this.on(item, method));
	});

	return results;
}

exports$1(_array$7).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/On/_array');

//Utilities
function _object$3(assignments) {
	var _this = this;

	var results = {};

	Object.keys(assignments).forEach(function (name) {
		var method = assignments[name];
		results[name] = _this.on(name, method);
	});

	return results;
}

exports$1(_object$3).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/On/_object');

//Utilities
function _string$7(name, method) {
	return on$1.call(this, name, method);
}

exports$1(_string$7).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/On/_string');

//Handlers
//Utilities
function _path$5(name, method) {
	return _string$7.call(this, name, method);
}

exports$1(_path$5).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/On/_path');

//Handlers
//Utilities
var On = {
	array: _array$7,
	object: _object$3,
	path: _path$5,
	string: _string$7
};

exports$1(On).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/On');

//Classes
//Utilities
function _array$8(collection) {
	var _this = this;

	var results = new Collection();

	collection.forEach(function (item) {
		results.push(_this.remove(item));
	});

	return results;
}

exports$1(_array$8).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Remove/_array');

//Utilities
function _element$3(instance) {
	if (instance.remove) {
		return instance.remove();
	}
}

exports$1(_element$3).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Remove/_element');

//Utilities
function _undefined$3() {
	this.trigger('destructed');
	return this.destructor();
}

exports$1(_undefined$3).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Remove/_undefined');

//Handlers
//Utilities
var Remove = {
	array: _array$8,
	element: _element$3,
	undefined: _undefined$3
};

exports$1(Remove).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Remove');

//Utilities
function _array$9(properties, value) {
	var _this = this;

	var results = {};

	properties.forEach(function (command) {
		results[command] = _this.set(command, value);
	});

	return results;
}

exports$1(_array$9).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Set/_array');

//Utilities
function _object$4(assignments) {
	var _this = this;

	var results = {};

	Object.keys(assignments).forEach(function (command) {
		results[command] = _this.set(command, assignments[command]);
	});

	return results;
}

exports$1(_object$4).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Set/_object');

//Utilities
function setter(obj, path, value) {
	var parts = path.substring(1).split('.');
	if (!parts.length) {
		return;
	}
	if (parts.length === 1) {
		obj[parts[0]] = value;
		return true;
	}
	var tail = parts.splice(parts.length - 1, 1);
	var reference = get$1(obj, parts);
	if (reference) {
		reference[tail[0]] = value;
		return true;
	}
	return false;
}

exports$1(setter).as('JSUI/Source/1.0.0/Utilities/Paths/setter');

//Utilities
function set$1(obj, path, value) {
	return setter(obj, path, value);
}

exports$1(set$1).as('JSUI/Source/1.0.0/Utilities/Paths/set');

//Utilities
function _path$6(path, value) {
	return set$1(this, path, value);
}

exports$1(_path$6).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Set/_path');

//Utilities
function _string$8(property, value) {
	if (!property) {
		return;
	}
	this[property] = value;
	return value;
}

exports$1(_string$8).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Set/_string');

//Handlers
//Utilities
var Set = {
	array: _array$9,
	object: _object$4,
	path: _path$6,
	string: _string$8
};

exports$1(Set).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Set');

//Utilities
function _path$7(text) {
	return _string.call(this, text);
}

exports$1(_path$7).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Text/_path');

//Constants
//Utilities
function _string$9(text) {
	if (this[symbol] && this.element) {
		if (!this[symbol].text) {
			var textNode = document.createTextNode(text);
			this[symbol].text = textNode;
			this.element.appendChild(textNode);
			return true;
		}
		this[symbol].text.nodeValue = text;
		return true;
	}
	return false;
}

exports$1(_string$9).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Text/_string');

//Constants
//Utilities
function _undefined$4() {
	if (this[symbol].text) {
		return this[symbol].text.nodeValue;
	}
}

exports$1(_undefined$4).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Text/_undefined');

//Handlers
//Utilities
var Text = {
	path: _path$7,
	string: _string$9,
	number: _string$9,
	boolean: _string$9,
	undefined: _undefined$4
};

exports$1(Text).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Text');

//Classes
//Utilities
function _array$10(collection, args) {
	var _this = this;

	var results = new Collection();

	collection.forEach(function (item) {
		results.push(_this.trigger(item, args));
	});

	return results;
}

exports$1(_array$10).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Trigger/_array');

//Utilities
function _object$5(assignments) {
	var _this = this;

	Object.keys(assignments).forEach(function (name) {
		var args = assignments[name];
		_this.trigger(name, args);
	});
}

exports$1(_object$5).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Trigger/_object');

//Utilities
function _string$10(name, args) {
	if (!this.element) {
		return false;
	}
	var event = new CustomEvent(name, { "detail": args });
	this.element.dispatchEvent(event);
	return true;
}

exports$1(_string$10).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Trigger/_string');

//Handlers
//Utilities
function _path$8(name, args) {
	return _string$10.call(this, name, args);
}

exports$1(_path$8).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Trigger/_path');

//Utilities
var Trigger = {
	array: _array$10,
	object: _object$5,
	path: _path$8,
	string: _string$10
};

exports$1(Trigger).as('JSUI/Source/1.0.0/Classes/Core/Element/Handlers/Trigger');

//Utilities
var symbol$24 = symbolish('on');
exports$1(symbol$24).as('JSUI/Source/1.0.0/Constants/Keys/General/on');

//Classes
//Handlers
//Constants
//TypeChecks
//Utilities
var identity$3 = new Identity({
	class: 'Element',
	major: 1, minor: 0, patch: 0
});

var Element$1 = function (_Styleable) {
	inherits(Element, _Styleable);

	function Element(tag) {
		classCallCheck(this, Element);

		var _this = possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this, tag));

		_this.identity = identity$3;
		//select the proper constructor action
		var type = handler$1(tag);
		var action = Constructor[type];
		tag = (action || function () {
			return Constructor.string.call(this, 'div');
		}).call(_this, tag);

		//set up ids
		_this.element.uid = _this.uid;

		//add references 
		var development = settings.Development;
		if (development.enabled && development.references) {
			_this.element.JSUIElement = _this;
		}

		_this.construct(['structure', 'style', 'relationships']);
		return _this;
	}

	//methods


	createClass(Element, [{
		key: 'add',
		value: function add(item) {
			var type = handler$1(item);
			var action = Add[type];
			return (action || get(Element.prototype.__proto__ || Object.getPrototypeOf(Element.prototype), 'add', this) || unhandled).call(this, item);
		}
	}, {
		key: 'addTo',
		value: function addTo(item) {
			var type = handler$1(item);
			var action = AddTo[type];
			return (action || unhandled).call(this, item);
		}
	}, {
		key: 'attribute',
		value: function attribute(name, value) {
			if (!isDOM(this.element) || isEmptyString(name)) {
				return;
			}
			var type = handler$1(name);
			var isSet = arguments.length > 1;
			var action = Attribute[isSet ? 'Set' : 'Get'][type];
			return (action || unhandled).apply(this, [name, value]);
		}
	}, {
		key: 'children',
		value: function children() {
			var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
				return true;
			};

			var results = [];
			if (this[symbol] && this[symbol].children) {
				var children = this[symbol].children;
				Object.keys(children).forEach(function (id) {
					var child = children[id];
					if (child) {
						if (callback(child, id)) {
							results.push(child);
						}
					}
				});
			}
			return results;
		}
	}, {
		key: 'class',
		value: function _class(name) {
			var type = handler$1(name);
			var action = Class$2[type];
			return (action || unhandled).call(this, name);
		}
	}, {
		key: 'destructor',
		value: function destructor() {
			var _element = this.element;
			var _private = this[symbol];
			if (_element) {
				var parent = _element.parentNode;
				if (isFunction$1(_element.remove)) {
					_element.remove();
				} else if (parent && isFunction$1(parent.removeChild)) {
					parent.removeChild(_element);
				}
			}
			var _style = this.style;
			if (_style && _style.Host) {
				delete _style.Host;
			}
			var _parent = _private.parent;
			if (_parent) {
				if (_private && _private.mapped) {
					var map = _private.mapped[_parent.uid];
					if (isArray(map)) {
						map.forEach(function (name) {
							delete _parent[name];
						});
					}
				}
				var _$parent = _parent[symbol];
				if (_$parent && _$parent.children) {
					delete _$parent.children[this.uid];
				}
			}
			var _children = _private.children;
			if (_children) {
				Object.keys(_children).forEach(function (key) {
					var child = _children[key];
					if (!child) {
						return;
					}
					if (isFunction$1(child.remove)) {
						child.remove();
					}
					delete _children[key];
				});
			}

			//ensure GC picks em' up
			_element = null;
			_private = null;
			_parent = null;
			_children = null;
			return get(Element.prototype.__proto__ || Object.getPrototypeOf(Element.prototype), 'destructor', this).call(this);
		}
	}, {
		key: 'do',
		value: function _do(method, args) {
			var type = handler$1(method);
			var action = Do[type];
			return (action || unhandled).call(this, method, args);
		}
	}, {
		key: 'find',
		value: function find(what) {
			var type = handler$1(what);
			var action = Find[type];
			return (action || unhandled([])).call(this, what);
		}
	}, {
		key: 'get',
		value: function get$$1(property) {
			var type = handler$1(property);
			var action = Get[type];
			return (action || unhandled).call(this, property);
		}
	}, {
		key: 'on',
		value: function on() {
			return this[symbol$24].apply(this, arguments);
		}
	}, {
		key: 'remove',
		value: function remove(item) {
			var type = handler$1(item);
			var action = Remove[type];
			return (action || unhandled).call(this, item);
		}
	}, {
		key: 'set',
		value: function set$$1(property, value) {
			var type = handler$1(property);
			var action = Set[type];
			return (action || unhandled).call(this, property, value);
		}
	}, {
		key: 'text',
		value: function text(_text) {
			var type = handler$1(_text);
			var action = Text[type];
			return (action || unhandled).call(this, _text);
		}
	}, {
		key: 'trigger',
		value: function trigger() {
			return this[symbol$23].apply(this, arguments);
		}
	}, {
		key: symbol$24,
		value: function value(event, method) {
			var type = handler$1(event);
			var action = On[type];
			return (action || unhandled).call(this, event, method);
		}
	}, {
		key: symbol$23,
		value: function value(event, args) {
			var type = handler$1(event);
			var action = Trigger[type];
			return (action || unhandled).call(this, event, args);
		}

		//properties

	}, {
		key: 'construct_structure',


		//auto-run
		value: function construct_structure() {}
	}, {
		key: 'construct_style',
		value: function construct_style() {}
	}, {
		key: 'construct_relationships',
		value: function construct_relationships() {}

		//pre-defined events

	}, {
		key: 'onStyleContextChanged',
		value: function onStyleContextChanged() {
			//if not default, change the context of the child elements
			var context = this.Style.context;
			this.children(function (child) {
				//allow context to only change once
				var childStyle = child.Style;
				childStyle.context = childStyle.context === 'default' ? context : childStyle.context;
			});
		}
	}, {
		key: 'identity',
		get: function get$$1() {
			return get(Element.prototype.__proto__ || Object.getPrototypeOf(Element.prototype), 'identity', this);
		},
		set: function set$$1(identity) {
			set(Element.prototype.__proto__ || Object.getPrototypeOf(Element.prototype), 'identity', identity, this);
			if (identity.namespace) {
				addClass(this.element, identity.namespace);
			}
			// else {} throw error here later
			if (identity.class) {
				addClass(this.element, identity.class);
			}
			// else {} also throw one here later
		}
	}]);
	return Element;
}(Styleable);

exports$1(Element$1).as('JSUI/Source/1.0.0/Classes/Core/Element');

//Classes
//Utilities
function isElement(u) {
	return u instanceof Element$1;
}

exports$1(isElement).as('JSUI/Source/1.0.0/TypeChecks/isElement');

//Classes
//Utilities
var identity$13 = new Identity({
	class: 'Nav',
	major: 1, minor: 0, patch: 0
});

var Nav = function (_Element) {
	inherits(Nav, _Element);

	function Nav() {
		classCallCheck(this, Nav);

		var _this = possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).call(this, 'nav'));

		_this.identity = identity$13;
		return _this;
	}

	return Nav;
}(Element$1);

exports$1(Nav).as('JSUI/Source/1.0.0/Classes/Elements/Nav');

//Classes
//Constants
//Mixins
//TypeChecks
//Utilities
var Data = function (_Class$implements) {
	inherits(Data, _Class$implements);

	function Data(values) {
		classCallCheck(this, Data);

		var _this = possibleConstructorReturn(this, (Data.__proto__ || Object.getPrototypeOf(Data)).call(this));

		var defaults$$1 = _this.constructor.defaults;
		defaults$$1 = isObject(defaults$$1) ? defaults$$1 : {};
		if (isObject(values)) {
			defaults$$1 = extend(defaults$$1).with(values);
		}
		_this[symbol].state = defaults$$1;
		return _this;
	}

	//default values


	createClass(Data, null, [{
		key: 'defaults',
		get: function get$$1() {
			return {};
		}
	}]);
	return Data;
}(Class.implements(Privatelike, Stateful$2, Serializable, Eventful$2, Extensible$2));

exports$1(Data).as('JSUI/Source/1.0.0/Classes/Core/Data');

//Classes
//Utilities
var NavigationItem = function (_Data) {
	inherits(NavigationItem, _Data);

	function NavigationItem() {
		classCallCheck(this, NavigationItem);
		return possibleConstructorReturn(this, (NavigationItem.__proto__ || Object.getPrototypeOf(NavigationItem)).apply(this, arguments));
	}

	createClass(NavigationItem, [{
		key: 'Application',


		//properties
		get: function get$$1() {
			return Data.state(this, 'Application');
		},
		set: function set$$1(value) {
			return Data.state(this, 'Application', value);
		}
	}, {
		key: 'description',
		get: function get$$1() {
			return Data.state(this, 'description');
		},
		set: function set$$1(text) {
			return Data.state(this, 'description', text);
		}
	}, {
		key: 'Endpoint',
		get: function get$$1() {
			return Data.state(this, 'Endpoint');
		},
		set: function set$$1(value) {
			return Data.state(this, 'Endpoint', value);
		}
	}, {
		key: 'Feature',
		get: function get$$1() {
			return Data.state(this, 'Feature');
		},
		set: function set$$1(value) {
			return Data.state(this, 'Feature', value);
		}
	}, {
		key: 'hashpath',
		get: function get$$1() {
			return Data.state(this, 'hashpath');
		},
		set: function set$$1(value) {
			return Data.state(this, 'hashpath', value);
		}
	}, {
		key: 'icon',
		get: function get$$1() {
			return Data.state(this, 'icon');
		},
		set: function set$$1(value) {
			return Data.state(this, 'icon', value);
		}
	}, {
		key: 'Page',
		get: function get$$1() {
			return Data.state(this, 'Page');
		},
		set: function set$$1(value) {
			return Data.state(this, 'Page', value);
		}
	}, {
		key: 'path',
		get: function get$$1() {
			return Data.state(this, 'path');
		},
		set: function set$$1(value) {
			return Data.state(this, 'path', value);
		}
	}, {
		key: 'Role',
		get: function get$$1() {
			return Data.state(this, 'Role');
		},
		set: function set$$1(value) {
			return Data.state(this, 'Role', value);
		}
	}, {
		key: 'shortpath',
		get: function get$$1() {
			return Data.state(this, 'shortpath');
		},
		set: function set$$1(value) {
			return Data.state(this, 'shortpath', value);
		}
	}, {
		key: 'title',
		get: function get$$1() {
			return Data.state(this, 'title');
		},
		set: function set$$1(text) {
			return Data.state(this, 'title', text);
		}
	}, {
		key: 'url',
		get: function get$$1() {
			return Data.state(this, 'url');
		},
		set: function set$$1(value) {
			return Data.state(this, 'url', value);
		}

		//defaults

	}], [{
		key: 'defaults',
		get: function get$$1() {
			return {
				title: false,
				icon: false,
				description: false,
				path: false,
				shortpath: false,
				hashpath: false,
				url: false
			};
		}
	}]);
	return NavigationItem;
}(Data);

exports$1(NavigationItem).as('JSUI/Source/1.0.0/DataTypes/NavigationItem');

//Classes
//Utilities
function isData(u) {
	return u instanceof Data;
}

exports$1(isData).as('JSUI/Source/1.0.0/TypeChecks/isData');

//Utilities
var symbol$25 = symbolish('Mixins.JSUIFunction.isStatic');
exports$1(symbol$25).as('JSUI/Source/1.0.0/Constants/Keys/TypeChecks/JSUIFunction/isStatic');

//Utilities
function isBoolean(u) {
	return typeof u === 'boolean';
}

exports$1(isBoolean).as('JSUI/Source/1.0.0/TypeChecks/isBoolean');

//TypeChecks
//Utilities
function throttle(fn, time) {
	var nextCall = 0;
	if (isFunction$1(fn)) {
		return function () {
			var now = new Date().getTime();
			if (nextCall <= now) {
				nextCall = now + time;
				fn.apply(null, arguments);
			}
		};
	}
}

exports$1(throttle).as('JSUI/Source/1.0.0/Utilities/Functions/throttle');

//Classes
//Constants
//Mixins
//TypeChecks
//Utilities
var JSUIFunction$1 = function (_Class$implements) {
	inherits(JSUIFunction, _Class$implements);

	function JSUIFunction(original) {
		classCallCheck(this, JSUIFunction);

		var _this = possibleConstructorReturn(this, (JSUIFunction.__proto__ || Object.getPrototypeOf(JSUIFunction)).call(this));

		original = isFunction$1(original) ? original : function () {};

		_this[symbol] = {
			uid: uid(),
			original: original,
			debounce: false,
			throttle: false,
			modified: original,
			context: undefined,
			count: 0,
			limit: Infinity
		};
		return _this;
	}

	//methods


	createClass(JSUIFunction, [{
		key: 'apply',
		value: function apply() {
			if (!this.executable) {
				return;
			}
			this[symbol].count++;
			return Function.prototype.apply.apply(this.modified, arguments);
		}
	}, {
		key: 'call',
		value: function call() {
			if (!this.executable) {
				return;
			}
			this[symbol].count++;
			return Function.prototype.call.apply(this.modified, arguments);
		}
	}, {
		key: 'debounce',
		value: function debounce$$1(time) {
			time = isNumber(time) ? time : false;
			this[symbol].debounce = time;
			this.modify();
			return this;
		}
	}, {
		key: 'execute',
		value: function execute() {
			if (!this.executable) {
				return;
			}
			this[symbol].count++;
			return this.modified.apply(null, arguments);
		}
	}, {
		key: 'modify',
		value: function modify() {
			var modified = this.original;
			var dbcTime = this[symbol].debounce;
			var trlTime = this[symbol].throttle;
			modified = isBoolean(dbcTime) ? modified : debounce(modified, dbcTime);
			modified = isBoolean(trlTime) ? modified : throttle(modified, trlTime);
			modified = isUndefined$1(this.context) ? modified : modified.bind(this.context);
			this[symbol].modified = modified;
			return modified;
		}
	}, {
		key: 'throttle',
		value: function throttle$$1(time) {
			time = isNumber(time) ? time : false;
			this[symbol].throttle = time;
			this.modify();
			return this;
		}

		//properties

	}, {
		key: 'context',
		get: function get$$1() {
			return this[symbol].context;
		},
		set: function set$$1(v) {
			this[symbol].context = v;
			this.modify();
		}
	}, {
		key: 'count',
		get: function get$$1() {
			return this[symbol].count;
		}
	}, {
		key: 'executable',
		get: function get$$1() {
			return !this.isAtLimit && this.enabled;
		}
	}, {
		key: 'isAtLimit',
		get: function get$$1() {
			return this[symbol].count >= this[symbol].limit;
		},
		set: function set$$1(v) {
			this[symbol].count = v ? this[symbol].limit : 0;
		}
	}, {
		key: 'limit',
		get: function get$$1() {
			return this[symbol].limit;
		},
		set: function set$$1(v) {
			v = isNumber(v) ? v : Infinity;
			this[symbol].limit = v;
		}
	}, {
		key: 'modified',
		get: function get$$1() {
			return this[symbol].modified;
		}
	}, {
		key: 'original',
		get: function get$$1() {
			return this[symbol].original;
		},
		set: function set$$1(v) {
			this[symbol].original = v;
			this.modify();
		}
	}, {
		key: 'uid',
		get: function get$$1() {
			return this[symbol].uid;
		},
		set: function set$$1(id) {
			this[symbol].uid = id;
		}
	}, {
		key: symbol$9,
		get: function get$$1() {
			return true;
		}
	}], [{
		key: symbol$25,
		get: function get$$1() {
			return true;
		}
	}]);
	return JSUIFunction;
}(Class.implements(Privatelike, Stateful$2, Eventful$2, Enableable));

exports$1(JSUIFunction$1).as('JSUI/Source/1.0.0/Classes/Core/Function');

//Classes
//Mixins
//Utilities
var Endpoint = function (_JSUIFunction$impleme) {
	inherits(Endpoint, _JSUIFunction$impleme);

	function Endpoint() {
		classCallCheck(this, Endpoint);

		var _this = possibleConstructorReturn(this, (Endpoint.__proto__ || Object.getPrototypeOf(Endpoint)).call(this));

		_this.isRouteEndpoint = true;
		_this.original = _this.function;
		return _this;
	}

	//methods


	createClass(Endpoint, [{
		key: 'function',
		value: function _function(context) {/* endpoint code goes here */}
	}, {
		key: 'onRouteCompleted',
		value: function onRouteCompleted(context) {
			this.execute(context);
		}
	}]);
	return Endpoint;
}(JSUIFunction$1.implements(Routable));

exports$1(JSUIFunction$1).as('JSUI/Source/1.0.0/Classes/Core/JSUIFunction');

//Classes
//Utilities
function isUEndpoint(u) {
	return isUStyleSheetRule(u, Endpoint);
}

exports$1(isUEndpoint).as('JSUI/Source/1.0.0/TypeChecks/isUEndpoint');

//DataTypes
//Handlers
//Singletons
//TypeChecks
//Utilities
function map(routable) {
	var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	var items = arguments[2];
	var history = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	if (!isRoutable(routable) && !isURoutable(routable)) {
		return false;
	}
	if (isRoutable(routable)) {
		routable = routable.constructor;
	}
	if (!isArray(routable.subroutes)) {
		return;
	}
	prefix = !items ? routable.route : prefix;
	items = items || [];
	history = Object.create(history);
	var type = getIdentifiedType(routable);
	history[type] = routable.placard;

	routable.subroutes.forEach(function (subroute) {
		if (!isURoutable(subroute)) {
			return;
		}
		var route = subroute.route;
		var path = prefix + '/' + route;
		if (isUEndpoint(subroute)) {
			var placard = subroute.placard;
			history.Endpoint = extend({}).with(placard);
			if (!isObject(placard) && !isData(placard)) {
				placard = {};
			}
			var hashpath = '#!/' + path;
			var shortpath = router.shortcutOf(hashpath);
			extend(placard).with({
				//paths
				hashpath: hashpath,
				path: path,
				shortpath: shortpath,
				url: '#!' + shortpath,
				//history
				Application: history.Application,
				Endpoint: history.Endpoint,
				Feature: history.Feature,
				Page: history.Page,
				Role: history.Role
			});
			items.push(new NavigationItem(placard));
			return;
		}
		map(subroute, path, items, history);
	});
	return items;
}

exports$1(map).as('JSUI/Source/1.0.0/Utilities/Navigation/map');

//Classes
//TypeChecks
//Utilities
var identity$12 = new Identity({
	class: 'Navigation',
	major: 1, minor: 0, patch: 0
});

var Navigation = function (_Nav) {
	inherits(Navigation, _Nav);

	function Navigation() {
		classCallCheck(this, Navigation);

		var _this = possibleConstructorReturn(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).call(this));

		_this.identity = identity$12;
		_this.Style.context = 'navigation';
		return _this;
	}

	//methods


	createClass(Navigation, [{
		key: 'map',
		value: function map$$1(routable) {
			if (!isRoutable(routable) && !isRoutable(routable)) {
				return false;
			}
			var items = map(routable);
			if (!this.willAddItemsAfterMap) {
				return items;
			}
			this.add(items);
		}

		//properties

	}, {
		key: 'willAddItemsAfterMap',
		get: function get$$1() {
			return this.state('willAddItemsAfterMap');
		},
		set: function set$$1(bool) {
			this.state('willAddItemsAfterMap', !!bool);
		}
	}], [{
		key: 'willAddItemsAfterMap',
		get: function get$$1() {
			return true;
		}
	}]);
	return Navigation;
}(Nav);

exports$1(Navigation).as('JSUI/Source/1.0.0/Classes/Core/Navigation');

//Classes
//Utilities
function isNavigation(u) {
	return u instanceof Navigation;
}

exports$1(isNavigation).as('JSUI/Source/1.0.0/TypeChecks/isNavigation');

//Classes
//Utilities
var identity$15 = new Identity({
	class: 'Main',
	major: 1, minor: 0, patch: 0
});

var Main = function (_Element) {
	inherits(Main, _Element);

	function Main() {
		classCallCheck(this, Main);

		var _this = possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, 'main'));

		_this.identity = identity$15;
		return _this;
	}

	return Main;
}(Element$1);

exports$1(Main).as('JSUI/Source/1.0.0/Classes/Elements/Main');

//Classes
//Utilities
function isApplication(u) {
	return u instanceof Application;
}

exports$1(isApplication).as('JSUI/Source/1.0.0/TypeChecks/isApplication');

//Classes
//Mixins
//TypeChecks
//Utilities
var identity$14 = new Identity({
	class: 'Page',
	major: 1, minor: 0, patch: 0
});

var Page = function (_Main$implements) {
	inherits(Page, _Main$implements);

	function Page() {
		classCallCheck(this, Page);

		var _this = possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this));

		_this.identity = identity$14;
		_this.Style.context = 'page';
		return _this;
	}

	//pre-defined events


	createClass(Page, [{
		key: 'onRouteTraversed',
		value: function onRouteTraversed(context) {
			if (context) {
				var Application = context.Application;
				if (isApplication(Application)) {
					Application.Page = this;
				}
			}
		}
	}]);
	return Page;
}(Main.implements(Routable));

exports$1(Page).as('JSUI/Source/1.0.0/Classes/Core/Page');

//Classes
//Utilities
function isPage(u) {
	return u instanceof Page;
}

exports$1(isPage).as('JSUI/Source/1.0.0/TypeChecks/isPage');

//Classes
//Utilities
function isRouter(u) {
	return u instanceof Router$1;
}

exports$1(isRouter).as('JSUI/Source/1.0.0/TypeChecks/isRouter');

//Classes
//Utilities
function isUNavigation(u) {
	return isUStyleSheetRule(u, Navigation);
}

exports$1(isUNavigation).as('JSUI/Source/1.0.0/TypeChecks/isUNavigation');

//Classes
//Utilities
function isUPage(u) {
	return isUStyleSheetRule(u, Page);
}

exports$1(isUPage).as('JSUI/Source/1.0.0/TypeChecks/isUPage');

//Classes
//Constants
//Mixins
//Singletons
//TypeChecks
//Utilities
var identity$1 = new Identity({
	class: 'Application',
	major: 1, minor: 0, patch: 0
});

var Application = function (_Distinct$implements) {
	inherits(Application, _Distinct$implements);

	function Application() {
		classCallCheck(this, Application);

		var _this = possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).call(this, 'div'));

		_this.identity = identity$1;
		_this[symbol].routes = {};

		//get default values
		var defaults$$1 = _this.constructor;
		var DefaultNavigation = defaults$$1.Navigation;
		var DefaultPage = defaults$$1.Page;
		var DefaultRouter = defaults$$1.Router;

		//set instance defaults
		_this.willAutoMapRoutes = defaults$$1.willAutoMapRoutes;
		_this.Navigation = isUNavigation(DefaultNavigation) ? new DefaultNavigation() : false;
		_this.Page = isUPage(DefaultPage) ? new DefaultPage() : false;
		_this.Router = isRouter(DefaultRouter) ? DefaultRouter : router;
		return _this;
	}

	//properties


	createClass(Application, [{
		key: 'Navigation',
		get: function get$$1() {
			return this.state('Navigation');
		},
		set: function set$$1(navigation) {
			if (!isNavigation(navigation)) {
				return;
			}

			var previous = this.state('Navigation');
			if (this.state('Navigation', navigation)) {

				if (isNavigation(previous)) {
					previous.remove();
				}

				navigation.addTo(this.Root);
				if (!this.willAutoMapRoutes) {
					return;
				}

				navigation.map(this);
			}
		}
	}, {
		key: 'Page',
		get: function get$$1() {
			return this.state('Page');
		},
		set: function set$$1(page) {
			if (!isPage(page)) {
				return;
			}

			var previous = this.state('Page');
			if (this.state('Page', page)) {
				if (isPage(previous)) {
					previous.remove();
				}
				page.addTo(this.Root);
			}
		}
	}, {
		key: 'Root',
		get: function get$$1() {
			var root = this.state('Root') || Application.Root;
			return root;
		},
		set: function set$$1(HTMLElement) {

			var element = false;
			if (isDOM(HTMLElement)) {
				element = HTMLElement;
			}

			if (isElement(HTMLElement)) {
				element = HTMLElement.element;
			}

			if (!element) {
				return;
			}
			this.state('Root', element);
		}
	}, {
		key: 'Router',
		get: function get$$1() {
			return this.state('Router');
		},
		set: function set$$1(router$$1) {
			if (!isRouter(router$$1)) {
				return;
			}

			var previous = this.state('Router');
			if (this.state('Router', router$$1)) {
				if (isRouter(previous)) {
					previous.remove(this);
				}
				router$$1.add(this);
			}
		}
	}, {
		key: 'willAutoMapRoutes',
		get: function get$$1() {
			return this.state('willAutoMapRoutes');
		},
		set: function set$$1(bool) {
			this.state('willAutoMapRoutes', !!bool);
		}

		//default values

	}], [{
		key: 'Navigation',
		get: function get$$1() {
			return false;
		}
	}, {
		key: 'Root',
		get: function get$$1() {
			return document.body;
		}
	}, {
		key: 'Router',
		get: function get$$1() {
			return router;
		}
	}, {
		key: 'Page',
		get: function get$$1() {
			return false;
		}
	}, {
		key: 'willAutoMapRoutes',
		get: function get$$1() {
			return true;
		}
	}]);
	return Application;
}(Distinct.implements(Routable));

exports$1(Application).as('JSUI/Source/1.0.0/Classes/Core/Application');

//Classes
//Utilities
var identity$17 = new Identity({
	class: 'Img',
	major: 1, minor: 0, patch: 0
});

var Img = function (_Element) {
	inherits(Img, _Element);

	function Img() {
		classCallCheck(this, Img);

		var _this = possibleConstructorReturn(this, (Img.__proto__ || Object.getPrototypeOf(Img)).call(this, 'img'));

		_this.identity = identity$17;
		return _this;
	}

	return Img;
}(Element$1);

exports$1(Img).as('JSUI/Source/1.0.0/Classes/Elements/Img');

//Classes
//Utilities
var identity$19 = new Identity({
	class: 'Div',
	major: 1, minor: 0, patch: 0
});

var Div = function (_Element) {
	inherits(Div, _Element);

	function Div() {
		classCallCheck(this, Div);

		var _this = possibleConstructorReturn(this, (Div.__proto__ || Object.getPrototypeOf(Div)).call(this, 'div'));

		_this.identity = identity$19;
		return _this;
	}

	return Div;
}(Element$1);

exports$1(Div).as('JSUI/Source/1.0.0/Classes/Elements/Div');

const ENV = {
				dev: true,
				prod: false,
				version: '1.0.0',
				profile: 'default',
			};

//Constants
//Utilities
var settings$2 = {
	namespace: 'SansTypo',
	Development: ENV.dev,
	Production: ENV.prod
};

exports$1(settings$2).as('SansTypo/Source/1.0.0/Constants/settings');

//Classes
//Utilities
var framing = new StyleSheetRule('.SansTypo.Reader', {
	position: 'relative',
	padding: '50px',
	margin: 0,
	textAlign: 'justify',
	textAlignLast: 'center',
	fontSize: '4vmin',
	zIndex: 1
});

exports$1(framing).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Reader/Styles/framing');

//Classes
//Utilities
var theme = new StyleSheetRule('.SansTypo.Reader', {
	backgroundColor: 'white',
	fontFamily: '"Inconsolata", monospace',
	boxShadow: '0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 0, 0, 0.1)',
	color: '#646464',
	userSelect: 'none'
});

exports$1(theme).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Reader/Styles/theme');

//Classes
//Constants
//Styles
//Utilities
var identity$18 = new Identity({
	namespace: settings$2.namespace,
	class: 'Reader',
	major: 1, minor: 0, patch: 0
});

var Reader = function (_Div) {
	inherits(Reader, _Div);

	function Reader() {
		classCallCheck(this, Reader);

		var _this = possibleConstructorReturn(this, (Reader.__proto__ || Object.getPrototypeOf(Reader)).call(this));

		_this.identity = identity$18;
		return _this;
	}

	createClass(Reader, [{
		key: 'construct_style',
		value: function construct_style() {
			this.add(framing);
			this.add(theme);
		}
	}, {
		key: 'phrase',
		get: function get$$1() {
			return this.text();
		},
		set: function set$$1(value) {
			this.text(value);
			this.trigger('phraseChanged', value);
		}
	}]);
	return Reader;
}(Div);

exports$1(Reader).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Reader');

//Classes
//Utilities
var identity$21 = new Identity({
	class: 'Button',
	major: 1, minor: 0, patch: 0
});

var Button = function (_Element) {
	inherits(Button, _Element);

	function Button() {
		classCallCheck(this, Button);

		var _this = possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, 'button'));

		_this.identity = identity$21;
		return _this;
	}

	return Button;
}(Element$1);

exports$1(Button).as('JSUI/Source/1.0.0/Classes/Elements/Button');

//Classes
//Utilities
var selector = '.SansTypo.Stat';

var framing$2 = new StyleSheetRule(selector, {
	display: 'inline-block',
	boxSizing: 'border-box',
	width: '100%',
	margin: '10px 0',
	overflow: 'hidden'
});

var title = new StyleSheetRule(selector + ' .as-Title', {
	display: 'inline-block',
	padding: '5px',
	width: '100%',
	fontSize: '2vh'
});

var info = new StyleSheetRule(selector + ' .as-Info', {
	display: 'inline-block',
	padding: '5px',
	width: '100%',
	fontSize: '3vh'
});

var exported$2 = [framing$2, title, info];

exports$1(exported$2).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Stat/Styles/framing');

//Classes
//Utilities
var selector$1 = '.SansTypo.Stat';

var theme$2 = new StyleSheetRule(selector$1, {
	backgroundColor: 'white',
	color: '#646464',
	border: 'solid 1px #dcdcdc',
	borderRadius: '4px',
	userSelect: 'none'
});

var info$1 = new StyleSheetRule(selector$1 + ' .as-Title', {
	borderBottom: 'solid 1px #cccccc'
});

var theme$3 = [theme$2, info$1];

exports$1(theme$2).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Summary/Styles/theme');

//Classes
//Constants
//Styles
//Utilities
var identity$22 = new Identity({
	namespace: settings$2.namespace,
	class: 'Stat',
	major: 1, minor: 0, patch: 0
});

var Stat = function (_Div) {
	inherits(Stat, _Div);

	function Stat() {
		classCallCheck(this, Stat);

		var _this = possibleConstructorReturn(this, (Stat.__proto__ || Object.getPrototypeOf(Stat)).call(this));

		_this.identity = identity$22;
		return _this;
	}

	createClass(Stat, [{
		key: 'construct_structure',
		value: function construct_structure() {
			this.add(new Div()).as('Title');
			this.add(new Div()).as('Info');
		}
	}, {
		key: 'construct_style',
		value: function construct_style() {
			this.add(exported$2);
			this.add(theme$3);
		}
	}, {
		key: 'title',
		get: function get$$1() {
			return this.state('title');
		},
		set: function set$$1(value) {
			this.state('title', value);
			this.Title.text(value);
		}
	}, {
		key: 'info',
		get: function get$$1() {
			return this.state('info');
		},
		set: function set$$1(value) {
			this.state('info', value);
			this.Info.text(value);
		}
	}]);
	return Stat;
}(Div);

exports$1(Stat).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Stat');

//Classes
//Utilities
var selector$2 = '.SansTypo.Cover';

var framing$4 = new StyleSheetRule(selector$2, {
	position: 'absolute',
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	padding: '5%',
	margin: 0,
	textAlign: 'center',
	textAlignLast: 'center',
	fontSize: '3vh',
	zIndex: 1000
});

var nonInteractive = new StyleSheetRule(selector$2 + '.non-interactive', {
	display: 'none',
	pointerEvents: 'none'
});

var exported$3 = [framing$4, nonInteractive];

exports$1(exported$3).as('SansTypo/Source/1.0.0/Components/General/Cover/Styles/framing');

//Classes
//Utilities
var selector$3 = '.SansTypo.Cover';

var theme$4 = new StyleSheetRule(selector$3, {
	backgroundColor: 'white',
	color: '#646464',
	opacity: 0,
	userSelect: 'none'
});

exports$1(theme$4).as('SansTypo/Source/1.0.0/Components/General/Cover/Styles/theme');

//Classes
//Constants
//Styles
//Utilities
var identity$23 = new Identity({
	namespace: settings$2.namespace,
	class: 'Cover',
	major: 1, minor: 0, patch: 0
});

var IN = 'fadeIn';
var OUT = 'fadeOut';
var NONINTERACTIVE = 'non-interactive';
var Cover = function (_Div) {
	inherits(Cover, _Div);

	function Cover() {
		classCallCheck(this, Cover);

		var _this = possibleConstructorReturn(this, (Cover.__proto__ || Object.getPrototypeOf(Cover)).call(this));

		_this.identity = identity$23;
		return _this;
	}

	createClass(Cover, [{
		key: 'construct_structure',
		value: function construct_structure() {
			this.class('animated').add();
		}
	}, {
		key: 'construct_style',
		value: function construct_style() {
			this.add(exported$3);
			this.add(theme$4);
		}
	}, {
		key: 'construct_relationships',
		value: function construct_relationships() {
			var _this2 = this;

			this.fadeIn();

			this.on('animationend', function () {
				_this2.nonInteractive = _this2.class(OUT).exists();
			});
		}
	}, {
		key: 'fadeIn',
		value: function fadeIn() {
			this.nonInteractive = false;
			this.class(IN).add();
			this.class(OUT).remove();
		}
	}, {
		key: 'fadeOut',
		value: function fadeOut() {
			this.class(IN).remove();
			this.class(OUT).add();
		}
	}, {
		key: 'nonInteractive',
		get: function get$$1() {
			return this.state('nonInteractive');
		},
		set: function set$$1(value) {
			value = !!value;
			var changed = this.state('nonInteractive', value);
			if (!changed) {
				return;
			}

			var action = value ? 'add' : 'remove';
			this.class(NONINTERACTIVE)[action]();
		}
	}]);
	return Cover;
}(Div);

exports$1(Cover).as('SansTypo/Source/1.0.0/Components/General/Cover');

//Classes
//Utilities
var selector$4 = '.SansTypo.Summary';

var framing$6 = new StyleSheetRule(selector$4, {
	position: 'relative',
	boxSizing: 'border-box',
	padding: '10px',
	textAlign: 'justify',
	textAlignLast: 'center',
	fontSize: '20px',
	overflow: 'hidden'
});

var newRound = new StyleSheetRule(selector$4 + ' .Button.as-NewRound', {
	display: 'inline-block',
	width: '100%',
	padding: '5px',
	fontSize: '2vh',
	margin: '10px 0px'
});

var exported$4 = [framing$6, newRound];

exports$1(exported$4).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Summary/Styles/framing');

//Classes
//Utilities
var cover = new StyleSheetRule('.SansTypo.Summary .Cover.as-Instructions', {
	paddingTop: '18vh'
});

exports$1(cover).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Summary/Styles/cover');

//Classes
//Utilities
var selector$5 = '.SansTypo.Summary';

var theme$6 = new StyleSheetRule(selector$5, {
	backgroundColor: 'white',
	boxShadow: '0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 0, 0, 0.1)',
	zIndex: 2
});

var seconds = new StyleSheetRule(selector$5 + ' .Stat.as-TimeInSeconds .as-Title', {
	backgroundColor: '#f5f8fa'
});

var wpm = new StyleSheetRule(selector$5 + ' .Stat.as-WordsPerMinute .as-Title', {
	backgroundColor: '#f6faf5'
});

var keysPressed = new StyleSheetRule(selector$5 + ' .Stat.as-KeysPressed .as-Title', {
	backgroundColor: '#f5f5fa'
});

var errors = new StyleSheetRule(selector$5 + ' .Stat.as-Errors .as-Title', {
	backgroundColor: '#faf5f6'
});

var errorRate = new StyleSheetRule(selector$5 + ' .Stat.as-ErrorRate .as-Title', {
	backgroundColor: '#faf9f5'
});

var newRound$1 = new StyleSheetRule(selector$5 + ' .Button.as-NewRound', {
	backgroundColor: '#e8fbd5',
	borderRadius: '4px',
	color: '#646464',
	cursor: 'pointer',
	borderStyle: 'solid',
	outline: 'none'
});

var newRoundActive = new StyleSheetRule(selector$5 + ' .Button.as-NewRound:active', {
	backgroundColor: '#dbf9be'
});

var exported$5 = [theme$6, seconds, wpm, keysPressed, errors, errorRate, newRound$1, newRoundActive];

exports$1(exported$5).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Summary/Styles/theme');

//Classes
//Constants
//Components
//Styles
//TypeChecks
//Utilities
var identity$20 = new Identity({
	namespace: settings$2.namespace,
	class: 'Summary',
	major: 1, minor: 0, patch: 0
});

var MIN = 60;

var DEFAULTS = {
	TimeInSeconds: {
		title: 'Seconds',
		info: '0.0'
	},
	WordsPerMinute: {
		title: 'Words Per Minute',
		info: '0.0'
	},
	KeysPressed: {
		title: 'Keys Pressed',
		info: '0'
	},
	Errors: {
		title: 'Errors',
		info: '0'
	},
	ErrorRate: {
		title: 'Error Rate',
		info: '0.0%'
	}
};

var Summary = function (_Div) {
	inherits(Summary, _Div);

	function Summary() {
		classCallCheck(this, Summary);

		var _this = possibleConstructorReturn(this, (Summary.__proto__ || Object.getPrototypeOf(Summary)).call(this));

		_this.identity = identity$20;
		return _this;
	}

	createClass(Summary, [{
		key: 'construct_structure',
		value: function construct_structure() {
			this.add(new Stat()).as('TimeInSeconds').set(DEFAULTS.TimeInSeconds);

			this.add(new Stat()).as('WordsPerMinute').set(DEFAULTS.WordsPerMinute);

			this.add(new Stat()).as('KeysPressed').set(DEFAULTS.KeysPressed);

			this.add(new Stat()).as('Errors').set(DEFAULTS.Errors);

			this.add(new Stat()).as('ErrorRate').set(DEFAULTS.ErrorRate);

			this.add(new Cover()).as('Instructions').text('Start typing sample text to begin test');

			this.add(new Button()).as('NewRound').text('New Round');
		}
	}, {
		key: 'construct_style',
		value: function construct_style() {
			this.add(exported$4);
			this.add(exported$5);
			this.add(cover);
		}
	}, {
		key: 'construct_relationships',
		value: function construct_relationships() {
			var _this2 = this;

			var changes = ['elapsedSeconds', 'writtenWordCount', 'typedCount', 'errorCount', 'writtenCharCount', 'phrase'].map(function (s) {
				return s + 'Changed';
			});

			// recalculate on any change, throttled
			var calculate = new JSUIFunction$1(function () {
				_this2.calculate();
			}).throttle(5);
			this.on(changes, function () {
				calculate.execute();
			});

			// on typed count change, remove cover
			this.on('typedCountChanged', function () {
				_this2.Instructions.fadeOut();
			});

			// general cover changed event, this will also help set focus, as it only happens once the page is fully visible.
			// since there is no "on dom inserted" and page load is async, this event can be used to simulate that.
			this.Instructions.on('animationstart', function () {
				_this2.trigger('coverStatusChanged');
			});

			// forward the click as the intent for a new round
			this.NewRound.on('click', function () {
				_this2.trigger('newRoundRequested');
			});
		}
	}, {
		key: 'calculate',
		value: function calculate() {
			var writtenWordCount = this.writtenWordCount;
			var seconds = this.elapsedSeconds || 0;
			var errors = this.errorCount || 0;
			var charsTyped = this.typedCount || 0;
			var errorRate = charsTyped && errors ? (errors / charsTyped * 100).toFixed(2) : '0.00';

			var wordsPerMinute = (writtenWordCount && seconds ? writtenWordCount / seconds : 0) * MIN;
			this.TimeInSeconds.info = seconds.toFixed(1);
			this.WordsPerMinute.info = wordsPerMinute.toFixed(1);
			this.KeysPressed.info = charsTyped;
			this.Errors.info = errors;
			this.ErrorRate.info = errorRate + '%';
		}
	}, {
		key: 'reset',
		value: function reset() {
			var _this3 = this;

			this.Instructions.fadeIn();
			// reset the stats
			Object.keys(DEFAULTS).forEach(function (key) {
				_this3[key].set(DEFAULTS[key]);
			});
		}
	}, {
		key: 'phrase',
		get: function get$$1() {
			return this.state('phrase');
		},
		set: function set$$1(value) {
			if (!isString(value)) {
				return;
			}

			var changed = this.state('phrase', value);
			if (!changed) {
				return;
			}

			this.totalCharCount = value.length;
			this.totalWordCount = value.split('\s').length;
		}
	}, {
		key: 'elapsedSeconds',
		get: function get$$1() {
			return this.state('elapsedSeconds');
		},
		set: function set$$1(value) {
			this.state('elapsedSeconds', value);
		}
	}, {
		key: 'writtenWordCount',
		get: function get$$1() {
			return this.state('writtenWordCount');
		},
		set: function set$$1(value) {
			this.state('writtenWordCount', value);
		}
	}, {
		key: 'totalWordCount',
		get: function get$$1() {
			return this.state('totalWordCount');
		},
		set: function set$$1(value) {
			this.state('totalWordCount', value);
		}
	}, {
		key: 'writtenCharCount',
		get: function get$$1() {
			return this.state('writtenCharCount');
		},
		set: function set$$1(value) {
			this.state('writtenCharCount', value);
		}
	}, {
		key: 'totalCharCount',
		get: function get$$1() {
			return this.state('totalCharCount');
		},
		set: function set$$1(value) {
			this.state('totalCharCount', value);
		}
	}, {
		key: 'typedCount',
		get: function get$$1() {
			return this.state('typedCount');
		},
		set: function set$$1(value) {
			this.state('typedCount', value);
		}
	}, {
		key: 'errorCount',
		get: function get$$1() {
			return this.state('errorCount');
		},
		set: function set$$1(value) {
			this.state('errorCount', value);
		}
	}]);
	return Summary;
}(Div);

exports$1(Summary).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Summary');

//Classes
//Utilities
var identity$26 = new Identity({
	class: 'Span',
	major: 1, minor: 0, patch: 0
});

var Span = function (_Element) {
	inherits(Span, _Element);

	function Span() {
		classCallCheck(this, Span);

		var _this = possibleConstructorReturn(this, (Span.__proto__ || Object.getPrototypeOf(Span)).call(this, 'span'));

		_this.identity = identity$26;
		return _this;
	}

	return Span;
}(Element$1);

exports$1(Span).as('JSUI/Source/1.0.0/Classes/Elements/Span');

//Classes
//Utilities
var framing$8 = new StyleSheetRule('.SansTypo.Letter', {
	color: 'inherit',
	fontSize: 'inherit',
	fontFamily: 'inherit'
});

exports$1(framing$8).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Letter/Styles/theme');

//Classes
//Utilities
var selector$6 = '.SansTypo.Letter';
var incorrect = selector$6 + '.is-incorrect';

var theme$8 = new StyleSheetRule(incorrect, {
	backgroundColor: '#ffcccc',
	borderRadius: '0px'
});

var leftHighlight = new StyleSheetRule(selector$6 + ':not(.is-incorrect) + ' + incorrect, {
	borderBottomLeftRadius: '2px',
	borderTopLeftRadius: '2px'
});

var rightHighlight = new StyleSheetRule(incorrect + '.is-right-end', {
	borderBottomRightRadius: '2px',
	borderTopRightRadius: '2px'
});

var exported$6 = [theme$8, leftHighlight, rightHighlight];

exports$1(exported$6).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Letter/Styles/theme');

//Classes
//Constants
//Styles
//Utilities
var identity$25 = new Identity({
	namespace: settings$2.namespace,
	class: 'Letter',
	major: 1, minor: 0, patch: 0
});

var Letter = function (_Span) {
	inherits(Letter, _Span);

	function Letter(char) {
		classCallCheck(this, Letter);

		var _this = possibleConstructorReturn(this, (Letter.__proto__ || Object.getPrototypeOf(Letter)).call(this));

		_this.identity = identity$25;
		_this.text(char);
		return _this;
	}

	createClass(Letter, [{
		key: 'construct_style',
		value: function construct_style() {
			this.add(framing$8);
			this.add(exported$6);
		}
	}, {
		key: 'isIncorrect',
		get: function get$$1() {
			return this.state('isIncorrect');
		},
		set: function set$$1(value) {
			value = !!value;
			var hasChanged = this.state('isIncorrect', value);
			if (hasChanged) {
				var action = value ? 'add' : 'remove';
				this.class('is-incorrect')[action]();
			}
		}
	}, {
		key: 'isRightEnd',
		get: function get$$1() {
			return this.state('isRightEndling');
		},
		set: function set$$1(value) {
			value = !!value;
			var hasChanged = this.state('isRightEnd', value);
			if (hasChanged) {
				var action = value ? 'add' : 'remove';
				this.class('is-right-end')[action]();
			}
		}
	}]);
	return Letter;
}(Span);

exports$1(Letter).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Letter');

//Classes
//Utilities
var selector$7 = '.SansTypo.Writer';

var framing$10 = new StyleSheetRule(selector$7, {
	position: 'relative',
	padding: '50px',
	margin: 0,
	textAlign: 'justify',
	textAlignLast: 'center',
	fontSize: '4vmin',
	zIndex: 0
});

var empty = new StyleSheetRule(selector$7 + ':empty', {
	paddingLeft: "calc(50% - 100px)"
});

var exported$7 = [framing$10, empty];

exports$1(exported$7).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Writer/Styles/framing');

//Classes
//Utilities
var selector$8 = '.SansTypo.Writer';

var theme$10 = new StyleSheetRule(selector$8, {
	backgroundColor: 'white',
	fontFamily: '"Inconsolata", monospace',
	color: '#646464'
});

var noFocus = new StyleSheetRule(selector$8 + ':focus', {
	outline: 'none'
});

var exported$8 = [theme$10, noFocus];

exports$1(exported$8).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Writer/Styles/theme');

//Classes
//Constants
//Components
//Mixins
//Styles
//Utilities
var identity$24 = new Identity({
	namespace: settings$2.namespace,
	class: 'Writer',
	major: 1, minor: 0, patch: 0
});

var BACKSPACE = 8;
var DEL = 46;
var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;

var DELETE_KEYS = [BACKSPACE, DEL];
var CURSOR_KEYS = [LEFT, UP, RIGHT, DOWN];
var CHEAT_EVENTS = ['paste', 'drop'];

var Writer = function (_Div$implements) {
	inherits(Writer, _Div$implements);

	function Writer() {
		classCallCheck(this, Writer);

		var _this = possibleConstructorReturn(this, (Writer.__proto__ || Object.getPrototypeOf(Writer)).call(this));

		_this.identity = identity$24;
		return _this;
	}

	createClass(Writer, [{
		key: 'construct_structure',
		value: function construct_structure() {
			this.attribute('contentEditable', true);
		}
	}, {
		key: 'construct_style',
		value: function construct_style() {
			this.add(exported$7);
			this.add(exported$8);
		}
	}, {
		key: 'construct_relationships',
		value: function construct_relationships() {
			var _this2 = this;

			this.on('keypress', function (e) {
				if (!_this2.enabled) {
					return e.preventDefault();
				}

				// check typed vs errors
				var code = e.which || e.keyCode || e.charCode;
				var expected = _this2.getExpectedNext();
				_this2.typedCount++;
				if (expected !== code) {
					_this2.errorCount++;
				}
			});

			//allowDeletions & cursorMovement
			this.on('keydown', function (e) {
				if (!_this2.enabled) {
					return e.preventDefault();
				}

				//check for deletions & caret moves
				var code = e.which || e.keyCode || e.charCode;
				var deletionsAllowed = _this2.allowDeletions || !DELETE_KEYS.includes(code);
				var cursorMovingAllowed = _this2.allowCursorSet || !CURSOR_KEYS.includes(code);
				if (deletionsAllowed && cursorMovingAllowed) {
					return;
				}

				e.preventDefault();
			});

			//allow clicking for cursor position
			this.on(CHEAT_EVENTS, function (e) {
				_this2.trigger('cheating', e);
				if (_this2.allowCheating) {
					return;
				}

				e.preventDefault();
			});

			this.on('mouseover', function (e) {
				if (!_this2.enabled) {
					return;
				}

				_this2.element.focus();
				var position = _this2.text().length;
				_this2.setCursor(position);
			});
		}
	}, {
		key: 'setCursor',
		value: function setCursor(index) {
			var range = document.createRange();
			var selection = window.getSelection();
			var textNode = this.element.firstChild;
			if (!textNode) {
				return;
			}

			range.setStart(textNode, index);
			range.setEnd(textNode, index);
			range.collapse(true);
			selection.removeAllRanges();
			selection.addRange(range);
		}
	}, {
		key: 'reset',
		value: function reset() {
			this.children(this.remove);
			this.text('');
			this.typedCount = 0;
			this.errorCount = 0;
			this.enabled = true;
		}
		//override, contentEditable messes with things

	}, {
		key: 'text',
		value: function text(_text) {
			if (!arguments.length) {
				return this.element.textContent;
			}

			this.element.textContent = _text;
		}
	}, {
		key: 'getExpectedNext',
		value: function getExpectedNext() {
			var text = this.text();
			var phrase = this.phrase;
			if (text.length >= phrase.length) {
				return false;
			}
			return phrase.charCodeAt(text.length);
		}
	}, {
		key: 'grade',
		value: function grade() {
			var text = this.text();
			var phrase = this.phrase;
			var length = text.length;
			var graded = [];
			var lastLetter = {};
			for (var i = 0; i < length; i++) {
				var char = text.charAt(i);
				var letter = new Letter(char);
				var isCorrect = char === phrase.charAt(i);
				lastLetter.isRightEnd = isCorrect && lastLetter.isIncorrect;
				letter.isIncorrect = !isCorrect;
				letter.isRightEnd = !isCorrect && i === length - 1;
				lastLetter = letter;
				graded.push(letter);
			}
			this.children(this.remove);
			this.text('');
			this.add(graded);
		}
	}, {
		key: 'enabled',
		get: function get$$1() {
			return get(Writer.prototype.__proto__ || Object.getPrototypeOf(Writer.prototype), 'enabled', this);
		},
		set: function set$$1(value) {
			value = !!value;
			set(Writer.prototype.__proto__ || Object.getPrototypeOf(Writer.prototype), 'enabled', value, this);
			this.attribute('contentEditable', value);
		}
	}, {
		key: 'phrase',
		get: function get$$1() {
			return this.state('phrase');
		},
		set: function set$$1(value) {
			this.state('phrase', value);
		}
	}, {
		key: 'wordCount',
		get: function get$$1() {
			return this.words.length;
		}
	}, {
		key: 'words',
		get: function get$$1() {
			var text = this.text();
			if (!text || !text.length) {
				return [];
			}
			var words = text.split(' ');
			return words;
		}
	}, {
		key: 'characters',
		get: function get$$1() {
			var text = this.text();
			if (!text || !text.length) {
				return [];
			}
			var characters = text.split('');
			return characters;
		}
	}, {
		key: 'typedCount',
		get: function get$$1() {
			return this.state('typedCount');
		},
		set: function set$$1(value) {
			this.state('typedCount', value);
		}
	}, {
		key: 'errorCount',
		get: function get$$1() {
			return this.state('errorCount');
		},
		set: function set$$1(value) {
			this.state('errorCount', value);
		}
	}, {
		key: 'allowDeletions',
		get: function get$$1() {
			return this.state('allowDeletions');
		},
		set: function set$$1(value) {
			this.state('allowDeletions', !!value);
		}
	}, {
		key: 'allowCursorSet',
		get: function get$$1() {
			return this.state('allowCursorSet');
		},
		set: function set$$1(value) {
			this.state('allowCursorSet', !!value);
		}
	}, {
		key: 'allowCheating',
		get: function get$$1() {
			return this.state('allowCheating');
		},
		set: function set$$1(value) {
			this.state('allowCheating', !!value);
		}

		// defaults

	}], [{
		key: 'allowDeletions',
		get: function get$$1() {
			return true;
		}
	}, {
		key: 'allowCursorSet',
		get: function get$$1() {
			return false;
		}
	}, {
		key: 'allowCheating',
		get: function get$$1() {
			return false;
		}
	}, {
		key: 'typedCount',
		get: function get$$1() {
			return 0;
		}
	}, {
		key: 'errorCount',
		get: function get$$1() {
			return 0;
		}
	}]);
	return Writer;
}(Div.implements(Enableable));

exports$1(Writer).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Writer');

//Utilities
function now() {
	return new Date().getTime();
}

exports$1(now).as('SansTypo/Source/1.0.0/Utilities/now');

//Classes
//TypeChecks
//Utilities
var SEC$1 = 1000; //milliseconds per seconds

var SpeedGame = function (_Distinct) {
	inherits(SpeedGame, _Distinct);

	function SpeedGame() {
		classCallCheck(this, SpeedGame);
		return possibleConstructorReturn(this, (SpeedGame.__proto__ || Object.getPrototypeOf(SpeedGame)).apply(this, arguments));
	}

	createClass(SpeedGame, [{
		key: 'begin',
		value: function begin() {
			var _this2 = this;

			if (this.isInProgress || this.hasEnded) {
				return;
			}

			this.state('isInProgress', true);
			this.state('startTime', now());
			var timer = setInterval(function () {
				_this2.trigger('tick', _this2.elapsedTime);
			}, this.interval);
			this.timer = timer;
			this.trigger('begin');
		}
	}, {
		key: 'end',
		value: function end() {
			if (!this.isInProgress || this.hasEnded) {
				return;
			}

			clearInterval(this.timer);
			this.state('hasEnded', true);
			this.state('isInProgress', false);
			this.state('stopTime', now());
			this.trigger('end');
		}
	}, {
		key: 'reset',
		value: function reset() {
			var _this3 = this;

			clearInterval(this.timer);
			var defaults$$1 = SpeedGame.defaults;
			Object.keys(defaults$$1).forEach(function (key) {
				_this3.state(key, defaults$$1[key]);
			});
		}
	}, {
		key: 'elapsedTime',
		get: function get$$1() {
			var time = now();
			var stop = this.stopTime || time;
			var start = this.startTime || time;
			return stop - start || false;
		}
	}, {
		key: 'elapsedSeconds',
		get: function get$$1() {
			var elapsed = this.elapsedTime;
			return Number(isNumber(elapsed) ? (elapsed / SEC$1).toFixed(this.precision) : 0);
		}
	}, {
		key: 'precision',
		get: function get$$1() {
			return this.state('precision');
		},
		set: function set$$1(value) {
			this.state('precision', value);
		}
	}, {
		key: 'startTime',
		get: function get$$1() {
			return this.state('startTime');
		}
	}, {
		key: 'stopTime',
		get: function get$$1() {
			return this.state('stopTime');
		}
	}, {
		key: 'isInProgress',
		get: function get$$1() {
			return this.state('isInProgress');
		}
	}, {
		key: 'hasEnded',
		get: function get$$1() {
			return this.state('hasEnded');
		}
		//defaults

	}], [{
		key: 'defaults',
		get: function get$$1() {
			return {
				hasEnded: false,
				isInProgress: false,
				startTime: false,
				stopTime: false,
				elapsedTime: false,
				timer: false,
				interval: 100, //in milliseconds (0.1 seconds)
				precision: 1 //digits
			};
		}
	}]);
	return SpeedGame;
}(Distinct);

exports$1(SpeedGame).as('SansTypo/Source/1.0.0/Features/TypeSpeed/SpeedGame');

function getNewPhrase() {
	// set up to mock random latency
	return new Promise(function (resolve) {
		setTimeout(function () {
			resolve("this is a test quote");
		}, Math.random() * 200);
	});
}

//Classes
//Utilities
var framing$12 = new StyleSheetRule('.SansTypo.Page.Tester', {
	position: 'absolute',
	padding: 0,
	margin: 0,
	top: '45px',
	right: 0,
	bottom: 0,
	left: 0
});

exports$1(framing$12).as('SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/framing');

//Classes
//Utilities
var penalizer = new StyleSheetRule('.SansTypo.Page.Tester .Cover.as-Penalizer', {
	backgroundImage: 'url("Assets/Images/cheating.gif")',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center'
});

exports$1(penalizer).as('SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/theme');

var values = {
	Summary: {
		width: 200
	}
};

//Classes
//Utilities
//Styles
var reader = new StyleSheetRule('.SansTypo.Page.Tester .Reader', {
	position: 'absolute',
	top: 0,
	right: values.Summary.width + 'px',
	bottom: "50%",
	left: 0
});

exports$1(reader).as('SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/reader');

//Classes
//Utilities
//Styles
var summary = new StyleSheetRule('.SansTypo.Page.Tester .Summary', {
	position: 'absolute',
	margin: 0,
	top: 0,
	right: 0,
	bottom: 0,
	width: values.Summary.width + 'px'
});

exports$1(summary).as('SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/summary');

//Classes
//Utilities
//Styles
var writer = new StyleSheetRule('.SansTypo.Page.Tester .Writer', {
	position: 'absolute',
	top: "50%",
	right: values.Summary.width + 'px',
	bottom: 0,
	left: 0
});

exports$1(writer).as('SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/writer');

//Classes
//Utilities
var penalizer$1 = new StyleSheetRule('.SansTypo.Page.Tester .Cover.as-Penalizer', {
  backgroundImage: 'url("Assets/Images/cheating.gif")',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  lineHeight: 'calc(100vh + 300px)',
  padding: 0,
  textTransform: 'uppercase'
});

exports$1(penalizer$1).as('SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/penalizer');

//Classes
//Components
//Constants
//Features
//Server
//Styles
//Utilities
var SEC = 1000;

var identity$16 = new Identity({
	namespace: settings$2.namespace,
	class: 'Tester',
	major: 1, minor: 0, patch: 0
});

var Tester = function (_Page) {
	inherits(Tester, _Page);

	function Tester() {
		classCallCheck(this, Tester);

		var _this = possibleConstructorReturn(this, (Tester.__proto__ || Object.getPrototypeOf(Tester)).call(this));

		_this.identity = identity$16;
		return _this;
	}

	//builds the structural elements in the page


	createClass(Tester, [{
		key: 'construct_structure',
		value: function construct_structure() {
			this.add(new Reader()).as('Reader');
			this.add(new Summary()).as('Summary');
			this.add(new Writer()).as('Writer');
			this.add(new Cover()).as('Penalizer').text('Ah ah ah, no cheating');
		}
		//styles the elements built in the structural constructor

	}, {
		key: 'construct_style',
		value: function construct_style() {
			this.add([framing$12, penalizer, reader, summary, writer, penalizer$1]);
		}
		//assigns unique relationships to the structure

	}, {
		key: 'construct_relationships',
		value: function construct_relationships() {
			var _this2 = this;

			var game = new SpeedGame();
			this.Game = game;

			//on key pressed, begin the game
			var summary$$1 = this.Summary;
			var writer$$1 = this.Writer;
			var summarize = new JSUIFunction$1(function () {
				_this2.summarize();
			}).throttle(5);
			var penalizer$$1 = this.Penalizer;

			// set up cheating penalizer
			penalizer$$1.nonInteractive = true;
			penalizer$$1.fadeOut();
			penalizer$$1.on('click', function () {
				penalizer$$1.fadeOut();
			});

			writer$$1.on(['keypress', 'keyup', 'paste', 'drop'], function () {
				if (game.hasEnded) {
					return;
				}

				if (!game.isInProgress) {
					game.begin();
					return;
				}

				if (writer$$1.text().length === _this2.phrase.length) {
					game.end();
					return;
				}

				summarize.execute();
			});

			game.on('begin', function () {
				writer$$1.enabled = true;
				summarize.execute();
			});

			game.on('tick', function () {
				summarize.execute();
			});

			game.on('end', function () {
				writer$$1.enabled = false;
				writer$$1.grade();
				summarize.execute();
			});

			summary$$1.on('coverStatusChanged', function () {
				writer$$1.element.focus();
			});

			summary$$1.on('newRoundRequested', function () {
				_this2.newRound();
			});

			writer$$1.on('cheating', function () {
				var penalizer$$1 = _this2.Penalizer;
				penalizer$$1.fadeIn();
				var event = penalizer$$1.on('animationend', function () {
					setTimeout(function () {
						penalizer$$1.fadeOut();
					}, 5 * SEC);
					event.remove();
				});
			});

			this.newRound();
		}
	}, {
		key: 'newPhrase',
		value: function newPhrase() {
			var _this3 = this;

			getNewPhrase().then(function (phrase) {
				_this3.phrase = phrase;
			});
		}
	}, {
		key: 'newRound',
		value: function newRound() {
			this.reset();
			this.newPhrase();
		}
	}, {
		key: 'summarize',
		value: function summarize() {
			var summary$$1 = this.Summary;
			var writer$$1 = this.Writer;
			var game = this.Game;

			var written = writer$$1.text();
			summary$$1.set({
				elapsedSeconds: game.elapsedSeconds,
				writtenCharCount: written.length,
				writtenWordCount: writer$$1.wordCount,
				typedCount: writer$$1.typedCount,
				errorCount: writer$$1.errorCount
			});
		}
	}, {
		key: 'reset',
		value: function reset() {
			this.Game.reset();
			this.Summary.reset();
			this.Writer.reset();
		}
	}, {
		key: 'Game',
		get: function get$$1() {
			return this.state('Game');
		},
		set: function set$$1(value) {
			this.state('Game', value);
		}
	}, {
		key: 'phrase',
		get: function get$$1() {
			return this.state('phrase');
		},
		set: function set$$1(value) {
			this.Reader.phrase = value;
			this.Writer.phrase = value;
			this.Summary.set({
				phrase: value,
				totalCharCount: value.length,
				totalWordCount: value.split('\s').length
			});
			this.state('phrase', value);
		}

		// defaults

	}], [{
		key: 'route',
		get: function get$$1() {
			return 'Tester';
		}
	}]);
	return Tester;
}(Page);

exports$1(Tester).as('SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester');

//Classes
//Mixins
//Utilities
var identity$28 = new Identity({
	class: 'Role',
	major: 1, minor: 0, patch: 0
});

var Role = function (_Distinct$implements) {
	inherits(Role, _Distinct$implements);

	function Role() {
		classCallCheck(this, Role);

		var _this = possibleConstructorReturn(this, (Role.__proto__ || Object.getPrototypeOf(Role)).call(this));

		_this.identity = identity$28;
		return _this;
	}

	return Role;
}(Distinct.implements(Routable));

exports$1(Role).as('JSUI/Source/1.0.0/Classes/Core/Role');

//Classes
//Mixins
//Utilities
var identity$30 = new Identity({
	class: 'Feature',
	major: 1, minor: 0, patch: 0
});

var Feature = function (_Distinct$implements) {
	inherits(Feature, _Distinct$implements);

	function Feature() {
		classCallCheck(this, Feature);

		var _this = possibleConstructorReturn(this, (Feature.__proto__ || Object.getPrototypeOf(Feature)).call(this));

		_this.identity = identity$30;
		return _this;
	}

	return Feature;
}(Distinct.implements(Routable));

exports$1(Feature).as('JSUI/Source/1.0.0/Classes/Core/Feature');

//Classes
//Constants
//Pages
//Utilities
var identity$29 = new Identity({
	namespace: settings$2.namespace,
	class: 'TypeSpeed',
	major: 1, minor: 0, patch: 0
});

var TypeSpeed = function (_Feature) {
	inherits(TypeSpeed, _Feature);

	function TypeSpeed() {
		classCallCheck(this, TypeSpeed);

		var _this = possibleConstructorReturn(this, (TypeSpeed.__proto__ || Object.getPrototypeOf(TypeSpeed)).call(this));

		_this.identity = identity$29;
		_this.construct('pages');
		return _this;
	}

	// methods


	createClass(TypeSpeed, [{
		key: 'construct_pages',
		value: function construct_pages() {
			this.add([Tester]);
		}

		// defaults

	}], [{
		key: 'route',
		get: function get$$1() {
			return 'TypeSpeed';
		}
	}, {
		key: 'subroutes',
		get: function get$$1() {
			return [Tester];
		}
	}]);
	return TypeSpeed;
}(Feature);

exports$1(TypeSpeed).as('SansTypo/Source/1.0.0/Features/TypeSpeed');

//Classes
//Constants
//Features
//Utilities
var identity$27 = new Identity({
	namespace: settings$2.namespace,
	class: 'Guest',
	major: 1, minor: 0, patch: 0
});

var Guest = function (_Role) {
	inherits(Guest, _Role);

	function Guest() {
		classCallCheck(this, Guest);

		var _this = possibleConstructorReturn(this, (Guest.__proto__ || Object.getPrototypeOf(Guest)).call(this));

		_this.identity = identity$27;
		_this.construct('features');
		return _this;
	}

	// methods


	createClass(Guest, [{
		key: 'construct_features',
		value: function construct_features() {
			this.add([TypeSpeed]);
		}

		// defaults

	}], [{
		key: 'route',
		get: function get$$1() {
			return 'Guest';
		}
	}, {
		key: 'subroutes',
		get: function get$$1() {
			return [TypeSpeed];
		}
	}]);
	return Guest;
}(Role);

exports$1(Guest).as('SansTypo/Source/1.0.0/Roles/Guest');

//Classes
//Constants
//Roles
//Utilities
var identity = new Identity({
	namespace: settings$2.namespace,
	class: 'SansTypo',
	major: 1, minor: 0, patch: 0
});

var SansTypo = function (_Application) {
	inherits(SansTypo, _Application);

	function SansTypo() {
		classCallCheck(this, SansTypo);

		var _this = possibleConstructorReturn(this, (SansTypo.__proto__ || Object.getPrototypeOf(SansTypo)).call(this));

		_this.identity = identity;
		_this.construct('roles');
		return _this;
	}

	// methods


	createClass(SansTypo, [{
		key: 'construct_roles',
		value: function construct_roles() {
			this.add([Guest]);
		}

		// defaults

	}], [{
		key: 'route',
		get: function get$$1() {
			return 'SansTypo';
		}
	}, {
		key: 'subroutes',
		get: function get$$1() {
			return [Guest];
		}
	}, {
		key: 'Page',
		get: function get$$1() {
			return Tester;
		}
	}]);
	return SansTypo;
}(Application);

exports$1(SansTypo).as('SansTypo/Source/1.0.0/Applications/SansTypo');

//Classes
//Utilities
var selector$9 = '.SansTypo.AppTitle';

var framing$14 = new StyleSheetRule(selector$9, {
	position: 'absolute',
	top: 0,
	right: 0,
	left: 0,
	height: '45px',
	padding: 0,
	margin: 0,
	textAlign: 'center',
	fontSize: '37px',
	lineHeight: '41px'
});

exports$1(framing$14).as('SansTypo/Source/1.0.0/Components/General/AppTitle/Styles/framing');

//Classes
//Utilities
var selector$10 = '.SansTypo.AppTitle';

var theme$13 = new StyleSheetRule(selector$10, {
	backgroundColor: '#b5d6f3',
	color: '#5f9ea0',
	fontFamily: ' "Lobster", cursive'
});

exports$1(theme$13).as('SansTypo/Source/1.0.0/Components/General/AppTitle/Styles/theme');

//Classes
//Constants
//Styles
//Utilities
var identity$31 = new Identity({
	namespace: settings$2.namespace,
	class: 'AppTitle',
	major: 1, minor: 0, patch: 0
});

var AppTitle = function (_Navigation) {
	inherits(AppTitle, _Navigation);

	function AppTitle() {
		classCallCheck(this, AppTitle);

		var _this = possibleConstructorReturn(this, (AppTitle.__proto__ || Object.getPrototypeOf(AppTitle)).call(this));

		_this.identity = identity$31;
		return _this;
	}

	createClass(AppTitle, [{
		key: 'construct_structure',
		value: function construct_structure() {
			this.text('Sans Typo');
		}
	}, {
		key: 'construct_style',
		value: function construct_style() {
			this.add(framing$14);
			this.add(theme$13);
		}
	}]);
	return AppTitle;
}(Navigation);

exports$1(AppTitle).as('SansTypo/Source/1.0.0/Components/General/AppTitle');

//Applications
// navigation could auto add, but this isn't goint to navigate, so we'll leave it neutered
var Title = new AppTitle();
Title.addTo(document.body);

// applications auto add themselves
var App = new SansTypo();

return App;

})));
//# sourceMappingURL=SansTypo.js.map
