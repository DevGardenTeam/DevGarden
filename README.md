# DevGarden

## Diagrammes de classes

- Repository

```plantuml
class Membre
class Repository
class RemotePlatform
class File
class Folder
class Branch
class Commit

/' Enumeration '/
enum Permission

Permission --> Membre
Membre -- Repository
Repository -- RemotePlatform
Repository -- File
File <-- Folder
Repository -- Folder
Repository -- Branch
Branch -- Commit

```