create database productivity_dashboard
    with
    owner = postgres
    encoding = 'utf8'
    connection limit = -1
    is_template = false;

create table users (
  id serial primary key,
  name varchar(100),
  email varchar(100) unique not null,
  password_hash varchar(255) not null,
  is_verified boolean default false,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);

create table verification_codes (
    id serial primary key,
    user_id int references users(id) on delete cascade,
    code char(6) not null check (code ~ '^\d{6}$'),
    expires_at timestamp not null,
    created_at timestamp default now()
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'inactive'
  CHECK (status IN ('inactive', 'active', 'completed', 'archived')),
  weight INT DEFAULT 0 CHECK (weight >= 0 AND weight <= 100),
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE goals (
  id SERIAL PRIMARY KEY,
  project_id INT REFERENCES projects(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'inactive'
  CHECK (status IN ('inactive', 'in_progress', 'completed')),
  weight INT DEFAULT 0 CHECK (weight >= 0 AND weight <= 100),
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  goal_id INT REFERENCES goals(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'inactive'
  CHECK (status IN ('inactive', 'active', 'completed')),
  is_completed BOOLEAN DEFAULT FALSE,
  weight INT DEFAULT 0 CHECK (weight >= 0 AND weight <= 100),
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table notes (
  id serial primary key,
  user_id int references users(id),
  title varchar(255),
  content text,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);

create table pomodoro_sessions (
  id serial primary key,
  user_id int references users(id),
  task_name varchar(255),
  duration_minutes int,
  completed boolean default true,
  session_date date default current_date
);

create table quote_views (
  id serial primary key,
  user_id int references users(id),
  quote_text text,
  author varchar(100),
  viewed_at timestamp default current_timestamp
);

create table weather_logs (
  id serial primary key,
  user_id int references users(id),
  city varchar(100),
  temperature decimal,
  weather_condition varchar(50),
  logged_at timestamp default current_timestamp
);

CREATE INDEX idx_projects_user ON projects(user_id);
CREATE INDEX idx_goals_project ON goals(project_id);
CREATE INDEX idx_todos_goal ON todos(goal_id);