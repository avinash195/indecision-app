class IndecisionApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			options: []
		};
		this.deleteOptions = this.deleteOptions.bind(this);
		this.pickOption = this.pickOption.bind(this);
		this.handleAddOptions = this.handleAddOptions.bind(this);
		this.deleteOption = this.deleteOption.bind(this);
	}

	componentDidMount() {
		try {
			const json = localStorage.getItem('options');
			const options = JSON.parse(json);

			if(options) {
				this.setState(() => ({ options }));
			}
		} catch(e) {
			// Do nothing
		}
		
	}
	componentDidUpdate() {
		const json = JSON.stringify(this.state.options);
		localStorage.setItem('options', json);
	}
	pickOption() {
		let random = Math.floor(Math.random() * this.state.options.length);
		let option = this.state.options[random];
		alert(option);
	}
	deleteOptions() {
		this.setState(()=> ({options: []}));	
	}
	deleteOption(optionToRemove) {;
		this.setState((prevState) => ({
			options: prevState.options.filter((option) => optionToRemove !== option)
		}));
	}
	handleAddOptions(option) {
		if(!option) {
			return 'Enter a valid option!';
		} else if(this.state.options.indexOf(option) > -1) {
			return 'This option already exists';
		}

		this.setState((prevState) => ({options: prevState.options.concat(option) }));
	}

	render() {
		const subTitle = '!!Put your life in the hands of a computer';

		return (
			<div>
				<Header  subTitle={subTitle} />
				<Action 
					hasOptions={this.state.options.length > 0}
					pickOption={this.pickOption}
				/>
				<Options 
					options={this.state.options}
					deleteOptions={this.deleteOptions}
					deleteOption={this.deleteOption}
				/>
				<AddOption handleAddOptions={this.handleAddOptions}/>
			</div>
		)
	}
}
 
const Header = (props) => {
	return (
		<div>
			<h1>{props.title}</h1>
			{props.subTitle && <h2>{props.subTitle}</h2>}
		</div>
	)
}

Header.defaultProps = {
	title: 'Indecision'
}
const Action = (props) => {
	return (
		<div>
			<button
				onClick={props.pickOption}
				disabled={!props.hasOptions}	
			>
				What should I do ?
			</button>
		</div>
	)
}

const Options = (props) => {
	return (
		<div>
		<button onClick={props.deleteOptions}>Remove All</button>
		{ props.options.length === 0 && <p>Please enter some options to get started!</p>}
			{props.options.map(option => (
				<Option
				key={option}
				optionText={option}
				deleteOption={props.deleteOption}
			/>
			)
			)}
		</div>
	)
}

const Option = (props) => {
	return (
		<div>
			{props.optionText}
			<button onClick={(e) => props.deleteOption(props.optionText)}>Remove</button>
		</div>
	)
}
class AddOption extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: undefined
		}
		this.handleAddOptions = this.handleAddOptions.bind(this);
	}
	handleAddOptions(e) {
		e.preventDefault();
		const option = e.target.elements.option.value.trim();

		const error = this.props.handleAddOptions(option);
		this.setState(() => ({error}));

		if(!error) {
			e.target.elements.option.value = '';
		}
	}

	render() {
		return (
			<div>
				{ this.state.error && <p>{this.state.error}</p>}
				<form onSubmit={this.handleAddOptions} >
					<input type="text" name="option" />
					<button>Add Option</button>
				</form>
			</div>
		)
	}
}

ReactDOM.render( <IndecisionApp />, document.getElementById('app'));