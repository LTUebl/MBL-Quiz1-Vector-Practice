/* ==========================================================================
   LTU BME 3303 Biomechanics - Quiz 1 Vector Practice Application Logic
   ========================================================================== */

// --- DATA DEFINITION FOR ALL 6 QUIZ PROBLEMS ---

const PROBLEMS = [
  {
    id: 1,
    title: "Problem 1: 3D Force & Acceleration on a Ball",
    description: "Determine the total acceleration on a ball (m = 0.05 kg) subjected to three forces (N) given by vector components: F₁ = -5î - 30k̂, F₂ = 25î - 10ĵ + 20k̂, and F₃ = -10î + 15ĵ.",
    imageSrc: "images/problem1.png",
    params: [
      { id: "m", label: "Mass (m)", min: 0.01, max: 0.50, step: 0.01, defaultVal: 0.05, unit: "kg", color: "#e2e8f0" },
      { id: "f1x", label: "F₁ (x component)", min: -30, max: 30, step: 1, defaultVal: -5, unit: "N", color: "#f43f5e" },
      { id: "f1z", label: "F₁ (z component)", min: -50, max: 50, step: 1, defaultVal: -30, unit: "N", color: "#f43f5e" },
      { id: "f2x", label: "F₂ (x component)", min: -50, max: 50, step: 1, defaultVal: 25, unit: "N", color: "#38bdf8" },
      { id: "f2y", label: "F₂ (y component)", min: -50, max: 50, step: 1, defaultVal: -10, unit: "N", color: "#38bdf8" },
      { id: "f2z", label: "F₂ (z component)", min: -50, max: 50, step: 1, defaultVal: 20, unit: "N", color: "#38bdf8" },
      { id: "f3x", label: "F₃ (x component)", min: -30, max: 30, step: 1, defaultVal: -10, unit: "N", color: "#f59e0b" },
      { id: "f3y", label: "F₃ (y component)", min: -30, max: 30, step: 1, defaultVal: 15, unit: "N", color: "#f59e0b" }
    ],
    hintHtml: `
      <p>💡 <strong>3D Vector Addition Strategy:</strong></p>
      <div class="beginner-step-box">
        <strong>Step 1 — Add vector components along each axis (î, ĵ, k̂):</strong>
        <ul style="margin-left: 18px; margin-top: 4px;">
          <li><strong>X-axis (î)</strong>: Fnet_x = F₁x + F₂x + F₃x</li>
          <li><strong>Y-axis (ĵ)</strong>: Fnet_y = F₁y + F₂y + F₃y</li>
          <li><strong>Z-axis (k̂)</strong>: Fnet_z = F₁z + F₂z + F₃z</li>
        </ul>
      </div>
      <div class="beginner-step-box">
        <strong>Step 2 — Calculate total Net Force magnitude:</strong>
        <ul style="margin-left: 18px; margin-top: 4px;">
          <li>Fnet = √(Fnet_x² + Fnet_y² + Fnet_z²)</li>
        </ul>
      </div>
      <div class="beginner-step-box">
        <strong>Step 3 — Compute Acceleration (a = Fnet / m):</strong>
        <ul style="margin-left: 18px; margin-top: 4px;">
          <li>a = Net Force ÷ Ball Mass (m)</li>
        </ul>
      </div>
    `,
    computeSolution: (vals) => {
      const Fnet_x = vals.f1x + vals.f2x + vals.f3x;
      const Fnet_y = vals.f2y + vals.f3y;
      const Fnet_z = vals.f1z + vals.f2z;
      
      const Fnet_mag = Math.sqrt(Fnet_x * Fnet_x + Fnet_y * Fnet_y + Fnet_z * Fnet_z);
      const accel_mag = Fnet_mag / vals.m;

      const stepsHtml = `
        <div class="math-step">
          <strong>1. Vector Component Summation:</strong><br>
          • Fnet_x = (${vals.f1x}) + (${vals.f2x}) + (${vals.f3x}) = <strong>${Fnet_x.toFixed(2)} N î</strong><br>
          • Fnet_y = (0) + (${vals.f2y}) + (${vals.f3y}) = <strong>${Fnet_y.toFixed(2)} N ĵ</strong><br>
          • Fnet_z = (${vals.f1z}) + (${vals.f2z}) + (0) = <strong>${Fnet_z.toFixed(2)} N k̂</strong><br>
          • Fnet Vector = (${Fnet_x.toFixed(2)}î + ${Fnet_y.toFixed(2)}ĵ + ${Fnet_z.toFixed(2)}k̂) N
        </div>
        <div class="math-step">
          <strong>2. Net Force Magnitude:</strong><br>
          • Fnet = √[(${Fnet_x.toFixed(2)})² + (${Fnet_y.toFixed(2)})² + (${Fnet_z.toFixed(2)})²]<br>
          • Fnet = √(${ (Fnet_x*Fnet_x + Fnet_y*Fnet_y + Fnet_z*Fnet_z).toFixed(2) }) = <strong>${Fnet_mag.toFixed(2)} N</strong>
        </div>
        <div class="math-step">
          <strong>3. Acceleration (a = Fnet / m):</strong><br>
          • a = ${Fnet_mag.toFixed(2)} N / ${vals.m.toFixed(2)} kg = <strong>${accel_mag.toFixed(2)} m/s²</strong>
        </div>
        <div class="final-answer-box">
          Total Acceleration (a) = ${accel_mag.toFixed(2)} m/s²
        </div>
      `;

      return { Fnet_x, Fnet_y, Fnet_z, Fnet_mag, accel_mag, stepsHtml };
    },
    renderSvg: (svg, vals, sol, showSol) => {
      let html = drawGridAndAxes(svg, "y (Horizontal)", "z (Vertical)", 400, 300);
      
      html += `
        <circle cx="400" cy="300" r="18" fill="url(#ballGradient)" stroke="#38bdf8" stroke-width="2" />
        <text x="400" y="304" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">m</text>
      `;

      const scale = 5;

      const f1_y = 300 - vals.f1z * scale;
      const f1_x = 400 + vals.f1x * scale;
      html += drawArrow(400, 300, f1_x, f1_y, "#f43f5e", `F₁`);

      const f2_x = 400 + vals.f2y * scale;
      const f2_y = 300 - vals.f2z * scale;
      html += drawArrow(400, 300, f2_x, f2_y, "#38bdf8", `F₂`);

      const f3_x = 400 + vals.f3y * scale;
      const f3_y = 300;
      html += drawArrow(400, 300, f3_x, f3_y, "#f59e0b", `F₃`);

      if (showSol) {
        const net_x = 400 + sol.Fnet_y * scale;
        const net_y = 300 - sol.Fnet_z * scale;
        
        html += `<line x1="400" y1="300" x2="${net_x}" y2="300" stroke="#10b981" stroke-dasharray="4" stroke-width="1.5" />`;
        html += `<line x1="${net_x}" y1="300" x2="${net_x}" y2="${net_y}" stroke="#10b981" stroke-dasharray="4" stroke-width="1.5" />`;

        html += drawArrow(400, 300, net_x, net_y, "#10b981", `F_net = ${sol.Fnet_mag.toFixed(1)}N`, 3);

        html += `
          <g transform="translate(${net_x + 15}, ${net_y - 15})">
            <rect x="0" y="0" width="170" height="32" rx="6" fill="#065f46" opacity="0.9" stroke="#34d399" stroke-width="1"/>
            <text x="85" y="20" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="bold">a = ${sol.accel_mag.toFixed(2)} m/s²</text>
          </g>
        `;
      }

      svg.innerHTML = getDefs() + html;
    }
  },

  {
    id: 2,
    title: "Problem 2: Elbow Flexion Angle from Kinematic Markers",
    description: "For the marker positions (x,y) given in the table of the subject shown below, compute the elbow flexion angle.",
    imageSrc: "images/problem2.png",
    params: [
      { id: "x1", label: "Shoulder X₁", min: 100, max: 180, step: 1, defaultVal: 140, unit: "cm", color: "#38bdf8" },
      { id: "y1", label: "Shoulder Y₁", min: 120, max: 200, step: 1, defaultVal: 160, unit: "cm", color: "#38bdf8" },
      { id: "x2", label: "Elbow X₂", min: 80, max: 160, step: 1, defaultVal: 120, unit: "cm", color: "#818cf8" },
      { id: "y2", label: "Elbow Y₂", min: 100, max: 180, step: 1, defaultVal: 150, unit: "cm", color: "#818cf8" },
      { id: "x4", label: "Wrist X₄", min: 80, max: 160, step: 1, defaultVal: 120, unit: "cm", color: "#10b981" },
      { id: "y4", label: "Wrist Y₄", min: 80, max: 160, step: 1, defaultVal: 120, unit: "cm", color: "#10b981" }
    ],
    hintHtml: `
      <p>💡 <strong>How to compute elbow flexion angle:</strong></p>
      <div class="beginner-step-box">
        <strong>Step 1 — Draw two vector arrows starting from the elbow joint:</strong>
        <ul style="margin-left: 18px; margin-top: 4px;">
          <li>Upper arm arrow (<strong>u</strong>) points from Elbow to Shoulder: (X₁ − X₂, Y₁ − Y₂).</li>
          <li>Forearm arrow (<strong>v</strong>) points from Elbow to Wrist: (X₄ − X₂, Y₄ − Y₂).</li>
        </ul>
      </div>
      <div class="beginner-step-box">
        <strong>Step 2 — Find the inside angle between upper arm and forearm:</strong>
        <ul style="margin-left: 18px; margin-top: 4px;">
          <li>Multiply arrow coordinates: Dot Product = (u_x × v_x) + (u_y × v_y).</li>
          <li>Divide by the length of both arrows to get cos(inside angle).</li>
        </ul>
      </div>
      <div class="beginner-step-box">
        <strong>Step 3 — Convert to Flexion Angle:</strong>
        <ul style="margin-left: 18px; margin-top: 4px;">
          <li>When your arm is completely straight, flexion is 0° (inside angle is 180°).</li>
          <li><strong>Elbow Flexion Angle = 180° − Inside Joint Angle</strong>.</li>
        </ul>
      </div>
    `,
    computeSolution: (vals) => {
      const ux = vals.x1 - vals.x2;
      const uy = vals.y1 - vals.y2;
      const vx = vals.x4 - vals.x2;
      const vy = vals.y4 - vals.y2;

      const dot = ux * vx + uy * vy;
      const magU = Math.sqrt(ux * ux + uy * uy);
      const magV = Math.sqrt(vx * vx + vy * vy);

      const cosTheta = Math.max(-1, Math.min(1, dot / (magU * magV)));
      const includedDeg = (Math.acos(cosTheta) * 180) / Math.PI;
      const flexionDeg = 180 - includedDeg;

      const stepsHtml = `
        <div class="math-step">
          <strong>1. Segment Vectors from Elbow (X₂, Y₂):</strong><br>
          • Upper Arm (u) = (${vals.x1} - ${vals.x2}, ${vals.y1} - ${vals.y2}) = <strong>(${ux}, ${uy}) cm</strong><br>
          • Forearm (v) = (${vals.x4} - ${vals.x2}, ${vals.y4} - ${vals.y2}) = <strong>(${vx}, ${vy}) cm</strong>
        </div>
        <div class="math-step">
          <strong>2. Dot Product & Magnitudes:</strong><br>
          • u · v = (${ux})(${vx}) + (${uy})(${vy}) = <strong>${dot}</strong><br>
          • |u| = √(${ux}² + ${uy}²) = <strong>${magU.toFixed(2)} cm</strong><br>
          • |v| = √(${vx}² + ${vy}²) = <strong>${magV.toFixed(2)} cm</strong>
        </div>
        <div class="math-step">
          <strong>3. Angles:</strong><br>
          • cos(θ) = ${dot} / (${magU.toFixed(2)} × ${magV.toFixed(2)}) = ${cosTheta.toFixed(4)}<br>
          • Interior Joint Angle = <strong>${includedDeg.toFixed(2)}°</strong><br>
          • Elbow Flexion Angle = 180° - ${includedDeg.toFixed(2)}° = <strong>${flexionDeg.toFixed(2)}°</strong>
        </div>
        <div class="final-answer-box">
          Elbow Flexion Angle = ${flexionDeg.toFixed(2)}°
        </div>
      `;

      return { ux, uy, vx, vy, dot, magU, magV, includedDeg, flexionDeg, stepsHtml };
    },
    renderSvg: (svg, vals, sol, showSol) => {
      const mapX = (x) => 100 + ((x - 80) / 100) * 600;
      const mapY = (y) => 520 - ((y - 80) / 120) * 440;

      const sx = mapX(vals.x1), sy = mapY(vals.y1);
      const ex = mapX(vals.x2), ey = mapY(vals.y2);
      const wx = mapX(vals.x4), wy = mapY(vals.y4);

      let html = drawGridAndAxes(svg, "X Position (cm)", "Y Position (cm)", 100, 520);

      html += `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" />`;
      html += `<line x1="${ex}" y1="${ey}" x2="${wx}" y2="${wy}" stroke="#10b981" stroke-width="6" stroke-linecap="round" />`;

      html += drawMarker(sx, sy, "Shoulder (P1)", vals.x1, vals.y1, "#38bdf8");
      html += drawMarker(ex, ey, "Elbow (P2)", vals.x2, vals.y2, "#818cf8");
      html += drawMarker(wx, wy, "Wrist (P4)", vals.x4, vals.y4, "#10b981");

      const angU = Math.atan2(sy - ey, sx - ex);
      const angV = Math.atan2(wy - ey, wx - ex);
      const rArc = 45;
      
      html += `<path d="M ${ex + rArc * Math.cos(angU)} ${ey + rArc * Math.sin(angU)} A ${rArc} ${rArc} 0 0 1 ${ex + rArc * Math.cos(angV)} ${ey + rArc * Math.sin(angV)}" fill="none" stroke="#f59e0b" stroke-width="3" stroke-dasharray="3" />`;
      
      html += `
        <text x="${ex + 60}" y="${ey - 10}" fill="#fbbf24" font-size="14" font-weight="bold">
          Interior Angle: ${sol.includedDeg.toFixed(1)}°
        </text>
      `;

      if (showSol) {
        html += `
          <g transform="translate(450, 60)">
            <rect x="0" y="0" width="300" height="70" rx="10" fill="#0f172a" opacity="0.95" stroke="#10b981" stroke-width="2"/>
            <text x="150" y="28" text-anchor="middle" fill="#94a3b8" font-size="12">FLEXION ANGLE (180° - Interior)</text>
            <text x="150" y="55" text-anchor="middle" fill="#34d399" font-size="22" font-weight="bold">${sol.flexionDeg.toFixed(2)}°</text>
          </g>
        `;
      }

      svg.innerHTML = getDefs() + html;
    }
  },

  {
    id: 3,
    title: "Problem 3: Patellofemoral Joint Reaction Force",
    description: "Determine the reaction force in the patellafemoral joint (PF) subjected to forces (N) in the Quadriceps tendon (Q) and Patellar ligament (P) when the knee is flexed.",
    imageSrc: "images/problem3.png",
    params: [
      { id: "Q", label: "Quadriceps Tendon (Q)", min: 200, max: 1500, step: 50, defaultVal: 800, unit: "N", color: "#38bdf8" },
      { id: "P", label: "Patellar Ligament (P)", min: 200, max: 1500, step: 50, defaultVal: 800, unit: "N", color: "#818cf8" },
      { id: "flexion", label: "Knee Flexion Angle (θ)", min: 10, max: 120, step: 5, defaultVal: 80, unit: "°", color: "#f59e0b" }
    ],
    hintHtml: `
      <p>💡 <strong>Understanding kneecap (patella) forces:</strong></p>
      <div class="beginner-step-box">
        <strong>Step 1 — Visualize the pulls on your kneecap:</strong>
        <ul style="margin-left: 18px; margin-top: 4px;">
          <li>Your quadriceps muscle pulls <em>upward</em> along your thigh bone (Q).</li>
          <li>Your patellar ligament pulls <em>downward</em> towards your shin bone (P).</li>
        </ul>
      </div>
      <div class="beginner-step-box">
        <strong>Step 2 — Bending your knee pinches the kneecap against the joint:</strong>
        <ul style="margin-left: 18px; margin-top: 4px;">
          <li>The joint reaction force (F_PF) is the compression force pushing back against the thigh bone (femur).</li>
          <li>Use the Law of Cosines formula: F_PF = √(Q² + P² − 2QP cos θ).</li>
        </ul>
      </div>
      <div class="beginner-step-box">
        <strong>Key Takeaway:</strong> Notice how bending your knee more (larger angle) creates a much bigger compression force on your kneecap joint!
      </div>
    `,
    computeSolution: (vals) => {
      const rad = (vals.flexion * Math.PI) / 180;
      const Fpf = Math.sqrt(vals.Q * vals.Q + vals.P * vals.P - 2 * vals.Q * vals.P * Math.cos(rad));

      const stepsHtml = `
        <div class="math-step">
          <strong>1. Law of Cosines Formula:</strong><br>
          • F_PF² = Q² + P² - 2·Q·P·cos(θ)
        </div>
        <div class="math-step">
          <strong>2. Substitution with Current Slider Parameters:</strong><br>
          • Q = ${vals.Q} N, P = ${vals.P} N, θ = ${vals.flexion}°<br>
          • cos(${vals.flexion}°) = ${Math.cos(rad).toFixed(4)}<br>
          • F_PF² = ${vals.Q}² + ${vals.P}² - 2(${vals.Q})(${vals.P})(${Math.cos(rad).toFixed(4)})<br>
          • F_PF² = ${(vals.Q*vals.Q).toFixed(0)} + ${(vals.P*vals.P).toFixed(0)} - ${(2*vals.Q*vals.P*Math.cos(rad)).toFixed(0)} = <strong>${(Fpf*Fpf).toFixed(0)}</strong>
        </div>
        <div class="math-step">
          <strong>3. Joint Reaction Force Magnitude:</strong><br>
          • F_PF = √(${(Fpf*Fpf).toFixed(0)}) = <strong>${Fpf.toFixed(2)} N</strong>
        </div>
        <div class="final-answer-box">
          Patellofemoral Joint Reaction Force (F_PF) = ${Fpf.toFixed(2)} N
        </div>
      `;

      return { Fpf, rad, stepsHtml };
    },
    renderSvg: (svg, vals, sol, showSol) => {
      let html = drawGridAndAxes(svg, "X", "Y", 400, 450);

      const px = 350, py = 250;

      const flexRad = (vals.flexion * Math.PI) / 180;
      const qx = px + 180 * Math.cos(flexRad - Math.PI / 2);
      const qy = py - 180 * Math.sin(flexRad - Math.PI / 2);

      const tx = px;
      const ty = py + 200;

      html += `<line x1="${px}" y1="${py}" x2="${qx}" y2="${qy}" stroke="#475569" stroke-width="14" stroke-linecap="round" />`;
      html += `<line x1="${px}" y1="${py}" x2="${tx}" y2="${ty}" stroke="#475569" stroke-width="14" stroke-linecap="round" />`;
      
      html += `<circle cx="${px}" cy="${py}" r="22" fill="#1e293b" stroke="#94a3b8" stroke-width="3" />`;
      html += `<text x="${px}" y="${py + 5}" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Patella</text>`;

      const scale = 0.12;
      const qVecX = px + (qx - px) * (vals.Q * scale / 180);
      const qVecY = py + (qy - py) * (vals.Q * scale / 180);
      html += drawArrow(px, py, qVecX, qVecY, "#38bdf8", `Q = ${vals.Q}N`);

      const pVecY = py + vals.P * scale;
      html += drawArrow(px, py, px, pVecY, "#818cf8", `P = ${vals.P}N`);

      html += `<path d="M ${px} ${py + 50} A 50 50 0 0 0 ${px + 50 * Math.cos(flexRad - Math.PI / 2)} ${py - 50 * Math.sin(flexRad - Math.PI / 2)}" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3"/>`;
      html += `<text x="${px + 60}" y="${py + 30}" fill="#fbbf24" font-size="14" font-weight="bold">θ = ${vals.flexion}°</text>`;

      if (showSol) {
        const pfX = px + (qVecX - px) + 0;
        const pfY = py + (qVecY - py) + (pVecY - py);
        
        html += drawArrow(px, py, pfX, pfY, "#10b981", `F_PF = ${sol.Fpf.toFixed(1)}N`, 4);
      }

      svg.innerHTML = getDefs() + html;
    }
  },

  {
    id: 4,
    title: "Problem 4: Resultant Reaction Force from Two Angled Forces",
    description: "Determine the reaction force FR for an object that has two forces: F1 = 15 N at α = 30° and F2 = 10 N at β = 45° applied as shown in the figure below.",
    imageSrc: "images/problem4.png",
    params: [
      { id: "f1", label: "Force F₁", min: 1, max: 50, step: 1, defaultVal: 15, unit: "N", color: "#38bdf8" },
      { id: "alpha", label: "Angle α (F₁)", min: 0, max: 90, step: 1, defaultVal: 30, unit: "°", color: "#38bdf8" },
      { id: "f2", label: "Force F₂", min: 1, max: 50, step: 1, defaultVal: 10, unit: "N", color: "#f59e0b" },
      { id: "beta", label: "Angle β (F₂)", min: 0, max: 90, step: 1, defaultVal: 45, unit: "°", color: "#f59e0b" }
    ],
    hintHtml: `
      <p>💡 <strong>Combining two angled pulls:</strong></p>
      <div class="beginner-step-box">
        <strong>Step 1 — Break both forces into Left/Right and Up/Down parts:</strong>
        <ul style="margin-left: 18px; margin-top: 4px;">
          <li>F₁ pulls <em>Right</em> (F₁ cos α) and <em>Up</em> (F₁ sin α).</li>
          <li>F₂ pulls <em>Left</em> (−F₂ cos β) and <em>Up</em> (F₂ sin β).</li>
        </ul>
      </div>
      <div class="beginner-step-box">
        <strong>Step 2 — Combine into a single Resultant force (R):</strong>
        <ul style="margin-left: 18px; margin-top: 4px;">
          <li>Total Horizontal Pull (R_x) = (Right pull) − (Left pull).</li>
          <li>Total Vertical Pull (R_y) = (Up pull 1) + (Up pull 2).</li>
          <li>Combined Pull Magnitude = √(R_x² + R_y²).</li>
        </ul>
      </div>
      <div class="beginner-step-box">
        <strong>Step 3 — Reaction Force (F_R):</strong>
        <ul style="margin-left: 18px; margin-top: 4px;">
          <li>The reaction force holds the object still! It has the <em>exact same magnitude</em> as R, but pushes in the <em>opposite direction</em>.</li>
        </ul>
      </div>
    `,
    computeSolution: (vals) => {
      const aRad = (vals.alpha * Math.PI) / 180;
      const bRad = (vals.beta * Math.PI) / 180;

      const f1x = vals.f1 * Math.cos(aRad);
      const f1y = vals.f1 * Math.sin(aRad);

      const f2x = -vals.f2 * Math.cos(bRad);
      const f2y = vals.f2 * Math.sin(bRad);

      const Rx = f1x + f2x;
      const Ry = f1y + f2y;

      const Rmag = Math.sqrt(Rx * Rx + Ry * Ry);
      const Rangle = (Math.atan2(Ry, Rx) * 180) / Math.PI;

      const stepsHtml = `
        <div class="math-step">
          <strong>1. Vector Component Decomposition:</strong><br>
          • F₁ = (${vals.f1} cos ${vals.alpha}°, ${vals.f1} sin ${vals.alpha}°) = <strong>(${f1x.toFixed(2)}, ${f1y.toFixed(2)}) N</strong><br>
          • F₂ = (-${vals.f2} cos ${vals.beta}°, ${vals.f2} sin ${vals.beta}°) = <strong>(${f2x.toFixed(2)}, ${f2y.toFixed(2)}) N</strong>
        </div>
        <div class="math-step">
          <strong>2. Resultant Vector (R = F₁ + F₂):</strong><br>
          • R_x = ${f1x.toFixed(2)} + (${f2x.toFixed(2)}) = <strong>${Rx.toFixed(2)} N</strong><br>
          • R_y = ${f1y.toFixed(2)} + ${f2y.toFixed(2)} = <strong>${Ry.toFixed(2)} N</strong><br>
          • Magnitude R = √(${Rx.toFixed(2)}² + ${Ry.toFixed(2)}²) = <strong>${Rmag.toFixed(2)} N</strong><br>
          • Direction Angle = <strong>${Rangle.toFixed(1)}°</strong>
        </div>
        <div class="math-step">
          <strong>3. Reaction Force (F_R = -R):</strong><br>
          • Equal magnitude: <strong>${Rmag.toFixed(2)} N</strong><br>
          • Opposite direction angle: ${(Rangle + 180).toFixed(1)}°
        </div>
        <div class="final-answer-box">
          Reaction Force (F_R) = ${Rmag.toFixed(2)} N @ ${Rangle.toFixed(1)}°
        </div>
      `;

      return { f1x, f1y, f2x, f2y, Rx, Ry, Rmag, Rangle, stepsHtml };
    },
    renderSvg: (svg, vals, sol, showSol) => {
      let html = drawGridAndAxes(svg, "x Axis", "y Axis", 400, 350);

      const ox = 400, oy = 350;
      const scale = 7;

      html += `<rect x="${ox - 15}" y="${oy - 15}" width="30" height="30" fill="#1e293b" stroke="#38bdf8" stroke-width="2" rx="4"/>`;

      const f1_x = ox + sol.f1x * scale;
      const f1_y = oy - sol.f1y * scale;
      html += drawArrow(ox, oy, f1_x, f1_y, "#38bdf8", `F₁ = ${vals.f1}N (${vals.alpha}°)`);

      const f2_x = ox + sol.f2x * scale;
      const f2_y = oy - sol.f2y * scale;
      html += drawArrow(ox, oy, f2_x, f2_y, "#f59e0b", `F₂ = ${vals.f2}N (${vals.beta}°)`);

      if (showSol) {
        const rx = ox + sol.Rx * scale;
        const ry = oy - sol.Ry * scale;
        html += drawArrow(ox, oy, rx, ry, "#10b981", `R = ${sol.Rmag.toFixed(1)}N`, 3);

        html += `<line x1="${f1_x}" y1="${f1_y}" x2="${rx}" y2="${ry}" stroke="#94a3b8" stroke-dasharray="4" opacity="0.6"/>`;
        html += `<line x1="${f2_x}" y1="${f2_y}" x2="${rx}" y2="${ry}" stroke="#94a3b8" stroke-dasharray="4" opacity="0.6"/>`;

        const frx = ox - sol.Rx * scale;
        const fry = oy + sol.Ry * scale;
        html += drawArrow(ox, oy, frx, fry, "#c084fc", `F_R = ${sol.Rmag.toFixed(1)}N`, 4);
      }

      svg.innerHTML = getDefs() + html;
    }
  },

  {
    id: 5,
    title: "Problem 5: Neck Joint Normal and Shear Reaction Forces",
    description: "Determine the normal (FJn) and shear (FJt) components of the neck joint reaction force FJ = 86 N if the angle β = 60° as shown in the figure below.",
    imageSrc: "images/problem5.png",
    params: [
      { id: "Fj", label: "Neck Joint Force (F_J)", min: 10, max: 200, step: 2, defaultVal: 86, unit: "N", color: "#38bdf8" },
      { id: "beta", label: "Joint Incline Angle (β)", min: 10, max: 80, step: 1, defaultVal: 60, unit: "°", color: "#f59e0b" }
    ],
    hintHtml: `
      <p>💡 <strong>Understanding Normal vs Shear joint forces:</strong></p>
      <div class="beginner-step-box">
        <strong>Step 1 — Imagine pushing down on a tilted slide (angle β):</strong>
        <ul style="margin-left: 18px; margin-top: 4px;">
          <li>The total neck joint force (F_J) creates two different kinds of stress on the cervical joint surface.</li>
        </ul>
      </div>
      <div class="beginner-step-box">
        <strong>Step 2 — The two components:</strong>
        <ul style="margin-left: 18px; margin-top: 4px;">
          <li><strong>Normal Force (F_Jn)</strong>: Compression force pushing <em>straight into</em> the joint surface (perpendicular) = F_J × cos β.</li>
          <li><strong>Shear Force (F_Jt)</strong>: Sliding force pushing <em>along</em> the joint surface (parallel) = F_J × sin β.</li>
        </ul>
      </div>
    `,
    computeSolution: (vals) => {
      const rad = (vals.beta * Math.PI) / 180;
      const Fjn = vals.Fj * Math.cos(rad);
      const Fjt = vals.Fj * Math.sin(rad);

      const stepsHtml = `
        <div class="math-step">
          <strong>1. Joint Surface Incline Angle (β = ${vals.beta}°):</strong><br>
          • cos(${vals.beta}°) = ${Math.cos(rad).toFixed(4)}<br>
          • sin(${vals.beta}°) = ${Math.sin(rad).toFixed(4)}
        </div>
        <div class="math-step">
          <strong>2. Normal Force Component (Perpendicular F_Jn):</strong><br>
          • F_Jn = F_J × cos(β) = ${vals.Fj} × ${Math.cos(rad).toFixed(4)} = <strong>${Fjn.toFixed(2)} N</strong>
        </div>
        <div class="math-step">
          <strong>3. Shear Force Component (Tangential F_Jt):</strong><br>
          • F_Jt = F_J × sin(β) = ${vals.Fj} × ${Math.sin(rad).toFixed(4)} = <strong>${Fjt.toFixed(2)} N</strong>
        </div>
        <div class="final-answer-box">
          Normal Component (F_Jn) = ${Fjn.toFixed(2)} N | Shear Component (F_Jt) = ${Fjt.toFixed(2)} N
        </div>
      `;

      return { Fjn, Fjt, stepsHtml };
    },
    renderSvg: (svg, vals, sol, showSol) => {
      let html = drawGridAndAxes(svg, "Tangential (t)", "Normal (n)", 400, 350);

      const ox = 400, oy = 350;
      const bRad = (vals.beta * Math.PI) / 180;
      const scale = 2.5;

      const planeLen = 220;
      const px1 = ox - planeLen * Math.cos(bRad);
      const py1 = oy + planeLen * Math.sin(bRad);
      const px2 = ox + planeLen * Math.cos(bRad);
      const py2 = oy - planeLen * Math.sin(bRad);

      html += `<line x1="${px1}" y1="${py1}" x2="${px2}" y2="${py2}" stroke="#64748b" stroke-width="4" stroke-dasharray="6" />`;
      html += `<text x="${px2 + 10}" y="${py2}" fill="#94a3b8" font-size="12" font-weight="bold">Joint Surface Plane</text>`;

      const fjLen = vals.Fj * scale;
      const fjx = ox;
      const fjy = oy + fjLen;
      html += drawArrow(ox, oy, fjx, fjy, "#38bdf8", `F_J = ${vals.Fj}N`, 3);

      if (showSol) {
        const nx = ox - (sol.Fjn * scale) * Math.sin(bRad);
        const ny = oy + (sol.Fjn * scale) * Math.cos(bRad);
        html += drawArrow(ox, oy, nx, ny, "#c084fc", `F_Jn = ${sol.Fjn.toFixed(1)}N`, 3);

        const tx = ox + (sol.Fjt * scale) * Math.cos(bRad);
        const ty = oy - (sol.Fjt * scale) * Math.sin(bRad);
        html += drawArrow(ox, oy, tx, ty, "#f59e0b", `F_Jt = ${sol.Fjt.toFixed(1)}N`, 3);

        html += `<line x1="${nx}" y1="${ny}" x2="${fjx}" y2="${fjy}" stroke="#94a3b8" stroke-dasharray="3"/>`;
        html += `<line x1="${tx}" y1="${ty}" x2="${fjx}" y2="${fjy}" stroke="#94a3b8" stroke-dasharray="3"/>`;
      }

      svg.innerHTML = getDefs() + html;
    }
  },

  {
    id: 6,
    title: "Problem 6: Leg Traction Cable Tension Reaction",
    description: "Determine the tension reaction force on the leg (R) that is subjected to traction forces T = 150 N in a cable with a weight attached as shown in the figure below. The angles between the cables and the leg θ = 150° are the same towards the upper and lower pulleys.",
    imageSrc: "images/problem6.png",
    params: [
      { id: "T", label: "Cable Tension (T)", min: 20, max: 400, step: 5, defaultVal: 150, unit: "N", color: "#38bdf8" },
      { id: "theta", label: "Cable-Leg Angle (θ)", min: 100, max: 175, step: 1, defaultVal: 150, unit: "°", color: "#f59e0b" }
    ],
    hintHtml: `
      <p>💡 <strong>Leg traction pulley system:</strong></p>
      <div class="beginner-step-box">
        <strong>Step 1 — Angle relative to horizontal leg:</strong>
        <ul style="margin-left: 18px; margin-top: 4px;">
          <li>Angle α = 180° − θ (for θ = 150°, α = 30°).</li>
        </ul>
      </div>
      <div class="beginner-step-box">
        <strong>Step 2 — Vertical forces cancel, Horizontal forces double:</strong>
        <ul style="margin-left: 18px; margin-top: 4px;">
          <li>Top cable pulls <em>up and right</em>. Bottom cable pulls <em>down and right</em> with equal tension T.</li>
          <li>The upward pull cancels out the downward pull!</li>
          <li>Both cables pull to the right along the leg: each pulls with T × cos α.</li>
        </ul>
      </div>
      <div class="beginner-step-box">
        <strong>Step 3 — Leg Reaction Force (R):</strong>
        <ul style="margin-left: 18px; margin-top: 4px;">
          <li>Leg tension holding the leg back = 2 × T × cos(180° − θ).</li>
        </ul>
      </div>
    `,
    computeSolution: (vals) => {
      const alphaDeg = 180 - vals.theta;
      const alphaRad = (alphaDeg * Math.PI) / 180;
      const R = 2 * vals.T * Math.cos(alphaRad);

      const stepsHtml = `
        <div class="math-step">
          <strong>1. Angle relative to Leg Axis:</strong><br>
          • α = 180° - θ = 180° - ${vals.theta}° = <strong>${alphaDeg}°</strong>
        </div>
        <div class="math-step">
          <strong>2. Horizontal Cable Force Components:</strong><br>
          • Upper cable pull (x) = T cos(α) = ${vals.T} × cos(${alphaDeg}°) = ${(vals.T * Math.cos(alphaRad)).toFixed(2)} N<br>
          • Lower cable pull (x) = T cos(α) = ${vals.T} × cos(${alphaDeg}°) = ${(vals.T * Math.cos(alphaRad)).toFixed(2)} N
        </div>
        <div class="math-step">
          <strong>3. Leg Tension Reaction Force (R):</strong><br>
          • R = 2 × T × cos(α) = 2 × ${vals.T} × ${Math.cos(alphaRad).toFixed(4)} = <strong>${R.toFixed(2)} N</strong>
        </div>
        <div class="final-answer-box">
          Leg Reaction Tension (R) = ${R.toFixed(2)} N (Leftward)
        </div>
      `;

      return { alphaDeg, alphaRad, R, stepsHtml };
    },
    renderSvg: (svg, vals, sol, showSol) => {
      let html = drawGridAndAxes(svg, "Leg Axis (x)", "Vertical (y)", 450, 300);

      const px = 450, py = 300;
      const scale = 0.8;

      html += `<rect x="150" y="275" width="300" height="50" fill="#334155" stroke="#94a3b8" stroke-width="2" rx="10"/>`;
      html += `<text x="300" y="305" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">PATIENT LEG</text>`;

      html += `<circle cx="${px}" cy="${py}" r="8" fill="#f59e0b" stroke="#ffffff" stroke-width="2"/>`;
      html += `<text x="${px}" y="${py - 15}" text-anchor="middle" fill="#f59e0b" font-size="12" font-weight="bold">Point P</text>`;

      const aRad = sol.alphaRad;
      const cLen = vals.T * scale;

      const upX = px + cLen * Math.cos(aRad);
      const upY = py - cLen * Math.sin(aRad);

      const dnX = px + cLen * Math.cos(aRad);
      const dnY = py + cLen * Math.sin(aRad);

      html += drawArrow(px, py, upX, upY, "#38bdf8", `T = ${vals.T}N`, 3);
      html += drawArrow(px, py, dnX, dnY, "#38bdf8", `T = ${vals.T}N`, 3);

      html += `<path d="M ${px - 40} ${py} A 40 40 0 0 1 ${px + 40 * Math.cos(-aRad)} ${py - 40 * Math.sin(aRad)}" fill="none" stroke="#f59e0b" stroke-dasharray="3"/>`;
      html += `<text x="${px + 50}" y="${py - 40}" fill="#fbbf24" font-size="13">θ = ${vals.theta}°</text>`;

      if (showSol) {
        const rx = px - sol.R * scale;
        html += drawArrow(px, py, rx, py, "#10b981", `R = ${sol.R.toFixed(1)}N`, 4);
      }

      svg.innerHTML = getDefs() + html;
    }
  }
];

