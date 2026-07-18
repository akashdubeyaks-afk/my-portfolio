import{i as e,n as t,s as n,t as r}from"./index-BIA6N5tj.js";import{E as i,M as a,N as o,a as s,c,i as l,k as u,l as d,m as f,n as p,o as m,r as h,s as g,t as _,y as v}from"./ContactShadows-DzxTY065.js";function y(e,t,n,r){var i;return i=class extends u{constructor(i){super({vertexShader:t,fragmentShader:n,...i});for(let t in e)this.uniforms[t]=new a(e[t]),Object.defineProperty(this,t,{get(){return this.uniforms[t].value},set(e){this.uniforms[t].value=e}});this.uniforms=o.clone(this.uniforms),r?.(this)}},i.key=v.generateUUID(),i}var b=y({},`void main() { }`,`void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); discard;  }`),x=n(e()),S=class extends i{constructor(e=6,t=!1){super(),this.uniforms={chromaticAberration:{value:.05},transmission:{value:0},_transmission:{value:1},transmissionMap:{value:null},roughness:{value:0},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:1/0},attenuationColor:{value:new f(`white`)},anisotropicBlur:{value:.1},time:{value:0},distortion:{value:0},distortionScale:{value:.5},temporalDistortion:{value:0},buffer:{value:null}},this.onBeforeCompile=n=>{n.uniforms={...n.uniforms,...this.uniforms},this.anisotropy>0&&(n.defines.USE_ANISOTROPY=``),t?n.defines.USE_SAMPLER=``:n.defines.USE_TRANSMISSION=``,n.fragmentShader=`
      uniform float chromaticAberration;         
      uniform float anisotropicBlur;      
      uniform float time;
      uniform float distortion;
      uniform float distortionScale;
      uniform float temporalDistortion;
      uniform sampler2D buffer;

      vec3 random3(vec3 c) {
        float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
        vec3 r;
        r.z = fract(512.0*j);
        j *= .125;
        r.x = fract(512.0*j);
        j *= .125;
        r.y = fract(512.0*j);
        return r-0.5;
      }

      uint hash( uint x ) {
        x += ( x << 10u );
        x ^= ( x >>  6u );
        x += ( x <<  3u );
        x ^= ( x >> 11u );
        x += ( x << 15u );
        return x;
      }

      // Compound versions of the hashing algorithm I whipped together.
      uint hash( uvec2 v ) { return hash( v.x ^ hash(v.y)                         ); }
      uint hash( uvec3 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z)             ); }
      uint hash( uvec4 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z) ^ hash(v.w) ); }

      // Construct a float with half-open range [0:1] using low 23 bits.
      // All zeroes yields 0.0, all ones yields the next smallest representable value below 1.0.
      float floatConstruct( uint m ) {
        const uint ieeeMantissa = 0x007FFFFFu; // binary32 mantissa bitmask
        const uint ieeeOne      = 0x3F800000u; // 1.0 in IEEE binary32
        m &= ieeeMantissa;                     // Keep only mantissa bits (fractional part)
        m |= ieeeOne;                          // Add fractional part to 1.0
        float  f = uintBitsToFloat( m );       // Range [1:2]
        return f - 1.0;                        // Range [0:1]
      }

      // Pseudo-random value in half-open range [0:1].
      float randomBase( float x ) { return floatConstruct(hash(floatBitsToUint(x))); }
      float randomBase( vec2  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec3  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec4  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float rand(float seed) {
        float result = randomBase(vec3(gl_FragCoord.xy, seed));
        return result;
      }

      const float F3 =  0.3333333;
      const float G3 =  0.1666667;

      float snoise(vec3 p) {
        vec3 s = floor(p + dot(p, vec3(F3)));
        vec3 x = p - s + dot(s, vec3(G3));
        vec3 e = step(vec3(0.0), x - x.yzx);
        vec3 i1 = e*(1.0 - e.zxy);
        vec3 i2 = 1.0 - e.zxy*(1.0 - e);
        vec3 x1 = x - i1 + G3;
        vec3 x2 = x - i2 + 2.0*G3;
        vec3 x3 = x - 1.0 + 3.0*G3;
        vec4 w, d;
        w.x = dot(x, x);
        w.y = dot(x1, x1);
        w.z = dot(x2, x2);
        w.w = dot(x3, x3);
        w = max(0.6 - w, 0.0);
        d.x = dot(random3(s), x);
        d.y = dot(random3(s + i1), x1);
        d.z = dot(random3(s + i2), x2);
        d.w = dot(random3(s + 1.0), x3);
        w *= w;
        w *= w;
        d *= w;
        return dot(d, vec4(52.0));
      }

      float snoiseFractal(vec3 m) {
        return 0.5333333* snoise(m)
              +0.2666667* snoise(2.0*m)
              +0.1333333* snoise(4.0*m)
              +0.0666667* snoise(8.0*m);
      }
`+n.fragmentShader,n.fragmentShader=n.fragmentShader.replace(`#include <transmission_pars_fragment>`,`
        #ifdef USE_TRANSMISSION
          // Transmission code is based on glTF-Sampler-Viewer
          // https://github.com/KhronosGroup/glTF-Sample-Viewer
          uniform float _transmission;
          uniform float thickness;
          uniform float attenuationDistance;
          uniform vec3 attenuationColor;
          #ifdef USE_TRANSMISSIONMAP
            uniform sampler2D transmissionMap;
          #endif
          #ifdef USE_THICKNESSMAP
            uniform sampler2D thicknessMap;
          #endif
          uniform vec2 transmissionSamplerSize;
          uniform sampler2D transmissionSamplerMap;
          uniform mat4 modelMatrix;
          uniform mat4 projectionMatrix;
          varying vec3 vWorldPosition;
          vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
            // Direction of refracted light.
            vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
            // Compute rotation-independant scaling of the model matrix.
            vec3 modelScale;
            modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
            modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
            modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
            // The thickness is specified in local space.
            return normalize( refractionVector ) * thickness * modelScale;
          }
          float applyIorToRoughness( const in float roughness, const in float ior ) {
            // Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
            // an IOR of 1.5 results in the default amount of microfacet refraction.
            return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
          }
          vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
            float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );            
            #ifdef USE_SAMPLER
              #ifdef texture2DLodEXT
                return texture2DLodEXT(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #else
                return texture2D(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #endif
            #else
              return texture2D(buffer, fragCoord.xy);
            #endif
          }
          vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
            if ( isinf( attenuationDistance ) ) {
              // Attenuation distance is +∞, i.e. the transmitted color is not attenuated at all.
              return radiance;
            } else {
              // Compute light attenuation using Beer's law.
              vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
              vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer's law
              return transmittance * radiance;
            }
          }
          vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
            const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
            const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
            const in vec3 attenuationColor, const in float attenuationDistance ) {
            vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
            vec3 refractedRayExit = position + transmissionRay;
            // Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
            vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
            vec2 refractionCoords = ndcPos.xy / ndcPos.w;
            refractionCoords += 1.0;
            refractionCoords /= 2.0;
            // Sample framebuffer to get pixel the refracted ray hits.
            vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
            vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
            // Get the specular component.
            vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
            return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
          }
        #endif
`),n.fragmentShader=n.fragmentShader.replace(`#include <transmission_fragment>`,`  
        // Improve the refraction to use the world pos
        material.transmission = _transmission;
        material.transmissionAlpha = 1.0;
        material.thickness = thickness;
        material.attenuationDistance = attenuationDistance;
        material.attenuationColor = attenuationColor;
        #ifdef USE_TRANSMISSIONMAP
          material.transmission *= texture2D( transmissionMap, vUv ).r;
        #endif
        #ifdef USE_THICKNESSMAP
          material.thickness *= texture2D( thicknessMap, vUv ).g;
        #endif
        
        vec3 pos = vWorldPosition;
        float runningSeed = 0.0;
        vec3 v = normalize( cameraPosition - pos );
        vec3 n = inverseTransformDirection( normal, viewMatrix );
        vec3 transmission = vec3(0.0);
        float transmissionR, transmissionB, transmissionG;
        float randomCoords = rand(runningSeed++);
        float thickness_smear = thickness * max(pow(roughnessFactor, 0.33), anisotropicBlur);
        vec3 distortionNormal = vec3(0.0);
        vec3 temporalOffset = vec3(time, -time, -time) * temporalDistortion;
        if (distortion > 0.0) {
          distortionNormal = distortion * vec3(snoiseFractal(vec3((pos * distortionScale + temporalOffset))), snoiseFractal(vec3(pos.zxy * distortionScale - temporalOffset)), snoiseFractal(vec3(pos.yxz * distortionScale + temporalOffset)));
        }
        for (float i = 0.0; i < ${e}.0; i ++) {
          vec3 sampleNorm = normalize(n + roughnessFactor * roughnessFactor * 2.0 * normalize(vec3(rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5)) * pow(rand(runningSeed++), 0.33) + distortionNormal);
          transmissionR = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness  + thickness_smear * (i + randomCoords) / float(${e}),
            material.attenuationColor, material.attenuationDistance
          ).r;
          transmissionG = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior  * (1.0 + chromaticAberration * (i + randomCoords) / float(${e})) , material.thickness + thickness_smear * (i + randomCoords) / float(${e}),
            material.attenuationColor, material.attenuationDistance
          ).g;
          transmissionB = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior * (1.0 + 2.0 * chromaticAberration * (i + randomCoords) / float(${e})), material.thickness + thickness_smear * (i + randomCoords) / float(${e}),
            material.attenuationColor, material.attenuationDistance
          ).b;
          transmission.r += transmissionR;
          transmission.g += transmissionG;
          transmission.b += transmissionB;
        }
        transmission /= ${e}.0;
        totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );\n`)},Object.keys(this.uniforms).forEach(e=>Object.defineProperty(this,e,{get:()=>this.uniforms[e].value,set:t=>this.uniforms[e].value=t}))}},C=x.forwardRef(({buffer:e,transmissionSampler:t=!1,backside:n=!1,side:r=0,transmission:i=1,thickness:a=0,backsideThickness:o=0,backsideEnvMapIntensity:l=1,samples:u=10,resolution:f,backsideResolution:p,background:h,anisotropy:g,anisotropicBlur:_,...v},y)=>{c({MeshTransmissionMaterial:S});let C=x.useRef(null),[w]=x.useState(()=>new b),T=s(p||f),E=s(f),D,O,k,A;return d(e=>{C.current.time=e.clock.elapsedTime,C.current.buffer===E.texture&&!t&&(A=C.current.__r3f.parent?.object,A&&(k=e.gl.toneMapping,D=e.scene.background,O=C.current.envMapIntensity,e.gl.toneMapping=0,h&&(e.scene.background=h),A.material=w,n&&(e.gl.setRenderTarget(T),e.gl.render(e.scene,e.camera),A.material=C.current,A.material.buffer=T.texture,A.material.thickness=o,A.material.side=1,A.material.envMapIntensity=l),e.gl.setRenderTarget(E),e.gl.render(e.scene,e.camera),A.material=C.current,A.material.thickness=a,A.material.side=r,A.material.buffer=E.texture,A.material.envMapIntensity=O,e.scene.background=D,e.gl.setRenderTarget(null),e.gl.toneMapping=k))}),x.useImperativeHandle(y,()=>C.current,[]),x.createElement(`meshTransmissionMaterial`,m({args:[u,t],ref:C},v,{buffer:e||E.texture,_transmission:i,anisotropicBlur:_??g,transmission:t?i:0,thickness:a,side:r}))}),w=x.forwardRef(({children:e,enabled:t=!0,speed:n=1,rotationIntensity:r=1,floatIntensity:i=1,floatingRange:a=[-.1,.1],autoInvalidate:o=!1,...s},c)=>{let l=x.useRef(null);x.useImperativeHandle(c,()=>l.current,[]);let u=x.useRef(Math.random()*1e4);return d(e=>{if(!t||n===0)return;o&&e.invalidate();let s=u.current+e.clock.elapsedTime;l.current.rotation.x=Math.cos(s/4*n)/8*r,l.current.rotation.y=Math.sin(s/4*n)/8*r,l.current.rotation.z=Math.sin(s/4*n)/20*r;let c=Math.sin(s/4*n)/10;c=v.mapLinear(c,-.1,.1,a?.[0]??-.1,a?.[1]??.1),l.current.position.y=c*i,l.current.updateMatrix()}),x.createElement(`group`,s,x.createElement(`group`,{ref:l,matrixAutoUpdate:!1},e))}),T=t();function E({color:e=`#F5F1EB`,productColor:t=`#0A0A0A`}){let n=(0,x.useRef)(),r=(0,x.useRef)();return d(e=>{let t=e.clock.elapsedTime;n.current&&(n.current.rotation.y=Math.sin(t*.15)*.25,n.current.rotation.x=Math.sin(t*.1)*.05),r.current&&(r.current.position.y=Math.sin(t*.8)*.03+.1)}),(0,T.jsxs)(`group`,{ref:n,children:[(0,T.jsx)(h,{args:[3.2,.35,2.4],radius:.12,smoothness:8,position:[0,-.9,0],castShadow:!0,receiveShadow:!0,children:(0,T.jsx)(`meshStandardMaterial`,{color:e,roughness:.88,metalness:.02})}),(0,T.jsx)(h,{args:[3.2,1.6,.32],radius:.08,smoothness:6,position:[0,.1,-1.04],castShadow:!0,receiveShadow:!0,children:(0,T.jsx)(`meshStandardMaterial`,{color:e,roughness:.9,metalness:.01})}),(0,T.jsx)(h,{args:[.32,1.6,2.4],radius:.08,smoothness:6,position:[-1.44,.1,0],castShadow:!0,receiveShadow:!0,children:(0,T.jsx)(`meshStandardMaterial`,{color:e,roughness:.9,metalness:.01})}),(0,T.jsx)(h,{args:[.32,1.6,2.4],radius:.08,smoothness:6,position:[1.44,.1,0],castShadow:!0,receiveShadow:!0,children:(0,T.jsx)(`meshStandardMaterial`,{color:e,roughness:.9,metalness:.01})}),(0,T.jsx)(h,{args:[3.2,.7,.32],radius:.06,smoothness:6,position:[0,-.35,1.04],castShadow:!0,receiveShadow:!0,children:(0,T.jsx)(`meshStandardMaterial`,{color:e,roughness:.9,metalness:.01})}),(0,T.jsx)(h,{args:[2.5,.05,1.75],radius:.04,position:[0,-.5,0],children:(0,T.jsx)(`meshStandardMaterial`,{color:`#1A1A1A`,roughness:.3,metalness:.1})}),(0,T.jsxs)(`group`,{ref:r,position:[0,.15,0],children:[(0,T.jsx)(h,{args:[1.4,.18,.9],radius:.06,smoothness:4,castShadow:!0,children:(0,T.jsx)(`meshStandardMaterial`,{color:t,roughness:.2,metalness:.6})}),(0,T.jsx)(h,{args:[1.25,.02,.75],radius:.03,position:[0,.11,0],children:(0,T.jsx)(`meshStandardMaterial`,{color:`#0A0A0A`,roughness:.1,metalness:.8,emissive:t,emissiveIntensity:.15})}),(0,T.jsx)(h,{args:[.3,.06,.3],radius:.04,position:[.45,.12,.2],children:(0,T.jsx)(`meshStandardMaterial`,{color:`#000`,roughness:.2,metalness:.9})}),(0,T.jsx)(`pointLight`,{intensity:.8,color:t,distance:2.5,decay:2})]})]})}function D(){let e=(0,x.useRef)();return d(t=>{e.current&&(e.current.rotation.y=t.clock.elapsedTime*.08)}),(0,T.jsx)(`group`,{ref:e,children:[0,1,2].map(e=>(0,T.jsx)(w,{speed:1+e*.2,rotationIntensity:.1,floatIntensity:.3,children:(0,T.jsx)(h,{args:[2.8,.18,1.8],radius:.05,position:[0,e*.35-.35,0],castShadow:!0,receiveShadow:!0,children:(0,T.jsx)(`meshStandardMaterial`,{color:e===1?`#FEFEFE`:`#F5F1EB`,roughness:.92,metalness:.01,transparent:!0,opacity:.95})})},e))})}function O(){let e=(0,x.useMemo)(()=>{let e=[];for(let t=-1;t<=1;t++)for(let n=-1;n<=1;n++){let r=n%2*.5;e.push([t+r,0,n*.866])}return e},[]),t=(0,x.useRef)();return d(e=>{t.current&&(t.current.rotation.y=e.clock.elapsedTime*.05)}),(0,T.jsxs)(`group`,{ref:t,children:[(0,T.jsx)(h,{args:[2.5,.15,2.2],radius:.08,position:[0,-.5,0],children:(0,T.jsx)(`meshStandardMaterial`,{color:`#D7CCC8`,roughness:.8})}),(0,T.jsx)(`group`,{position:[0,.1,0],children:e.map(([e,t,n],r)=>(0,T.jsxs)(`group`,{position:[e,t,n],children:[(0,T.jsxs)(`mesh`,{castShadow:!0,children:[(0,T.jsx)(`cylinderGeometry`,{args:[.32,.32,.6,6]}),(0,T.jsx)(`meshStandardMaterial`,{color:`#FFF8E1`,roughness:.7})]}),(0,T.jsxs)(`mesh`,{children:[(0,T.jsx)(`cylinderGeometry`,{args:[.28,.28,.62,6]}),(0,T.jsx)(`meshBasicMaterial`,{color:`#000`,transparent:!0,opacity:.85})]})]},r))})]})}function k(){let e=(0,x.useMemo)(()=>{let e=[];for(let t=-2;t<=2;t++)for(let n=-1.5;n<=1.5;n++)Math.random()>.15&&e.push([t*.45+(Math.random()-.5)*.05,(Math.random()-.5)*.05,n*.5]);return e},[]),t=(0,x.useRef)();return d(e=>{t.current&&(t.current.rotation.x=Math.sin(e.clock.elapsedTime*.2)*.05)}),(0,T.jsxs)(`group`,{ref:t,children:[(0,T.jsxs)(`mesh`,{rotation:[-.1,0,0],receiveShadow:!0,children:[(0,T.jsx)(`planeGeometry`,{args:[3,2.2]}),(0,T.jsx)(C,{thickness:.05,roughness:.1,transmission:.95,ior:1.4,chromaticAberration:.02,distortion:.1,color:`#E3F2FD`})]}),e.map(([e,t,n],r)=>(0,T.jsx)(w,{speed:.5+Math.random(),floatIntensity:.2,children:(0,T.jsxs)(`mesh`,{position:[e,t+.06,n],castShadow:!0,children:[(0,T.jsx)(`sphereGeometry`,{args:[.18,16,16]}),(0,T.jsx)(C,{thickness:.02,roughness:.05,transmission:.9,ior:1.33,color:`white`})]})},r))]})}function A(){let e=(0,x.useRef)();return d(t=>{let n=t.clock.elapsedTime;e.current&&(e.current.rotation.y=n*.15,e.current.position.y=Math.sin(n*.5)*.1)}),(0,T.jsxs)(`group`,{ref:e,scale:1.3,children:[(0,T.jsxs)(`mesh`,{children:[(0,T.jsx)(`sphereGeometry`,{args:[.18,24,24]}),(0,T.jsx)(`meshStandardMaterial`,{color:`#FFC107`,emissive:`#FF8F00`,emissiveIntensity:.2,roughness:.3,metalness:.2})]}),[0,1,2,3,4].map(e=>(0,T.jsx)(`group`,{rotation:[0,e/5*Math.PI*2,0],children:(0,T.jsxs)(`mesh`,{position:[0,.1,.42],rotation:[.4,0,0],castShadow:!0,children:[(0,T.jsx)(`sphereGeometry`,{args:[.32,20,20,0,Math.PI]}),(0,T.jsx)(`meshStandardMaterial`,{color:`#CE93D8`,roughness:.4,side:2})]})},`inner-${e}`)),[0,1,2,3,4,5].map(e=>(0,T.jsx)(`group`,{rotation:[0,e/6*Math.PI*2+.26,0],children:(0,T.jsxs)(`mesh`,{position:[0,-.05,.58],rotation:[.6,0,0],castShadow:!0,children:[(0,T.jsx)(`sphereGeometry`,{args:[.42,24,24,0,Math.PI]}),(0,T.jsx)(`meshStandardMaterial`,{color:`#7E22CE`,roughness:.5,side:2})]})},`outer-${e}`)),[0,1,2].map(e=>(0,T.jsx)(`group`,{rotation:[0,e/3*Math.PI*2,0],children:(0,T.jsxs)(`mesh`,{position:[0,-.25,.75],rotation:[1.1,0,0],castShadow:!0,children:[(0,T.jsx)(`sphereGeometry`,{args:[.35,16,16,0,Math.PI]}),(0,T.jsx)(`meshStandardMaterial`,{color:`#2E7D32`,roughness:.7,side:2})]})},`leaf-${e}`)),(0,T.jsx)(`pointLight`,{intensity:.6,color:`#7E22CE`,distance:3,decay:2})]})}function j({variant:e=`default`,height:t=`420px`}){let[n,i]=(0,x.useState)(!1),a=()=>{switch(e){case`epe-foam`:return(0,T.jsx)(D,{});case`ep-foam`:return(0,T.jsx)(E,{color:`#F5F1EB`,productColor:`#0A0A0A`});case`cross-linked`:return(0,T.jsx)(E,{color:`#1A1A1A`,productColor:`#FF6F00`});case`air-bubble`:return(0,T.jsx)(k,{});case`custom-fitments`:return(0,T.jsx)(E,{color:`#F3E5F5`,productColor:`#7E22CE`});case`honeycomb`:return(0,T.jsx)(O,{});case`lotus`:return(0,T.jsx)(A,{});default:return(0,T.jsx)(E,{color:`#F5F1EB`,productColor:`#7E22CE`})}},o={"epe-foam":`EPE Foam • 3 Sheets Stack • 25kg/m³`,"ep-foam":`EP Foam • Custom Cavity • Shockproof`,"cross-linked":`Cross Linked • Black • High Resilience`,"air-bubble":`Air Bubble • 10mm • Transparent`,"custom-fitments":`Custom Fitment • Zero Movement • 48HR`,honeycomb:`Honeycomb • Hexagonal • Eco Strong`,lotus:`Lotus Flower • 3D Logo • Purple + Green`,default:`Custom Foam • Drag to Rotate`};return(0,T.jsxs)(`div`,{className:`relative w-full rounded-[16px] overflow-hidden bg-[#F6F4EF] border border-black/[0.06] shadow-[0_10px_40px_rgba(0,0,0,0.04)]`,style:{height:t},onMouseEnter:()=>i(!0),onMouseLeave:()=>i(!1),children:[(0,T.jsxs)(g,{shadows:!0,dpr:[1,2],camera:{position:[0,1.5,3.8],fov:32},gl:{antialias:!0,alpha:!1,powerPreference:`high-performance`},children:[(0,T.jsx)(`color`,{attach:`background`,args:[`#F6F4EF`]}),(0,T.jsx)(`fog`,{attach:`fog`,args:[`#F6F4EF`,6,12]}),(0,T.jsx)(l,{makeDefault:!0,position:[2.8,1.6,2.8],fov:34}),(0,T.jsx)(`ambientLight`,{intensity:.45}),(0,T.jsx)(`directionalLight`,{position:[6,8,5],intensity:1.4,castShadow:!0,"shadow-mapSize":[2048,2048],"shadow-bias":-1e-4}),(0,T.jsx)(`directionalLight`,{position:[-4,3,-3],intensity:.35,color:`#EDE7F6`}),(0,T.jsx)(`spotLight`,{position:[0,4,2],intensity:.6,angle:.4,penumbra:.6,color:`#FFFFFF`,castShadow:!0}),(0,T.jsx)(`group`,{position:[0,-.2,0],children:a()}),(0,T.jsx)(_,{position:[0,-1.15,0],opacity:.35,scale:6,blur:2.8,far:2.5,resolution:512,color:`#000000`}),(0,T.jsx)(p,{preset:`studio`,background:!1})]}),(0,T.jsxs)(`div`,{className:`absolute top-0 left-0 right-0 flex justify-between items-center px-4 py-3 border-b border-black/[0.06] bg-[#F6F4EF]/80 backdrop-blur-md`,children:[(0,T.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,T.jsx)(`span`,{className:`w-1.5 h-1.5 rounded-full bg-[#00C950] animate-pulse`}),(0,T.jsxs)(`span`,{className:`mono text-[10px] tracking-[0.15em] uppercase font-medium`,children:[`3D • `,o[e]||o.default]})]}),(0,T.jsxs)(`div`,{className:`flex gap-2`,children:[(0,T.jsx)(`span`,{className:`px-2 py-1 rounded-full bg-black text-white mono text-[9px]`,children:`Drag • Rotate`}),(0,T.jsx)(`span`,{className:`hidden md:block px-2 py-1 rounded-full bg-white border border-black/10 mono text-[9px]`,children:`Scroll • Zoom`})]})]}),(0,T.jsx)(`div`,{className:`absolute bottom-0 left-0 right-0 p-3 flex justify-between items-end bg-gradient-to-t from-black/5 to-transparent pointer-events-none`,children:(0,T.jsx)(`div`,{className:`px-3 py-1.5 rounded-full bg-[#0A0A0A] text-white mono text-[10px] flex items-center gap-2 backdrop-blur-md`,children:`Real-time WebGL • 60fps`})}),(0,T.jsxs)(r.div,{initial:!1,animate:{opacity:+!!n,y:n?0:8},className:`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-black text-white px-4 py-2 rounded-full mono text-[10px] tracking-widest uppercase hidden lg:flex items-center gap-2`,children:[(0,T.jsx)(`span`,{children:`●`}),` Drag to explore • Scroll to zoom`]})]})}export{j as default};