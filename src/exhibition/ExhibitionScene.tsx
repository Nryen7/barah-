import { useEffect, useRef } from 'react';
import type { Mesh } from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import type { MotionValue } from 'motion/react';
import type { Language } from '../types/barah';
import type { ConceptModel, Part } from './models/types';

function CameraController({ progress }: { progress: MotionValue<number> | null }) {
  const { camera, invalidate } = useThree();
  useEffect(() => {
    if (!progress) return;
    const update = (value: number) => {
      const angle = 0.7 - value * 0.65;
      camera.position.set(Math.sin(angle) * 8, 5.1 - value * 0.9, Math.cos(angle) * 8);
      camera.lookAt(0, 0.9, 0);
      invalidate();
    };
    update(progress.get());
    return progress.on('change', update);
  }, [camera, invalidate, progress]);

  return progress ? null : (
    <OrbitControls target={[0, 0.9, 0]} enablePan={false} enableDamping={false} minDistance={4} maxDistance={16} maxPolarAngle={Math.PI / 2} />
  );
}

function ExplodedPart({ part, amount, progress }: {
  part: Part;
  amount: number;
  progress: MotionValue<number> | null;
}) {
  const mesh = useRef<Mesh>(null);
  const invalidate = useThree(state => state.invalidate);

  useEffect(() => {
    const offset = part.offset;
    const object = mesh.current;
    if (!offset || !object) return;

    const update = (value: number) => {
      const [x, y, z] = part.center;
      object.position.set(x + offset[0] * value, y + offset[1] * value, z + offset[2] * value);
      invalidate();
    };

    update(progress?.get() ?? amount);
    return progress?.on('change', update);
  }, [part, amount, progress, invalidate]);

  return (
    <mesh ref={mesh} position={part.center} rotation={part.rotation}>
      <boxGeometry args={part.size} />
      <meshStandardMaterial color={part.color} roughness={0.9} />
    </mesh>
  );
}

interface SceneProps {
  model: ConceptModel;
  lang: Language;
  explosion: number;
  showAnnotation: boolean;
  scrollProgress: MotionValue<number> | null;
  reset: number;
}

export default function ExhibitionScene({ model, lang, explosion, showAnnotation, scrollProgress, reset }: SceneProps) {
  const unavailable = (
    <p className="p-6 text-center">
      {lang === 'ar' ? 'العرض ثلاثي الأبعاد يحتاج إلى WebGL.' : 'The 3D view requires WebGL.'}
    </p>
  );

  return (
    <Canvas
      key={`${model.id}-${reset}-${Boolean(scrollProgress)}`}
      camera={{ position: [5, 5.1, 6.3], fov: 42 }}
      dpr={[1, 1.5]}
      frameloop="demand"
      fallback={unavailable}
      gl={{ alpha: false, antialias: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#e3d8c6']} />
      <hemisphereLight args={['#fff8ed', '#5e6650', 1.9]} />
      <directionalLight position={[4, 8, 3]} intensity={2.1} />
      <CameraController progress={scrollProgress} />
      <group>
        {model.parts.map(part => <ExplodedPart key={part.id} part={part} amount={explosion} progress={scrollProgress} />)}
        {showAnnotation && (
          <Html position={model.annotation.position} center pointerEvents="none">
            <span aria-hidden="true" dir={lang === 'ar' ? 'rtl' : 'ltr'} className="block w-max rounded-full bg-[#303528] px-3 py-1 text-xs text-white">
              {model.annotation.label[lang]}
            </span>
          </Html>
        )}
      </group>
    </Canvas>
  );
}
