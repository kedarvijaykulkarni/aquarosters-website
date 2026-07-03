// Input shapes for the two public lead-capture tables in Supabase
// (see supabase/migrations/0001_contact_and_design_partner_forms.sql).
// `source_page` and `user_agent` are populated by the submit helpers in
// lib/supabase/forms.ts, not by the forms themselves.

export type ContactSubmissionInput = {
  name: string;
  business_name?: string;
  email: string;
  website?: string;
  country?: string;
  business_type?: string;
  message: string;
  source_page?: string;
  user_agent?: string;
};

export type DesignPartnerApplicationInput = {
  name: string;
  business_name: string;
  email: string;
  country?: string;
  business_type?: string;
  number_of_staff?: string;
  current_tools_used?: string;
  biggest_operational_problem: string;
  source_page?: string;
  user_agent?: string;
};
