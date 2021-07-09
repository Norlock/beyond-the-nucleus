module Types exposing (..)

import Dict exposing (Dict)


type alias Model =
    { components : ComponentDict
    , current : Maybe Component
    , ui : UI
    }


type alias Component =
    { id : ComponentId
    , chapter : Chapter
    , connections : List Connection
    , index : Int
    }


type alias UI =
    { dialog : Maybe Dialog
    , highlighted : Maybe Button
    }


type alias ErrorData =
    { title : String
    , message : String
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


type Dialog
    = Error ErrorData
    | ShowHelp


type Msg
    = Noop
    | ToggleHelp
    | StepForwards
    | StepBackwards
    | Highlight (Maybe Button)


type Button
    = HelpButton
    | NextButton
    | PreviousButton


type alias Connection =
    ( Direction, ComponentId )


type Direction
    = Next
    | Previous
