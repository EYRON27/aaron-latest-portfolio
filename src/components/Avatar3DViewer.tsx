import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Stars, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

/* ─────────────────────────── COLOR PALETTE ───────────────────────────────── */
const C = {
  skin: '#f4c59f', skinDark: '#d4a574', hair: '#1a1206',
  shirt: '#f5cfe0', tie: '#2d3561', tieDark: '#1a2040',
  pants: '#1a1a2e', shoe: '#0d0d1a',
  desk: '#8B6914', deskLeg: '#6b4c1e',
  chair: '#1d4ed8', chairDark: '#1e3a8a',
  laptop: '#c8c8cc', screen: '#93c5fd', screenGlow: '#60a5fa',
  lampMetal: '#333', plantGreen: '#15803d', pot: '#92400e',
};

/*
  WORLD LAYOUT (camera at Z=4, looks toward Z=0):
  - Character sits at Z=-0.12  (behind desk, faces +Z = faces camera)
  - Chair at Z=-0.35            (chair is behind character)
  - Desk center at Z=0.38       (desk is between character & camera)
  - Desk near edge at Z=0.02   (character's hands can reach keyboard here)
  - Laptop keyboard at Z=0.12  (on desk, character side)
  - Camera angle: slight 3/4 from front-left for best view
*/

