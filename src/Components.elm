module Components exposing
    ( commandStr
    , components
    , first
    , getConnectionIds
    , hasDirection
    , idStr
    , jsChapter
    , step
    )

import Dict exposing (Dict)
import Json.Decode exposing (dict)
import Types exposing (..)


jsContainerName : ContainerName -> String
jsContainerName name =
    case name of
        Start ->
            "start"

        Turtle ->
            "turtle"

        Coral ->
            "coral"


jsChapter : Chapter ContainerName -> JSChapterData
jsChapter chapter =
    case chapter of
        Ocean name ->
            { chapterId = "ocean"
            , name = jsContainerName name
            }

        Zendo name ->
            { chapterId = "zendo"
            , name = jsContainerName name
            }

        Natives name ->
            { chapterId = "natives"
            , name = jsContainerName name
            }


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
    , container = Ocean Start
    , connections = []
    , index = 1
    }


components : ComponentDict
components =
    insertComponent first Dict.empty
        |> addComponent Ocean2 Ocean1 (Ocean Start)
        |> addComponent Ocean3 Ocean2 (Ocean Start)
        |> addComponent Ocean4 Ocean3 (Ocean Turtle)
        |> addComponent Ocean5 Ocean4 (Ocean Turtle)
        |> addComponent Ocean6 Ocean5 (Ocean Coral)
        |> addComponent Zendo1 Ocean6 (Zendo Start)
        |> addComponent Zendo2 Zendo1 (Zendo Start)
        |> addComponent Zendo3 Zendo2 (Zendo Start)
        |> addComponent Zendo4 Zendo3 (Zendo Start)
        |> addComponent Zendo5 Zendo4 (Zendo Start)
        |> addComponent Zendo6 Zendo5 (Zendo Start)
        |> connectNext



-- TODO in case of nothing return error!


addComponent : ComponentId -> ComponentId -> Chapter ContainerName -> ComponentDict -> ComponentDict
addComponent id previousId chapter dict =
    case findComponent previousId dict of
        Just previous ->
            dict
                |> insertComponent
                    { id = id
                    , container = chapter
                    , connections = [ ( Previous, previousId ) ]
                    , index = previous.index + 1
                    }

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
