use rusqlite::{Connection, Result};
use std::path::PathBuf;

/// Initializes the database and creates necessary tables
pub fn init_db() -> Result<Connection> {
    let db_path = PathBuf::from("rustic_notes.db");
    let conn = Connection::open(db_path)?;

    // Enable foreign key support in SQLite
    conn.execute("PRAGMA foreign_keys = ON;", [])?;

    // User Session table
    conn.execute(
        "CREATE TABLE IF NOT EXISTS user_session (
            user_id INTEGER PRIMARY KEY,
            username TEXT NOT NULL,
            profile_picture TEXT,
            theme TEXT CHECK(theme IN ('modern_midnight', 'deep_ice', 'rustic_woods', 'golden_sahara')),
            mode TEXT CHECK(mode IN ('dark', 'light'))
        )",
        [],
    )?;

    // Workspaces table
    conn.execute(
        "CREATE TABLE IF NOT EXISTS workspaces (
            workspace_id INTEGER PRIMARY KEY,
            workspace_name TEXT NOT NULL,
            workspace_svg TEXT,
            key BLOB,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL
        )",
        [],
    )?;

    // Notepages table without foreign key constraint
    conn.execute(
        "CREATE TABLE IF NOT EXISTS notepages (
            note_id INTEGER PRIMARY KEY,
            note_name TEXT NOT NULL,
            note_content TEXT,
            workspace_id INTEGER,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL
        )",
        [],
    )?;

    Ok(conn)
}