import { useState } from "react";
import { Header } from "./components/Header";
import { ProductCard, Product } from "./components/ProductCard";
import { Cart } from "./components/Cart";
import { OrderForm } from "./components/OrderForm";
import { Leaf, Heart, Truck, Clock } from "lucide-react";
import { Card, CardContent } from "./components/ui/card";
import { Separator } from "./components/ui/separator";

// Mock product data
const products: Product[] = [
  {
    id: "1",
    name: "Fresh Mixed Vegetables",
    price: 12.99,
    unit: "basket",
    image: "/images/Phablets-Seasonal-Vegetables-Assortment.png",
    description: "A fresh assortment of seasonal vegetables including lettuce, carrots, and peppers",
    category: "Vegetables",
    inStock: true,
    organic: true
  },
  {
    id: "2",
    name: "Organic Tomatoes",
    price: 4.50,
    unit: "lb",
    image: "/images/phablets-Organic-Tomato-Harvest.png",
    description: "Vine-ripened organic tomatoes, perfect for salads and cooking",
    category: "Vegetables",
    inStock: true,
    organic: true
  },
  {
    id: "3",
    name: "Farm Fresh Lettuce",
    price: 3.25,
    unit: "head",
    image: "/images/phablets-Fresh-Harvested-Lettuce.png",
    description: "Crisp, fresh lettuce heads harvested this morning",
    category: "Vegetables",
    inStock: true,
    organic: false
  },
  {
    id: "4",
    name: "Organic Carrots",
    price: 2.75,
    unit: "bunch",
    image: "/images/phablets-Organic Carrots Display.png",
    description: "Sweet, crunchy organic carrots with their green tops",
    category: "Vegetables",
    inStock: true,
    organic: true
  },
  {
    id: "5",
    name: "Fresh Apples",
    price: 3.99,
    unit: "lb",
    image: "/images/phablets-Orchard-Fresh-Apples.png",
    description: "Crisp, sweet apples from our orchard, perfect for snacking",
    category: "Fruits",
    inStock: true,
    organic: false
  },
  {
    id: "6",
    name: "Farm Fresh Eggs",
    price: 6.50,
    unit: "dozen",
    image: "/images/phablets-Free-range-eggs-from-our-happy-chickens.jpg",
    description: "Free-range eggs from our happy chickens, rich and flavorful",
    category: "Dairy & Eggs",
    inStock: false,
    organic: true
  }
];

interface CartItem {
  product: Product;
  quantity: number;
}

export default function App() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  const handleQuantityChange = (productId: string, quantity: number) => {
    setCart((prev: Record<string, number>) => {
      if (quantity === 0) {
        const { [productId]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: quantity };
    });
  };

  const cartItems: CartItem[] = Object.entries(cart)
    .map(([productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return product ? { product, quantity } : null;
    })
    .filter((item): item is CartItem => item !== null);

  const cartItemCount = Object.values(cart).reduce((sum: number, quantity: number) => sum + quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsOrderFormOpen(true);
  };

  const handleOrderComplete = () => {
    setCart({});
    setIsOrderFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl mb-4">Farm Fresh, Locally Grown</h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            Order fresh produce directly from our family farm
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              <span>100% Organic Options</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              <span>Family Owned</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              <span>Local Pickup</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>Harvested Daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-green-800 mb-4">Fresh Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our selection of farm-fresh produce, harvested at peak ripeness for maximum flavor and nutrition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={cart[product.id] || 0}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-green-800 mb-4">About Green Valley Farm</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              For three generations, our family has been growing fresh, healthy produce right here in the valley. 
              We believe in sustainable farming practices and providing our community with the freshest possible ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-green-800 mb-2">Sustainable Farming</h3>
                <p className="text-gray-600 text-sm">
                  We use environmentally friendly practices to grow healthy, nutritious produce while caring for our land.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-green-800 mb-2">Family Owned</h3>
                <p className="text-gray-600 text-sm">
                  Our farm has been in the family for over 75 years, passed down through generations of dedicated farmers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-green-800 mb-2">Fresh Daily</h3>
                <p className="text-gray-600 text-sm">
                  We harvest our produce fresh each morning to ensure you get the highest quality fruits and vegetables.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl text-green-800 mb-8">Visit Our Farm</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-green-800 mb-4">Farm Stand Hours</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Monday - Saturday: 8:00 AM - 6:00 PM</p>
                  <p>Sunday: 9:00 AM - 4:00 PM</p>
                  <Separator className="my-3" />
                  <p>📍 123 Farm Road, Green Valley</p>
                  <p>📞 (555) 123-FARM</p>
                  <p>📧 hello@greenvalleyfarm.com</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-green-800 mb-4">Order Information</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>💳 Payment: Cash, Check, or Venmo</p>
                  <p>📦 Order ahead for pickup</p>
                  <p>🚚 Local delivery available</p>
                  <Separator className="my-3" />
                  <p className="text-green-700">
                    Orders placed online are for pickup only. 
                    Payment is arranged at pickup.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-green-600 p-2 rounded-full">
              <Leaf className="h-6 w-6" />
            </div>
            <span className="text-xl">Green Valley Farm</span>
          </div>
          <p className="text-green-200 text-sm">
            © {new Date().getFullYear()} Green Valley Farm. Fresh, local, and family-owned since 1949.
          </p>
        </div>
      </footer>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onQuantityChange={handleQuantityChange}
        onCheckout={handleCheckout}
      />

      <OrderForm
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
        items={cartItems}
        total={cartTotal}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
}