// --- HELPER SVG DRAWING FUNCTIONS ---

function getDefs() {
  return `
    <defs>
      <marker id="arrow-#38bdf8" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
      </marker>
      <marker id="arrow-#f43f5e" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
      </marker>
      <marker id="arrow-#f59e0b" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
      </marker>
      <marker id="arrow-#10b981" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
      </marker>
      <marker id="arrow-#818cf8" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8" />
      </marker>
      <marker id="arrow-#c084fc" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#c084fc" />
      </marker>
      
      <radialGradient id="ballGradient" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#7dd3fc" />
        <stop offset="50%" stop-color="#0284c7" />
        <stop offset="100%" stop-color="#0c4a6e" />
      </radialGradient>
    </defs>
  `;
}

function drawGridAndAxes(svg, xLabel, yLabel, originX, originY) {
  let h = '';
  for (let x = 50; x < 800; x += 50) {
    h += `<line x1="${x}" y1="0" x2="${x}" y2="600" stroke="#1e293b" stroke-width="1" opacity="0.4"/>`;
  }
  for (let y = 50; y < 600; y += 50) {
    h += `<line x1="0" y1="${y}" x2="800" y2="${y}" stroke="#1e293b" stroke-width="1" opacity="0.4"/>`;
  }
  
  h += `<line x1="0" y1="${originY}" x2="800" y2="${originY}" stroke="#475569" stroke-width="2"/>`;
  h += `<line x1="${originX}" y1="0" x2="${originX}" y2="600" stroke="#475569" stroke-width="2"/>`;

  h += `<text x="770" y="${originY - 10}" fill="#94a3b8" font-size="12" font-weight="bold">${xLabel}</text>`;
  h += `<text x="${originX + 10}" y="25" fill="#94a3b8" font-size="12" font-weight="bold">${yLabel}</text>`;

  return h;
}

