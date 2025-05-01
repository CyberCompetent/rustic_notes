use rusqlite::{params, Connection, Result};
use chrono::Utc;
use crate::fetch_data;

#[tauri::command]
pub fn create_workspace(workspace_name: String) -> Result<String, String> {
    // Open the database connection
    let conn = Connection::open("rustic_notes.db").map_err(|e| e.to_string())?;

    // Get the current timestamp for created_at and updated_at
    let now = Utc::now();
    let created_at = now.to_rfc3339(); // Format the timestamp in RFC 3339 (ISO 8601)
    let updated_at = created_at.clone();

    // Insert new workspace
    conn.execute(
        "INSERT INTO workspaces (workspace_name, created_at, updated_at)
        VALUES (?1, ?2, ?3)",
        params![workspace_name, created_at, updated_at],
    )
    .map_err(|e| e.to_string())?;
    
    println!("Workspace '{}' created successfully!", workspace_name);
    // Call the fetch_and_display_data function to fetch and display the data
    if let Err(e) = fetch_data::fetch_and_display_data() {
        eprintln!("Failed to fetch and display data: {}", e);
    }

    // Return a success message
    Ok(format!("Workspace '{}' created successfully!", workspace_name))
}
