import { SafeAreaView, Text } from 'react-native'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components/native'
import { BACKGROUND_COLOR, STROKE_COLOR } from '@consts'
import { Dungeon } from '@components'

const GameWrapper = styled(SafeAreaView)`
  background-color: black;
  height: 100%;
`

const Game = styled.View`
  background-color: ${BACKGROUND_COLOR};
  margin: auto 0;
`

const HeaderWrapper = styled.View`
  padding: 8px;
  flex-direction: row;
  justify-content: space-between;
`

const HeaderItem = styled.View`
  border: 1px solid ${STROKE_COLOR};
  aspect-ratio: 1;
  flex: 1.5;
  margin-right: 8px;
`

const HeaderItemLast = styled.View`
  flex: 1;
  margin-right: 0;
`

const HeaderItemLastButton = styled.View`
  border: 1px solid ${STROKE_COLOR};
  flex: 1;
  margin-bottom: 8px;
`

const HeaderItemLastButtonLast = styled.View`
  border: 1px solid ${STROKE_COLOR};
  flex: 1;
`

const HudWrapper = styled.View`
  flex-direction: row;
  padding: 8px;
`

const BarWrapper = styled.View`
  aspect-ratio: 1;
  border: 1px solid ${STROKE_COLOR};
  flex: 1;
`

const MidWrapper = styled.View`
  border: 1px solid ${STROKE_COLOR};
  margin-horizontal: 8px;
  flex: 1.5;
`

export const GameScreen = () => {
  const [dungeonKey, setDungeonKey] = useState(0)
  const rerenderDungeon = useCallback(() => {
    setDungeonKey(key => ++key)
  }, [])

  return (
    <GameWrapper>
      <Game>
        <HeaderWrapper>
          {Object.keys([...Array(4)]).map(index => <HeaderItem key={index} /> )}
          <HeaderItemLast>
            <HeaderItemLastButton />
            <HeaderItemLastButtonLast onTouchStart={rerenderDungeon}>
              <Text style={{ color: 'white', fontSize: 10, padding: 2 }}>rerender dungeon</Text>
            </HeaderItemLastButtonLast>
          </HeaderItemLast>
        </HeaderWrapper>
        <Dungeon key={dungeonKey} />
        <HudWrapper>
          <BarWrapper />
          <MidWrapper />
          <BarWrapper />
        </HudWrapper>
      </Game>
    </GameWrapper>
  )
}
GameScreen.path = '/game'