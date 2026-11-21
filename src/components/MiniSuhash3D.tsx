import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface MiniSuhash3DProps {
  charState: 'standing' | 'running';
  runSpeed: number;
  facingAngle: number; // in radians
  isWaving: boolean;
  onCharacterClick: () => void;
  scale?: number;
}

export const MiniSuhash3D: React.FC<MiniSuhash3DProps> = ({
  charState,
  runSpeed,
  facingAngle,
  isWaving,
  onCharacterClick,
  scale = 1.0,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // References for animation
  const animFrameRef = useRef<number | null>(null);
  const limbsRef = useRef<{
    rootGroup: THREE.Group;
    bodyGroup: THREE.Group;
    headGroup: THREE.Group;
    leftLegGroup: THREE.Group;
    rightLegGroup: THREE.Group;
    leftCalfGroup: THREE.Group;
    rightCalfGroup: THREE.Group;
    leftArmGroup: THREE.Group;
    rightArmGroup: THREE.Group;
    rightForearmGroup: THREE.Group;
    rightHandGroup: THREE.Group;
    shadowMesh: THREE.Mesh;
    materials: THREE.Material[];
  } | null>(null);

  const stateRef = useRef({
    charState,
    runSpeed,
    facingAngle,
    isWaving,
  });

  useEffect(() => {
    stateRef.current = { charState, runSpeed, facingAngle, isWaving };
  }, [charState, runSpeed, facingAngle, isWaving]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = 160;
    const height = 200;

    // Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.3, 4.2);
    camera.lookAt(0, 0.85, 0);

    // Renderer with antialias and alpha
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff4e6, 2.0);
    dirLight.position.set(2, 4, 3);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0xa5c8ff, 1.3);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    // --- MATERIALS ---
    const materials: THREE.Material[] = [];
    const createMat = (params: THREE.MeshStandardMaterialParameters) => {
      const m = new THREE.MeshStandardMaterial(params);
      materials.push(m);
      return m;
    };

    const skinMat = createMat({ color: 0xf1be9b, roughness: 0.6, metalness: 0.05 });
    const hairMat = createMat({ color: 0x1e1917, roughness: 0.8, metalness: 0.1 });
    const suitMat = createMat({ color: 0xbac0cc, roughness: 0.55, metalness: 0.08 });
    const lapelMat = createMat({ color: 0x9fa6b5, roughness: 0.6, metalness: 0.05 });
    const shirtMat = createMat({ color: 0x76428a, roughness: 0.65, metalness: 0.05 });
    const shoeMat = createMat({ color: 0x221e1d, roughness: 0.45, metalness: 0.15 });
    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const irisMat = createMat({ color: 0x472d1a, roughness: 0.2 });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const highlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const facialHairMat = createMat({ color: 0x1c1715, roughness: 0.85 });

    // --- ROOT RIG ---
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Shadow
    const shadowGeo = new THREE.CircleGeometry(0.42, 24);
    const shadowMat = new THREE.MeshBasicMaterial({ color: 0x0a0c12, opacity: 0.35, transparent: true });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.02;
    rootGroup.add(shadowMesh);

    // Body Group (for bouncing/squash)
    const bodyGroup = new THREE.Group();
    rootGroup.add(bodyGroup);

    // --- TORSO & SUIT ---
    // Hips / Pelvis
    const hipsGeo = new THREE.CylinderGeometry(0.24, 0.22, 0.22, 16);
    const hips = new THREE.Mesh(hipsGeo, suitMat);
    hips.position.y = 0.72;
    bodyGroup.add(hips);

    // Torso (Suit Jacket)
    const torsoGeo = new THREE.CylinderGeometry(0.29, 0.25, 0.46, 16);
    const torso = new THREE.Mesh(torsoGeo, suitMat);
    torso.position.y = 1.0;
    bodyGroup.add(torso);

    // Shirt Insert (Purple)
    const shirtGeo = new THREE.CylinderGeometry(0.18, 0.14, 0.36, 12, 1, false, 0, Math.PI);
    const shirt = new THREE.Mesh(shirtGeo, shirtMat);
    shirt.position.set(0, 1.05, 0.13);
    shirt.rotation.y = -Math.PI / 2;
    bodyGroup.add(shirt);

    // Lapels (Left & Right)
    const lapelGeo = new THREE.BoxGeometry(0.06, 0.32, 0.04);
    const leftLapel = new THREE.Mesh(lapelGeo, lapelMat);
    leftLapel.position.set(-0.11, 1.05, 0.24);
    leftLapel.rotation.z = -0.22;
    bodyGroup.add(leftLapel);

    const rightLapel = new THREE.Mesh(lapelGeo, lapelMat);
    rightLapel.position.set(0.11, 1.05, 0.24);
    rightLapel.rotation.z = 0.22;
    bodyGroup.add(rightLapel);

    // Shirt Collar
    const collarGeo = new THREE.TorusGeometry(0.13, 0.025, 8, 16, Math.PI);
    const collar = new THREE.Mesh(collarGeo, shirtMat);
    collar.position.set(0, 1.23, 0.04);
    collar.rotation.x = Math.PI / 2;
    bodyGroup.add(collar);

    // --- HEAD GROUP ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.48, 0);
    bodyGroup.add(headGroup);

    // Chibi Head
    const headGeo = new THREE.SphereGeometry(0.38, 24, 24);
    headGeo.scale(1, 1.08, 0.95);
    const head = new THREE.Mesh(headGeo, skinMat);
    headGroup.add(head);

    // Ears
    const earGeo = new THREE.SphereGeometry(0.09, 12, 12);
    earGeo.scale(0.5, 1, 0.8);
    const leftEar = new THREE.Mesh(earGeo, skinMat);
    leftEar.position.set(-0.37, 0, 0);
    headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, skinMat);
    rightEar.position.set(0.37, 0, 0);
    headGroup.add(rightEar);

    // Pompadour Hair
    const hairBaseGeo = new THREE.SphereGeometry(0.40, 20, 20);
    hairBaseGeo.scale(1.03, 1.06, 1.02);
    const hairBase = new THREE.Mesh(hairBaseGeo, hairMat);
    hairBase.position.set(0, 0.08, -0.04);
    headGroup.add(hairBase);

    // Front Voluminous Quiff / Pompadour top
    const quiffGeo = new THREE.CylinderGeometry(0.24, 0.32, 0.26, 14);
    quiffGeo.scale(1.15, 0.9, 0.95);
    const quiff = new THREE.Mesh(quiffGeo, hairMat);
    quiff.position.set(0, 0.38, 0.08);
    quiff.rotation.x = -0.35;
    headGroup.add(quiff);

    // Hair Swirl / Front Lock
    const lockGeo = new THREE.SphereGeometry(0.16, 14, 14);
    lockGeo.scale(1.3, 0.8, 1);
    const lock = new THREE.Mesh(lockGeo, hairMat);
    lock.position.set(-0.06, 0.36, 0.22);
    headGroup.add(lock);

    // --- FACE DETAILS ---
    // Big expressive cartoon eyes
    const createEye = (isRight: boolean) => {
      const eyeGroup = new THREE.Group();
      const sclera = new THREE.Mesh(new THREE.SphereGeometry(0.085, 16, 16), eyeWhiteMat);
      sclera.scale.set(0.9, 1.1, 0.5);
      eyeGroup.add(sclera);

      const iris = new THREE.Mesh(new THREE.SphereGeometry(0.052, 14, 14), irisMat);
      iris.position.set(0, 0, 0.035);
      iris.scale.set(1, 1, 0.3);
      eyeGroup.add(iris);

      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.032, 12, 12), pupilMat);
      pupil.position.set(0, 0, 0.05);
      pupil.scale.set(1, 1, 0.2);
      eyeGroup.add(pupil);

      // Specular shine highlights
      const shine1 = new THREE.Mesh(new THREE.SphereGeometry(0.016, 8, 8), highlightMat);
      shine1.position.set(0.018, 0.02, 0.06);
      eyeGroup.add(shine1);

      const shine2 = new THREE.Mesh(new THREE.SphereGeometry(0.009, 8, 8), highlightMat);
      shine2.position.set(-0.015, -0.015, 0.06);
      eyeGroup.add(shine2);

      const side = isRight ? 1 : -1;
      eyeGroup.position.set(side * 0.15, 0.02, 0.33);
      eyeGroup.rotation.y = side * 0.14;
      return eyeGroup;
    };

    headGroup.add(createEye(false));
    headGroup.add(createEye(true));

    // Eyebrows
    const browGeo = new THREE.BoxGeometry(0.12, 0.028, 0.03);
    const leftBrow = new THREE.Mesh(browGeo, hairMat);
    leftBrow.position.set(-0.15, 0.14, 0.35);
    leftBrow.rotation.z = -0.12;
    headGroup.add(leftBrow);

    const rightBrow = new THREE.Mesh(browGeo, hairMat);
    rightBrow.position.set(0.15, 0.14, 0.35);
    rightBrow.rotation.z = 0.12;
    headGroup.add(rightBrow);

    // Cute Chibi Nose
    const noseGeo = new THREE.SphereGeometry(0.042, 12, 12);
    noseGeo.scale(1.1, 0.9, 0.9);
    const nose = new THREE.Mesh(noseGeo, skinMat);
    nose.position.set(0, -0.06, 0.37);
    headGroup.add(nose);

    // Mustache (trimmed cartoon shape)
    const stacheGeo = new THREE.CylinderGeometry(0.022, 0.026, 0.17, 10);
    stacheGeo.scale(1, 0.7, 0.8);
    const stache = new THREE.Mesh(stacheGeo, facialHairMat);
    stache.position.set(0, -0.12, 0.35);
    stache.rotation.z = Math.PI / 2;
    headGroup.add(stache);

    // Cheerful Smile (subtle dark line)
    const mouthGeo = new THREE.TorusGeometry(0.055, 0.012, 8, 12, Math.PI * 0.7);
    const mouth = new THREE.Mesh(mouthGeo, facialHairMat);
    mouth.position.set(0, -0.15, 0.34);
    mouth.rotation.x = Math.PI * 0.9;
    headGroup.add(mouth);

    // Goatee Beard on chin
    const goateeGeo = new THREE.SphereGeometry(0.048, 10, 10);
    goateeGeo.scale(1.1, 0.8, 0.7);
    const goatee = new THREE.Mesh(goateeGeo, facialHairMat);
    goatee.position.set(0, -0.25, 0.31);
    headGroup.add(goatee);

    // --- LEGS RIG ---
    // Left Leg
    const leftLegGroup = new THREE.Group();
    leftLegGroup.position.set(-0.13, 0.64, 0);
    bodyGroup.add(leftLegGroup);

    const thighGeo = new THREE.CylinderGeometry(0.085, 0.075, 0.32, 12);
    const leftThigh = new THREE.Mesh(thighGeo, suitMat);
    leftThigh.position.y = -0.16;
    leftLegGroup.add(leftThigh);

    const leftCalfGroup = new THREE.Group();
    leftCalfGroup.position.y = -0.32;
    leftLegGroup.add(leftCalfGroup);

    const calfGeo = new THREE.CylinderGeometry(0.075, 0.065, 0.28, 12);
    const leftCalf = new THREE.Mesh(calfGeo, suitMat);
    leftCalf.position.y = -0.14;
    leftCalfGroup.add(leftCalf);

    const shoeGeo = new THREE.BoxGeometry(0.12, 0.075, 0.2);
    const leftShoe = new THREE.Mesh(shoeGeo, shoeMat);
    leftShoe.position.set(0, -0.28, 0.04);
    leftCalfGroup.add(leftShoe);

    // Right Leg
    const rightLegGroup = new THREE.Group();
    rightLegGroup.position.set(0.13, 0.64, 0);
    bodyGroup.add(rightLegGroup);

    const rightThigh = new THREE.Mesh(thighGeo, suitMat);
    rightThigh.position.y = -0.16;
    rightLegGroup.add(rightThigh);

    const rightCalfGroup = new THREE.Group();
    rightCalfGroup.position.y = -0.32;
    rightLegGroup.add(rightCalfGroup);

    const rightCalf = new THREE.Mesh(calfGeo, suitMat);
    rightCalf.position.y = -0.14;
    rightCalfGroup.add(rightCalf);

    const rightShoe = new THREE.Mesh(shoeGeo, shoeMat);
    rightShoe.position.set(0, -0.28, 0.04);
    rightCalfGroup.add(rightShoe);

    // --- ARMS RIG ---
    // Left Arm (Casual side pump)
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.31, 1.18, 0);
    bodyGroup.add(leftArmGroup);

    const armGeo = new THREE.CylinderGeometry(0.065, 0.055, 0.26, 12);
    const leftArm = new THREE.Mesh(armGeo, suitMat);
    leftArm.position.y = -0.13;
    leftArmGroup.add(leftArm);

    const leftForearmGroup = new THREE.Group();
    leftForearmGroup.position.y = -0.26;
    leftArmGroup.add(leftForearmGroup);

    const leftForearm = new THREE.Mesh(armGeo, suitMat);
    leftForearm.position.y = -0.12;
    leftForearmGroup.add(leftForearm);

    const handGeo = new THREE.SphereGeometry(0.058, 12, 12);
    const leftHand = new THREE.Mesh(handGeo, skinMat);
    leftHand.position.y = -0.26;
    leftForearmGroup.add(leftHand);

    // Right Arm (Waving & Pump)
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.31, 1.18, 0);
    bodyGroup.add(rightArmGroup);

    const rightArm = new THREE.Mesh(armGeo, suitMat);
    rightArm.position.y = -0.13;
    rightArmGroup.add(rightArm);

    const rightForearmGroup = new THREE.Group();
    rightForearmGroup.position.y = -0.26;
    rightArmGroup.add(rightForearmGroup);

    const rightForearm = new THREE.Mesh(armGeo, suitMat);
    rightForearm.position.y = -0.12;
    rightForearmGroup.add(rightForearm);

    const rightHandGroup = new THREE.Group();
    rightHandGroup.position.y = -0.26;
    rightForearmGroup.add(rightHandGroup);

    const rightHand = new THREE.Mesh(handGeo, skinMat);
    rightHandGroup.add(rightHand);

    // Fingers for waving hand
    const palmGeo = new THREE.BoxGeometry(0.06, 0.08, 0.025);
    const palm = new THREE.Mesh(palmGeo, skinMat);
    palm.position.y = -0.02;
    rightHandGroup.add(palm);

    limbsRef.current = {
      rootGroup,
      bodyGroup,
      headGroup,
      leftLegGroup,
      rightLegGroup,
      leftCalfGroup,
      rightCalfGroup,
      leftArmGroup,
      rightArmGroup,
      rightForearmGroup,
      rightHandGroup,
      shadowMesh,
      materials,
    };

    // --- ANIMATION CLOCK ---
    let animTime = 0;
    let currentFacing = 0;

    const animate = () => {
      animTime += 0.016;
      const { charState: st, runSpeed: spd, facingAngle: tgtAngle, isWaving: wave } = stateRef.current;
      const limbs = limbsRef.current;

      if (limbs) {
        // --- 360-DEGREE SMOOTH ROTATION INTERPOLATION ---
        let angleDiff = tgtAngle - currentFacing;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        currentFacing += angleDiff * 0.14;
        limbs.rootGroup.rotation.y = currentFacing;

        if (st === 'running') {
          // --- REALISTIC 3D RUNNING GAIT ---
          const runFreq = Math.max(spd * 1.8, 7.5);
          const stride = Math.sin(animTime * runFreq);
          const bounce = Math.abs(Math.cos(animTime * runFreq)) * 0.08;

          // Body vertical footstep bounce
          limbs.bodyGroup.position.y = bounce;

          // Forward body tilt into running
          limbs.bodyGroup.rotation.x = 0.22;
          limbs.bodyGroup.rotation.z = -Math.sin(currentFacing) * 0.08;

          // Alternating Leg Swings
          limbs.leftLegGroup.rotation.x = stride * 0.85;
          limbs.rightLegGroup.rotation.x = -stride * 0.85;

          // Dynamic Knee Bends on backswing
          limbs.leftCalfGroup.rotation.x = Math.max(0, -stride) * 0.95;
          limbs.rightCalfGroup.rotation.x = Math.max(0, stride) * 0.95;

          // Alternating Arm Pumps (counter-balanced with legs)
          limbs.leftArmGroup.rotation.x = -stride * 0.8;
          limbs.leftArmGroup.rotation.z = -0.15;
          limbs.rightArmGroup.rotation.x = stride * 0.8;
          limbs.rightArmGroup.rotation.z = 0.15;

          limbs.rightForearmGroup.rotation.x = 0.4;
          limbs.rightForearmGroup.rotation.z = 0;
          limbs.rightHandGroup.rotation.z = 0;

          // Head slight rhythmic bob
          limbs.headGroup.rotation.x = -0.1 + Math.sin(animTime * runFreq) * 0.04;
          limbs.headGroup.rotation.y = 0;

          // Shadow scales with jump height
          const sScale = 1 - bounce * 2.5;
          limbs.shadowMesh.scale.set(sScale, sScale, sScale);
          (limbs.shadowMesh.material as THREE.MeshBasicMaterial).opacity = 0.45 - bounce * 1.5;
        } else {
          // --- STANDING / IDLE / WAVING STATE ---
          limbs.bodyGroup.position.y = Math.sin(animTime * 2.2) * 0.015;
          limbs.bodyGroup.rotation.x = 0;
          limbs.bodyGroup.rotation.z = 0;

          // Legs grounded
          limbs.leftLegGroup.rotation.x *= 0.85;
          limbs.rightLegGroup.rotation.x *= 0.85;
          limbs.leftCalfGroup.rotation.x *= 0.85;
          limbs.rightCalfGroup.rotation.x *= 0.85;

          // Left arm rests naturally at side
          limbs.leftArmGroup.rotation.x = 0.05;
          limbs.leftArmGroup.rotation.z = -0.18 + Math.sin(animTime * 2) * 0.02;

          // Head breathes & gently looks forward
          limbs.headGroup.rotation.x = Math.sin(animTime * 2.2) * 0.03;
          limbs.headGroup.rotation.y = Math.sin(animTime * 1.2) * 0.08;

          // Signature Waving Pose (Pixar Style)
          if (wave) {
            // Raise right arm up into wave
            limbs.rightArmGroup.rotation.x = 0.1;
            limbs.rightArmGroup.rotation.z = 1.95;
            limbs.rightForearmGroup.rotation.z = 0.65;
            limbs.rightForearmGroup.rotation.x = 0.2;
            limbs.rightHandGroup.rotation.z = Math.sin(animTime * 6.5) * 0.35; // Waving hand!
          } else {
            // Calm rest
            limbs.rightArmGroup.rotation.x = 0.05;
            limbs.rightArmGroup.rotation.z = 0.18;
            limbs.rightForearmGroup.rotation.z = 0;
            limbs.rightHandGroup.rotation.z = 0;
          }

          limbs.shadowMesh.scale.set(1, 1, 1);
          (limbs.shadowMesh.material as THREE.MeshBasicMaterial).opacity = 0.35;
        }
      }

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      materials.forEach((m) => m.dispose());
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={onCharacterClick}
      className="cursor-pointer select-none filter drop-shadow-xl transition-transform active:scale-95"
      style={{
        width: '160px',
        height: '200px',
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
      }}
      title="Mini Suhash (3D Avatar) - Tap to interact!"
    />
  );
};
