import React from "react";
import PropTypes from "prop-types";
import base, { firebaseApp } from "../base";
import firebase from "firebase";
import AddBakeryForm from "./AddBakeryForm.js";
import EditBakeryForm from "./EditBakeryForm";
import Login from "./Login";

class Inventory extends React.Component {
	static propTypes = {
		item: PropTypes.object,
		updateItem: PropTypes.func,
		deleteItem: PropTypes.func,
		loadSampleItems: PropTypes.func,
	};

	state = {
		uid: null,
		owner: null,
	};

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.authHandler({ user });
			}
		});
	}

	authHandler = async (authData) => {
		// 1. Look up the current store in the firebase database
		const store = await base.fetch(this.props.storeId, { context: this });

		// 2. Claim it if there's no owner
		if (!store.owner) {
			// save it as our own store
			await base.post(`${this.props.storeId}/owner`, {
				data: authData.user.uid,
			});
		}

		// 3. Set the state of the inventory component to reflect the current user
		this.setState({
			uid: authData.user.uid,
			owner: store.owner || authData.user.uid,
		});
	};

	authenticate = (provider) => {
		const authProvider = new firebase.auth[`${provider}AuthProvider`]();
		firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
	};

	logout = async () => {
		await firebase.auth().signOut();
		this.setState({ uid: null });
	};

	render() {
		const logout = <button onClick={this.logout}>Log out</button>;

		// 1. Check if user is logged in
		if (!this.state.uid) {
			return <Login authenticate={this.authenticate} />;
		}

		// 2. Check if they are NOT the owner of the store
		if (this.state.uid !== this.state.owner) {
			return (
				<div>
					<p>Sorry, you are not the owner of this store</p>
					{logout}
				</div>
			);
		}

		// 3. they must be the owner, just render the inventory
		return (
			<div className="inventory">
				<h2>Inventory</h2>
				{Object.keys(this.props.item).map((key) => (
					<EditBakeryForm
						key={key}
						index={key}
						item={this.props.item[key]}
						updateItem={this.props.updateItem}
						deleteItem={this.props.deleteItem}
					></EditBakeryForm>
				))}
				<AddBakeryForm addItem={this.props.addItem}></AddBakeryForm>
				<button onClick={this.props.loadSampleItems}>
					Load Sample Items
				</button>
				{logout}
			</div>
		);
	}
}

export default Inventory;
