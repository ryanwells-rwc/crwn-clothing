import { useContext } from "react";
import { Outlet, Link } from "react-router";
import CrwnLogo from "../../assets/crown.svg?react";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { CartContext } from "../../contexts/cart.context";
import {
	NavigationContainer,
	NavLinks,
	NavLink,
	LogoContainer,
} from "./navigation.styles";

const Navigation = () => {
	// here we want the value, not the setter
	// whenever a value in this context updates, rerender
	const { currentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext);

	//console.log(currentUser);
	return (
		<>
			<NavigationContainer>
				<LogoContainer to="/">
					<CrwnLogo className="logo" />
				</LogoContainer>
				<NavLinks>
					<NavLink to="/shop">SHOP</NavLink>
					{currentUser ? (
						<NavLink as="span" onClick={signOutUser}>
							SIGN OUT
						</NavLink>
					) : (
						<NavLink to="/auth">SIGN IN</NavLink>
					)}
					<CartIcon />
				</NavLinks>
				{isCartOpen && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</>
	);
};

export default Navigation;
