module Types exposing (..)

import Dict exposing (Dict)


type alias Model =
    { showHelp : Bool
    , components : ComponentDict
    , current : Maybe Component
    }


type alias Component =
    { id : ComponentId
    , chapter : Chapter
    , connections : List Connection
    , index : Int
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


type Chapter
    = Ocean
    | Zendo
    | Natives


type Msg
    = Noop
    | ToggleHelp
    | StepForwards
    | StepBackwards


type alias Connection =
    ( Direction, ComponentId )


type Direction
    = Next
    | Previous
