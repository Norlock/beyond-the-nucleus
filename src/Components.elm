module Components exposing (chapterStr, commandStr, components, first, getConnectionIds, hasDirection, idStr, step)

import Dict exposing (Dict)
import Json.Decode exposing (dict)
import Types exposing (..)


chapterStr : Chapter -> String
chapterStr chapter =
    case chapter of
        Ocean ->
            "ocean"

        Zendo ->
            "zendo"

        Natives ->
            "indigenous"


commandStr : JSComponentCommand -> String
commandStr command =
    case command of
        JSActivate ->
            "activate"

        JSDeactivate ->
            "deactivate"

        JSIdle ->
            "idle"

        JSInit ->
            "init"

        JSLoad ->
            "load"


idStr : ComponentId -> String
idStr id =
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

        Zendo4 ->
            "zendo4"

        Zendo5 ->
            "zendo5"

        Zendo6 ->
            "zendo6"


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
        |> addComponent Zendo4 Zendo3 Zendo
        |> addComponent Zendo5 Zendo4 Zendo
        |> addComponent Zendo6 Zendo5 Zendo
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
    Dict.get (idStr key) dict


insertComponent : Component -> ComponentDict -> ComponentDict
insertComponent component dict =
    Dict.insert (idStr component.id) component dict


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


step : Model -> Direction -> Model
step model direction =
    let
        component =
            model.current
    in
    getComponent component model.components direction
        |> Maybe.map (\new -> { model | current = new })
        |> Maybe.withDefault model


getConnection : Component -> Direction -> Maybe Connection
getConnection component directionCompare =
    component.connections
        |> List.filter (\( direction, _ ) -> direction == directionCompare)
        |> List.head


getComponent : Component -> ComponentDict -> Direction -> Maybe Component
getComponent component dict direction =
    getConnection component direction
        |> Maybe.map (\( _, id ) -> findComponent id dict)
        |> Maybe.withDefault Nothing


hasDirection : Component -> Direction -> Bool
hasDirection component direction =
    getConnection component direction
        |> Maybe.map (\_ -> True)
        |> Maybe.withDefault False


getConnectionIds : Component -> Direction -> List String
getConnectionIds component direction =
    component.connections
        |> List.filter (\( dir, _ ) -> dir == direction)
        |> List.map (\( _, id ) -> idStr id)
