import React, { useState, useCallback, useEffect } from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import {
  PlusIcon,
  SettingsIcon,
  TrashIcon,
  GripVerticalIcon,
  EditIcon,
  SaveIcon,
  XIcon
} from 'lucide-react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

export interface DashboardWidget {
  id: string;
  type: 'metric' | 'chart' | 'table' | 'map' | 'realtime' | 'custom';
  title: string;
  component: React.ComponentType<Record<string, unknown>>;
  props?: Record<string, unknown>;
  config?: {
    refreshInterval?: number;
    showHeader?: boolean;
    exportable?: boolean;
    resizable?: boolean;
  };
  layout: {
    x: number;
    y: number;
    w: number;
    h: number;
    minW?: number;
    minH?: number;
    maxW?: number;
    maxH?: number;
  };
}

export interface WidgetTemplate {
  id: string;
  name: string;
  description: string;
  type: DashboardWidget['type'];
  component: React.ComponentType<Record<string, unknown>>;
  defaultProps?: Record<string, unknown>;
  defaultLayout: Omit<DashboardWidget['layout'], 'x' | 'y'>;
  icon: React.ReactNode;
  category: 'analytics' | 'sales' | 'users' | 'inventory' | 'custom';
}

export interface CustomizableDashboardProps {
  widgets: DashboardWidget[];
  widgetTemplates: WidgetTemplate[];
  editable?: boolean;
  onWidgetsChange?: (widgets: DashboardWidget[]) => void;
  onSave?: (layout: DashboardWidget[]) => void;
  className?: string;
}

