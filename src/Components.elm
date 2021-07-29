module Components exposing
    ( chapterCommandStr
    , chapterStr
    , commandStr
    , components
    , containerStr
    , first
    , getJSNext
    , idStr
    , step
    )

import Dict exposing (Dict)
import Json.Decode exposing (dict)
import Types exposing (..)


first : Component
first =
    { id = Ocean1
    , container = { chapterId = Ocean, name = Start }
    , next = []
    , previous = Nothing
    , game = Nothing
    , index = 1
    }


components : ComponentDict
components =
    insertComponent first Dict.empty
        |> addComponent ( Ocean2, Ocean1 ) ( Ocean, Start ) Nothing
        |> addComponent ( Ocean3, Ocean2 ) ( Ocean, Start ) Nothing
        |> addComponent ( Ocean4, Ocean3 ) ( Ocean, Turtle ) Nothing
        |> addComponent ( Ocean5, Ocean4 ) ( Ocean, Turtle ) Nothing
        |> addComponent ( Ocean6, Ocean5 ) ( Ocean, Coral ) Nothing
        |> addComponent ( Zendo1, Ocean6 ) ( Zendo, Start ) Nothing
        |> addComponent ( Zendo2, Zendo1 ) ( Zendo, Start ) Nothing
        |> addComponent ( Zendo3, Zendo2 ) ( Zendo, Start ) Nothing
        |> addComponent ( Zendo4, Zendo3 ) ( Zendo, Start ) Nothing
        |> addComponent ( Zendo5, Zendo4 ) ( Zendo, Start ) Nothing
        |> addComponent ( Zendo6, Zendo5 ) ( Zendo, Start ) (Just "kungfu")
        |> addComponent ( Space1, Zendo6 ) ( Space, Start ) Nothing
        |> connectNext


addComponent : ( ComponentId, ComponentId ) -> ( Chapter, ContainerName ) -> Maybe String -> ComponentDict -> ComponentDict
addComponent ( id, previousId ) ( chapterId, name ) game dict =
    case findComponent previousId dict of
        Just previous ->
            dict
                |> insertComponent
                    { id = id
                    , container = { chapterId = chapterId, name = name }
                    , next = []
                    , previous = Just previousId
                    , index = previous.index + 1
                    , game = game
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
        |> List.filter (\compare -> hasPreviousDirection component.id compare.previous)
        |> List.map (\compare -> compare.id)
        |> (\nextConnections -> { component | next = nextConnections })


hasPreviousDirection : ComponentId -> Maybe ComponentId -> Bool
hasPreviousDirection id maybe =
    case maybe of
        Just previousId ->
            id == previousId

        Nothing ->
            False


step : Model -> Direction -> Model
step model direction =
    getComponent model.current model.components direction
        |> Maybe.map (\new -> { model | current = new })
        |> Maybe.withDefault model


getComponent : Component -> ComponentDict -> Direction -> Maybe Component
getComponent component dict direction =
    case direction of
        Next ->
            List.head component.next
                |> Maybe.map
                    (\nextId ->
                        Maybe.withDefault component (findComponent nextId dict)
                    )

        Previous ->
            component.previous
                |> Maybe.map
                    (\previousId ->
                        Maybe.withDefault component (findComponent previousId dict)
                    )


getJSNext : Component -> List String
getJSNext component =
    List.map (\item -> idStr item) component.next



-- to string functions


commandStr : ComponentCommand -> String
commandStr command =
    case command of
        Activate ->
            "activate"

        Deactivate ->
            "deactivate"

        Idle ->
            "idle"

        Init ->
            "init"

        StartGame ->
            "start"


chapterCommandStr : ChapterCommand -> String
chapterCommandStr command =
    case command of
        ActivateChapter ->
            "activate"

        DeactivateChapter ->
            "deactivate"

        SelectChapter ->
            "select"


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

        Space1 ->
            "space1"


containerStr : ContainerName -> String
containerStr name =
    case name of
        Start ->
            "start"

        Turtle ->
            "turtle"

        Coral ->
            "coral"


chapterStr : Chapter -> String
chapterStr chapter =
    case chapter of
        Ocean ->
            "ocean"

        Zendo ->
            "zendo"

        Natives ->
            "natives"

        Space ->
            "space"
