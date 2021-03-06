import React from 'react';
import ReactDOM from 'react-dom';
import AddOption from './AddOption';
import Option from './Option';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
	state = {
		options: [],
		selectedOption: undefined
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
		this.setState({
			selectedOption: option
		})
	}
	clearSelectedOption = () => {
		this.setState(() => ({ selectedOption: undefined }))
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
				<div className="container">
						<Action 
						hasOptions={this.state.options.length > 0}
						pickOption={this.pickOption}
					/>
					<div className="widget">
						<Options 
							options={this.state.options}
							deleteOptions={this.deleteOptions}
							deleteOption={this.deleteOption}
						/>
						<AddOption
							handleAddOptions={this.handleAddOptions}
						/>
					</div>
					
				</div>
				<OptionModal
					selectedOption={this.state.selectedOption}
					clearSelectedOption={this.clearSelectedOption}	
				/>
			</div>
		)
	}
}