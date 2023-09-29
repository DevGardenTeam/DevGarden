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
class Issues
class MergeRequest
class Label
class Milestorne


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
Repository -- Issues
Issues --> Label
Issues o-- Milestorne
Label -- MergeRequest
Issues <|-- MergeRequest
Branch <|.. MergeRequest

```

- Gestion de projet

```plantuml

class WBS{
    -tasks : Map<String,Tache>
}
class Task{
    - id : int
    - name : String
}
class PertTask{
    - duree : long
    - priority : int
}
class GanttTask{
    - dateBeg : Date
    - dateEnd : Date
}

WBS --o Task
Task <|-- PertTask
PertTask o-- PertTask
PertTask <|-- GanttTask

```