// CheckoutPage.tsx - 结账页面组件
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Check, MapPin, CreditCard, Smartphone } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedSpecs?: string[];
  imageUrl: string;
}

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

interface Coupon {
  id: string;
  amount: number;
  condition: string;
}

interface CheckoutPageProps {
  cartItems: CartItem[];
  subtotal: number;
  onOrderSubmit: (orderData: any) => void;
  onBack?: () => void;
}

export function CheckoutPage({ 
  cartItems, 
  subtotal, 
  onOrderSubmit,
  onBack
}: CheckoutPageProps) {
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'alipay' | 'wechat'>('alipay');
  const [coupon, setCoupon] = useState<string>('none');
  const [remark, setRemark] = useState('');
  
  // 模拟地址数据
  const addresses: Address[] = [
    {
      id: 0,
      name: '张小欣',
      phone: '138****8888',
      province: '北京市',
      city: '北京市',
      district: '朝阳区',
      detail: '建路88号SOHO现代城A座1201室',
      address: '北京市朝阳区建国路88号SOHO现代城A座1201室',
      isDefault: true,
    },
    {
      id: 1,
      name: '李明',
      phone: '139****6666',
      province: '上海市',
      city: '上海市',
      district: '浦东新区',
      detail: '世纪大道100号环球金融中心',
      address: '上海市浦东新区世纪大道100号环球金融中心',
      isDefault: false,
    },
  ];
  
  // 模拟优惠券数据
  const coupons: Coupon[] = [
    { id: '1', amount: 10, condition: '满100减10元' },
    { id: '2', amount: 20, condition: '满200减20元' },
  ];

  const currentAddress = addresses[selectedAddress];
  
  const shipping = 0; // 免邮费
  const discount = coupon !== 'none' 
    ? (coupons.find(c => c.id === coupon)?.amount || 0) 
    : 0;
  const total = subtotal + shipping - discount;

  const handleSubmitOrder = () => {
    const orderData = {
      items: cartItems,
      address: currentAddress,
      paymentMethod,
      coupon: coupon !== 'none' ? coupons.find(c => c.id === coupon) : null,
      remark,
      subtotal,
      shipping,
      discount,
      total,
      timestamp: new Date(),
    };
    
    onOrderSubmit(orderData);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：订单信息 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 收货地址 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                收货地址
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedAddress === addr.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-medium">{addr.name}</span>
                          <span>{addr.phone}</span>
                          {addr.isDefault && (
                            <span className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded text-xs">
                              默认
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{addr.address}</p>
                      </div>
                      {selectedAddress === addr.id && (
                        <Check className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  + 添加新地址
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 商品清单 */}
          <Card>
            <CardHeader>
              <CardTitle>商品清单</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 flex-shrink-0">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{item.name}</h3>
                      {item.selectedSpecs && item.selectedSpecs.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {item.selectedSpecs.map((spec, idx) => (
                            <span key={idx} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              {spec}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-medium text-orange-600">¥{item.price}</p>
                      <p className="text-gray-500">×{item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 订单备注 */}
          <Card>
            <CardHeader>
              <CardTitle>订单备注</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="选填，可填写您的特殊需求或备注信息"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                maxLength={200}
                className="resize-none"
              />
              <div className="text-right text-xs text-gray-400 mt-2">
                {remark.length}/200
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧：支付信息 */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>支付信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* 价格明细 */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">商品总价</span>
                    <span className="text-gray-900">¥{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">运费</span>
                    <span className="text-gray-900">¥{shipping.toFixed(2)}</span>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <Label htmlFor="coupon-select" className="mb-2 block">选择优惠券</Label>
                    <select
                      id="coupon-select"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="none">不使用优惠券</option>
                      {coupons.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.condition} (-¥{c.amount})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">优惠减免</span>
                      <span className="text-green-600">-¥{discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="pt-3 border-t font-bold text-lg flex justify-between">
                    <span>实付款</span>
                    <span className="text-orange-600">¥{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* 支付方式 */}
                <div>
                  <Label className="mb-3 block">支付方式</Label>
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={(value: 'alipay' | 'wechat') => setPaymentMethod(value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-3 p-3 border rounded-lg data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-50">
                      <RadioGroupItem value="alipay" id="alipay" />
                      <CreditCard className="w-5 h-5 text-blue-500" />
                      <Label htmlFor="alipay" className="flex-1">支付宝</Label>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 border rounded-lg data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-50">
                      <RadioGroupItem value="wechat" id="wechat" />
                      <Smartphone className="w-5 h-5 text-green-500" />
                      <Label htmlFor="wechat" className="flex-1">微信支付</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* 提交按钮 */}
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 h-12 text-base"
                  onClick={handleSubmitOrder}
                >
                  提交订单
                </Button>
                
                {onBack && (
                  <Button 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={onBack}
                  >
                    返回购物车
                  </Button>
                )}

                <p className="text-xs text-gray-400 text-center">
                  点击提交订单即表示您同意<span className="text-orange-600">《服务协议》</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}