module Types exposing (..)


type alias Model =
    {  showHelp : Bool
    }


type Msg
    = Noop
    | ToggleHelp
