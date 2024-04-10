# DevGarden

## :calendar: Last Meeting Notes
* https://codefirst.iut.uca.fr/git/DevGarden/DevGarden/wiki/reu180124

## Unhandled Package Warnings
```
warning @expo/webpack-config > source-map-loader > abab@2.0.6: Use your platform's native atob() and btoa() methods instead
warning @expo/webpack-config > webpack-dev-server > webpack-dev-middleware > memfs@3.6.0: this will be v4
warning @expo/webpack-config > css-minimizer-webpack-plugin > cssnano > cssnano-preset-default > postcss-svgo > svgo > stable@0.1.8: Modern JS already guarantees Array#sort() is a stable sort, so this library is deprecated. See the compatibility table on MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#browser_compatibility
```


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
class Membre

note "Refers to the class Member in Repository's diagram" as N1

WBS --o Task
Task <|-- PertTask
PertTask o-- PertTask
PertTask <|-- GanttTask
PertTask --o Member
Member .. N1

```

- Parser

```plantuml

interface IParser{

}
class GithubParser
class GitLabParser
class GiteaParser

note "Abstract method for each class in Repository's diagram" as N1

IParser .. N1
GiteaParser ..|> IParser
GithubParser ..|> IParser
GitLabParser ..|> IParser

```