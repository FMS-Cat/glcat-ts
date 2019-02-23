const cp = require( 'child_process' );

const run = ( command ) => {
  return new Promise( ( resolve, reject ) => {
    const p = cp.exec( command, ( err ) => {
      if ( err ) { reject( err ); }
      else { resolve(); }
    } );
    p.stdout.pipe( process.stdout );
    p.stderr.pipe( process.stderr );
  } );
};

run(
  'docker build -t fmscat/glcat-ts-circleci .'
).then( run(
  'docker push fmscat/glcat-ts-circleci'
) );