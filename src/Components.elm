module Components exposing (..)

import Dict exposing (Dict)
import Json.Decode exposing (dict)
import Types exposing (..)


getIdStr : ComponentId -> String
getIdStr id =
    case id of
        Ocean1 ->
            "ocean1"

        Ocean2 ->
            "ocean2"

        Ocean3 ->
            "ocean3"

        Ocean4 ->
            "ocean4"

        Ocean5 ->
            "ocean5"

        Ocean6 ->
            "ocean6"

        Zendo1 ->
            "zendo1"

        Zendo2 ->
            "zendo2"

        Zendo3 ->
            "zendo3"


first : Component
first =
    { id = Ocean1
    , chapter = Ocean
    , connections = []
    , index = 1
    }


components : ComponentDict
components =
    insertComponent first Dict.empty
        |> addComponent Ocean2 Ocean1 Ocean
        |> addComponent Ocean3 Ocean2 Ocean
        |> addComponent Ocean4 Ocean3 Ocean
        |> addComponent Ocean5 Ocean4 Ocean
        |> addComponent Ocean6 Ocean5 Ocean
        |> addComponent Zendo1 Ocean6 Zendo
        |> addComponent Zendo2 Zendo1 Zendo
        |> addComponent Zendo3 Zendo2 Zendo
        |> connectNext



-- TODO in case of nothing return error!


addComponent : ComponentId -> ComponentId -> Chapter -> ComponentDict -> ComponentDict
addComponent id previousId chapter dict =
    case findComponent previousId dict of
        Just previous ->
            let
                component =
                    { id = id
                    , chapter = chapter
                    , connections = [ ( Previous, previousId ) ]
                    , index = previous.index + 1
                    }
            in
            insertComponent component dict

        Nothing ->
            dict


findComponent : ComponentId -> ComponentDict -> Maybe Component
findComponent key dict =
    Dict.get (getIdStr key) dict


insertComponent : Component -> ComponentDict -> ComponentDict
insertComponent component dict =
    Dict.insert (getIdStr component.id) component dict


connectNext : ComponentDict -> ComponentDict
connectNext dict =
    Dict.values dict
        |> List.map (\component -> setNextComponents component dict)
        |> List.foldl insertComponent dict


setNextComponents : Component -> ComponentDict -> Component
setNextComponents component dict =
    Dict.values dict
        |> List.filter (\compare -> hasPreviousDirection component.id compare)
        |> List.map (\compare -> ( Next, compare.id ))
        |> (\nextConnections ->
                { component | connections = component.connections ++ nextConnections }
           )


hasPreviousDirection : ComponentId -> Component -> Bool
hasPreviousDirection id comparable =
    List.member ( Previous, id )
        comparable.connections



--stepForwards : Model -> Model
--stepForwards model =
--let
--{ current } =
--model
--next = findComponent current.
--in
--case model.component.next of
--Next list ->
--list
--|> List.head
--|> Maybe.withDefault model.component
--|> (\new -> { model | component = new })
--stepBackwards : Model -> Model
--stepBackwards model =
--case model.component.previous of
--Previous (Just previous) ->
--{ model | component = previous }
--Previous Nothing ->
--model
--addNextConnection : ComponentId -> Component -> Dict String Component -> Dict String Component
--addNextConnection nextId dict component =
--{ component | connections = component.connections ++ [ ( Next, nextId ) ] }
--|> (\updatedComponent -> Dict.insert (getIdStr component.id) updatedComponent dict)
