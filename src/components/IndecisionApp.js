import React from 'react';
import ReactDOM from 'react-dom';
import AddOption from './AddOption';
import Option from './Option';
import Options from './Options';
import Action from './Action';
import Header from './Header';

export default class IndecisionApp extends React.Component {
	state = {
		options: []
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
	pickOption = () => {
		let random = Math.floor(Math.random() * this.state.options.length);
		let option = this.state.options[random];
		alert(option);
	}
	deleteOptions = () => {
		this.setState(()=> ({options: []}));	
	}
	deleteOption =(optionToRemove) => {;
		this.setState((prevState) => ({
			options: prevState.options.filter((option) => optionToRemove !== option)
		}));
	}
	handleAddOptions = (option) => {
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