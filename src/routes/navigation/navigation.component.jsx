import { useContext } from "react";
import { Outlet, Link } from "react-router";
import CrwnLogo from "../../assets/crown.svg?react";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { CartContext } from "../../contexts/cart.context";
import "./navigation.styles.scss";

const Navigation = () => {
	// here we want the value, not the setter
	// whenever a value in this context updates, rerender
	const { currentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext);

	//console.log(currentUser);
	return (
		<>
			<div className="navigation">
				<Link className="logo-container" to="/">
					<CrwnLogo className="logo" />
				</Link>
				<div className="nav-links-container">
					<Link className="nav-link" to="/shop">
						SHOP
					</Link>
					{currentUser ? (
						<span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
					) : (
						<Link className="nav-link" to="/auth">
							SIGN IN
						</Link>
					)}
					<CartIcon />
				</div>
				{isCartOpen && <CartDropdown />}
			</div>
			<Outlet />
		</>
	);
};

export default Navigation;