/* ─────────────────────────── LAPTOP ──────────────────────────────────────── */
function Laptop() {
  const glowRef = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(s => {
    if (glowRef.current)
      glowRef.current.emissiveIntensity = 0.9 + Math.sin(s.clock.elapsedTime * 1.8) * 0.25;
  });

  return (
    // Rotated 180deg so keyboard faces character (-Z)
    <group position={[0.08, 0.798, 0.15]} rotation={[0, Math.PI, 0]}>
      {/* Base / keyboard deck */}
      <RoundedBox args={[0.56, 0.024, 0.4]} radius={0.01} smoothness={4}>
        <meshStandardMaterial color={C.laptop} roughness={0.2} metalness={0.9} />
      </RoundedBox>
      {/* Trackpad */}
      <mesh position={[0, 0.0125, 0.12]}>
        <boxGeometry args={[0.16, 0.002, 0.1]} />
        <meshStandardMaterial color="#999" roughness={0.6} metalness={0.4} />
      </mesh>
      {/* Keys area */}
      <RoundedBox args={[0.48, 0.004, 0.22]} radius={0.008} position={[0, 0.012, -0.06]}>
        <meshStandardMaterial color="#444" roughness={0.7} metalness={0.2} />
      </RoundedBox>
      
      {/* Screen hinge at back edge: Y = 0.012 (half base height), Z = -0.2 (half base depth) */}
      <group position={[0, 0.012, -0.2]} rotation={[Math.PI * 0.12, 0, 0]}>
        {/* Shift screen up so bottom edge is at the hinge (Y=0.19 = half screen height) */}
        <group position={[0, 0.19, 0]}>
          <RoundedBox args={[0.56, 0.38, 0.016]} radius={0.01} smoothness={4}>
            <meshStandardMaterial color={C.laptop} roughness={0.2} metalness={0.9} />
          </RoundedBox>
          {/* Display face - front of screen */}
          <mesh position={[0, 0, 0.009]}>
            <planeGeometry args={[0.52, 0.34]} />
            <meshStandardMaterial ref={glowRef} color={C.screen} emissive={C.screenGlow}
              emissiveIntensity={1} roughness={0.05} />
          </mesh>
          {/* Apple logo on the back */}
          <mesh position={[0, 0, -0.009]} rotation={[0, Math.PI, 0]}>
            <circleGeometry args={[0.03, 16]} />
            <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.8} />
          </mesh>
          {/* Code lines on screen */}
          {([-0.11, -0.065, -0.02, 0.025, 0.07, 0.115] as number[]).map((y, i) => (
            <mesh key={i} position={[i%2===0 ? -0.07 : -0.02, y, 0.01]}>
              <planeGeometry args={[i%3===0 ? 0.16 : i%3===1 ? 0.26 : 0.2, 0.011]} />
              <meshStandardMaterial
                color={i%2===0 ? '#f59e0b' : '#a5b4fc'}
                emissive={i%2===0 ? '#f59e0b' : '#a5b4fc'}
                emissiveIntensity={1.1} transparent opacity={0.9}
              />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

/* ─────────────────────────── DESK ────────────────────────────────────────── */
function Desk() {
  // Desk top surface: Y=0.76, center Z=0.38, width 1.8, depth 0.72
  // Near edge (toward character): Z = 0.38-0.36 = 0.02
  // Far edge (toward camera):     Z = 0.38+0.36 = 0.74
  return (
    <group>
      {/* Top surface */}
      <RoundedBox args={[1.8, 0.052, 0.72]} radius={0.016} smoothness={4}
        position={[0, 0.76, 0.38]}>
        <meshStandardMaterial color={C.desk} roughness={0.5} metalness={0.05} />
      </RoundedBox>
      {/* Surface sheen */}
      <mesh position={[0, 0.787, 0.38]}>
        <boxGeometry args={[1.78, 0.002, 0.70]} />
        <meshStandardMaterial color="#a07820" roughness={0.35} />
      </mesh>
      {/* 4 Legs — front pair at Z=0.7, rear pair at Z=0.07 */}
      {([[-0.84,0.38,0.7],[0.84,0.38,0.7],[-0.84,0.38,0.07],[0.84,0.38,0.07]] as [number,number,number][]).map((p,i)=>(
        <mesh key={i} position={p}>
          <cylinderGeometry args={[0.027,0.027,0.76,8]} />
          <meshStandardMaterial color={C.deskLeg} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────────────────── CHAIR ───────────────────────────────────────── */
function Chair() {
  // Chair seat at Y=0.42, Z=-0.25
  return (
    <group position={[0, 0, -0.25]}>
      <RoundedBox args={[0.56, 0.068, 0.5]} radius={0.028} smoothness={4}
        position={[0, 0.42, 0]}>
        <meshStandardMaterial color={C.chair} roughness={0.7} />
      </RoundedBox>
      {/* Back rest */}
      <RoundedBox args={[0.54, 0.62, 0.065]} radius={0.028} smoothness={4}
        position={[0, 0.77, -0.25]} rotation={[0.12, 0, 0]}>
        <meshStandardMaterial color={C.chair} roughness={0.7} />
      </RoundedBox>
      {/* Arm rests */}
      {([-0.3, 0.3] as number[]).map((x,i)=>(
        <RoundedBox key={i} args={[0.052,0.052,0.42]} radius={0.018}
          position={[x, 0.55, 0]}>
          <meshStandardMaterial color={C.chairDark} roughness={0.5} />
        </RoundedBox>
      ))}
      {/* Stem */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.027,0.048,0.52,8]} />
        <meshStandardMaterial color="#444" roughness={0.3} metalness={0.9} />
      </mesh>
      {/* 5-star base */}
      {[0,72,144,216,288].map((deg,i)=>(
        <mesh key={i}
          position={[Math.cos(deg*Math.PI/180)*0.25,-0.14,Math.sin(deg*Math.PI/180)*0.25]}
          rotation={[0,-deg*Math.PI/180,0]}>
          <boxGeometry args={[0.28,0.026,0.045]} />
          <meshStandardMaterial color="#333" roughness={0.3} metalness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────────────────── DESK LAMP ───────────────────────────────────── */
function DeskLamp() {
  // On desk surface at world [-0.72, 0.794, 0.55]
  return (
    <group position={[-0.72, 0.794, 0.55]}>
      <mesh><cylinderGeometry args={[0.06,0.06,0.016,14]} />
        <meshStandardMaterial color={C.lampMetal} roughness={0.25} metalness={0.9}/></mesh>
      <mesh position={[0.018,0.24,-0.035]} rotation={[0,0,0.1]}>
        <cylinderGeometry args={[0.012,0.012,0.34,8]} />
        <meshStandardMaterial color={C.lampMetal} roughness={0.3} metalness={0.9}/></mesh>
      <mesh position={[0.04,0.44,-0.09]} rotation={[0.45,0,0.18]}>
        <coneGeometry args={[0.085,0.11,12,1,true]} />
        <meshStandardMaterial color="#111" roughness={0.3} metalness={0.7} side={THREE.DoubleSide}/></mesh>
      <pointLight position={[0.04,0.4,-0.09]} color="#fffbe0" intensity={2} distance={1.8}/>
    </group>
  );
}

/* ─────────────────────────── DESK PLANT ──────────────────────────────────── */
function DeskPlant() {
  return (
    <group position={[0.76, 0.836, 0.6]}>
      <mesh><cylinderGeometry args={[0.054,0.044,0.1,10]}/>
        <meshStandardMaterial color={C.pot} roughness={0.9}/></mesh>
      {([[0,0.13,0,0.088],[0.04,0.17,0.02,0.062],[-0.035,0.16,0.01,0.068],[0,0.09,0.048,0.052]] as number[][]).map(([x,y,z,r],i)=>(
        <mesh key={i} position={[x,y,z]}>
          <sphereGeometry args={[r,8,8]}/>
          <meshStandardMaterial color={i%2===0?'#15803d':'#166534'} roughness={0.9}/>
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────────────────── CHARACTER ───────────────────────────────────── */
function Character() {
  const leftHandRef  = useRef<THREE.Group>(null);
  const rightHandRef = useRef<THREE.Group>(null);
  const headRef      = useRef<THREE.Group>(null);
  const screenLight  = useRef<THREE.PointLight>(null);

  useFrame(s => {
    const t = s.clock.elapsedTime;
    // Typing animation
    if (leftHandRef.current)  leftHandRef.current.position.y = 0.815 + Math.sin(t * 7.5) * 0.014;
    if (rightHandRef.current) rightHandRef.current.position.y = 0.815 + Math.sin(t * 7.5 + Math.PI) * 0.014;
    // Head subtle movement
    if (headRef.current) {
      headRef.current.rotation.x = -0.05 + Math.sin(t * 0.7) * 0.035;
      headRef.current.rotation.y = Math.sin(t * 0.45) * 0.07;
    }
    // Screen flicker
    if (screenLight.current)
      screenLight.current.intensity = 0.9 + Math.sin(t * 1.6) * 0.22 + Math.sin(t * 4.5) * 0.08;
  });

  // Character root at Z=-0.12 (behind desk), face points toward +Z (toward camera)
  return (
    <group>
      {/* Laptop screen blue glow on character's face */}
      <pointLight ref={screenLight} position={[0.08, 0.88, 0.15]} color="#60a5fa" intensity={0.9} distance={1.2}/>

      {/* ── HEAD at Y=0.98, Z=-0.06 ── */}
      <group ref={headRef} position={[0, 0.98, -0.06]}>
        <mesh><sphereGeometry args={[0.128,20,20]}/>
          <meshStandardMaterial color={C.skin} roughness={0.75}/></mesh>
        {/* Hair */}
        <mesh position={[0,0.065,-0.015]} scale={[1,0.65,1]}>
          <sphereGeometry args={[0.132,16,16]}/>
          <meshStandardMaterial color={C.hair} roughness={0.95}/></mesh>
        <mesh position={[0,0.02,-0.09]}>
          <sphereGeometry args={[0.1,12,12]}/>
          <meshStandardMaterial color={C.hair} roughness={0.95}/></mesh>
        {/* Eyes — face points +Z toward camera */}
        {([-0.046, 0.046] as number[]).map((x,i)=>(
          <group key={i} position={[x,0.005,0.11]}>
            <mesh><sphereGeometry args={[0.018,8,8]}/><meshStandardMaterial color="#fff"/></mesh>
            <mesh position={[0,0,0.01]}><sphereGeometry args={[0.011,6,6]}/><meshStandardMaterial color="#111" roughness={0.1}/></mesh>
          </group>
        ))}
        {/* Eyebrows */}
        {([-0.046, 0.046] as number[]).map((x,i)=>(
          <mesh key={i} position={[x,0.046,0.11]} rotation={[0,0,i===0?0.15:-0.15]}>
            <boxGeometry args={[0.036,0.008,0.004]}/><meshStandardMaterial color={C.hair}/></mesh>
        ))}
        {/* Nose */}
        <mesh position={[0,-0.02,0.125]}><sphereGeometry args={[0.014,6,6]}/><meshStandardMaterial color={C.skinDark}/></mesh>
        {/* Ears */}
        {([-0.13, 0.13] as number[]).map((x,i)=>(
          <mesh key={i} position={[x,0,0]}><sphereGeometry args={[0.028,8,8]}/><meshStandardMaterial color={C.skinDark}/></mesh>
        ))}
      </group>

      {/* ── NECK ── */}
      <mesh position={[0,0.845,-0.05]}>
        <cylinderGeometry args={[0.04,0.045,0.09,10]}/>
        <meshStandardMaterial color={C.skin} roughness={0.75}/></mesh>

      {/* ── TORSO ── */}
      <RoundedBox args={[0.26,0.36,0.16]} radius={0.022} smoothness={4} position={[0,0.63,-0.08]}>
        <meshStandardMaterial color={C.shirt} roughness={0.8}/></RoundedBox>
      {/* Tie */}
      <RoundedBox args={[0.035,0.2,0.007]} radius={0.005} position={[0,0.64,0.0]}>
        <meshStandardMaterial color={C.tie} roughness={0.6}/></RoundedBox>
      <mesh position={[0,0.745,0.0]}>
        <boxGeometry args={[0.046,0.03,0.016]}/><meshStandardMaterial color={C.tieDark}/></mesh>

      {/* ── LEFT ARM — shoulder down & forward to keyboard ── */}
      {/* Upper arm: from shoulder [0.165, 0.78, -0.08] angling forward to elbow [0.21, 0.74, 0.1] */}
      <mesh position={[0.195, 0.76, 0.01]} rotation={[1.1, 0, 0.18]}>
        <capsuleGeometry args={[0.036,0.18,4,8]}/>
        <meshStandardMaterial color={C.shirt} roughness={0.8}/></mesh>
      {/* Forearm + hand — at keyboard height */}
      <group ref={leftHandRef} position={[0.225, 0.815, 0.2]}>
        <mesh rotation={[1.45, 0, 0.08]}>
          <capsuleGeometry args={[0.029,0.13,4,8]}/>
          <meshStandardMaterial color={C.skin} roughness={0.75}/></mesh>
        <mesh position={[0, 0, 0.09]}>
          <sphereGeometry args={[0.036,10,10]}/>
          <meshStandardMaterial color={C.skin} roughness={0.75}/></mesh>
        {([-0.016,0,0.016] as number[]).map((x,i)=>(
          <mesh key={i} position={[x,-0.02,0.12]} rotation={[0.3,0,0]}>
            <capsuleGeometry args={[0.008,0.022,2,5]}/><meshStandardMaterial color={C.skin}/></mesh>
        ))}
      </group>

      {/* ── RIGHT ARM ── */}
      <mesh position={[-0.195, 0.76, 0.01]} rotation={[1.1, 0, -0.18]}>
        <capsuleGeometry args={[0.036,0.18,4,8]}/>
        <meshStandardMaterial color={C.shirt} roughness={0.8}/></mesh>
      <group ref={rightHandRef} position={[-0.225, 0.815, 0.2]}>
        <mesh rotation={[1.45, 0, -0.08]}>
          <capsuleGeometry args={[0.029,0.13,4,8]}/>
          <meshStandardMaterial color={C.skin} roughness={0.75}/></mesh>
        <mesh position={[0, 0, 0.09]}>
          <sphereGeometry args={[0.036,10,10]}/>
          <meshStandardMaterial color={C.skin} roughness={0.75}/></mesh>
        {([-0.016,0,0.016] as number[]).map((x,i)=>(
          <mesh key={i} position={[x,-0.02,0.12]} rotation={[0.3,0,0]}>
            <capsuleGeometry args={[0.008,0.022,2,5]}/><meshStandardMaterial color={C.skin}/></mesh>
        ))}
      </group>

      {/* ── HIPS ── */}
      <RoundedBox args={[0.23,0.12,0.17]} radius={0.022} position={[0,0.44,-0.1]}>
        <meshStandardMaterial color={C.pants} roughness={0.8}/></RoundedBox>

      {/* ── LEGS — extend FORWARD (+Z) ── */}
      {/* Left thigh: from hip going +Z */}
      <mesh position={[0.1,0.44,0.0]} rotation={[Math.PI/2,0,0]}>
        <capsuleGeometry args={[0.054,0.2,4,8]}/>
        <meshStandardMaterial color={C.pants} roughness={0.8}/></mesh>
      {/* Left shin: hangs DOWN from knee */}
      <mesh position={[0.1,0.22,0.1]}>
        <capsuleGeometry args={[0.044,0.21,4,8]}/>
        <meshStandardMaterial color={C.pants} roughness={0.8}/></mesh>
      <RoundedBox args={[0.095,0.048,0.14]} radius={0.015} position={[0.1,0.06,0.14]}>
        <meshStandardMaterial color={C.shoe} roughness={0.45} metalness={0.15}/></RoundedBox>

      {/* Right leg */}
      <mesh position={[-0.1,0.44,0.0]} rotation={[Math.PI/2,0,0]}>
        <capsuleGeometry args={[0.054,0.2,4,8]}/>
        <meshStandardMaterial color={C.pants} roughness={0.8}/></mesh>
      <mesh position={[-0.1,0.22,0.1]}>
        <capsuleGeometry args={[0.044,0.21,4,8]}/>
        <meshStandardMaterial color={C.pants} roughness={0.8}/></mesh>
      <RoundedBox args={[0.095,0.048,0.14]} radius={0.015} position={[-0.1,0.06,0.14]}>
        <meshStandardMaterial color={C.shoe} roughness={0.45} metalness={0.15}/></RoundedBox>
    </group>
  );
}

/* ─────────────────────────── PARTICLES ───────────────────────────────────── */
function Particles() {
  const ref = useRef<THREE.Points>(null);
  const N = 80;
  const pos = new Float32Array(N*3), col = new Float32Array(N*3);
  for (let i=0;i<N;i++){
    const a=(i/N)*Math.PI*2, r=2+Math.random()*1.2;
    pos[i*3]=Math.cos(a)*r; pos[i*3+1]=(Math.random()-0.5)*5; pos[i*3+2]=Math.sin(a)*r;
    if(Math.random()<0.6){col[i*3]=0.96;col[i*3+1]=0.62;col[i*3+2]=0.04;}
    else{col[i*3]=0.55;col[i*3+1]=0.36;col[i*3+2]=0.98;}
  }
  useFrame(s=>{ if(ref.current) ref.current.rotation.y=s.clock.elapsedTime*0.07; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos,3]}/>
        <bufferAttribute attach="attributes-color" args={[col,3]}/>
      </bufferGeometry>
      <pointsMaterial size={0.038} vertexColors sizeAttenuation transparent opacity={0.82}/>
    </points>
  );
}

/* ─────────────────────────── FULL SCENE ──────────────────────────────────── */
function OfficeScene() {
  return (
    <>
      {/* ── Lighting ── */}
      <ambientLight intensity={0.38}/>
      <pointLight position={[-2.5, 3.5, 2.5]} color="#f59e0b" intensity={2.2} castShadow/>
      <pointLight position={[3, 2, -1]}       color="#8b5cf6" intensity={1.2}/>
      <pointLight position={[0, -0.5, 3.5]}   color="#06b6d4" intensity={0.5}/>
      <spotLight position={[0.5, 5, 1.5]} angle={0.42} penumbra={0.9}
        intensity={2.5} color="#fff8f0" castShadow shadow-mapSize={[1024,1024]}/>

      <Stars radius={16} depth={14} count={900} factor={0.3} fade speed={0.4}/>
      <Particles/>

      {/* ── Office scene ── */}
      <Desk/>
      <DeskLamp/>
      <DeskPlant/>
      <Laptop/>
      <Chair/>
      <Character/>

      {/* Floor shadow */}
      <ContactShadows position={[0,-0.01,0]} opacity={0.6} scale={5} blur={2.5} far={4} color="#f59e0b"/>

      {/* Orbit — user drags; slight range so scene always looks good */}
      <OrbitControls
        enableZoom={false} enablePan={false}
        minPolarAngle={Math.PI/4} maxPolarAngle={Math.PI/2.1}
        minAzimuthAngle={-Math.PI/2.5} maxAzimuthAngle={Math.PI/2.5}
        target={[0, 0.6, 0]} rotateSpeed={0.5}
      />
    </>
  );
}

/* ─────────────────────────── LOADING ─────────────────────────────────────── */
function LoadingFallback({ size }: { size: number }) {
  return (
    <div style={{
      width:size, height:size, display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', gap:14,
      background:'radial-gradient(ellipse at 50% 60%, #0d0820, #050510)',
      borderRadius:20, border:'1px solid rgba(245,158,11,0.15)',
    }}>
      <div style={{ width:44, height:44, borderRadius:'50%',
        border:'2px solid rgba(245,158,11,0.15)', borderTop:'2px solid #f59e0b',
        animation:'spin3d 0.9s linear infinite' }}/>
      <span style={{ color:'#f59e0b', fontSize:'0.65rem', letterSpacing:'0.18em', opacity:0.6 }}>BUILDING 3D SCENE…</span>
      <style>{`@keyframes spin3d{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

/* ─────────────────────────── EXPORT ──────────────────────────────────────── */
export default function Avatar3DViewer({ size = 420 }: { size?: number }) {
  return (
    <div style={{
      position:'relative', width:size, height:size, borderRadius:20, overflow:'hidden',
      background:'radial-gradient(ellipse at 50% 55%, #0d0820 0%, #050510 70%)',
      boxShadow:'0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(245,158,11,0.18), 0 0 70px rgba(139,92,246,0.07)',
    }}>
      <Canvas
        camera={{ position: [-0.5, 1.3, 3.8], fov: 44 }}
        shadows gl={{ antialias:true, alpha:true }}
        style={{ background:'transparent' }}
      >
        <OfficeScene/>
      </Canvas>

      {/* ⌨ CODING badge */}
      <div style={{
        position:'absolute', top:14, left:14, display:'flex', alignItems:'center', gap:6,
        background:'rgba(5,5,15,0.85)', backdropFilter:'blur(10px)',
        border:'1px solid rgba(96,165,250,0.3)', borderRadius:999, padding:'4px 12px',
        pointerEvents:'none',
      }}>
        <span style={{ fontSize:'0.58rem', color:'#60a5fa', letterSpacing:'0.1em', fontWeight:600 }}>⌨ CODING</span>
        <TypingDots/>
      </div>

      {/* Drag hint */}
      <div style={{ position:'absolute', bottom:14, left:0, right:0, textAlign:'center', pointerEvents:'none' }}>
        <div style={{
          display:'inline-block', background:'rgba(5,5,15,0.8)', backdropFilter:'blur(10px)',
          border:'1px solid rgba(245,158,11,0.2)', borderRadius:999,
          padding:'5px 16px', fontSize:'0.62rem', color:'rgba(200,200,220,0.65)', letterSpacing:'0.12em',
        }}>⟳ DRAG TO LOOK AROUND</div>
      </div>

      {/* Corner glows */}
      <div style={{ position:'absolute', top:0, left:0, width:100, height:100, background:'radial-gradient(circle at 0% 0%, rgba(245,158,11,0.1), transparent)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:0, right:0, width:100, height:100, background:'radial-gradient(circle at 100% 100%, rgba(139,92,246,0.1), transparent)', pointerEvents:'none' }}/>
    </div>
  );
}

function TypingDots() {
  return (
    <span style={{ display:'flex', gap:3 }}>
      {[0,1,2].map(i=>(
        <span key={i} style={{ width:4, height:4, borderRadius:'50%', background:'#60a5fa',
          display:'inline-block', animation:`typedot 1.2s ${i*0.2}s ease-in-out infinite` }}/>
      ))}
      <style>{`@keyframes typedot{0%,80%,100%{transform:scale(0.6);opacity:0.3}40%{transform:scale(1.1);opacity:1}}`}</style>
    </span>
  );
}