function drawArrow(x1, y1, x2, y2, color, label, width = 2.5) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  let h = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" marker-end="url(#arrow-${color})" />`;
  if (label) {
    h += `
      <g transform="translate(${midX + 8}, ${midY - 8})">
        <rect x="0" y="-14" width="${label.length * 7 + 12}" height="20" rx="4" fill="#0b0f19" opacity="0.85" stroke="${color}" stroke-width="0.8"/>
        <text x="6" y="0" fill="${color}" font-size="11" font-weight="bold">${label}</text>
      </g>
    `;
  }
  return h;
}

function drawMarker(x, y, label, valX, valY, color) {
  return `
    <circle cx="${x}" cy="${y}" r="7" fill="${color}" stroke="#ffffff" stroke-width="2"/>
    <text x="${x + 12}" y="${y + 4}" fill="#f8fafc" font-size="12" font-weight="bold">${label} (${valX}, ${valY})</text>
  `;
}

// --- STATE & APPLICATION CONTROLLER ---

let currentProblemIndex = 0;
let currentValues = {};
let isHintVisible = false;
let isSolutionVisible = false;

// DOM Elements
const problemSelectorPills = document.getElementById("problemSelectorPills");
const problemTag = document.getElementById("problemTag");
const problemTitle = document.getElementById("problemTitle");
const problemDescription = document.getElementById("problemDescription");
const problemImage = document.getElementById("problemImage");
const slidersList = document.getElementById("slidersList");
const resetSlidersBtn = document.getElementById("resetSlidersBtn");

