import { ShoppingCart, Leaf } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemCount, onCartClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-green-100 p-2 rounded-full">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl text-green-800">Green Valley Farm</h1>
              <p className="text-sm text-green-600">Fresh • Local • Organic</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#products" className="text-gray-700 hover:text-green-600 transition-colors">
              Products
            </a>
            <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors">
              About Us
            </a>
            <a href="#contact" className="text-gray-700 hover:text-green-600 transition-colors">
              Contact
            </a>
          </nav>

          <Button 
            variant="outline" 
            onClick={onCartClick}
            className="relative border-green-200 text-green-700 hover:bg-green-50"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="ml-2 hidden sm:inline">Cart</span>
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-green-600 hover:bg-green-600 text-white min-w-5 h-5 flex items-center justify-center text-xs">
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}