import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Product } from "./ProductCard";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onQuantityChange: (productId: string, quantity: number) => void;
  onCheckout: () => void;
}

export function Cart({ isOpen, onClose, items, onQuantityChange, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleIncrease = (productId: string, currentQuantity: number) => {
    onQuantityChange(productId, currentQuantity + 1);
  };

  const handleDecrease = (productId: string, currentQuantity: number) => {
    if (currentQuantity > 0) {
      onQuantityChange(productId, currentQuantity - 1);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle className="flex items-center gap-2 text-green-800">
              <ShoppingBag className="h-5 w-5" />
              Your Order
            </SheetTitle>
            <SheetDescription>
              Review your items before placing your order
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="flex-1 px-6">
            <div className="space-y-4 py-6">
              {items.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                  <p className="text-gray-500 mb-2">Your cart is empty</p>
                  <p className="text-sm text-gray-400">Add some fresh products to get started!</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4 py-2">
                    <ImageWithFallback
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-green-800 truncate">{item.product.name}</h4>
                      <p className="text-sm text-gray-500">
                        ${item.product.price.toFixed(2)} per {item.product.unit}
                      </p>
                      {item.product.organic && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          Organic
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDecrease(item.product.id, item.quantity)}
                        className="h-8 w-8 p-0 border-green-200 text-green-700 hover:bg-green-50"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-green-800">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleIncrease(item.product.id, item.quantity)}
                        className="h-8 w-8 p-0 border-green-200 text-green-700 hover:bg-green-50"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="text-green-700">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {items.length > 0 && (
            <div className="border-t bg-white px-6 py-4 mt-auto">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Items ({totalItems})</span>
                    <span className="text-gray-600">${total.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-green-800">Total</span>
                    <span className="text-green-800">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={onCheckout}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  Place Order
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  Payment will be arranged upon order confirmation
                </p>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}