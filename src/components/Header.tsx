import type { CartItem } from "../types"

type HeaderProps = {
    cart: CartItem[];
    removeFromCart: (id: number) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    clearCart: () => void;
    cartTotal: number;
};

const Header = ({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, cartTotal } : HeaderProps) => {

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.svg" alt="logo image" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div className="cart">
                            <img className="img-fluid" src="/img/cart.png" alt="image cart" />

                            <div id="cart" className="bg-white p-3">
                                {cart.length === 0 ? (
                                    <p className="text-center">No items added</p>
                                ) : (
                                    <>
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>image</th>
                                                    <th>name</th>
                                                    <th>price</th>
                                                    <th>quantity</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>
                                                            <img className="img-fluid" src={`/img/${item.image}.jpg`} alt={`image ${item.name}`} />
                                                        </td>
                                                        <td>{item.name}</td>
                                                        <td className="fw-bold">${item.price}</td>
                                                        <td className="flex align-items-start gap-4">
                                                            <button type="button" className="btn btn-dark" onClick={() => decreaseQuantity(item.id)}>-</button>
                                                            {item.quantity}
                                                            <button type="button" className="btn btn-dark" onClick={() => increaseQuantity(item.id)}>+</button>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-danger" type="button"
                                                                onClick={() => removeFromCart(item.id)}>X</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <p className="text-end">
                                            Total: <span className="fw-bold">${cartTotal}</span>
                                        </p>
                                        <button className="btn btn-dark w-100 mt-3 p-2" onClick={() => clearCart()}>Empty cart</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header