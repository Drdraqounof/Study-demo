-- Neon schema for user logins
CREATE TABLE IF NOT EXISTS user_logins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  login_time TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed data: mock users who have logged in
INSERT INTO user_logins (email, login_time) VALUES
  ('rob@launchpadphilly.org', NOW() - INTERVAL '2 days'),
  ('sanaa@launchpadphilly.org', NOW() - INTERVAL '1 day'),
  ('taheera@launchpadphilly.org', NOW() - INTERVAL '3 hours'),
  ('student1@example.com', NOW() - INTERVAL '5 hours'),
  ('student2@example.com', NOW() - INTERVAL '1 hour');
