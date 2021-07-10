port module Main exposing (..)

import Browser
import Browser.Events
import Components
import Dict
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
        [ handleJSInitital (Dict.values components)
        , handleJSComponent current JSActivate
        ]
    )


initUI : UI
initUI =
    { dialog = Nothing
    , highlighted = Nothing
    , showGameControl = False
    , showVideoControl = False
    , showChapterAnimation = False
    , showCanvasBlur = False
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        StepForwards ->
            handleStep model Next JSIdle

        StepBackwards ->
            handleStep model Previous JSDeactivate

        ToggleHelp ->
            ( { model | ui = toggleDialog model.ui }, Cmd.none )

        Highlight btn ->
            ( handleHighlight model btn, Cmd.none )

        Noop ->
            ( model, Cmd.none )


handleStep : Model -> Direction -> JSComponentCommand -> ( Model, Cmd Msg )
handleStep model direction previousCmd =
    let
        previous =
            model.current

        newModel =
            Components.step model direction
    in
    if newModel.current.id == previous.id then
        ( newModel, Cmd.none )

    else
        ( newModel
        , Cmd.batch
            [ handleJSComponent previous previousCmd
            , handleJSComponent newModel.current JSActivate
            ]
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
    if ui.dialog == Just ShowHelp then
        { ui | dialog = Nothing }

    else
        { ui | dialog = Just ShowHelp }


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ Browser.Events.onKeyPress (keyDecoder navKey)
        , Browser.Events.onKeyDown (keyDecoder highlightKey)
        , Browser.Events.onKeyUp (keyDecoder releaseHighlight)
        ]


keyDecoder : (String -> Msg) -> Decode.Decoder Msg
keyDecoder keyFunction =
    Decode.map keyFunction (Decode.field "key" Decode.string)


releaseHighlight : String -> Msg
releaseHighlight _ =
    Highlight Nothing


highlightKey : String -> Msg
highlightKey char =
    case char of
        "?" ->
            ToggleHelp

        "s" ->
            StepForwards

        "b" ->
            StepBackwards

        _ ->
            Noop


navKey : String -> Msg
navKey char =
    case char of
        "?" ->
            Highlight (Just HelpButton)

        "s" ->
            Highlight (Just NextButton)

        "b" ->
            Highlight (Just PreviousButton)

        _ ->
            Noop


view : Model -> Browser.Document Msg
view model =
    { title = "Beyond the nucleus"
    , body = [ body model.current model.ui ]
    }



-- TODO hide / show canvas blur


body : Component -> UI -> Html Msg
body component ui =
    let
        { index, chapter } =
            component

        hasNext =
            Components.hasDirection component Next

        hasPrevious =
            Components.hasDirection component Previous

        activate =
            "activate"

        disable =
            "disable"

        hide =
            "hide"
    in
    div [ class "container" ]
        [ div [ id "pixi-canvas", classList [ ( "blur", ui.showCanvasBlur ) ] ] []
        , div [ id "game-canvas", classList [ ( "show", False ) ] ] []
        , div
            [ id "help-overlay"
            , classList [ ( "show", ui.dialog == Just ShowHelp ) ]
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
        , h1 [ id "chapter-title", classList [ ( "animate", ui.showChapterAnimation ) ] ] [ text (Components.chapterStr chapter) ]
        , div [ id "toolbar-controls" ]
            [ span
                [ id "game-control"
                , class "info-control additional"
                , classList [ ( hide, not ui.showGameControl ) ]
                ]
                [ text "P" ]
            , span
                [ id "video-control"
                , class "info-control additional"
                , classList [ ( hide, not ui.showVideoControl ) ]
                ]
                [ text "V" ]
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



-- Ports


getJSComponent : Component -> JSComponentCommand -> JSComponentData
getJSComponent component command =
    { id = Components.idStr component.id
    , chapterId = Components.chapterStr component.chapter
    , command = Components.commandStr command
    , next = Components.getConnectionIds component Next
    , previous =
        List.head <|
            Components.getConnectionIds component Previous
    }


handleJSInitital : List Component -> Cmd Msg
handleJSInitital list =
    List.map (\component -> getJSComponent component JSLoad) list
        |> toJSLoadComponents


handleJSComponent : Component -> JSComponentCommand -> Cmd Msg
handleJSComponent component command =
    getJSComponent component command
        |> toJSComponent


port toJSComponent : JSComponentData -> Cmd msg


port toJSLoadComponents : List JSComponentData -> Cmd msg
