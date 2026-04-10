export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
          user_email: string
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
          user_email: string
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          user_email?: string
          user_id?: string
        }
        Relationships: []
      }
      admin_emails: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      inventory: {
        Row: {
          attributes: Json | null
          brand: string | null
          category: string | null
          created_at: string
          description: string | null
          description_en: string | null
          id: string
          image_url: string | null
          images: Json | null
          is_active: boolean
          min_quantity: number
          model: string | null
          original_price: number | null
          price_updated_at: string | null
          product_name: string
          quantity: number
          sale_price: number | null
          sku: string | null
          title_en: string | null
          unit_price: number | null
          updated_at: string
        }
        Insert: {
          attributes?: Json | null
          brand?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          description_en?: string | null
          id?: string
          image_url?: string | null
          images?: Json | null
          is_active?: boolean
          min_quantity?: number
          model?: string | null
          original_price?: number | null
          price_updated_at?: string | null
          product_name: string
          quantity?: number
          sale_price?: number | null
          sku?: string | null
          title_en?: string | null
          unit_price?: number | null
          updated_at?: string
        }
        Update: {
          attributes?: Json | null
          brand?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          description_en?: string | null
          id?: string
          image_url?: string | null
          images?: Json | null
          is_active?: boolean
          min_quantity?: number
          model?: string | null
          original_price?: number | null
          price_updated_at?: string | null
          product_name?: string
          quantity?: number
          sale_price?: number | null
          sku?: string | null
          title_en?: string | null
          unit_price?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      inventory_snapshots: {
        Row: {
          created_at: string
          data: Json
          id: string
          product_count: number
          snapshot_at: string
        }
        Insert: {
          created_at?: string
          data: Json
          id?: string
          product_count?: number
          snapshot_at?: string
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          product_count?: number
          snapshot_at?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          email: string | null
          full_name: string
          id: string
          message: string | null
          notes: string | null
          phone: string | null
          product_interest: string | null
          source: Database["public"]["Enums"]["lead_source"]
          status: Database["public"]["Enums"]["lead_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          message?: string | null
          notes?: string | null
          phone?: string | null
          product_interest?: string | null
          source?: Database["public"]["Enums"]["lead_source"]
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          message?: string | null
          notes?: string | null
          phone?: string | null
          product_interest?: string | null
          source?: Database["public"]["Enums"]["lead_source"]
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
        }
        Relationships: []
      }
      leave_requests: {
        Row: {
          admin_note: string | null
          branch: string
          created_at: string
          decided_at: string | null
          end_date: string
          full_name: string
          id: string
          leave_type: string
          note: string | null
          start_date: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          admin_note?: string | null
          branch?: string
          created_at?: string
          decided_at?: string | null
          end_date: string
          full_name: string
          id?: string
          leave_type?: string
          note?: string | null
          start_date: string
          status?: string
          title?: string
          updated_at?: string
        }
        Update: {
          admin_note?: string | null
          branch?: string
          created_at?: string
          decided_at?: string | null
          end_date?: string
          full_name?: string
          id?: string
          leave_type?: string
          note?: string | null
          start_date?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      order_snapshots: {
        Row: {
          created_at: string
          data: Json
          id: string
          order_count: number
          snapshot_at: string
        }
        Insert: {
          created_at?: string
          data: Json
          id?: string
          order_count?: number
          snapshot_at?: string
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          order_count?: number
          snapshot_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          customer_email: string | null
          customer_name: string
          customer_phone: string | null
          id: string
          items: Json
          notes: string | null
          order_number: string
          payment_auth_code: string | null
          payment_method: string | null
          payment_trans_id: string | null
          shipping_address: string | null
          status: Database["public"]["Enums"]["order_status"]
          total_amount: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_email?: string | null
          customer_name: string
          customer_phone?: string | null
          id?: string
          items?: Json
          notes?: string | null
          order_number: string
          payment_auth_code?: string | null
          payment_method?: string | null
          payment_trans_id?: string | null
          shipping_address?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          total_amount?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string | null
          id?: string
          items?: Json
          notes?: string | null
          order_number?: string
          payment_auth_code?: string | null
          payment_method?: string | null
          payment_trans_id?: string | null
          shipping_address?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          total_amount?: number
          updated_at?: string
        }
        Relationships: []
      }
      service_requests: {
        Row: {
          address: string | null
          brand: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          issue_description: string
          phone: string
          preferred_date: string | null
          product_type: string | null
          source: Database["public"]["Enums"]["lead_source"]
          status: Database["public"]["Enums"]["service_status"]
          technician_notes: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          brand?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          issue_description: string
          phone: string
          preferred_date?: string | null
          product_type?: string | null
          source?: Database["public"]["Enums"]["lead_source"]
          status?: Database["public"]["Enums"]["service_status"]
          technician_notes?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          brand?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          issue_description?: string
          phone?: string
          preferred_date?: string | null
          product_type?: string | null
          source?: Database["public"]["Enums"]["lead_source"]
          status?: Database["public"]["Enums"]["service_status"]
          technician_notes?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      service_snapshots: {
        Row: {
          created_at: string
          data: Json
          id: string
          request_count: number
          snapshot_at: string
        }
        Insert: {
          created_at?: string
          data: Json
          id?: string
          request_count?: number
          snapshot_at?: string
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          request_count?: number
          snapshot_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      inventory_public: {
        Row: {
          attributes: Json | null
          brand: string | null
          category: string | null
          description: string | null
          description_en: string | null
          id: string | null
          image_url: string | null
          images: Json | null
          is_active: boolean | null
          model: string | null
          original_price: number | null
          product_name: string | null
          quantity: number | null
          sale_price: number | null
          sku: string | null
          title_en: string | null
          updated_at: string | null
        }
        Insert: {
          attributes?: Json | null
          brand?: string | null
          category?: string | null
          description?: string | null
          description_en?: string | null
          id?: string | null
          image_url?: string | null
          images?: Json | null
          is_active?: boolean | null
          model?: string | null
          original_price?: number | null
          product_name?: string | null
          quantity?: number | null
          sale_price?: number | null
          sku?: string | null
          title_en?: string | null
          updated_at?: string | null
        }
        Update: {
          attributes?: Json | null
          brand?: string | null
          category?: string | null
          description?: string | null
          description_en?: string | null
          id?: string | null
          image_url?: string | null
          images?: Json | null
          is_active?: boolean | null
          model?: string | null
          original_price?: number | null
          product_name?: string | null
          quantity?: number | null
          sale_price?: number | null
          sku?: string | null
          title_en?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      check_own_admin_status: { Args: never; Returns: boolean }
      cleanup_old_snapshots: { Args: never; Returns: undefined }
      create_full_backup: { Args: never; Returns: undefined }
      create_inventory_snapshot: { Args: never; Returns: undefined }
      create_order_snapshot: { Args: never; Returns: undefined }
      create_service_snapshot: { Args: never; Returns: undefined }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { check_email: string }; Returns: boolean }
      is_super_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "super_admin" | "admin" | "moderator" | "user"
      lead_source: "zorluplus" | "zorluservis" | "whatsapp" | "phone" | "other"
      lead_status: "new" | "contacted" | "qualified" | "converted" | "lost"
      order_status:
        | "pending"
        | "paid"
        | "shipped"
        | "delivered"
        | "cancelled"
        | "refunded"
      service_status: "pending" | "in_progress" | "completed" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "admin", "moderator", "user"],
      lead_source: ["zorluplus", "zorluservis", "whatsapp", "phone", "other"],
      lead_status: ["new", "contacted", "qualified", "converted", "lost"],
      order_status: [
        "pending",
        "paid",
        "shipped",
        "delivered",
        "cancelled",
        "refunded",
      ],
      service_status: ["pending", "in_progress", "completed", "cancelled"],
    },
  },
} as const
