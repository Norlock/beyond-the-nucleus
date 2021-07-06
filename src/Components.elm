module Components exposing (components)

import Types exposing (..)


first : Component
first =
    { id = "ocean1"
    , chapter = Ocean
    , next = Next []
    , previous = Previous Nothing
    , index = 1
    }


components : Component
components =
    first
        |> newComponent "ocean2" Ocean
        |> newComponent "ocean3" Ocean
        |> newComponent "ocean4" Ocean
        |> newComponent "ocean5" Ocean
        |> newComponent "ocean6" Ocean
        |> connectNext


connectNext : Component -> Component
connectNext tail =
    case tail.previous of
        Previous (Just component) ->
            { component | next = Next [ tail ] }
                |> connectNext

        Previous Nothing ->
            tail


newComponent : String -> Chapter -> Component -> Component
newComponent id chapter current =
    { id = id
    , chapter = chapter
    , next = Next []
    , previous = Previous (Just current)
    , index = current.index + 1
    }
