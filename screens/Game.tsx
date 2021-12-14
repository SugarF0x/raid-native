import { SafeAreaView } from 'react-native'
import React from "react"
import styled from 'styled-components/native'

const GameWrapper = styled(SafeAreaView)`
  background-color: black;
  height: 100%;
`

const Game = styled.View`
  background-color: #5d085d;
  margin: auto 0;
`

const HeaderWrapper = styled.View`
  padding: 8px;
  flex-direction: row;
  justify-content: space-between;
`

const HeaderItem = styled.View`
  border: 1px solid white;
  aspect-ratio: 1;
  flex: 1.5;
  margin-right: 8px;
`

const HeaderItemLast = styled.View`
  flex: 1;
  margin-right: 0;
`

const HeaderItemLastButton = styled.View`
  border: 1px solid white;
  flex: 1;
  margin-bottom: 8px;
`

const HeaderItemLastButtonLast = styled.View`
  border: 1px solid white;
  flex: 1;
`

const Dungeon = styled.View`
  background-color: black;
  aspect-ratio: 1;
  padding: 4px;
`

const DungeonRow = styled.View`
  aspect-ratio: 6;
  flex-direction: row;
`

const Tile = styled.View`
  flex: 1;
  aspect-ratio: 1;
  margin: 4px;
  border: 1px solid white;
`

const HudWrapper = styled.View`
  flex-direction: row;
  padding: 8px;
`

const BarWrapper = styled.View`
  aspect-ratio: 1;
  border: 1px solid white;
  flex: 1;
`

const MidWrapper = styled.View`
  border: 1px solid white;
  margin-horizontal: 8px;
  flex: 1.5;
`

export const GameScreen = () => {
  return (
    <GameWrapper>
      <Game>
        <HeaderWrapper>
          {Object.keys([...Array(4)]).map(index => <HeaderItem key={index} /> )}
          <HeaderItemLast>
            <HeaderItemLastButton />
            <HeaderItemLastButtonLast />
          </HeaderItemLast>
        </HeaderWrapper>
        <Dungeon>
          {Object.keys([...Array(6)]).map(row => (
            <DungeonRow key={row}>
              {Object.keys([...Array(6)]).map(col => <Tile key={col} /> )}
            </DungeonRow>
          ))}
        </Dungeon>
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