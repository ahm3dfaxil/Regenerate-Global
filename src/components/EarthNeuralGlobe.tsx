/* eslint-disable react/no-unknown-property */
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Color, Group, Points, BufferGeometry, Float32BufferAttribute } from 'three';

const EarthGlobe = () => {
  const groupRef = useRef<Group>(null);
  const pointsRef = useRef<Points>(null);

  // Generate Earth sphere surface particles & neural network connection arcs
  const { positions, linePositions, nodeColors } = useMemo(() => {
    const nodeCount = 240;
    const radius = 1.85; // Perfect radius so it never touches viewport boundaries
    const pos = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);
    const coords: [number, number, number][] = [];

    // Pure crisp white palette for neural network nodes
    const pureWhite = new Color('#FFFFFF');
    const subtleWhite = new Color('#E6E6E6');
    const dimWhite = new Color('#CCCCCC');

    for (let i = 0; i < nodeCount; i++) {
      // Uniform Fibonacci Golden Ratio distribution for a pristine 3D sphere
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      coords.push([x, y, z]);

      const rand = Math.random();
      const c = rand > 0.6 ? pureWhite : rand > 0.25 ? subtleWhite : dimWhite;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    // Connect nearby nodes with neural network fiber lines
    const lines: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = coords[i][0] - coords[j][0];
        const dy = coords[i][1] - coords[j][1];
        const dz = coords[i][2] - coords[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        // Draw neural connection if distance is within threshold
        if (dist < 1.1) {
          lines.push(coords[i][0], coords[i][1], coords[i][2]);
          lines.push(coords[j][0], coords[j][1], coords[j][2]);
        }
      }
    }

    return {
      positions: pos,
      linePositions: new Float32Array(lines),
      nodeColors: colors
    };
  }, []);

  const pointGeo = useMemo(() => {
    const geo = new BufferGeometry();
    geo.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new Float32BufferAttribute(nodeColors, 3));
    return geo;
  }, [positions, nodeColors]);

  const lineGeo = useMemo(() => {
    const geo = new BufferGeometry();
    geo.setAttribute('position', new Float32BufferAttribute(linePositions, 3));
    return geo;
  }, [linePositions]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Neural Network Node Points */}
      <points ref={pointsRef} geometry={pointGeo}>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
        />
      </points>

      {/* Neural Network Interconnecting Fiber Lines - Pure Crisp White */}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.35}
          linewidth={1}
        />
      </lineSegments>

      {/* Inner Glowing Smooth Atmosphere Sphere - Crisp White */}
      <mesh>
        <sphereGeometry args={[1.82, 32, 32]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.08}
          wireframe
        />
      </mesh>
    </group>
  );
};

export const EarthNeuralGlobe: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[350px]">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        style={{ pointerEvents: 'none', width: '100%', height: '100%' }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: 'high-performance', antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <EarthGlobe />
      </Canvas>
    </div>
  );
};
