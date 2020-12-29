import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers.js";

class Item extends React.Component {
	static propTypes = {
		details: PropTypes.shape({
			image: PropTypes.string,
			name: PropTypes.string,
			description: PropTypes.string,
			status: PropTypes.string,
			price: PropTypes.number,
		}),
		addToOrder: PropTypes.func,
	};

	handleClick = () => {
		this.props.addToOrder(this.props.index);
	};

	render() {
		// This will destructure the instances of the object properties, and save it as image, name, price, etc
		// same as this.props.value.image, this.props.value.image
		const { image, name, price, description, status } = this.props.details;

		const isAvailable = status === "available";

		return (
			<li className="menu-fish">
				<img src={image} alt={name} />
				<h3 className="fish-name">
					{name}
					<span className="price">{formatPrice(price)}</span>
				</h3>
				<p>{description}</p>
				<button disabled={!isAvailable} onClick={this.handleClick}>
					{isAvailable ? "Add to Order" : "Sold out!"}
				</button>
			</li>
		);
	}
}

export default Item;
