import { CheckIcon, EraserIcon, HandIcon, MapPin, PencilLineIcon, SplineIcon, Users, XIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Circle, Image, Layer, Line, Path, Stage } from 'react-konva';
import useMeasure from 'react-use-measure';
import { DRAW_MAP_TOOLS } from '../../../../constant/common';
import { drawShape } from '../../../../hooks/draw_tools/drawShape.js';

export const LocationAndMapForm = ({ errors }) => {
  const { register } = useFormContext();
  // State for map image
  const [mapImg, setMapImg] = useState(null);
  const [scale, setScale] = useState(1);
  // Drawing states
  const [isDrawing, setIsDrawing] = useState(false);
  const [showDrawingControls, setShowDrawingControls] = useState(false); // Control Cancel/Done buttons visibility
  const [currentPoint, setCurrentPoint] = useState([]);
  const [currentTool, setCurrentTool] = useState('');
  const [shapeData, setShapeData] = useState([{ type: '', points: [] }]);
  const [shapeStrings, setShapeStrings] = useState([]);
  const [tempLinePoints, setTempLinePoints] = useState([]);
  const [lines, setLines] = useState('');
  // Refs and measure
  const [ref, { width, height }] = useMeasure();
  const stageRef = useRef(null);

  const handleMapUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const imageObj = new window.Image();
        imageObj.src = reader.result;
        imageObj.onload = () => {
          setMapImg(imageObj);
        };
      };
    }
  };

  const getMousePosition = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    const stagePos = {
      x: stageRef.current.x(),
      y: stageRef.current.y()
    };
    const actualX = (pos.x - stagePos.x) / scale;
    const actualY = (pos.y - stagePos.y) / scale;
    return { x: actualX, y: actualY };
  };

  // Hàm xóa hình đã lưu tại chỉ số cụ thể
  const handleEraseShape = (index) => {
    setShapeStrings((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMouseDown = (e) => {
    if (currentTool === DRAW_MAP_TOOLS.ERASER) {
      return;
    }

    if (!isDrawing) return;
    const { x, y } = getMousePosition(e);
    console.log('Mouse Down at:', x, y);
    setCurrentPoint([x, y]);

    const updatedShapeData = drawShape(
      {
        shapeData,
        currentPointer: [x, y]
      },
      currentTool
    );

    setShapeData(updatedShapeData);
    setTempLinePoints([x, y, x, y]);
    setLines(parserSVGDrawData(updatedShapeData));

    const isEnded = Math.pow(x - shapeData[0]?.points[0], 2) + Math.pow(y - shapeData[0]?.points[1], 2) < 10;
    if (isEnded) {
      // Do not save shape to shapeStrings here; wait for "Done" button
      setCurrentPoint([]);
      setTempLinePoints([]);
      setShapeData(updatedShapeData); // Keep shapeData for potential saving
      setLines(parserSVGDrawData(updatedShapeData) + 'Z');
      setIsDrawing(false);
      setCurrentTool(DRAW_MAP_TOOLS.MOVE_TOOL);
      setShowDrawingControls(true); // Keep Cancel/Done buttons visible
      return;
    }
    console.log('shapeData on mouse down:', parserSVGDrawData(updatedShapeData));
  };

  const parserSVGDrawData = (data) => {
    console.log('shapeData:', data);
    return data
      .map((shape) => {
        const { type, points } = shape;
        const command = `${type}${points.join(',')}`;
        return command;
      })
      .join('');
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    if (currentPoint.length === 0) return;

    console.log('Mouse Move');

    const pos = e.target.getStage().getPointerPosition();
    const stagePos = {
      x: stageRef.current.x(),
      y: stageRef.current.y()
    };
    const actualX = (pos.x - stagePos.x) / scale;
    const actualY = (pos.y - stagePos.y) / scale;
    setTempLinePoints([...tempLinePoints.slice(0, 2), actualX, actualY]);
  };

  const handleChangeTool = (tool) => {
    if (tool === DRAW_MAP_TOOLS.CANCEL) {
      setCurrentPoint([]);
      setTempLinePoints([]);
      setLines('');
      setShapeData([{ type: '', points: [] }]);
      setIsDrawing(false);
      setShowDrawingControls(false); // Hide Cancel/Done buttons
      setCurrentTool('');
      return;
    }

    if (tool === DRAW_MAP_TOOLS.DONE) {
      if (shapeData[0].points.length > 0) {
        const shapeStr = parserSVGDrawData(shapeData) + 'Z';
        setShapeStrings([...shapeStrings, shapeStr]);
      }
      setCurrentPoint([]);
      setTempLinePoints([]);
      setLines('');
      setShapeData([{ type: '', points: [] }]);
      setIsDrawing(false);
      setShowDrawingControls(false); // Hide Cancel/Done buttons
      setCurrentTool('');
      return;
    }

    if (tool === currentTool) {
      return;
    }

    if (shapeData.some((shape) => shape.points.length === 0)) {
      setShapeData([...shapeData.slice(0, -1)]);
    }
    setIsDrawing(true);
    setShowDrawingControls(true); // Show Cancel/Done buttons when drawing starts
    setCurrentTool(tool);
  };

  const handleDragBound = (shapeIndex, pointIndex, pos) => {
    const stagePos = {
      x: stageRef.current.x(),
      y: stageRef.current.y()
    };

    const transformedX = (pos.x - stagePos.x) / scale;
    const transformedY = (pos.y - stagePos.y) / scale;

    if (
      (shapeIndex >= shapeData.length - 1 && pointIndex === shapeData[shapeIndex].points.length / 2 - 1) ||
      shapeIndex === 0
    ) {
      setShapeData((prev) => {
        const newShapes = [...prev];
        newShapes[shapeIndex] = {
          ...newShapes[shapeIndex],
          points: [...newShapes[shapeIndex].points]
        };
        newShapes[shapeIndex].points[pointIndex * 2] = transformedX;
        newShapes[shapeIndex].points[pointIndex * 2 + 1] = transformedY;

        newShapes[0].points[0] = transformedX;
        newShapes[0].points[1] = transformedY;

        setLines(parserSVGDrawData(newShapes) + 'Z');
        return newShapes;
      });
    }

    setShapeData((prev) => {
      const newShapes = [...prev];
      newShapes[shapeIndex] = {
        ...newShapes[shapeIndex],
        points: [...newShapes[shapeIndex].points]
      };
      newShapes[shapeIndex].points[pointIndex * 2] = transformedX;
      newShapes[shapeIndex].points[pointIndex * 2 + 1] = transformedY;

      setLines(parserSVGDrawData(newShapes) + 'Z');
      return newShapes;
    });

    return pos;
  };

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='mb-4 text-lg font-medium text-gray-900'>Location & Venue Information</h3>
        <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              <MapPin size={16} className='mr-2 inline' />
              Venue Name *
            </label>
            <input
              type='text'
              {...register('venue')}
              className={`focus:ring-project-300 w-full rounded-lg border p-3 focus:border-transparent focus:ring-2 ${
                errors.venue ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder='Event venue name'
            />
            {errors.venue && <p className='mt-1 text-sm text-red-600'>{errors.venue}</p>}
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              <Users size={16} className='mr-2 inline' />
              Capacity
            </label>
            <input
              type='number'
              {...register('capacity')}
              className={`focus:ring-project-300 w-full rounded-lg border p-3 focus:border-transparent focus:ring-2 ${
                errors.capacity ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder='Maximum attendees'
              min='1'
            />
          </div>

          <div className='md:col-span-2'>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              <MapPin size={16} className='mr-2 inline' />
              Full Address *
            </label>
            <input
              type='text'
              {...register('address')}
              className={`focus:ring-project-300 w-full rounded-lg border p-3 focus:border-transparent focus:ring-2 ${
                errors.address ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder='Complete event address'
            />
            {errors.address && <p className='mt-1 text-sm text-red-600'>{errors.address}</p>}
          </div>
        </div>

        <div>
          <h4 className='text-md mb-4 font-medium text-gray-900'>Event Area Map</h4>
          <div className='h-128 rounded-lg border-2 border-gray-300 p-4'>
            {mapImg ? (
              <div className='flex h-full w-full flex-col gap-2'>
                <div className='flex h-14 flex-row items-center justify-start gap-2 rounded-2xl border-2 border-gray-300 bg-white px-4'>
                  {Array.from(Object.values(DRAW_MAP_TOOLS))
                    .filter((tool) => tool !== DRAW_MAP_TOOLS.CANCEL && tool !== DRAW_MAP_TOOLS.DONE)
                    .map((tool, i) => (
                      <div
                        key={i}
                        className='hover:bg-project-100 relative flex items-center rounded-lg p-2 hover:cursor-pointer'
                        onClick={() => handleChangeTool(tool)}
                      >
                        {tool === DRAW_MAP_TOOLS.STRAIGHT_LINE && <PencilLineIcon />}
                        {tool === DRAW_MAP_TOOLS.CURVED_LINE && <SplineIcon />}
                        {tool === DRAW_MAP_TOOLS.MOVE_TOOL && <HandIcon />}
                        {tool === DRAW_MAP_TOOLS.ERASER && <EraserIcon />}
                      </div>
                    ))}
                  {showDrawingControls && (
                    <>
                      <div
                        className='hover:bg-project-100 relative flex items-center rounded-lg p-2 hover:cursor-pointer'
                        onClick={() => handleChangeTool(DRAW_MAP_TOOLS.CANCEL)}
                      >
                        <XIcon />
                      </div>
                      <div
                        className='hover:bg-project-100 relative flex items-center rounded-lg p-2 hover:cursor-pointer'
                        onClick={() => handleChangeTool(DRAW_MAP_TOOLS.DONE)}
                      >
                        <CheckIcon />
                      </div>
                    </>
                  )}
                </div>
                <div ref={ref} className='h-full w-full overflow-hidden rounded-2xl'>
                  <Stage
                    ref={stageRef}
                    draggable={!isDrawing}
                    className='rounded-2xl'
                    width={width}
                    height={height}
                    scaleX={scale}
                    scaleY={scale}
                    onWheel={(e) => {
                      e.evt.preventDefault();
                      const newScale = scale + e.evt.deltaY * -0.01;
                      setScale(Math.min(Math.max(1, newScale), 5));
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseDown={handleMouseDown}
                  >
                    <Layer>
                      <Image image={mapImg} x={0} y={0} width={width} height={height} />

                      {shapeStrings.length > 0 &&
                        shapeStrings.map((shapeStr, index) => (
                          <Path
                            key={index}
                            data={shapeStr}
                            fill='green'
                            opacity={0.4}
                            strokeWidth={4}
                            stroke='red'
                            onMouseDown={(e) => {
                              if (currentTool === DRAW_MAP_TOOLS.ERASER) {
                                handleEraseShape(index);
                                e.cancelBubble = true;
                              }
                            }}
                          />
                        ))}

                      {lines && <Path data={lines} stroke='red' fill='green' strokeWidth={2} />}

                      {currentPoint && tempLinePoints.length === 4 && (
                        <Line points={tempLinePoints} stroke='orange' strokeWidth={2} closed={false} dash={[4, 4]} />
                      )}

                      {currentPoint.length > 0 && (
                        <Circle x={currentPoint[0]} y={currentPoint[1]} radius={5} fill='orange' />
                      )}

                      {shapeData.map((shape, shapeIndex) =>
                        Array.from({ length: Math.floor(shape.points.length / 2) }, (_, pointIndex) => (
                          <Circle
                            draggable
                            key={`${shapeIndex}-${pointIndex}`}
                            x={shape.points[pointIndex * 2]}
                            y={shape.points[pointIndex * 2 + 1]}
                            radius={5}
                            fill='blue'
                            dragBoundFunc={(pos) => handleDragBound(shapeIndex, pointIndex, pos)}
                          />
                        ))
                      )}
                    </Layer>
                  </Stage>
                </div>
              </div>
            ) : (
              <div className='flex min-h-[350px] flex-col items-center justify-center'>
                <div className='flex flex-col items-center gap-4'>
                  <h4 className='mb-2 text-lg font-semibold text-gray-800'>Event Area Map</h4>
                  <p className='mb-2 text-center text-sm text-gray-500'>
                    Upload an image showing your event area, boundaries, or location.
                  </p>
                  <label className='flex cursor-pointer flex-col items-center'>
                    <span className='bg-project-300 hover:bg-project-600 mb-2 inline-block rounded-lg px-4 py-2 text-sm font-medium text-white transition'>
                      Choose Map Image
                    </span>
                    <input type='file' accept='image/*' onChange={handleMapUpload} className='hidden' />
                  </label>
                  <span className='text-xs text-gray-400'>{mapImg ? 'Image selected' : 'No file chosen'}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
