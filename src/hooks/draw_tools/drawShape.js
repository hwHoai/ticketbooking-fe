import { DRAW_MAP_TOOLS } from '../../constant/common';
import { curvedTool } from './curvedTools';

export const drawShape = ({ shapeData, currentPointer }, tool) => {
  const dataLength = shapeData.length;
  console.log('shapeData', shapeData, currentPointer, tool);
  if (dataLength === 0) {
    return [{ type: 'M', points: [currentPointer[0], currentPointer[1]] }];
  }

  switch (tool) {
    case DRAW_MAP_TOOLS.STRAIGHT_LINE:
      return [...shapeData, { type: 'L', points: [currentPointer[0], currentPointer[1]] }];
    case DRAW_MAP_TOOLS.CURVED_LINE:
      return curvedTool({ shapeData, currentPointer });
  }
};
