var screen;

function main() {
    var volume = new KVS.LobsterData();
    screen = new KVS.THREEScreen();

    screen.init( volume, {
        width: window.innerWidth * 0.5,
        height: window.innerHeight,
        targetDom: document.getElementById( 'display' ),
        enableAutoResize: false
    });

    var bounds = null;

    var surfaces = null;

    var ground = null;

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth * 0.8, window.innerHeight ] );
    });

    window.onload = function() {
        reset();
        document.getElementById( 'apply' ).onclick = function() { reset(); }
    }

    function createColorMap(rp, gp, bp)
    {
        var cmap = [];
        for ( var i = 0; i < 256; i++ )
        {
            var S = i / 255.0; // [0,1]
            var R = Math.max( Math.cos( ( S - rp ) * Math.PI ), 0.0 );
            var G = Math.max( Math.cos( ( S - gp ) * Math.PI ), 0.0 );
            var B = Math.max( Math.cos( ( S - bp ) * Math.PI ), 0.0 );
            var C = new THREE.Color( R, G, B );
            cmap.push( [ S, '0x' + C.getHexString() ] );
        }
        return cmap;
    }

    function reset() {
        var isovalue = document.getElementById( 'isovalue' ).value;
        var shading = document.getElementById( 'shading' ).vert.value;
        var refrection = document.getElementById( 'refrection' ).frag.value;
        var isBounds = document.getElementById( 'bounds' ).checked;
        var isGround = document.getElementById( 'ground' ).checked;
        R_value = document.getElementById('red').value;
        G_value = document.getElementById('green').value;
        B_value = document.getElementById('blue').value;
        var cmap = createColorMap(R_value, G_value, B_value);

        if ( surfaces ) {
            screen.scene.remove( surfaces );
            surfaces.geometry.dispose();
            surfaces.material.dispose();
            surfaces = null;
        }

        if ( isGround ) {
            if ( !ground ) {
                ground = Ground( volume );
                screen.scene.add( ground );
            }
        } else {
            if ( ground ) {
                screen.scene.remove( ground );
                ground.geometry.dispose();
                ground.material.dispose();
                ground = null;
            }
        }

        var vert, frag;
        if ( shading == "phong" ) {
            vert = shading + ".vert";
            frag = shading + "_" + refrection + ".frag";
        } else {
            vert = shading + "_" + refrection + ".vert";
            frag = shading + ".frag";
        }

        if ( isBounds ) {
            if ( !bounds ) {
                bounds = Bounds( volume );
                screen.scene.add( bounds );
            }
        } else {
            if ( bounds ) {
                screen.scene.remove( bounds );
                bounds.geometry.dispose();
                bounds.material.dispose();
                bounds = null;
            }
        }

        surfaces = Isosurfaces( volume, isovalue, vert, frag, cmap );
        screen.scene.add( surfaces );
    }

    screen.loop();
}