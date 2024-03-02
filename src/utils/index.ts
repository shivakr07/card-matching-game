import { Shape } from '../data'

// Function to duplicate an array of objects
export function duplicateArray(shapes: Shape[]): Shape[] {
  return shapes.reduce<Shape[]>((acc, item) => {
    // Duplicate each item and add it to the accumulator
    acc.push(item, { ...item, uniqueId: item.uniqueId + '2', shapeId: item.shapeId })
    return acc
  }, [])
}

// Function to shuffle an array randomly
export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
