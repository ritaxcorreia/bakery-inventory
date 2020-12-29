import React from "react";
import PropTypes from "prop-types";
import Header from "./Header.js";
import Order from "./Order.js";
import Inventory from "./Inventory.js";
import sampleBread from "../sample-bread";
import Item from "./Item.js";
import base from "../base";

class App extends React.Component {
	state = {
		items: {},
		order: {},
	};

	static propTypes = {
		match: PropTypes.object,
	};

	componentDidMount() {
		// First reinstate our localStorage
		const localStorageRef = localStorage.getItem(
			this.props.match.params.storeId
		);
		if (localStorageRef) {
			this.setState({ order: JSON.parse(localStorageRef) });
		}

		this.ref = base.syncState(`${this.props.match.params.storeId}/items`, {
			context: this,
			state: "item",
		});
	}

	componentDidUpdate() {
		localStorage.setItem(
			this.props.match.params.storeId,
			JSON.stringify(this.state.order)
		);
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	addItem = (item) => {
		// 1. Take a copy of the existing state
		const items = { ...this.state.items }; // using a spread it creates a clone/copy of the same object
		// 2. Add our new fish to the fishes variable
		items[`item${Date.now()}`] = item; // Using date now will give you a unique number (number of seconds since 1970 983947209472)
		// 3. set the new fishes object to state
		this.setState({ items });
	};

	updateItem = (key, updatedItem) => {
		// 1. take a copy of the current state
		const items = { ...this.state.items };

		// 2. Update that state
		items[key] = updatedItem;

		// 3. Set that to state
		this.setState({ items });
	};

	deleteItem = (key) => {
		// 1. take a copy of state
		const items = { ...this.state.items };
		// 2. update the state
		items[key] = null;
		// 3. update state
		this.setState({ items });
	};

	loadSampleItems = () => {
		this.setState({ items: sampleBread });
	};

	addToOrder = (key) => {
		//1. take a copy of state
		const order = { ...this.state.order };
		// 2. Either add to the order, or update the number in our order
		order[key] = order[key] + 1 || 1;
		// 3. Call setState to update our state object
		this.setState({ order });
	};

	removeFromOrder = (key) => {
		//1. take a copy of state
		const order = { ...this.state.order };
		// 2. remove item from order
		delete order[key];
		// 3. Call setState to update our state object
		this.setState({ order });
	};

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Street Bakery" />
					<ul className="items">
						{Object.keys(this.state.items).map((key) => (
							<Item
								key={key}
								index={key}
								details={this.state.items[key]}
								addToOrder={this.addToOrder}
								removeFromOrder={this.removeFromOrder}
							/>
						))}
					</ul>
				</div>
				<Order
					items={this.state.items}
					order={this.state.order}
					removeFromOrder={this.removeFromOrder}
				/>
				<Inventory
					addItem={this.addFish}
					updateItem={this.updateFish}
					deleteItem={this.deleteFish}
					loadSampleItems={this.loadSampleItems}
					item={this.state.items}
					storeId={this.props.match.params.storeId}
				/>
			</div>
		);
	}
}

export default App;
