// CartPage.tsx - 购物车页面组件
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedSpecs?: string[];
  imageUrl: string;
  inStock: boolean;
}

interface CartPageProps {
  initialItems: CartItem[];
  onRemoveItem: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onCheckout: (selectedItems: CartItem[]) => void;
}

export function CartPage({ 
  initialItems, 
  onRemoveItem, 
  onUpdateQuantity, 
  onCheckout 
}: CartPageProps) {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [selectedItems, setSelectedItems] = useState<string[]>(
    initialItems.map(item => item.id)
  );

  const toggleItemSelected = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map(item => item.id));
    }
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      onUpdateQuantity(itemId, newQuantity);
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const incrementQuantity = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (item && item.quantity < item.inStock) {
      updateQuantity(itemId, item.quantity + 1);
    }
  };

  const decrementQuantity = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (item && item.quantity > 1) {
      updateQuantity(itemId, item.quantity - 1);
    }
  };

  const removeItem = (itemId: string) => {
    onRemoveItem(itemId);
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    setSelectedItems(prevSelected => prevSelected.filter(id => id !== itemId));
  };

  const calculateSubtotal = () => {
    return items
      .filter(item => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 0 ? 8.00 : 0; // 假设运费为8元，满额免邮
  const discount = 0; // 后续可扩展优惠券功能
  const total = subtotal + shipping - discount;

  const selectedCartItems = items.filter(item => selectedItems.includes(item.id));

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">购物车 ({items.length} 件商品)</CardTitle>
        </CardHeader>
        <CardContent>
          {/* 全选和编辑栏 */}
          <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={selectedItems.length === items.length && items.length > 0}
                onCheckedChange={toggleSelectAll}
              />
              <span>全选</span>
            </div>
            <span>编辑</span>
          </div>

          {/* 购物车商品列表 */}
          <div className="divide-y divide-gray-200 mt-4">
            {items.map((item) => (
              <div key={item.id} className="py-4 flex items-start gap-4">
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => toggleItemSelected(item.id)}
                />
                
                <div className="w-20 h-20 flex-shrink-0">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                  
                  {item.selectedSpecs && item.selectedSpecs.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.selectedSpecs.map((spec, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-semibold text-orange-600">¥{item.price}</span>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => decrementQuantity(item.id)}
                        disabled={!item.inStock}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      
                      <span className="w-10 text-center">{item.quantity}</span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => incrementQuantity(item.id)}
                        disabled={!item.inStock || item.quantity >= item.inStock}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {!item.inStock && (
                    <p className="text-red-500 text-sm mt-1">该商品暂无库存</p>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="w-5 h-5 text-gray-500 hover:text-red-500" />
                </Button>
              </div>
            ))}
          </div>

          {/* 结算栏 */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-3 px-4 md:relative md:mt-6 md:border-0">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  已选 {selectedItems.length} 件商品
                </div>
                
                <div className="hidden md:block w-px h-6 bg-gray-300"></div>
                
                <div className="text-base">
                  总计: <span className="text-xl font-bold text-orange-600">¥{subtotal.toFixed(2)}</span>
                </div>
              </div>
              
              <Button
                className="bg-orange-500 hover:bg-orange-600 px-8 h-12"
                onClick={() => onCheckout(selectedCartItems)}
                disabled={selectedItems.length === 0}
              >
                去结算 ({selectedItems.length})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}