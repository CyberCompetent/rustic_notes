use rusqlite::{Connection, Result};
use chrono::Utc;

/// Inserts test data into user_session, workspaces, and notepages tables.
pub fn insert_test_data(conn: &Connection) -> Result<()> {
    // Insert test user
    conn.execute(
        "INSERT INTO user_session (user_id, username, profile_picture, theme, mode)
         VALUES (?1, ?2, ?3, ?4, ?5)",
        (1, "test_user", "default.png", "rustic_woods", "dark"),
    )?;

    // Insert test workspace
    let now = Utc::now().to_rfc3339();
    conn.execute(
        "INSERT INTO workspaces (workspace_id, workspace_name, workspace_svg, key, created_at, updated_at)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
        (
            1,
            "Test Workspace",
            "<svg>...</svg>",
            vec![0_u8; 32], // Dummy key
            &now,
            &now,
        ),
    )?;

    // Insert test note
    conn.execute(
        "INSERT INTO notepages (note_id, note_name, note_content, workspace_id, created_at, updated_at)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
        (
            1,
            "Welcome Note",
            r#"{"blocks":[{"type":"text","content":"Welcome to your workspace!"}]}"#,
            1,
            &now,
            &now,
        ),
    )?;

    Ok(())
}
