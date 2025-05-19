import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://utlkvkosbsooldkkurtm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0bGt2a29zYnNvb2xka2t1cnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzgwMTMsImV4cCI6MjA2Mjk1NDAxM30.OWfZk6tGfTgWRiIvGnF-1OJTpYH5SpLEWV7ENiLHq9Y";

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 