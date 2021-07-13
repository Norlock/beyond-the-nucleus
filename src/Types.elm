module Types exposing (..)

import Dict exposing (Dict)


type alias Model =
    { components : ComponentDict
    , current : Component
    , ui : UI
    }


type alias Component =
    { id : ComponentId
    , container : Chapter ContainerName
    , connections : List Connection
    , index : Int
    }


type alias Connection =
    ( Direction, ComponentId )


type alias UI =
    { dialog : Maybe Dialog
    , highlighted : Maybe Button
    , showGameControl : Bool
    , showVideoControl : Bool
    , showChapterAnimation : Bool
    , showCanvasBlur : Bool
    }


type alias ErrorData =
    { title : String
    , message : String
    }


type alias JSComponentData =
    { id : String
    , container : JSChapterData
    , command : String
    , previous : Maybe String
    , next : List String
    }


type alias JSChapterData =
    { chapterId : String
    , name : String
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


type Chapter a
    = Ocean a
    | Zendo a
    | Natives a


type Dialog
    = Error ErrorData
    | ShowHelp


type Msg
    = Noop
    | ToggleHelp
    | StepForwards
    | StepBackwards
    | Scroll String
    | Highlight Button
    | ReleaseKey


type Button
    = HelpButton
    | NextButton
    | PreviousButton


type Direction
    = Next
    | Previous


type JSComponentCommand
    = JSIdle
    | JSActivate
    | JSDeactivate
    | JSInit
    | JSLoad


type ContainerName
    = Start
    | Turtle
    | Coral
