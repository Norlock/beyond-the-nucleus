module Types exposing (..)


type alias Model =
    { showHelp : Bool
    , component : Component
    }


type alias Component =
    { id : String
    , chapter : Chapter
    , next : Next
    , previous : Previous
    , index : Int
    }


type Chapter
    = Ocean
    | Zendo
    | Natives


type Next
    = Next (List Component)


type Previous
    = Previous (Maybe Component)


type Msg
    = Noop
    | StepForwards
    | StepBackwards
    | ToggleHelp