const toggleHintBtn = document.getElementById("toggleHintBtn");
const hintBtnText = document.getElementById("hintBtnText");
const hintCard = document.getElementById("hintCard");
const hintContent = document.getElementById("hintContent");

const toggleSolutionBtn = document.getElementById("toggleSolutionBtn");
const solutionBtnText = document.getElementById("solutionBtnText");
const solutionCard = document.getElementById("solutionCard");
const solutionContent = document.getElementById("solutionContent");

const vectorCanvas = document.getElementById("vectorCanvas");
const vectorLegend = document.getElementById("vectorLegend");

const prevProblemBtn = document.getElementById("prevProblemBtn");
const nextProblemBtn = document.getElementById("nextProblemBtn");
const currentProblemNum = document.getElementById("currentProblemNum");

function initApp() {
  renderPills();
  loadProblem(0);
  bindEvents();
}

function renderPills() {
  problemSelectorPills.innerHTML = PROBLEMS.map((p, idx) => `
    <button class="pill-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}">
      P${p.id}
    </button>
  `).join('');

  document.querySelectorAll('.pill-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.getAttribute('data-index'));
      loadProblem(idx);
    });
  });
}

function loadProblem(index) {
  currentProblemIndex = index;
  const prob = PROBLEMS[index];

  problemTag.textContent = `Problem ${prob.id} of 6`;
  problemTitle.textContent = prob.title;
  problemDescription.textContent = prob.description;
  problemImage.src = prob.imageSrc;
  currentProblemNum.textContent = prob.id;

  document.querySelectorAll('.pill-btn').forEach((btn, idx) => {
    btn.classList.toggle('active', idx === index);
  });

  prevProblemBtn.disabled = index === 0;
  nextProblemBtn.disabled = index === PROBLEMS.length - 1;

  isHintVisible = false;
  isSolutionVisible = false;
  hintCard.classList.add('hidden');
  solutionCard.classList.add('hidden');
  hintBtnText.textContent = "Show Beginner Hint";
  solutionBtnText.textContent = "Show Solution & Answer";

  currentValues = {};
  prob.params.forEach(param => {
    currentValues[param.id] = param.defaultVal;
  });

  renderSliders();
  hintContent.innerHTML = prob.hintHtml;
  updateView();
}

