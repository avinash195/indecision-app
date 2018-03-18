class IndecisionApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			options: []
		};
		this.deleteOptions = this.deleteOptions.bind(this);
		this.pickOption = this.pickOption.bind(this);
		this.handleAddOptions = this.handleAddOptions.bind(this);
	}

	pickOption() {
		let random = Math.floor(Math.random() * this.state.options.length);
		let option = this.state.options[random];
		alert(option);
	}
	deleteOptions() {
		this.setState(()=> {
			return {
				options: []
			};
		});	
	}
	handleAddOptions(option) {
		if(!option) {
			return 'Enter a valid option!';
		} else if(this.state.options.indexOf(option) > -1) {
			return 'This option already exists';
		}

		this.setState((prevState) => {
			return {
				options: prevState.options.concat(option)
			};
		});
	}

	render() {
		const title = 'Indecision App';
		const subTitle = '!!Put your life in the hands of a computer';

		return (
			<div>
				<Header title={title} subTitle={subTitle} />
				<Action 
					hasOptions={this.state.options.length > 0}
					pickOption={this.pickOption}
				/>
				<Options 
					options={this.state.options}
					deleteOptions={this.deleteOptions}
				/>
				<AddOption handleAddOptions={this.handleAddOptions}/>
			</div>
		)
	}
}

class Header extends React.Component {
	render() {
		return (
			<div>
				<h1>{this.props.title}</h1>
				<h2>{this.props.subTitle}</h2>
			</div>
		)
	}
}

class Action extends React.Component {
	render() {
		return (
			<div>
				<button
					onClick={this.props.pickOption}
					disabled={!this.props.hasOptions}	
				>
					What should I do ?
				</button>
			</div>
		)
	}
}
class Options extends React.Component {
	render() {
		return (
			<div>
			<button onClick={this.props.deleteOptions}>Remove All</button>
			{this.props.options.map(option => <Option key={option} optionText={option} />)}
			</div>
		)
	}
}
class Option extends React.Component {
	render() {
		return (
			<div>
				{this.props.optionText}
			</div>
		)
	}
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
		this.setState(() => {
			return { error };
		});
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