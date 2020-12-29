import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
	static propTypes = {
		history: PropTypes.object,
	};

	myInput = React.createRef();

	goToStore = (event) => {
		// Stop the form from submitting
		event.preventDefault();
		// Get the text from that input
		// The first .current is a React thing that is always how you access the ref
		// .current contains the DOM element reference (the input element)
		// The second .value is from JavaScript to access the value of the input
		const storeName = this.myInput.current.value;
		// Change the page to /store/whatever-store-name
		this.props.history.push(`/store/${storeName}`); // This will push the new URL to STATE (push state)
	};

	render() {
		return (
			<>
				<form className="store-selector" onSubmit={this.goToStore}>
					<h2>Please Enter A Bakery Name</h2>
					<input
						type="text"
						ref={this.myInput}
						required
						placeholder="Store Name"
						defaultValue={getFunName()}
					/>
					<button type="submit">Go To Store</button>
				</form>
			</>
		);
	}
}

export default StorePicker;
