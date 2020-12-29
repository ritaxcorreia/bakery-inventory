import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {
	static propTypes = {
		items: PropTypes.object,
		order: PropTypes.object,
		removeFromOrder: PropTypes.func,
	};

	renderOrder = (key) => {
		const item = this.props.items[key];
		const count = this.props.order[key];
		// Make sure the fish is loaded before we continue
		if (!item) {
			return null;
		}
		const isAvailable = item && item.status === "available";
		if (!isAvailable) {
			return (
				<li key={key}>
					{" "}
					Sorry {item ? item.name : "Item"} is sold out
				</li>
			);
		}
		return (
			<CSSTransition
				classNames="order"
				key={key}
				timeout={{ enter: 250, exit: 250 }}
			>
				<li key={key}>
					<span>
						<TransitionGroup component="span" className="count">
							<CSSTransition
								classNames="count"
								key={count}
								timeout={{ enter: 5000, exit: 5000 }}
							>
								<span>{count}</span>
							</CSSTransition>
						</TransitionGroup>
						lbs {item.name}
						{formatPrice(count * item.price)}
						<button onClick={() => this.props.removeFromOrder(key)}>
							&times;{" "}
						</button>
					</span>
				</li>
			</CSSTransition>
		);
	};

	render() {
		const orderIds = Object.keys(this.props.order);
		const total = orderIds.reduce((prevTotal, key) => {
			const item = this.props.item[key];
			const count = this.props.order[key];
			const isAvailable = item && item.status === "available";

			if (isAvailable) {
				return prevTotal + count * item.price;
			}
			return prevTotal;
		}, 0);

		return (
			<div className="order-wrap">
				<h2>Order </h2>
				<TransitionGroup component="ul" className="order">
					{orderIds.map(this.renderOrder)}
				</TransitionGroup>
				<div className="total">
					Total:
					<strong>{formatPrice(total)}</strong>
				</div>
			</div>
		);
	}
}

export default Order;
