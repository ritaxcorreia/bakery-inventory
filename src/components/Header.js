import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
	return (
		<header className="top">
			<h1>
				Fresh
				<span className="outThe">
					<span className="out">Out</span>
					<span className="the">The</span>
				</span>
				Oven
			</h1>
			<h3 className="tagline">
				<span>{props.tagline}</span>
			</h3>
		</header>
	);
};

Header.propTypes = {
	tagline: PropTypes.string.isRequired,
};

export default Header;
