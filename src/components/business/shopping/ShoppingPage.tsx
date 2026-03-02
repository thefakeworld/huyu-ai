// ShoppingPage.tsx - 购物商城主页
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart, Filter, Grid3X3, ListFilter } from 'lucide-react';
import { ProductList } from './ProductList';
import { CartPage } from './CartPage';
import { CheckoutPage } from './CheckoutPage';

// 模拟产品数据类型
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
  specList?: Array<{
    name: string;
    values: Array<{
      value: string;
      specValueId: string;
    }>;
  }>;
  otherImages?: string[];
  tags?: string[];
}

// 购物车项类型
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

// 地址类型
interface Address {
  id: number;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  address: string;
  isDefault: boolean;
}

const ShoppingPage = () => {
  // 页面状态：'browse'(浏览商品), 'cart'(购物车), 'checkout'(结账)
  const [pageState, setPageState] = useState<'browse' | 'cart' | 'checkout'>('browse');
  
  // 当前选中的商品
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // 购物车状态
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // 收藏的商品ID列表
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['1', '3']);
  
  // 搜索关键词
  const [searchQuery, setSearchQuery] = useState('');

  // 模拟产品数据
  const products: Product[] = [
    {
      id: '1',
      name: '时尚无线蓝牙耳机',
      description: '高音质无线蓝牙耳机，降噪功能，长续航时间，适用于运动和日常使用。',
      price: 299.00,
      originalPrice: 399.00,
      imageUrl: '/placeholder-product.jpg',
      rating: 4.5,
      reviewCount: 128,
      stock: 50,
      salesNum: 1205,
      freeShipping: true,
      tags: ['热销', '新品'],
      specList: [
        {
          name: '颜色',
          values: [
            { value: '黑色', specValueId: 'color-black' },
            { value: '白色', specValueId: 'color-white' },
            { value: '蓝色', specValueId: 'color-blue' }
          ]
        },
        {
          name: '版本',
          values: [
            { value: '标准版', specValueId: 'version-standard' },
            { value: 'Pro版', specValueId: 'version-pro' }
          ]
        }
      ]
    },
    {
      id: '2',
      name: '智能手表 Series 6',
      description: '健康监测、心率检测、睡眠分析，支持多种运动模式的智能手表。',
      price: 1299.00,
      imageUrl: '/placeholder-product.jpg',
      rating: 4.7,
      reviewCount: 89,
      stock: 30,
      salesNum: 876,
      shippingFee: 15.00,
      tags: ['智能设备'],
      specList: [
        {
          name: '表带颜色',
          values: [
            { value: '黑色', specValueId: 'band-black' },
            { value: '银色', specValueId: 'band-silver' }
          ]
        }
      ]
    },
    {
      id: '3',
      name: '便携式充电宝 20000mAh',
      description: '大容量快充移动电源，支持双向快充，轻薄便携设计。',
      price: 159.00,
      originalPrice: 199.00,
      imageUrl: '/placeholder-product.jpg',
      rating: 4.3,
      reviewCount: 245,
      stock: 100,
      salesNum: 2103,
      freeShipping: true,
      tags: ['促销'],
      specList: [
        {
          name: '颜色',
          values: [
            { value: '灰色', specValueId: 'color-gray' },
            { value: '粉色', specValueId: 'color-pink' }
          ]
        }
      ]
    },
    {
      id: '4',
      name: '机械键盘 RGB背光',
      description: '青轴机械键盘，RGB多彩背光，适合游戏和办公使用。',
      price: 499.00,
      imageUrl: '/placeholder-product.jpg',
      rating: 4.8,
      reviewCount: 67,
      stock: 20,
      salesNum: 432,
      shippingFee: 8.00,
      tags: ['电竞'],
      specList: [
        {
          name: '轴体类型',
          values: [
            { value: '青轴', specValueId: 'switch-blue' },
            { value: '红轴', specValueId: 'switch-red' },
            { value: '茶轴', specValueId: 'switch-brown' }
          ]
        }
      ]
    }
  ];

  // 添加到购物车
  const addToCart = (product: Product, quantity: number = 1, specs?: string[]) => {
    const newItem: CartItem = {
      id: `${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      selectedSpecs: specs,
      imageUrl: product.imageUrl,
      inStock: product.stock > 0
    };

    setCartItems([...cartItems, newItem]);
    setPageState('cart');
  };

  // 从购物车移除商品
  const removeFromCart = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  // 更新购物车商品数量
  const updateCartItemQuantity = (itemId: string, newQuantity: number) => {
    setCartItems(
      cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // 切换收藏状态
  const toggleFavorite = (productId: string) => {
    if (favoriteIds.includes(productId)) {
      setFavoriteIds(favoriteIds.filter(id => id !== productId));
    } else {
      setFavoriteIds([...favoriteIds, productId]);
    }
  };

  // 处理立即购买
  const handleBuyNow = (product: Product, quantity: number, specs?: string[]) => {
    addToCart(product, quantity, specs);
  };

  // 提交订单
  const submitOrder = (orderData: any) => {
    console.log('提交订单:', orderData);
    // 实际应用中这里会调用API提交订单
    alert(`订单已提交！订单总额：¥${orderData.total.toFixed(2)}`);
    
    // 清空购物车并返回商品浏览页
    setCartItems([]);
    setPageState('browse');
  };

  // 过滤产品（基于搜索）
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-orange-600">超级商城</h1>
          
          <div className="flex-1 max-w-md mx-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="搜索商品..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => setPageState('cart')}
            className="relative"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            购物车
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        {/* 主要内容区域 */}
        {pageState === 'browse' && (
          <>
            {/* 分类筛选 */}
            <div className="mb-6 flex items-center gap-4 overflow-x-auto pb-2">
              <Badge variant="secondary" className="whitespace-nowrap">全部分类</Badge>
              <Badge variant="outline" className="whitespace-nowrap">数码电器</Badge>
              <Badge variant="outline" className="whitespace-nowrap">服装配饰</Badge>
              <Badge variant="outline" className="whitespace-nowrap">家居用品</Badge>
              <Badge variant="outline" className="whitespace-nowrap">美妆护肤</Badge>
              <Badge variant="outline" className="whitespace-nowrap">图书文具</Badge>
            </div>

            {/* 推荐横幅 */}
            <Card className="mb-8 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-8">
                  <h2 className="text-2xl font-bold mb-2">春季大促，低至5折起！</h2>
                  <p className="mb-4">精选好物限时抢购，品质生活触手可及</p>
                  <Button variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
                    立即选购
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 商品列表 */}
            <ProductList 
              products={filteredProducts} 
              onProductClick={(product) => {
                setSelectedProduct(product);
                setPageState('browse'); // 在实际应用中，可能会跳转到详情页
              }}
              onAddToCart={addToCart}
              onToggleFavorite={toggleFavorite}
            />
          </>
        )}

        {pageState === 'cart' && (
          <CartPage
            initialItems={cartItems}
            onRemoveItem={removeFromCart}
            onUpdateQuantity={updateCartItemQuantity}
            onCheckout={(selectedItems) => {
              // 如果没有选中任何商品，则结算所有商品
              if (selectedItems.length === 0) {
                setPageState('checkout');
              } else {
                setPageState('checkout');
              }
            }}
          />
        )}

        {pageState === 'checkout' && selectedProduct && (
          <CheckoutPage
            cartItems={cartItems}
            subtotal={cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
            onOrderSubmit={submitOrder}
            onBack={() => setPageState('cart')}
          />
        )}
      </main>

      {/* 底部导航 */}
      <footer className="bg-white border-t mt-8 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
          <p>© 2025 超级商城. 版权所有.</p>
          <p className="mt-2 text-sm">客服热线：400-123-4567 | 邮箱：service@example.com</p>
        </div>
      </footer>
    </div>
  );
};

export default ShoppingPage;