import React, { useState } from 'react';
import {
  Skeleton,
  SkeletonCard,
  SkeletonTable,
  SkeletonDashboard,
  SkeletonForm,
  SkeletonNavigation,
  SkeletonHeader
} from '../components/ui/skeletons';
import { useSkeleton } from '../hooks/useSkeleton';

export const SkeletonDemo: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [animation, setAnimation] = useState<'shimmer' | 'pulse' | 'wave'>('shimmer');
  const skeleton = useSkeleton(isLoading);

  const toggleLoading = () => setIsLoading(!isLoading);

  return (
    <div className="min-h-screen bg-background">
      {/* Demo Header */}
      <div className="bg-surface border-b border-border p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-copy mb-4">Skeleton Loading System Demo</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLoading}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              {isLoading ? 'Hide Skeletons' : 'Show Skeletons'}
            </button>
            <select
              value={animation}
              onChange={(e) => setAnimation(e.target.value as any)}
              className="px-3 py-2 border border-border rounded-md bg-surface text-copy"
            >
              <option value="shimmer">Shimmer Animation</option>
              <option value="pulse">Pulse Animation</option>
              <option value="wave">Wave Animation</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-12">
        {/* Basic Skeleton Components */}
        <section>
          <h2 className="text-2xl font-semibold text-copy mb-6">Basic Skeleton Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-copy">Text Variants</h3>
              {skeleton.showSkeleton ? (
                <div className="space-y-3">
                  <Skeleton variant="text" animation={animation} />
                  <Skeleton variant="text" lines={3} animation={animation} />
                  <Skeleton variant="text" width="60%" animation={animation} />
                </div>
              ) : (
                <div className="space-y-3">
                  <p>Single line of text</p>
                  <p>Multiple lines of text content that would normally appear here with various lengths and information.</p>
                  <p>Shorter text</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-copy">Shape Variants</h3>
              {skeleton.showSkeleton ? (
                <div className="space-y-3">
                  <Skeleton variant="rectangular" width="100%" height="40px" animation={animation} />
                  <Skeleton variant="circular" width="40px" height="40px" animation={animation} />
                  <Skeleton variant="rounded" width="80px" height="30px" animation={animation} />
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-primary h-10 rounded-md flex items-center justify-center text-white">Rectangle</div>
                  <div className="bg-secondary w-10 h-10 rounded-full flex items-center justify-center">●</div>
                  <div className="bg-primary-light h-8 w-20 rounded-lg flex items-center justify-center text-white text-sm">Rounded</div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Navigation Skeletons */}
        <section>
          <h2 className="text-2xl font-semibold text-copy mb-6">Navigation Skeletons</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-copy mb-3">Header Navigation</h3>
              {skeleton.showSkeleton ? (
                <SkeletonHeader animation={animation} />
              ) : (
                <div className="bg-surface border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="text-xl font-bold text-primary">Your Logo</div>
                      <nav className="hidden md:flex space-x-4">
                        <a href="#" className="text-copy hover:text-primary">Home</a>
                        <a href="#" className="text-copy hover:text-primary">Products</a>
                        <a href="#" className="text-copy hover:text-primary">About</a>
                        <a href="#" className="text-copy hover:text-primary">Contact</a>
                      </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                      <input type="search" placeholder="Search..." className="px-3 py-2 border border-border rounded-md" />
                      <div className="w-8 h-8 bg-primary rounded-full"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-medium text-copy mb-3">Breadcrumb Navigation</h3>
              {skeleton.showSkeleton ? (
                <SkeletonNavigation variant="breadcrumb" animation={animation} />
              ) : (
                <nav className="flex items-center space-x-2 text-sm text-copy-light">
                  <span>Home</span> / <span>Products</span> / <span className="text-copy">Current Page</span>
                </nav>
              )}
            </div>
          </div>
        </section>

        {/* Card Skeletons */}
        <section>
          <h2 className="text-2xl font-semibold text-copy mb-6">Card Skeletons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skeleton.showSkeleton ? (
              <>
                <SkeletonCard variant="product" animation={animation} />
                <SkeletonCard variant="user" animation={animation} />
                <SkeletonCard variant="order" animation={animation} />
              </>
            ) : (
              <>
                <div className="bg-surface border border-border rounded-lg p-4 space-y-4">
                  <img src="https://via.placeholder.com/300x200" alt="Product" className="w-full h-48 object-cover rounded" />
                  <div>
                    <h3 className="font-semibold text-copy">Product Name</h3>
                    <p className="text-copy-light">Product description goes here</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-primary font-bold">$99.99</span>
                      <button className="px-4 py-2 bg-primary text-white rounded-md">Add to Cart</button>
                    </div>
                  </div>
                </div>
                <div className="bg-surface border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full"></div>
                    <div>
                      <h3 className="font-semibold text-copy">John Doe</h3>
                      <p className="text-copy-light">john@example.com</p>
                    </div>
                  </div>
                </div>
                <div className="bg-surface border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">#12345</span>
                    <span className="px-2 py-1 bg-primary text-white rounded-full text-sm">Shipped</span>
                  </div>
                  <p className="text-copy-light">Order details and information</p>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Form Skeletons */}
        <section>
          <h2 className="text-2xl font-semibold text-copy mb-6">Form Skeletons</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {skeleton.showSkeleton ? (
              <>
                <SkeletonForm layout="vertical" animation={animation} />
                <SkeletonForm layout="grid" animation={animation} />
              </>
            ) : (
              <>
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Contact Form</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-copy mb-1">Name</label>
                      <input type="text" className="w-full px-3 py-2 border border-border rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-copy mb-1">Email</label>
                      <input type="email" className="w-full px-3 py-2 border border-border rounded-md" />
                    </div>
                    <button className="w-full py-2 bg-primary text-white rounded-md">Submit</button>
                  </div>
                </div>
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Registration Form</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" className="px-3 py-2 border border-border rounded-md" />
                    <input type="text" placeholder="Last Name" className="px-3 py-2 border border-border rounded-md" />
                    <input type="email" placeholder="Email" className="col-span-2 px-3 py-2 border border-border rounded-md" />
                    <button className="col-span-2 py-2 bg-primary text-white rounded-md">Register</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Table Skeleton */}
        <section>
          <h2 className="text-2xl font-semibold text-copy mb-6">Table Skeleton</h2>
          {skeleton.showSkeleton ? (
            <SkeletonTable animation={animation} />
          ) : (
            <div className="bg-surface border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-background border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Role</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-light">
                    <td className="px-4 py-3">John Doe</td>
                    <td className="px-4 py-3">john@example.com</td>
                    <td className="px-4 py-3">Admin</td>
                    <td className="px-4 py-3">Active</td>
                    <td className="px-4 py-3">Edit | Delete</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Dashboard Skeleton */}
        <section>
          <h2 className="text-2xl font-semibold text-copy mb-6">Dashboard Skeleton</h2>
          {skeleton.showSkeleton ? (
            <SkeletonDashboard animation={animation} />
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {['Total Sales', 'New Users', 'Orders', 'Revenue'].map((metric) => (
                  <div key={metric} className="bg-surface border border-border rounded-lg p-6">
                    <h3 className="text-sm font-medium text-copy-light">{metric}</h3>
                    <p className="text-2xl font-bold text-copy mt-2">1,234</p>
                    <p className="text-sm text-primary mt-1">+12% from last month</p>
                  </div>
                ))}
              </div>
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-copy mb-4">Sales Chart</h3>
                <div className="h-64 bg-background rounded flex items-center justify-center">
                  <span className="text-copy-light">Chart would be here</span>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};