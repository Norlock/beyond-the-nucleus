module Types exposing (..)

import Dict exposing (Dict)


type alias Model =
    { components : ComponentDict
    , current : Component
    , ui : UI
    }


type alias Component =
    { id : ComponentId
    , container : ChapterData
    , next : List ComponentId
    , previous : Maybe ComponentId
    , game : Maybe String
    , index : Int
    }


type alias UI =
    { dialog : Maybe Dialog
    , highlighted : Maybe Button
    , showCanvasBlur : Bool
    , showGame : Bool
    , showHelp : Bool
    }


type alias ErrorData =
    { title : String
    , message : String
    }


type alias JSComponentData =
    { id : String
    , chapterId : String
    , containerName : String
    , previous : Maybe String
    , next : List String
    , command : String
    }


type alias ChapterData =
    { chapterId : Chapter
    , name : ContainerName
    }


type alias JSComponentCommand =
    { id : String
    , command : String
    }


type alias JSChapterCommand =
    { chapterId : String
    , containerName : String
    , command : String
    }


type alias ComponentDict =
    Dict String Component


type ComponentId
    = Ocean1
    | Ocean2
    | Ocean3
    | Ocean4
    | Ocean5
    | Ocean6
    | Zendo1
    | Zendo2
    | Zendo3
    | Zendo4
    | Zendo5
    | Zendo6
    | Space1
    | Space2
    | Space3
    | Space4


type Chapter
    = Ocean
    | Zendo
    | Natives
    | Space


type Dialog
    = Error ErrorData


type Msg
    = Noop
    | ToggleHelp
    | StepForwards
    | StepBackwards
    | Scroll String
    | Highlight Button
    | LoadGame Bool
    | ReleaseKey


type Button
    = HelpButton
    | NextButton
    | PreviousButton


type Direction
    = Next
    | Previous


type ChapterCommand
    = ActivateChapter
    | DeactivateChapter
    | SelectChapter


type ComponentCommand
    = Idle
    | Activate
    | Deactivate
    | Init
    | StartGame


type ContainerName
    = Start
    | Turtle
    | Coral
