port module Main exposing (..)

import Browser
import Browser.Events
import Components
import Dict
import HelperFunctions
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode as Decode
import Types exposing (..)


main =
    Browser.document
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }


init : () -> ( Model, Cmd Msg )
init _ =
    let
        components =
            Components.components

        current =
            List.head (Dict.values components)
                |> Maybe.withDefault Components.first
    in
    ( { components = components
      , current = current
      , ui = initUI
      }
    , Cmd.batch
        [ handleJSLoad (Dict.values components)
        , toJSChapter (getJSChapter current.container ActivateChapter)
        , toJSChapter (getJSChapter current.container SelectChapter)
        , handleJSCommand current Activate
        ]
    )


initUI : UI
initUI =
    { dialog = Nothing
    , highlighted = Nothing
    , showGame = False
    , showCanvasBlur = False
    , showHelp = False
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        StepForwards ->
            handleStep model Next Idle

        StepBackwards ->
            handleStep model Previous Deactivate

        ToggleHelp ->
            ( { model | ui = toggleDialog model.ui }, Cmd.none )

        Highlight btn ->
            ( handleHighlight model (Just btn), Cmd.none )

        Scroll direction ->
            ( model, handleScroll direction )

        ReleaseKey ->
            ( handleHighlight model Nothing, toJSScroll "" )

        Noop ->
            ( model, Cmd.none )


handleScroll : String -> Cmd Msg
handleScroll scrollDirection =
    toJSScroll scrollDirection


handleStep : Model -> Direction -> ComponentCommand -> ( Model, Cmd Msg )
handleStep model direction previousCmd =
    let
        previous =
            model.current

        newModel =
            Components.step model direction

        newCurrent =
            newModel.current
    in
    if newModel.current.id == previous.id then
        ( newModel, Cmd.none )

    else
        ( newModel
        , Cmd.batch
            ([ handleJSCommand previous previousCmd
             , handleJSCommand newModel.current Activate
             ]
                ++ handleChapterCommands newCurrent.container previous.container
            )
        )


setDialog : Maybe Dialog -> UI -> UI
setDialog dialog ui =
    { ui | dialog = dialog }


setHighlight : Maybe Button -> UI -> UI
setHighlight button ui =
    { ui | highlighted = button }


handleHighlight : Model -> Maybe Button -> Model
handleHighlight model maybeButton =
    case maybeButton of
        Just HelpButton ->
            { model | ui = setHighlight (Just HelpButton) model.ui }

        Just NextButton ->
            { model | ui = setHighlight (Just NextButton) model.ui }

        Just PreviousButton ->
            { model | ui = setHighlight (Just PreviousButton) model.ui }

        Nothing ->
            { model | ui = setHighlight Nothing model.ui }


toggleDialog : UI -> UI
toggleDialog ui =
    { ui | showHelp = not ui.showHelp }


view : Model -> Browser.Document Msg
view model =
    { title = "Beyond the nucleus"
    , body = [ body model.current model.ui ]
    }


body : Component -> UI -> Html Msg
body component ui =
    let
        { index, container } =
            component

        hasNext =
            not (List.isEmpty component.next)

        hasPrevious =
            HelperFunctions.hasItem component.previous

        hasGame =
            HelperFunctions.hasItem component.game

        gameStr =
            Maybe.withDefault "" component.game

        activate =
            "activate"

        disable =
            "disable"

        hide =
            "hide"
    in
    div [ class ("container " ++ gameStr), classList [ ( Components.chapterStr container.chapterId, True ) ] ]
        [ div [ id "pixi-canvas", classList [ ( "blur", ui.showGame || ui.showHelp ) ] ] []
        , div [ id "game-canvas", classList [ ( "show", ui.showGame ) ] ] []
        , div
            [ id "help-overlay"
            , classList [ ( "show", ui.showHelp ) ]
            ]
            [ helpContainer ]
        , div [ id "help-control-wrapper" ]
            [ span
                [ id "help-control"
                , class "info-control"
                , classList [ ( activate, ui.highlighted == Just HelpButton ) ]
                ]
                [ text "?" ]
            ]
        , h1 [ id "chapter-title", class "animate" ]
            [ text (Components.chapterStr container.chapterId) ]
        , div [ id "toolbar-controls" ]
            [ span
                [ id "game-control"
                , class "info-control additional"
                , classList [ ( hide, not hasGame ) ]
                ]
                [ text "P" ]

            --, span
            --[ id "video-control"
            --, class "info-control additional"
            --, classList [ ( hide, not ui.showVideoControl ) ]
            --]
            --[ text "V" ]
            , span
                [ id "next-control"
                , class "info-control"
                , classList
                    [ ( disable, not hasNext )
                    , ( activate, ui.highlighted == Just NextButton )
                    ]
                ]
                [ text "S" ]
            , span
                [ id "previous-control"
                , class "info-control"
                , classList
                    [ ( disable, not hasPrevious )
                    , ( activate, ui.highlighted == Just PreviousButton )
                    ]
                ]
                [ text "B" ]
            , span [ id "page-number", class "info-control" ] [ text (String.fromInt index) ]
            ]
        ]


helpContainer : Html Msg
helpContainer =
    div [ id "help-container", class "show" ]
        [ ul []
            [ helpContainerListItem "s" " => step forward"
            , helpContainerListItem "b" " => step backward"
            , helpContainerListItem "v" " => toggle video"
            , helpContainerListItem "c" " => toggle credits"
            , helpContainerListItem "?" " => toggle help"
            ]
        ]


helpContainerListItem : String -> String -> Html Msg
helpContainerListItem key action =
    li []
        [ span [ class "left" ] [ text key ]
        , span [ class "right" ] [ text action ]
        ]


errorView : Html Msg
errorView =
    div [ class "container" ]
        [ div [ id "pixi-canvas" ] []
        , div [ id "game-canvas" ] []
        , div [ id "help-overlay" ] [ helpContainer ]
        , div [ id "help-control-wrapper" ]
            [ span [ id "help-control", class "info-control" ] [ text "?" ]
            ]
        , h1 [ id "chapter-title" ] [ text "" ]
        , div [ id "toolbar-controls" ]
            [ span [ id "game-control", class "info-control additional hide" ] [ text "P" ]
            , span [ id "video-control", class "info-control additional hide" ] [ text "V" ]
            , span [ id "next-control", class "info-control disable" ] [ text "S" ]
            , span [ id "previous-control", class "info-control disable" ] [ text "B" ]
            , span [ id "page-number", class "info-control" ] [ text "-" ]
            ]
        ]



-- Subscriptions


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ Browser.Events.onKeyPress (keyDecoder navKey)
        , Browser.Events.onKeyDown (keyDecoder keyDown)
        , Browser.Events.onKeyUp (keyDecoder releaseKey)
        ]


