export const curvedTool = ({ shapeData, currentPointer }) => {
  const prevPoint = shapeData[shapeData.length - 1].points;
  const midPointX = (prevPoint[0] + currentPointer[0]) / 2;
  const midPointY = (prevPoint[1] + currentPointer[1]) / 2;
  const midPoint = [midPointX, midPointY];
  return [...shapeData, { type: 'Q', points: [midPoint[0], midPoint[1], currentPointer[0], currentPointer[1]] }];
};
