# DevGarden

## Diagrammes de classes

- Repository

```plantuml
enum Permission
class Membre
class Repository
class RemotePlatform
class File

Permission --> Membre
Membre -- Repository
Repository -- RemotePlatform
Repository -- File

```