require( 'child_process' ).execSync( `\
docker build -t fmscat/node-with-xvfb . && \
docker push fmscat/node-with-xvfb` );