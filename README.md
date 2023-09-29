# DevGarden

## Diagrammes de classes

- Repository

```plantuml
enum Role/Permission
class Membre
class Repository
class RemotePlatform
class File

Role/Permission --> Membre
Membre -- Repository
Repository -- RemotePlatform
Repository -- File

```