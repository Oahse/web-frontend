import React, { useState } from 'react';
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Grid,
  Container,
  Section,
  Navigation,
  Breadcrumb,
  ThemeToggle,
  ThemeIndicator,
} from '../components/ui';
import { useTheme } from '../contexts/ThemeContext';
import { 
  HeartIcon, 
  ShoppingCartIcon, 
  SearchIcon,
  StarIcon,
  CheckIcon,
  XIcon,
  InfoIcon,
  AlertTriangleIcon,
  AlertCircleIcon,
} from 'lucide-react';

export const ThemeDemo: React.FC = () => {
  const { currentTheme } = useTheme();
  const [inputValue, setInputValue] = useState('');

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products', badge: 'New' },
    { 
      label: 'Categories', 
      href: '/categories',
      children: [
        { label: 'Electronics', href: '/categories/electronics' },
        { label: 'Clothing', href: '/categories/clothing' },
        { label: 'Books', href: '/categories/books' },
      ]
    },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Theme Demo' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Container size="2xl" padding="lg">
        <Section padding="lg">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-copy mb-4">
              Comprehensive Theming System
            </h1>
            <p className="text-lg text-copy-light max-w-2xl mx-auto mb-8">
              A complete design system with consistent colors, semantic meanings, 
              and responsive behavior across all components.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ThemeToggle variant="buttons" showLabels />
              <ThemeIndicator />
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="mb-8">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {/* Navigation Demo */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Responsive Navigation</CardTitle>
              <CardDescription>
                Navigation that adapts to screen size with consistent styling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Navigation 
                items={navigationItems}
                variant="pills"
                size="md"
              />
            </CardContent>
          </Card>

          {/* Button Variants */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>
                Consistent interactive states with semantic colors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Grid cols={3} gap="md" responsive>
                <div className="space-y-4">
                  <h4 className="font-semibold text-copy">Primary Actions</h4>
                  <div className="space-y-2">
                    <Button variant="primary" fullWidth>Primary</Button>
                    <Button variant="secondary" fullWidth>Secondary</Button>
                    <Button variant="outline" fullWidth>Outline</Button>
                    <Button variant="ghost" fullWidth>Ghost</Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-copy">Semantic Actions</h4>
                  <div className="space-y-2">
                    <Button variant="success" fullWidth leftIcon={<CheckIcon className="w-4 h-4" />}>
                      Success
                    </Button>
                    <Button variant="warning" fullWidth leftIcon={<AlertTriangleIcon className="w-4 h-4" />}>
                      Warning
                    </Button>
                    <Button variant="danger" fullWidth leftIcon={<XIcon className="w-4 h-4" />}>
                      Danger
                    </Button>
                    <Button variant="info" fullWidth leftIcon={<InfoIcon className="w-4 h-4" />}>
                      Info
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-copy">Sizes & States</h4>
                  <div className="space-y-2">
                    <Button size="xs" fullWidth>Extra Small</Button>
                    <Button size="sm" fullWidth>Small</Button>
                    <Button size="md" fullWidth>Medium</Button>
                    <Button size="lg" fullWidth>Large</Button>
                    <Button size="xl" fullWidth>Extra Large</Button>
                    <Button disabled fullWidth>Disabled</Button>
                    <Button isLoading fullWidth>Loading</Button>
                  </div>
                </div>
              </Grid>
            </CardContent>
          </Card>

          {/* Form Components */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Form Components</CardTitle>
              <CardDescription>
                Consistent form styling with validation states
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Grid cols={2} gap="lg" responsive>
                <div className="space-y-4">
                  <Input
                    label="Default Input"
                    placeholder="Enter text..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    helperText="This is helper text"
                  />
                  
                  <Input
                    label="Input with Icon"
                    placeholder="Search..."
                    leftIcon={<SearchIcon className="w-4 h-4" />}
                  />
                  
                  <Input
                    label="Success State"
                    placeholder="Valid input"
                    success="This input is valid!"
                    rightIcon={<CheckIcon className="w-4 h-4" />}
                  />
                  
                  <Input
                    label="Error State"
                    placeholder="Invalid input"
                    error="This field is required"
                    rightIcon={<AlertCircleIcon className="w-4 h-4" />}
                  />
                </div>
                
                <div className="space-y-4">
                  <Input
                    label="Small Size"
                    size="sm"
                    placeholder="Small input"
                  />
                  
                  <Input
                    label="Large Size"
                    size="lg"
                    placeholder="Large input"
                  />
                  
                  <Input
                    label="Filled Variant"
                    variant="filled"
                    placeholder="Filled input"
                  />
                  
                  <Input
                    label="Outlined Variant"
                    variant="outlined"
                    placeholder="Outlined input"
                  />
                </div>
              </Grid>
            </CardContent>
          </Card>

          {/* Card Variants */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Card Variants</CardTitle>
              <CardDescription>
                Different card styles for various use cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Grid cols={2} gap="md" responsive>
                <Card variant="default" hover>
                  <CardHeader>
                    <CardTitle>Default Card</CardTitle>
                    <CardDescription>Standard card with border</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-copy-light">
                      This is a default card with hover effects.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm">Action</Button>
                  </CardFooter>
                </Card>
                
                <Card variant="elevated" interactive>
                  <CardHeader>
                    <CardTitle>Elevated Card</CardTitle>
                    <CardDescription>Card with shadow elevation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-copy-light">
                      This is an elevated card with interactive states.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" variant="outline">Action</Button>
                  </CardFooter>
                </Card>
                
                <Card variant="outlined" padding="lg">
                  <CardHeader>
                    <CardTitle>Outlined Card</CardTitle>
                    <CardDescription>Card with strong border</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-copy-light">
                      This is an outlined card with larger padding.
                    </p>
                  </CardContent>
                </Card>
                
                <Card variant="filled" rounded="xl">
                  <CardHeader>
                    <CardTitle>Filled Card</CardTitle>
                    <CardDescription>Card with background fill</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-copy-light">
                      This is a filled card with extra rounded corners.
                    </p>
                  </CardContent>
                </Card>
              </Grid>
            </CardContent>
          </Card>

          {/* Product Card Example */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Product Card Example</CardTitle>
              <CardDescription>
                Real-world example showing consistent theming
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Grid cols="auto" gap="md">
                {[1, 2, 3, 4].map((item) => (
                  <Card key={item} variant="default" hover interactive className="group">
                    <div className="aspect-square bg-surface-hover rounded-t-lg mb-4 flex items-center justify-center">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                        <ShoppingCartIcon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <CardContent padding="md">
                      <h3 className="font-semibold text-copy mb-2 group-hover:text-primary transition-colors">
                        Product {item}
                      </h3>
                      <p className="text-copy-light text-sm mb-3">
                        High-quality product with excellent features and great value.
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold text-copy">$99.99</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon 
                              key={i} 
                              className={`w-4 h-4 ${i < 4 ? 'text-warning fill-current' : 'text-copy-muted'}`} 
                            />
                          ))}
                          <span className="text-sm text-copy-light ml-1">(24)</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" fullWidth>
                          Add to Cart
                        </Button>
                        <Button size="sm" variant="ghost">
                          <HeartIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Color Palette */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
              <CardDescription>
                Semantic color system with consistent usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Grid cols={4} gap="md" responsive>
                <div>
                  <h4 className="font-semibold text-copy mb-3">Brand Colors</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded"></div>
                      <span className="text-sm text-copy">Primary</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-secondary rounded"></div>
                      <span className="text-sm text-copy">Secondary</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-copy mb-3">Semantic Colors</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-success rounded"></div>
                      <span className="text-sm text-copy">Success</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-warning rounded"></div>
                      <span className="text-sm text-copy">Warning</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-error rounded"></div>
                      <span className="text-sm text-copy">Error</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-info rounded"></div>
                      <span className="text-sm text-copy">Info</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-copy mb-3">Surface Colors</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-background border border-border rounded"></div>
                      <span className="text-sm text-copy">Background</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-surface border border-border rounded"></div>
                      <span className="text-sm text-copy">Surface</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-surface-elevated border border-border rounded"></div>
                      <span className="text-sm text-copy">Elevated</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-copy mb-3">Text Colors</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-copy rounded"></div>
                      <span className="text-sm text-copy">Primary</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-copy-light rounded"></div>
                      <span className="text-sm text-copy">Secondary</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-copy-muted rounded"></div>
                      <span className="text-sm text-copy">Muted</span>
                    </div>
                  </div>
                </div>
              </Grid>
            </CardContent>
          </Card>

          {/* Theme Information */}
          <Card>
            <CardHeader>
              <CardTitle>Current Theme: {currentTheme}</CardTitle>
              <CardDescription>
                Theme persists across sessions and syncs with user preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-copy mb-2">Features</h4>
                  <ul className="text-sm text-copy-light space-y-1">
                    <li>• Automatic system theme detection</li>
                    <li>• Persistent theme preferences</li>
                    <li>• Smooth theme transitions</li>
                    <li>• Consistent color semantics</li>
                    <li>• Responsive design system</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-copy mb-2">Components</h4>
                  <ul className="text-sm text-copy-light space-y-1">
                    <li>• Unified button variants</li>
                    <li>• Consistent form styling</li>
                    <li>• Responsive navigation</li>
                    <li>• Flexible card layouts</li>
                    <li>• Grid system</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-copy mb-2">Accessibility</h4>
                  <ul className="text-sm text-copy-light space-y-1">
                    <li>• WCAG compliant contrast</li>
                    <li>• Focus management</li>
                    <li>• Screen reader support</li>
                    <li>• Keyboard navigation</li>
                    <li>• Semantic HTML</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>
      </Container>
    </div>
  );
};