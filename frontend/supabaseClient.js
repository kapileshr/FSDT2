import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xqsxujeuikxacfowxlpx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhxc3h1amV1aWt4YWNmb3d4bHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NzUxNDksImV4cCI6MjA1ODA1MTE0OX0.ohBI3Uo4xBxGF3DdAY2E85z41vI6zGVJKO1lEk0VoYg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);