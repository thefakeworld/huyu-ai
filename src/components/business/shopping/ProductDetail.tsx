// ProductDetail.tsx - 产品详情组件
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Star, Heart, ShoppingCart, ShieldCheck, Zap, ThumbsUp } from 'lucide-react';

interface ProductSpec {
  name: string;
  values: Array<{
    value: string;
    specValueId: string;
  }>;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  stock: number;
  salesNum: number;
  freeShipping?: boolean;
  shippingFee?: number;
  category?: {
    name: string;
    categoryId: string;
  };
  specList?: ProductSpec[];
  otherImages?: string[];
  tags?: string[];
}

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number, selectedSpecs?: any[]) => void;
  onBuyNow: (product: Product, quantity: number, selectedSpecs?: any[]) => void;
  onToggleFavorite: (productId: string) => void;
  isFavorite: boolean;
}

export function ProductDetail({ 
  product, 
  onAddToCart, 
  onBuyNow,
  onToggleFavorite,
  isFavorite
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSpecs, setSelectedSpecs] = useState<{[key: string]: string}>({});
  
  // 初始化选中第一个规格选项
  if (product.specList && Object.keys(selectedSpecs).length === 0) {
    const initialSpecs: {[key: string]: string} = {};
    product.specList.forEach((spec, index) => {
      if (spec.values.length > 0) {
        initialSpecs[`spec${index + 1}`] = spec.values[0].value;
      }
    });
    setSelectedSpecs(initialSpecs);
  }

  const handleSpecChange = (specIndex: number, value: string) => {
    setSelectedSpecs(prev => ({
      ...prev,
      [`spec${specIndex + 1}`]: value
    }));
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity, Object.values(selectedSpecs));
  };

  const handleBuyNow = () => {
    onBuyNow(product, quantity, Object.values(selectedSpecs));
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(q => q + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 图片展示区 */}
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-xl aspect-square flex items-center justify-center overflow-hidden">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          
          {product.otherImages && product.otherImages.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {product.otherImages.map((image, idx) => (
                <div 
                  key={idx}
                  className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center overflow-hidden cursor-pointer hover:border-2 hover:border-orange-500"
                >
                  <img 
                    src={image} 
                    alt={`${product.name}-${idx}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* 产品信息区 */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleFavorite(product.id)}
            >
              <Heart 
                className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
              />
            </Button>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-orange-600">¥{product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">¥{product.originalPrice}</span>
            )}
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
              <span className="ml-2 text-gray-600">({product.reviewCount}人评价)</span>
            </div>
            <span className="text-gray-600">销量{product.salesNum}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {product.category?.name && (
              <Badge variant="secondary">{product.category.name}</Badge>
            )}
            {product.freeShipping ? (
              <Badge variant="default" className="bg-green-500">包邮</Badge>
            ) : product.shippingFee && (
              <Badge variant="outline">运费¥{product.shippingFee}元</Badge>
            )}
            {product.tags?.map((tag, index) => (
              <Badge key={index} variant="outline">{tag}</Badge>
            ))}
          </div>
          
          {/* 规格选择 */}
          {product.specList && product.specList.map((spec, specIndex) => (
            <div key={specIndex} className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">{spec.name}</h3>
              <div className="flex flex-wrap gap-2">
                {spec.values.map((value, valueIndex) => (
                  <Button
                    key={valueIndex}
                    variant={
                      selectedSpecs[`spec${specIndex + 1}`] === value.value 
                        ? "default" 
                        : "outline"
                    }
                    className={
                      selectedSpecs[`spec${specIndex + 1}`] === value.value 
                        ? "border-orange-500 bg-orange-50 text-gray-900" 
                        : ""
                    }
                    onClick={() => handleSpecChange(specIndex, value.value)}
                  >
                    {value.value}
                  </Button>
                ))}
              </div>
            </div>
          ))}
          
          {/* 数量选择 */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">数量</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-none border-0 border-r"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <Input
                  type="number"
                  min={1}
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val >= 1 && val <= product.stock) {
                      setQuantity(val);
                    }
                  }}
                  className="w-16 text-center border-0 focus-visible:ring-0"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-none border-0 border-l"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                >
                  +
                </Button>
              </div>
              <span className="text-gray-600">库存 {product.stock} 件</span>
            </div>
          </div>
          
          {/* 服务保障 */}
          <div className="flex items-center gap-6 mb-8 pb-6 border-b">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-600" fill="currentColor" />
              <span className="text-sm text-gray-600">正品保证</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" fill="currentColor" />
              <span className="text-sm text-gray-600">极速发货</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-5 h-5 text-blue-500" fill="currentColor" />
              <span className="text-sm text-gray-600">售后无忧</span>
            </div>
          </div>
          
          {/* 操作按钮 */}
          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-orange-500 hover:bg-orange-600"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              加入购物车
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              onClick={handleBuyNow}
            >
              立即购买
            </Button>
          </div>
        </div>
      </div>
      
      {/* 产品描述 */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">商品详情</h2>
          <div className="prose max-w-none">
            <p>{product.description}</p>
            {/* 在实际应用中，这里会显示更详细的产品描述 */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}