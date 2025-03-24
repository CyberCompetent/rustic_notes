// types.ts
export type File = any; // Define this according to your application's needs

export type Workspace = {
  name: string;
  type: 'workspace';
  children: File[]; // Adjust this type based on your actual File type
};
