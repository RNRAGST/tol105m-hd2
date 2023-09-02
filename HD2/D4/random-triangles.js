"use strict";

var gl;
var points;

var NumPoints = 500000;
var colorLoc;
var points = []
window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Initialize our data for the Sierpinski Gasket
    //

    // First, initialize the corners of our gasket with three points.




    for (var i = 0; i < 100; ++i ) {
        var initialPoint = [Math.random() * 2 - 1,Math.random() * 2 - 1] //bottom left of upright triangle
        var rightPoint = [initialPoint[0]+0.1 ,initialPoint[1]]
        var topPoint = [(initialPoint[0] + rightPoint[0])/2,initialPoint[1]+0.1 ]
        points.push(initialPoint[0])
        points.push(initialPoint[1])
        points.push(rightPoint[0])
        points.push(rightPoint[1])
        points.push(topPoint[0])
        points.push(topPoint[1])
    }
    console.log( points.length)

    // And, add our initial point into our array of points

    //points = [ vertices ];

    // Compute new points
    // Each new point is located midway between
    // last point and a randomly chosen vertex


    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    colorLoc = gl.getUniformLocation( program, "fColor" );

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    for (var i = 0; i < points.length+1; i +=3 ) {
        gl.uniform4fv( colorLoc, vec4(Math.random(), Math.random(), Math.random(), 1.0) );
        gl.drawArrays( gl.TRIANGLES, i,3);
    };      

}
