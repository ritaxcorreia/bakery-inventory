import React from "react";
import PropTypes from "prop-types";

class AddBakeryForm extends React.Component {
	nameRef = React.createRef();
	priceRef = React.createRef();
	statusRef = React.createRef();
	descriptionRef = React.createRef();
	imageRef = React.createRef();

	static propTypes = {
		addItem: PropTypes.func,
	};

	createItem = (event) => {
		event.preventDefault(); // stops the form from submitting
		const item = {
			name: this.nameRef.current.value,
			price: parseFloat(this.priceRef.current.value), // parses string into a float (cents)
			status: this.statusRef.current.value,
			description: this.descriptionRef.current.value,
			image: this.imageRef.current.value,
		};
		this.props.addItem(item);
		// reset the form (empties text fields)
		event.currentTarget.reset();
	};

	render() {
		return (
			<form className="item-edit" onSubmit={this.createItem}>
				<input
					name="name"
					ref={this.nameRef}
					type="text"
					placeholder="Name"
				/>
				<input
					name="price"
					ref={this.priceRef}
					type="text"
					placeholder="Price"
				/>
				<select name="status" ref={this.statusRef}>
					<option value="available">Available</option>
					<option value="unavailable">Sold Out</option>
				</select>
				<textarea
					name="description"
					ref={this.descriptionRef}
					placeholder="Description"
				/>
				<input
					name="image"
					type="text"
					ref={this.imageRef}
					placeholder="Image"
				/>
				<button type="submit">+ Add Item</button>
			</form>
		);
	}
}

export default AddBakeryForm;
