/************
 *
 *   Entity
 *
 *   Published blueprints for user created 3D objects.
 *   
 *
 ************/

CREATE TABLE entity(
    id         INTEGER PRIMARY KEY,
    name       TEXT,
    radius     REAL,
    components LONGTEXT,
    created_by INTEGER,
    FOREIGN KEY(mesh_id) REFERENCES mesh(id),
    FOREIGN KEY(material_id) REFERENCES material(id)
);