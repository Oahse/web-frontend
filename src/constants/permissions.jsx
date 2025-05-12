export const rolePermissions = {
    Customer: [
      "view_products",
      "place_orders",
      "view_orders",
      "cancel_orders",
      "view_payments",
      "view_shipments",
      "respond_reviews",
      "view_discounts"
    ],
  
    Driver: [
      "view_orders",
      "view_shipments",
      "update_delivery_status"
    ],
  
    Support: [
      "view_users",
      "view_orders",
      "view_tickets",
      "respond_tickets",
      "close_tickets",
      "moderate_reviews"
    ],
  
    Manager: [
      "view_products",
      "add_products",
      "edit_products",
      "delete_products",
      "view_categories",
      "edit_categories",
      "view_inventory",
      "adjust_inventory",
      "restock_inventory",
      "view_orders",
      "edit_orders",
      "fulfill_orders",
      "view_users",
      "edit_users",
      "view_discounts",
      "create_discounts",
      "edit_discounts",
      "view_sales_reports",
      "view_user_activity"
    ],
  
    Admin: [
      "view_products",
      "add_products",
      "edit_products",
      "manage_products",
      "delete_products",
      "view_categories",
      "add_categories",
      "edit_categories",
      "delete_categories",
      "view_orders",
      "edit_orders",
      "cancel_orders",
      "fulfill_orders",
      "view_users",
      "edit_users",
      "delete_users",
      "ban_users",
      "view_inventory",
      "adjust_inventory",
      "restock_inventory",
      "view_payments",
      "refund_payments",
      "manage_transactions",
      "view_shipments",
      "assign_drivers",
      "manage_shipping_rates",
      "view_discounts",
      "create_discounts",
      "edit_discounts",
      "delete_discounts",
      "moderate_reviews",
      "respond_reviews",
      "view_sales_reports",
      "view_user_activity",
      "export_data",
      "view_settings",
      "edit_settings",
      "view_tickets",
      "respond_tickets",
      "close_tickets",
      "manage_roles",
      "assign_permissions",
      "access_admin_panel"
    ],
  
    Moderator: [
      "view_users",
      "view_orders",
      "moderate_reviews",
      "ban_users"
    ],
  
    SuperAdmin: [
      // Has everything Admin has
      ...new Set([
        "view_products", "add_products", "edit_products", "delete_products",
        "view_categories", "add_categories", "edit_categories", "delete_categories",
        "view_orders", "edit_orders", "cancel_orders", "fulfill_orders",
        "view_users", "edit_users", "delete_users", "ban_users",
        "view_inventory", "adjust_inventory", "restock_inventory",
        "view_payments", "refund_payments", "manage_transactions",
        "view_shipments", "assign_drivers", "manage_shipping_rates",
        "view_discounts", "create_discounts", "edit_discounts", "delete_discounts",
        "moderate_reviews", "respond_reviews",
        "view_sales_reports", "view_user_activity", "export_data",
        "view_settings", "edit_settings",
        "view_tickets", "respond_tickets", "close_tickets",
        "manage_roles", "assign_permissions", "access_admin_panel"
      ])
    ],
  
    GodAdmin: [
      "*"
    ]
  };
  