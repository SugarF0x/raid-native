import { LayoutChangeEvent, SafeAreaView, Text } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components/native'
import { Tile, Arrow } from '@components'
import { BACKGROUND_COLOR, STROKE_COLOR } from '@consts'

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

const Dungeon = styled.View`
  position: relative;
  background-color: black;
  flex-direction: row;
  aspect-ratio: 1;
`

const DungeonColumn = styled.View`
  aspect-ratio: ${1/6};
  overflow: hidden;
  position: relative;
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

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

interface TileState {
  initialPosition: number
  color: string
}

export const GameScreen = () => {
  const [tiles, setTiles] = useState<TileState[][]>([])
  const tilesIdSet = useRef(new Set()).current

  useEffect(() => {
    const randomIds = Object.keys(Array(36).fill(0)).map<TileState>(key => ({
      initialPosition: -1-Number(key) % 6,
      color: getRandomColor()
    }))
    setTiles(Array(6).fill(0).map(_ => Array(6).fill(0).map(_ => randomIds.pop()!)))
  }, [])

  const handleTileClick = useCallback((value: string) => {
    tilesIdSet.delete(value)

    const column = tiles.find(columns => columns.some(entry => entry.color === value))
    if (!column) return null

    const columnIndex = tiles.indexOf(column)
    const tile = column.find(entry => entry.color === value)
    if (!tile) return null
    const tileIndex = column.indexOf(tile)

    let color = ''
    do color = getRandomColor()
    while (tilesIdSet.has(color))
    tilesIdSet.add(color)

    const newColumn = [...column]
    newColumn.splice(tileIndex, 1)
    newColumn.unshift({
      color,
      initialPosition: -1
    })

    const newTiles = [...tiles]
    newTiles.splice(columnIndex, 1, newColumn)

    setTiles(newTiles)
  }, [tiles])

  const [dungeonKey, setDungeonKey] = useState(0)
  const rerenderDungeon = useCallback(() => {
    setDungeonKey(key => ++key)
  }, [])

  const [tileSize, setTileSize] = useState(0)
  const handleColumnLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setTileSize(width)
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
        <Dungeon key={dungeonKey}>
          {tiles.map((col, colIndex) => (
            <DungeonColumn key={colIndex} onLayout={handleColumnLayout}>
              {!!tileSize && col.map((row, rowIndex) => (
                <Tile key={row.color} onClick={handleTileClick} size={tileSize} position={rowIndex} initialPosition={row.initialPosition}>{ row.color }</Tile>
              ))}
            </DungeonColumn>
          ))}
          {!!tileSize && (
            <Arrow size={tileSize} points={[{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 1 }]} />
          )}
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