keyDecoder : (String -> Msg) -> Decode.Decoder Msg
keyDecoder keyFunction =
    Decode.map keyFunction (Decode.field "key" Decode.string)


releaseKey : String -> Msg
releaseKey _ =
    ReleaseKey


keyDown : String -> Msg
keyDown key =
    case key of
        "?" ->
            ToggleHelp

        "s" ->
            StepForwards

        "b" ->
            StepBackwards

        "ArrowLeft" ->
            Scroll "left"

        "ArrowRight" ->
            Scroll "right"

        "ArrowUp" ->
            Scroll "up"

        "ArrowDown" ->
            Scroll "down"

        _ ->
            Noop


navKey : String -> Msg
navKey char =
    case char of
        "?" ->
            Highlight HelpButton

        "s" ->
            Highlight NextButton

        "b" ->
            Highlight PreviousButton

        _ ->
            Noop



-- Ports


getJSComponent : Component -> ComponentCommand -> JSComponentData
getJSComponent component command =
    let
        { chapterId, name } =
            component.container
    in
    { id = Components.idStr component.id
    , chapterId = Components.chapterStr chapterId
    , containerName = Components.containerStr name
    , command = Components.commandStr command
    , next = Components.getJSNext component
    , previous = Maybe.map (\id -> Components.idStr id) component.previous
    }


handleJSLoad : List Component -> Cmd Msg
handleJSLoad list =
    List.map (\component -> getJSComponent component Load) list
        |> toJSLoadComponents


handleJSCommand : Component -> ComponentCommand -> Cmd Msg
handleJSCommand component command =
    { id = Components.idStr component.id
    , command = Components.commandStr command
    }
        |> toJSComponent


handleChapterCommands : ChapterData -> ChapterData -> List (Cmd msg)
handleChapterCommands current previous =
    let
        newChapter =
            current.chapterId /= previous.chapterId

        newContainer =
            current.name /= previous.name
    in
    if newChapter then
        [ toJSChapter (getJSChapter previous DeactivateChapter)
        , toJSChapter (getJSChapter current ActivateChapter)
        , toJSChapter (getJSChapter current SelectChapter)
        ]

    else if newContainer then
        [ toJSChapter (getJSChapter current SelectChapter) ]

    else
        []


getJSChapter : ChapterData -> ChapterCommand -> JSChapterCommand
getJSChapter container command =
    { chapterId = Components.chapterStr container.chapterId
    , containerName = Components.containerStr container.name
    , command = Components.chapterCommandStr command
    }


port toJSComponent : JSComponentCommand -> Cmd msg


port toJSChapter : JSChapterCommand -> Cmd msg


port toJSLoadComponents : List JSComponentData -> Cmd msg


port toJSScroll : String -> Cmd msg
