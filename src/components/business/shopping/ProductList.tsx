// ProductList.tsx - 产品列表组件
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Heart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  tags?: string[];
  isFavorite?: boolean;
}

interface ProductListProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (productId: string) => void;
}

export function ProductList({ 
  products, 
  onProductClick, 
  onAddToCart, 
  onToggleFavorite 
}: ProductListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
          <div className="relative">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() => onProductClick?.(product)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite?.(product.id);
              }}
            >
              <Heart 
                className={`w-4 h-4 ${product.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
              />
            </Button>
          </div>
          
          <CardContent className="p-4">
            <div 
              className="cursor-pointer mb-2"
              onClick={() => onProductClick?.(product)}
            >
              <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
            </div>
            
            <div className="flex items-center gap-2 my-3">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-orange-600">¥{product.price}</span>
                {product.originalPrice && (
                  <span className="ml-2 text-sm text-gray-500 line-through">¥{product.originalPrice}</span>
                )}
              </div>
              
              {product.tags?.slice(0, 2).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <Button 
              className="w-full mt-3 bg-orange-500 hover:bg-orange-600"
              onClick={() => onAddToCart?.(product)}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              加入购物车
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}