import Header from "./components/Header"
import Guitar from "./components/Guitar"
import Alert from "./components/Alert"
import Footer from "./components/Footer"
import { useCart } from "./hooks/useCart"

function App() {

  const { data, cart, alert, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, cartTotal } = useCart()

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
        cartTotal={cartTotal}
      />

{alert && alert.msg && <Alert alert={alert} />}


      <main className="container-xl mt-5">
        <h2 className="text-center">Our Collection</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
            />
          ))}

        </div>
      </main>

      <Footer />
    </>
  )
}

export default App
