use rusqlite::{Connection, Result};
use serde::Serialize;
use tauri::command;

/// Represents a workspace with a name and type
#[derive(Serialize)]
pub struct Workspace {
    name: String,
    r#type: String, // `type` is a reserved keyword in Rust, so use `r#type`
}

#[command]
pub fn get_workspaces() -> Result<Vec<Workspace>, String> {
    let conn = Connection::open("rustic_notes.db").map_err(|e| e.to_string())?;

    let mut stmt = conn
        .prepare("SELECT workspace_name FROM workspaces")
        .map_err(|e| e.to_string())?;

    let workspaces = stmt
        .query_map([], |row| {
            let name: String = row.get(0)?;
            Ok(Workspace {
                name,
                r#type: "workspace".to_string(),
            })
        })
        .map_err(|e| e.to_string())?
        .collect::<Result<Vec<_>, _>>()
        .map_err(|e| e.to_string())?;

    Ok(workspaces)
}
