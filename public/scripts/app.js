'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
	_inherits(IndecisionApp, _React$Component);

	function IndecisionApp(props) {
		_classCallCheck(this, IndecisionApp);

		var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

		_this.state = {
			options: []
		};
		_this.deleteOptions = _this.deleteOptions.bind(_this);
		_this.pickOption = _this.pickOption.bind(_this);
		_this.handleAddOptions = _this.handleAddOptions.bind(_this);
		_this.deleteOption = _this.deleteOption.bind(_this);
		return _this;
	}

	_createClass(IndecisionApp, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			try {
				var json = localStorage.getItem('options');
				var options = JSON.parse(json);

				if (options) {
					this.setState(function () {
						return { options: options };
					});
				}
			} catch (e) {
				// Do nothing
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var json = JSON.stringify(this.state.options);
			localStorage.setItem('options', json);
		}
	}, {
		key: 'pickOption',
		value: function pickOption() {
			var random = Math.floor(Math.random() * this.state.options.length);
			var option = this.state.options[random];
			alert(option);
		}
	}, {
		key: 'deleteOptions',
		value: function deleteOptions() {
			this.setState(function () {
				return { options: [] };
			});
		}
	}, {
		key: 'deleteOption',
		value: function deleteOption(optionToRemove) {
			;
			this.setState(function (prevState) {
				return {
					options: prevState.options.filter(function (option) {
						return optionToRemove !== option;
					})
				};
			});
		}
	}, {
		key: 'handleAddOptions',
		value: function handleAddOptions(option) {
			if (!option) {
				return 'Enter a valid option!';
			} else if (this.state.options.indexOf(option) > -1) {
				return 'This option already exists';
			}

			this.setState(function (prevState) {
				return { options: prevState.options.concat(option) };
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var subTitle = '!!Put your life in the hands of a computer';

			return React.createElement(
				'div',
				null,
				React.createElement(Header, { subTitle: subTitle }),
				React.createElement(Action, {
					hasOptions: this.state.options.length > 0,
					pickOption: this.pickOption
				}),
				React.createElement(Options, {
					options: this.state.options,
					deleteOptions: this.deleteOptions,
					deleteOption: this.deleteOption
				}),
				React.createElement(AddOption, { handleAddOptions: this.handleAddOptions })
			);
		}
	}]);

	return IndecisionApp;
}(React.Component);

var Header = function Header(props) {
	return React.createElement(
		'div',
		null,
		React.createElement(
			'h1',
			null,
			props.title
		),
		props.subTitle && React.createElement(
			'h2',
			null,
			props.subTitle
		)
	);
};

Header.defaultProps = {
	title: 'Indecision'
};
var Action = function Action(props) {
	return React.createElement(
		'div',
		null,
		React.createElement(
			'button',
			{
				onClick: props.pickOption,
				disabled: !props.hasOptions
			},
			'What should I do ?'
		)
	);
};

var Options = function Options(props) {
	return React.createElement(
		'div',
		null,
		React.createElement(
			'button',
			{ onClick: props.deleteOptions },
			'Remove All'
		),
		props.options.length === 0 && React.createElement(
			'p',
			null,
			'Please enter some options to get started!'
		),
		props.options.map(function (option) {
			return React.createElement(Option, {
				key: option,
				optionText: option,
				deleteOption: props.deleteOption
			});
		})
	);
};

var Option = function Option(props) {
	return React.createElement(
		'div',
		null,
		props.optionText,
		React.createElement(
			'button',
			{ onClick: function onClick(e) {
					return props.deleteOption(props.optionText);
				} },
			'Remove'
		)
	);
};

var AddOption = function (_React$Component2) {
	_inherits(AddOption, _React$Component2);

	function AddOption(props) {
		_classCallCheck(this, AddOption);

		var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

		_this2.state = {
			error: undefined
		};
		_this2.handleAddOptions = _this2.handleAddOptions.bind(_this2);
		return _this2;
	}

	_createClass(AddOption, [{
		key: 'handleAddOptions',
		value: function handleAddOptions(e) {
			e.preventDefault();
			var option = e.target.elements.option.value.trim();

			var error = this.props.handleAddOptions(option);
			this.setState(function () {
				return { error: error };
			});

			if (!error) {
				e.target.elements.option.value = '';
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				this.state.error && React.createElement(
					'p',
					null,
					this.state.error
				),
				React.createElement(
					'form',
					{ onSubmit: this.handleAddOptions },
					React.createElement('input', { type: 'text', name: 'option' }),
					React.createElement(
						'button',
						null,
						'Add Option'
					)
				)
			);
		}
	}]);

	return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