export const CustomizableDashboard: React.FC<CustomizableDashboardProps> = ({
  widgets: initialWidgets,
  widgetTemplates,
  editable = true,
  onWidgetsChange,
  onSave,
  className = ''
}) => {
  const [widgets, setWidgets] = useState<DashboardWidget[]>(initialWidgets);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showWidgetLibrary, setShowWidgetLibrary] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [editingWidget, setEditingWidget] = useState<string | null>(null);

  useEffect(() => {
    setWidgets(initialWidgets);
  }, [initialWidgets]);

  useEffect(() => {
    if (onWidgetsChange) {
      onWidgetsChange(widgets);
    }
  }, [widgets, onWidgetsChange]);

  const handleLayoutChange = useCallback((layout: Layout[]) => {
    if (!isEditMode) return;

    setWidgets(prevWidgets => 
      prevWidgets.map(widget => {
        const layoutItem = layout.find(item => item.i === widget.id);
        if (layoutItem) {
          return {
            ...widget,
            layout: {
              ...widget.layout,
              x: layoutItem.x,
              y: layoutItem.y,
              w: layoutItem.w,
              h: layoutItem.h
            }
          };
        }
        return widget;
      })
    );
  }, [isEditMode]);

  const addWidget = (template: WidgetTemplate) => {
    const newWidget: DashboardWidget = {
      id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: template.type,
      title: template.name,
      component: template.component,
      props: template.defaultProps || {},
      config: {
        refreshInterval: 30000,
        showHeader: true,
        exportable: true,
        resizable: true
      },
      layout: {
        ...template.defaultLayout,
        x: 0,
        y: 0
      }
    };

    // Find the best position for the new widget
    const occupiedPositions = widgets.map(w => ({
      x: w.layout.x,
      y: w.layout.y,
      w: w.layout.w,
      h: w.layout.h
    }));

    let bestPosition = { x: 0, y: 0 };
    let found = false;

    // Try to find an empty spot
    for (let y = 0; y < 20 && !found; y++) {
      for (let x = 0; x <= 12 - newWidget.layout.w && !found; x++) {
        const conflicts = occupiedPositions.some(pos => 
          x < pos.x + pos.w && x + newWidget.layout.w > pos.x &&
          y < pos.y + pos.h && y + newWidget.layout.h > pos.y
        );
        
        if (!conflicts) {
          bestPosition = { x, y };
          found = true;
        }
      }
    }

    newWidget.layout.x = bestPosition.x;
    newWidget.layout.y = bestPosition.y;

    setWidgets(prev => [...prev, newWidget]);
    setShowWidgetLibrary(false);
  };

  const removeWidget = (widgetId: string) => {
    setWidgets(prev => prev.filter(w => w.id !== widgetId));
    setSelectedWidget(null);
  };

  const duplicateWidget = (widgetId: string) => {
    const widget = widgets.find(w => w.id === widgetId);
    if (!widget) return;

    const newWidget: DashboardWidget = {
      ...widget,
      id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: `${widget.title} (Copy)`,
      layout: {
        ...widget.layout,
        x: Math.min(widget.layout.x + 1, 12 - widget.layout.w),
        y: widget.layout.y + 1
      }
    };

    setWidgets(prev => [...prev, newWidget]);
  };

  const updateWidgetSettings = (widgetId: string, settings: Record<string, unknown>) => {
    setWidgets(prev => 
      prev.map(widget => 
        widget.id === widgetId 
          ? { ...widget, ...settings }
          : widget
      )
    );
  };

  const handleSave = () => {
    if (onSave) {
      onSave(widgets);
    }
    setIsEditMode(false);
  };

  const generateLayout = (): Layout[] => {
    return widgets.map(widget => ({
      i: widget.id,
      x: widget.layout.x,
      y: widget.layout.y,
      w: widget.layout.w,
      h: widget.layout.h,
      minW: widget.layout.minW,
      minH: widget.layout.minH,
      maxW: widget.layout.maxW,
      maxH: widget.layout.maxH,
      static: !isEditMode
    }));
  };

  const renderWidget = (widget: DashboardWidget) => {
    const WidgetComponent = widget.component;
    
    return (
      <div 
        key={widget.id}
        className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${
          isEditMode ? 'ring-2 ring-blue-200' : ''
        } ${selectedWidget === widget.id ? 'ring-2 ring-blue-500' : ''}`}
        onClick={() => setSelectedWidget(widget.id)}
      >
        {/* Widget Header */}
        {widget.config?.showHeader !== false && (
          <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              {isEditMode && (
                <GripVerticalIcon size={16} className="text-gray-400 cursor-move" />
              )}
              <h3 className="font-medium text-gray-900 text-sm">{widget.title}</h3>
            </div>
            
            <div className="flex items-center gap-1">
              {isEditMode && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingWidget(widget.id);
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded"
                    title="Edit Widget"
                  >
                    <EditIcon size={14} />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateWidget(widget.id);
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded"
                    title="Duplicate Widget"
                  >
                    <PlusIcon size={14} />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeWidget(widget.id);
                    }}
                    className="p-1 text-gray-400 hover:text-red-600 rounded"
                    title="Remove Widget"
                  >
                    <TrashIcon size={14} />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        
        {/* Widget Content */}
        <div className="p-3">
          <WidgetComponent
            {...widget.props}
            widgetId={widget.id}
            isEditMode={isEditMode}
          />
        </div>
      </div>
    );
  };

  const renderWidgetLibrary = () => {
    const categories = Array.from(new Set(widgetTemplates.map(t => t.category)));
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Add Widget</h2>
            <button
              onClick={() => setShowWidgetLibrary(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-md"
            >
              <XIcon size={20} />
            </button>
          </div>
          
          <div className="p-4 overflow-y-auto max-h-[60vh]">
            {categories.map(category => (
              <div key={category} className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide mb-3">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {widgetTemplates
                    .filter(template => template.category === category)
                    .map(template => (
                      <div
                        key={template.id}
                        className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm cursor-pointer transition-all"
                        onClick={() => addWidget(template)}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-blue-600">
                            {template.icon}
                          </div>
                          <h4 className="font-medium text-gray-900">{template.name}</h4>
                        </div>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderWidgetEditor = () => {
    const widget = widgets.find(w => w.id === editingWidget);
    if (!widget) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Edit Widget</h2>
            <button
              onClick={() => setEditingWidget(null)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-md"
            >
              <XIcon size={20} />
            </button>
          </div>
          
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={widget.title}
                onChange={(e) => updateWidgetSettings(widget.id, { title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Refresh Interval (seconds)
              </label>
              <input
                type="number"
                value={(widget.config?.refreshInterval || 30000) / 1000}
                onChange={(e) => updateWidgetSettings(widget.id, {
                  config: {
                    ...widget.config,
                    refreshInterval: parseInt(e.target.value) * 1000
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={widget.config?.showHeader !== false}
                  onChange={(e) => updateWidgetSettings(widget.id, {
                    config: {
                      ...widget.config,
                      showHeader: e.target.checked
                    }
                  })}
                  className="mr-2"
                />
                Show Header
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={widget.config?.exportable !== false}
                  onChange={(e) => updateWidgetSettings(widget.id, {
                    config: {
                      ...widget.config,
                      exportable: e.target.checked
                    }
                  })}
                  className="mr-2"
                />
                Exportable
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200">
            <button
              onClick={() => setEditingWidget(null)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => setEditingWidget(null)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`${className}`}>
      {/* Dashboard Controls */}
      {editable && (
        <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
            {isEditMode && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Edit Mode
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {isEditMode && (
              <button
                onClick={() => setShowWidgetLibrary(true)}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <PlusIcon size={16} />
                Add Widget
              </button>
            )}
            
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                isEditMode
                  ? 'bg-gray-600 text-white hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <SettingsIcon size={16} />
              {isEditMode ? 'Exit Edit' : 'Edit'}
            </button>
            
            {isEditMode && (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <SaveIcon size={16} />
                Save
              </button>
            )}
          </div>
        </div>
      )}

      {/* Dashboard Grid */}
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: generateLayout() }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={60}
        onLayoutChange={handleLayoutChange}
        isDraggable={isEditMode}
        isResizable={isEditMode}
        margin={[16, 16]}
        containerPadding={[0, 0]}
      >
        {widgets.map(renderWidget)}
      </ResponsiveGridLayout>

      {/* Widget Library Modal */}
      {showWidgetLibrary && renderWidgetLibrary()}
      
      {/* Widget Editor Modal */}
      {editingWidget && renderWidgetEditor()}
    </div>
  );
};