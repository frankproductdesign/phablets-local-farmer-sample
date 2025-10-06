import { useState } from "react";
import { CheckCircle, User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent } from "./ui/card";
import { Product } from "./ProductCard";

interface CartItem {
  product: Product;
  quantity: number;
}

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onOrderComplete: () => void;
}

export function OrderForm({ isOpen, onClose, items, total, onOrderComplete }: OrderFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pickupDate: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the order to your backend
    console.log("Order submitted:", { formData, items, total });
    setIsSubmitted(true);
  };

  const handleClose = () => {
    if (isSubmitted) {
      onOrderComplete();
    }
    onClose();
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      pickupDate: "",
      notes: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Order Placed Successfully!
            </DialogTitle>
            <DialogDescription>
              Thank you for your order. We'll contact you soon to confirm the details.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Card className="bg-green-50">
              <CardContent className="p-4">
                <h4 className="text-green-800 mb-2">Order Summary</h4>
                <p className="text-sm text-green-700">
                  {items.length} items • Total: ${total.toFixed(2)}
                </p>
                <p className="text-sm text-green-600 mt-1">
                  Order ID: #GVF{Date.now().toString().slice(-6)}
                </p>
              </CardContent>
            </Card>
            
            <div className="space-y-2 text-sm text-gray-600">
              <p>📧 A confirmation email will be sent to you shortly</p>
              <p>📞 We'll call you to arrange payment and pickup</p>
              <p>🚚 Pickup available at Green Valley Farm</p>
            </div>
          </div>
          
          <Button onClick={handleClose} className="w-full bg-green-600 hover:bg-green-700">
            Continue Shopping
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  // Get tomorrow's date as minimum pickup date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-green-800">Complete Your Order</DialogTitle>
          <DialogDescription>
            Please provide your contact information and preferred pickup details
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name *
              </Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pickupDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Preferred Pickup Date *
              </Label>
              <Input
                id="pickupDate"
                type="date"
                required
                min={minDate}
                value={formData.pickupDate}
                onChange={(e) => handleInputChange("pickupDate", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Address (for delivery arrangements)
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="123 Main St, City, State 12345"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Special Notes or Requests</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Any special instructions, dietary requirements, or questions..."
              rows={3}
            />
          </div>

          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <h4 className="text-green-800 mb-3">Order Summary</h4>
              <div className="space-y-2 text-sm">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <span>
                      {item.product.name} × {item.quantity}
                    </span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-medium text-green-800">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-green-50 p-4 rounded-lg text-sm text-green-700">
            <p className="mb-2">📍 <strong>Pickup Location:</strong> Green Valley Farm, 123 Farm Road</p>
            <p className="mb-2">⏰ <strong>Pickup Hours:</strong> Monday-Saturday, 8 AM - 6 PM</p>
            <p>💳 <strong>Payment:</strong> Cash, check, or Venmo accepted at pickup</p>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Place Order
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}