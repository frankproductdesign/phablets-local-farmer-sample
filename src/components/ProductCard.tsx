import { Plus, Minus } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
  organic?: boolean;
}

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (productId: string, quantity: number) => void;
}

export function ProductCard({ product, quantity, onQuantityChange }: ProductCardProps) {
  const handleIncrease = () => {
    onQuantityChange(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      onQuantityChange(product.id, quantity - 1);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.organic && (
          <Badge className="absolute top-2 left-2 bg-green-600 hover:bg-green-600">
            Organic
          </Badge>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Badge variant="destructive">Out of Stock</Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-green-800 line-clamp-1">{product.name}</h3>
          <div className="text-right">
            <div className="text-green-700">${product.price.toFixed(2)}</div>
            <div className="text-sm text-gray-500">per {product.unit}</div>
          </div>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{product.description}</p>
        <Badge variant="secondary" className="text-xs">
          {product.category}
        </Badge>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {product.inStock ? (
          <div className="flex items-center justify-between w-full">
            {quantity === 0 ? (
              <Button 
                onClick={handleIncrease}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            ) : (
              <div className="flex items-center justify-between w-full">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDecrease}
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-4 text-green-800">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleIncrease}
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <Button disabled className="w-full">
            Out of Stock
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}