precision mediump float;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;
uniform sampler2D tex2;
uniform float time;
uniform float frequency;
uniform float amplitude;

void main() {

  vec2 uv = vTexCoord;
  vec2 uv2 = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;

  // lets create a sine wave to distort our texture coords
  // we will use the built in sin() function in glsl
  // sin() returns the sine of an angle in radians
  // first will multiply our uv * frequency -- frequency will control how many hills and valleys will be in the wave
  // then we add some time to our sine, this will make it move 
  // lastly multiply the whole thing by amplitude -- amplitude controls how tall the hills and valleys are, in this case it will be how much to distort the image
  // *try changing uv.y to uv.x and see what happens
  float sineWave = -sin(uv.x * frequency + time) * amplitude;
  float sineWave2 = - cos(uv.x * frequency + (time - 0.03)) * amplitude;

  // create a vec2 with our sine
  // what happens if you put sineWave in the y slot? in Both slots?
  vec2 distort = vec2( sineWave, sineWave2);
  vec2 distort2 = vec2( sineWave2, sineWave);


  // add the distortion to our texture coordinates
  vec4 texTest = texture2D(tex0,  uv + distort2);
  //tex.b = tex2.g ;

  float index = abs(cos(time*0.1)*10.0);
  //float index = mod(time , 5.0);
  //uv.x = (uv.x * index - floor(uv.x * index)) ;
  uv.x = 1.0 - (uv.x * index - floor(uv.x * index)) ;
  uv.y =  1.0 - (uv.y * index - floor(uv.y * index)) ;
  // uv.x = 1.0 - (uv.x * 6.0 - floor(uv.x * 6.0)) ;
  // uv.y =  1.0 - (uv.y * 3.0 - floor(uv.y * 3.0)) ;


  vec4 tex = texture2D(tex2,  uv );
  texTest.r = tex.r;

  vec4 texFinal = tex + texTest;
  gl_FragColor = texFinal ;
}