function renderSliders() {
  const prob = PROBLEMS[currentProblemIndex];
  slidersList.innerHTML = prob.params.map(p => `
    <div class="slider-group">
      <div class="slider-label-row">
        <span class="slider-title">
          <span class="slider-color-dot" style="background: ${p.color}"></span>
          ${p.label}
        </span>
        <span class="slider-val-badge" id="val-${p.id}">
          ${currentValues[p.id]} ${p.unit}
        </span>
      </div>
      <input 
        type="range" 
        class="range-slider" 
        id="slider-${p.id}" 
        min="${p.min}" 
        max="${p.max}" 
        step="${p.step}" 
        value="${currentValues[p.id]}"
        style="accent-color: ${p.color};"
      />
    </div>
  `).join('');

  prob.params.forEach(p => {
    const input = document.getElementById(`slider-${p.id}`);
    const badge = document.getElementById(`val-${p.id}`);
    input.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      currentValues[p.id] = val;
      badge.textContent = `${val} ${p.unit}`;
      updateView();
    });
  });
}

function updateView() {
  const prob = PROBLEMS[currentProblemIndex];
  
  const sol = prob.computeSolution(currentValues);
  solutionContent.innerHTML = sol.stepsHtml;

  prob.renderSvg(vectorCanvas, currentValues, sol, isSolutionVisible);

  renderLegend();
}

