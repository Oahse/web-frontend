/**
 * Example component showing how to use the unified API hooks
 * This demonstrates the new pattern for API usage
 */

import React from 'react';
import { 
  useProducts, 
  useFeaturedProducts, 
  useCart, 
  useAddToCart,
  useCurrentUser,
  useLogin 
} from '../../hooks/useApi';
import { ProductFilters } from '../../types';
import ErrorMessage from '../common/ErrorMessage';

const UnifiedApiExample: React.FC = () => {
  // Simple API call
  const { data: user, loading: userLoading, error: userError } = useCurrentUser();
  
  // API call with parameters
  const filters = { featured: true, limit: 10 };
  const { data: products, loading: productsLoading, error: productsError, refetch } = useProducts(filters);
  
  // Featured products
  const { data: featuredProducts, loading: featuredLoading } = useFeaturedProducts(5);
  
  // Cart operations
  const { data: cart, loading: cartLoading } = useCart();
  const { mutate: addToCart, loading: addingToCart } = useAddToCart();
  
  // Auth operations
  const { mutate: login, loading: loggingIn, error: loginError } = useLogin();

  const handleAddToCart = async (variantId: number) => {
    try {
      await addToCart.mutate(undefined, { variantId, quantity: 1 });
      // Cart will be automatically refetched if using React Query or similar
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleLogin = async () => {
    try {
      await login.mutate(undefined, { email: 'test@example.com', password: 'password' });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (userLoading || productsLoading || featuredLoading || cartLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Unified API Example</h1>
      
      {/* User Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Current User</h2>
        {userError && <ErrorMessage error={userError} />}
        {user && (
          <div className="bg-gray-100 p-4 rounded">
            <p>Name: {(user as any).firstname} {(user as any).lastname}</p>
            <p>Email: {(user as any).email}</p>
            <p>Role: {(user as any).role}</p>
          </div>
        )}
        {!user && (
          <button 
            onClick={handleLogin}
            disabled={loggingIn}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loggingIn ? 'Logging in...' : 'Login'}
          </button>
        )}
        {loginError && <ErrorMessage error={loginError} />}
      </section>

      {/* Products Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        {productsError && <ErrorMessage error={productsError} onRetry={refetch} />}
        {products && Array.isArray(products) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product: any) => (
              <div key={product.id} className="border p-4 rounded">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-green-600 font-bold">
                  ${product.price_range?.min} - ${product.price_range?.max}
                </p>
                {product.variants && product.variants[0] && (
                  <button
                    onClick={() => handleAddToCart(product.variants[0].id as number)}
                    disabled={addingToCart}
                    className="mt-2 bg-green-500 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                  >
                    {addingToCart ? 'Adding...' : 'Add to Cart'}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
        {featuredProducts && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="border p-3 rounded">
                <h4 className="font-medium text-sm">{product.name}</h4>
                <p className="text-xs text-gray-600 truncate">{product.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Cart Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Cart</h2>
        {cart && (
          <div className="bg-gray-100 p-4 rounded">
            <p>Total Items: {(cart as any).total_items || 0}</p>
            <p>Total Amount: ${(cart as any).total_amount || 0}</p>
            {(cart as any).items && (cart as any).items.length > 0 && (
              <div className="mt-2">
                <h4 className="font-medium">Items:</h4>
                <ul className="list-disc list-inside">
                  {(cart as any).items.map((item: any) => (
                    <li key={item.id}>
                      {item.variant?.name} - Qty: {item.quantity} - ${item.total_price}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default UnifiedApiExample;