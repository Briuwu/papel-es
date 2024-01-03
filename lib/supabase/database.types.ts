export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      address: {
        Row: {
          barangay: string | null
          city: string | null
          created_at: string
          id: string
          profile_id: string
          province: string | null
          street: string | null
          subdivision: string | null
        }
        Insert: {
          barangay?: string | null
          city?: string | null
          created_at?: string
          id?: string
          profile_id: string
          province?: string | null
          street?: string | null
          subdivision?: string | null
        }
        Update: {
          barangay?: string | null
          city?: string | null
          created_at?: string
          id?: string
          profile_id?: string
          province?: string | null
          street?: string | null
          subdivision?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "address_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      barangay_clearance_request: {
        Row: {
          created_at: string
          document_id: string | null
          id: string
          profile_id: string | null
          purpose: string | null
        }
        Insert: {
          created_at?: string
          document_id?: string | null
          id?: string
          profile_id?: string | null
          purpose?: string | null
        }
        Update: {
          created_at?: string
          document_id?: string | null
          id?: string
          profile_id?: string | null
          purpose?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "barangay_clearance_request_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barangay_clearance_request_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      barangay_id_request: {
        Row: {
          created_at: string
          document_id: string | null
          emergency_id: string | null
          id: string
          profile_id: string | null
          proof_id: string | null
        }
        Insert: {
          created_at?: string
          document_id?: string | null
          emergency_id?: string | null
          id?: string
          profile_id?: string | null
          proof_id?: string | null
        }
        Update: {
          created_at?: string
          document_id?: string | null
          emergency_id?: string | null
          id?: string
          profile_id?: string | null
          proof_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "barangay_id_request_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barangay_id_request_emergency_id_fkey"
            columns: ["emergency_id"]
            isOneToOne: false
            referencedRelation: "emergency_contact"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barangay_id_request_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      documents: {
        Row: {
          created_at: string
          document_type: Database["public"]["Enums"]["document_types"] | null
          id: string
          profile_id: string | null
          status: Database["public"]["Enums"]["document_status"] | null
        }
        Insert: {
          created_at?: string
          document_type?: Database["public"]["Enums"]["document_types"] | null
          id?: string
          profile_id?: string | null
          status?: Database["public"]["Enums"]["document_status"] | null
        }
        Update: {
          created_at?: string
          document_type?: Database["public"]["Enums"]["document_types"] | null
          id?: string
          profile_id?: string | null
          status?: Database["public"]["Enums"]["document_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      emergency_contact: {
        Row: {
          address_id: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          middle_name: string | null
          phone_number: string | null
          profile_id: string | null
        }
        Insert: {
          address_id?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          middle_name?: string | null
          phone_number?: string | null
          profile_id?: string | null
        }
        Update: {
          address_id?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          middle_name?: string | null
          phone_number?: string | null
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emergency_contact_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "address"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emergency_contact_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      incident_report_request: {
        Row: {
          created_at: string
          document_id: string | null
          id: string
          incident_location: string | null
          incident_narrative: string | null
          incident_type: string | null
          involved_parties: string[] | null
          profile_id: string | null
        }
        Insert: {
          created_at?: string
          document_id?: string | null
          id?: string
          incident_location?: string | null
          incident_narrative?: string | null
          incident_type?: string | null
          involved_parties?: string[] | null
          profile_id?: string | null
        }
        Update: {
          created_at?: string
          document_id?: string | null
          id?: string
          incident_location?: string | null
          incident_narrative?: string | null
          incident_type?: string | null
          involved_parties?: string[] | null
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "incident_report_request_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incident_report_request_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          address_id: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          first_name: string | null
          id: string
          isVerified: boolean | null
          last_name: string | null
          middle_name: string | null
          phone_number: string | null
        }
        Insert: {
          address_id?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          isVerified?: boolean | null
          last_name?: string | null
          middle_name?: string | null
          phone_number?: string | null
        }
        Update: {
          address_id?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          isVerified?: boolean | null
          last_name?: string | null
          middle_name?: string | null
          phone_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "address"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      document_status: "processing" | "rejected" | "ready"
      document_types: "barangay_id" | "barangay_clearance" | "incident_report"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
