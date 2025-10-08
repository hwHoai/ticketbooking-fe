import React, { useState, useRef } from 'react';
import { Stage, Layer, Circle, Line, Shape } from 'react-konva';

const ModifyCurvesDemo = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // State for quadratic curve points
  const [quadPoints, setQuadPoints] = useState(null); // { start: {x, y}, control: {x, y}, end: {x, y} }
  const [quadPointState, setQuadPointState] = useState('start'); // Tracks which point is being set: 'start', 'control', 'end'

  // State for Bezier curve points
  const [bezierPoints, setBezierPoints] = useState(null); // { start: {x, y}, control1: {x, y}, control2: {x, y}, end: {x, y} }
  const [bezierPointState, setBezierPointState] = useState('start'); // Tracks which point is being set: 'start', 'control1', 'control2', 'end'

  // State for current tool
  const [currentTool, setCurrentTool] = useState(''); // 'quadratic', 'bezier', or ''

  // State for hovered anchor
  const [hoveredAnchor, setHoveredAnchor] = useState(null);

  // State for current mouse position
  const [mousePos, setMousePos] = useState(null);

  const stageRef = useRef(null);

  // Get mouse position relative to stage
  const getMousePosition = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    return { x: pos.x, y: pos.y };
  };

  // Handle mouse move to update current mouse position
  const handleMouseMove = (e) => {
    if (currentTool && (quadPointState !== 'done' || bezierPointState !== 'done')) {
      setMousePos(getMousePosition(e));
    } else {
      setMousePos(null);
    }
  };

  // Handle mouse click to set points
  const handleMouseDown = (e) => {
    if (!currentTool) return;
    const pos = getMousePosition(e);

    if (currentTool === 'quadratic') {
      if (quadPointState === 'start') {
        setQuadPoints({ start: pos, control: null, end: null });
        setQuadPointState('control');
      } else if (quadPointState === 'control') {
        setQuadPoints((prev) => ({ ...prev, control: pos }));
        setQuadPointState('end');
      } else if (quadPointState === 'end') {
        setQuadPoints((prev) => ({ ...prev, end: pos }));
        setQuadPointState('done');
      }
    } else if (currentTool === 'bezier') {
      if (bezierPointState === 'start') {
        setBezierPoints({ start: pos, control1: null, control2: null, end: null });
        setBezierPointState('control1');
      } else if (bezierPointState === 'control1') {
        setBezierPoints((prev) => ({ ...prev, control1: pos }));
        setBezierPointState('control2');
      } else if (bezierPointState === 'control2') {
        setBezierPoints((prev) => ({ ...prev, control2: pos }));
        setBezierPointState('end');
      } else if (bezierPointState === 'end') {
        setBezierPoints((prev) => ({ ...prev, end: pos }));
        setBezierPointState('done');
      }
    }
  };

  // Handle dragging of points
  const handleDragMove = (e, points, setPoints, pointName) => {
    setPoints({
      ...points,
      [pointName]: { x: e.target.x(), y: e.target.y() }
    });
  };

  // Handle cursor change on hover
  const handleCursor = (e, pointId, isEnter) => {
    const stage = e.target.getStage();
    stage.container().style.cursor = isEnter ? 'pointer' : 'default';
    setHoveredAnchor(isEnter ? pointId : null);
  };

  // Render draggable anchor points
  const renderAnchor = (point, pointName, prefix, onDragMove) => (
    <Circle
      key={`${prefix}-${pointName}`}
      x={point.x}
      y={point.y}
      radius={10}
      stroke='#666'
      fill='#ddd'
      strokeWidth={hoveredAnchor === `${prefix}-${pointName}` ? 4 : 2}
      draggable
      onDragMove={onDragMove}
      onMouseEnter={(e) => handleCursor(e, `${prefix}-${pointName}`, true)}
      onMouseLeave={(e) => handleCursor(e, `${prefix}-${pointName}`, false)}
    />
  );

  // Render anchors for quadratic curve
  const quadAnchors = quadPoints
    ? Object.entries(quadPoints)
        .filter(([_, point]) => point !== null)
        .map(([name, point]) =>
          renderAnchor(point, name, 'quad', (e) => handleDragMove(e, quadPoints, setQuadPoints, name))
        )
    : [];

  // Render anchors for Bezier curve
  const bezierAnchors = bezierPoints
    ? Object.entries(bezierPoints)
        .filter(([_, point]) => point !== null)
        .map(([name, point]) =>
          renderAnchor(point, name, 'bezier', (e) => handleDragMove(e, bezierPoints, setBezierPoints, name))
        )
    : [];

  // Handle tool selection
  const handleToolChange = (tool) => {
    if (tool === currentTool) {
      setCurrentTool('');
      setQuadPoints(null);
      setBezierPoints(null);
      setQuadPointState('start');
      setBezierPointState('start');
      setMousePos(null);
    } else {
      setCurrentTool(tool);
      setQuadPoints(null);
      setBezierPoints(null);
      setQuadPointState('start');
      setBezierPointState('start');
    }
  };

  return (
    <div>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
        <button
          onClick={() => handleToolChange('quadratic')}
          style={{
            padding: '10px',
            margin: '5px',
            background: currentTool === 'quadratic' ? '#ccc' : '#fff',
            border: '1px solid #666'
          }}
        >
          Draw Quadratic Curve
        </button>
        <button
          onClick={() => handleToolChange('bezier')}
          style={{
            padding: '10px',
            margin: '5px',
            background: currentTool === 'bezier' ? '#ccc' : '#fff',
            border: '1px solid #666'
          }}
        >
          Draw Bezier Curve
        </button>
      </div>
      <Stage ref={stageRef} width={width} height={height} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}>
        <Layer>
          {/* Quadratic Curve */}
          {quadPoints && quadPoints.start && quadPoints.control && quadPoints.end && (
            <>
              <Shape
                sceneFunc={(ctx, shape) => {
                  ctx.beginPath();
                  ctx.moveTo(quadPoints.start.x, quadPoints.start.y);
                  ctx.quadraticCurveTo(quadPoints.control.x, quadPoints.control.y, quadPoints.end.x, quadPoints.end.y);
                  ctx.fillStrokeShape(shape);
                }}
                stroke='red'
                strokeWidth={4}
              />
              <Line
                points={[
                  quadPoints.start.x,
                  quadPoints.start.y,
                  quadPoints.control.x,
                  quadPoints.control.y,
                  quadPoints.end.x,
                  quadPoints.end.y
                ]}
                dash={[10, 10, 0, 10]}
                strokeWidth={3}
                stroke='black'
                lineCap='round'
                opacity={0.3}
              />
            </>
          )}
          {/* Bezier Curve */}
          {bezierPoints && bezierPoints.start && bezierPoints.control1 && bezierPoints.control2 && bezierPoints.end && (
            <>
              <Shape
                sceneFunc={(ctx, shape) => {
                  ctx.beginPath();
                  ctx.moveTo(bezierPoints.start.x, bezierPoints.start.y);
                  ctx.bezierCurveTo(
                    bezierPoints.control1.x,
                    bezierPoints.control1.y,
                    bezierPoints.control2.x,
                    bezierPoints.control2.y,
                    bezierPoints.end.x,
                    bezierPoints.end.y
                  );
                  ctx.fillStrokeShape(shape);
                }}
                stroke='blue'
                strokeWidth={5}
              />
              <Line
                points={[
                  bezierPoints.start.x,
                  bezierPoints.start.y,
                  bezierPoints.control1.x,
                  bezierPoints.control1.y,
                  bezierPoints.control2.x,
                  bezierPoints.control2.y,
                  bezierPoints.end.x,
                  bezierPoints.end.y
                ]}
                dash={[10, 10, 0, 10]}
                strokeWidth={3}
                stroke='black'
                lineCap='round'
                opacity={0.3}
              />
            </>
          )}
          {/* Temporary line for quadratic curve while drawing */}
          {currentTool === 'quadratic' && quadPoints && quadPoints.start && quadPointState === 'end' && mousePos && (
            <Shape
              sceneFunc={(ctx, shape) => {
                ctx.beginPath();
                ctx.moveTo(quadPoints.start.x, quadPoints.start.y);
                ctx.quadraticCurveTo(quadPoints.control.x, quadPoints.control.y, mousePos.x, mousePos.y);
                ctx.strokeShape(shape);
              }}
              stroke='red'
              strokeWidth={4}
              dash={[5, 5]}
            />
          )}
          {/* Temporary line for Bezier curve while drawing */}
          {currentTool === 'bezier' &&
            bezierPoints &&
            bezierPoints.start &&
            bezierPoints.control1 &&
            bezierPointState === 'end' &&
            mousePos && (
              <Shape
                sceneFunc={(ctx, shape) => {
                  ctx.beginPath();
                  ctx.moveTo(bezierPoints.start.x, bezierPoints.start.y);
                  ctx.bezierCurveTo(
                    bezierPoints.control1.x,
                    bezierPoints.control1.y,
                    bezierPoints.control2.x,
                    bezierPoints.control2.y,
                    mousePos.x,
                    mousePos.y
                  );
                  ctx.strokeShape(shape);
                }}
                stroke='blue'
                strokeWidth={5}
                dash={[5, 5]}
              />
            )}
          {/* Current mouse position indicator */}
          {mousePos && (currentTool === 'quadratic' || currentTool === 'bezier') && (
            <Circle x={mousePos.x} y={mousePos.y} radius={5} fill='orange' />
          )}
          {/* Render anchors */}
          {quadAnchors}
          {bezierAnchors}
        </Layer>
      </Stage>
    </div>
  );
};

export default ModifyCurvesDemo;
