import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.get("/send-reminders", async (req, res) => {
  const now = new Date().toISOString();

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .lte("reminder_date", now)
    .eq("is_deleted", false)
    .not("email", "is", null);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!tasks || tasks.length === 0) {
    console.log("No tasks found for reminder.");
    return res.json({ message: "No reminders to send." });
  }

  for (const task of tasks) {
    console.log(
      `Attempting to send email to ${task.email} for task "${task.text}"`
    );
    try {
      await transporter.sendMail({
        from: `"Reminder App" <${process.env.EMAIL_USER}>`,
        to: task.email,
        subject: "Task Reminder",
        text: `Don't forget: ${task.text}`,
      });
      console.log(`Email sent to ${task.email}`);
    } catch (err) {
      console.error(`Error sending email to ${task.email}:`, err);
    }
  }

  res.json({ message: "Email attempts finished." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));