function renderLegend() {
  const prob = PROBLEMS[currentProblemIndex];
  vectorLegend.innerHTML = prob.params.map(p => `
    <div class="legend-item">
      <div class="legend-color-box" style="background: ${p.color}"></div>
      <span>${p.label}:</span>
      <span class="legend-val">${currentValues[p.id]} ${p.unit}</span>
    </div>
  `).join('');
}

function bindEvents() {
  toggleHintBtn.addEventListener('click', () => {
    isHintVisible = !isHintVisible;
    hintCard.classList.toggle('hidden', !isHintVisible);
    hintBtnText.textContent = isHintVisible ? "Hide Beginner Hint" : "Show Beginner Hint";
  });

  toggleSolutionBtn.addEventListener('click', () => {
    isSolutionVisible = !isSolutionVisible;
    solutionCard.classList.toggle('hidden', !isSolutionVisible);
    solutionBtnText.textContent = isSolutionVisible ? "Hide Solution" : "Show Solution & Answer";
    updateView();
  });

  resetSlidersBtn.addEventListener('click', () => {
    loadProblem(currentProblemIndex);
  });

  prevProblemBtn.addEventListener('click', () => {
    if (currentProblemIndex > 0) loadProblem(currentProblemIndex - 1);
  });

  nextProblemBtn.addEventListener('click', () => {
    if (currentProblemIndex < PROBLEMS.length - 1) loadProblem(currentProblemIndex + 1);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentProblemIndex > 0) {
      loadProblem(currentProblemIndex - 1);
    } else if (e.key === 'ArrowRight' && currentProblemIndex < PROBLEMS.length - 1) {
      loadProblem(currentProblemIndex + 1);
    }
  });
}

document.addEventListener('DOMContentLoaded', initApp);
