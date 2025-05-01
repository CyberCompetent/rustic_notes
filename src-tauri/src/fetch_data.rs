use rusqlite:: Result;
use crate::database; // fetch init_db from `database.rs`

pub fn fetch_and_display_data() -> Result<()> {
    let conn = database::init_db()?;

    // Fetch from user_session
    let mut stmt = conn.prepare("SELECT user_id, username, profile_picture, theme, mode FROM user_session")?;
    let user_iter = stmt.query_map([], |row| {
        Ok((
            row.get::<_, i32>(0)?,
            row.get::<_, String>(1)?,
            row.get::<_, Option<String>>(2)?,
            row.get::<_, Option<String>>(3)?,
            row.get::<_, Option<String>>(4)?,
        ))
    })?;

    println!("\n=== User Sessions ===");
    for user in user_iter {
        let (id, username, picture, theme, mode) = user?;
        println!(
            "ID: {}, Username: {}, Picture: {:?}, Theme: {:?}, Mode: {:?}",
            id, username, picture, theme, mode
        );
    }

    // Fetch from workspaces
    let mut stmt = conn.prepare("SELECT workspace_id, workspace_name, workspace_svg, key, created_at, updated_at FROM workspaces")?;
    let ws_iter = stmt.query_map([], |row| {
        Ok((
            row.get::<_, i32>(0)?,
            row.get::<_, String>(1)?,
            row.get::<_, Option<String>>(2)?,
            row.get::<_, Option<Vec<u8>>>(3)?,
            row.get::<_, String>(4)?,
            row.get::<_, String>(5)?,
        ))
    })?;

    println!("\n=== Workspaces ===");
    for ws in ws_iter {
        let (id, name, svg, key, created, updated) = ws?;
        println!(
            "ID: {}, Name: {}, SVG: {:?}, Key: {:?}, Created: {}, Updated: {}",
            id, name, svg, key, created, updated
        );
    }

    // Fetch from notepages
    let mut stmt = conn.prepare("SELECT note_id, note_name, note_content, workspace_id, created_at, updated_at FROM notepages")?;
    let note_iter = stmt.query_map([], |row| {
        Ok((
            row.get::<_, i32>(0)?,
            row.get::<_, String>(1)?,
            row.get::<_, Option<String>>(2)?,
            row.get::<_, Option<i32>>(3)?,
            row.get::<_, String>(4)?,
            row.get::<_, String>(5)?,
        ))
    })?;

    println!("\n=== Notepages ===");
    for note in note_iter {
        let (id, name, content, ws_id, created, updated) = note?;
        println!(
            "ID: {}, Name: {}, Content: {:?}, Workspace ID: {:?}, Created: {}, Updated: {}",
            id, name, content, ws_id, created, updated
        );
    }

    Ok(())
}