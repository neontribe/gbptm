FROM node:12

# Expose this port for local testing heroku will squash this and pass the port to the app on env.PORT
EXPOSE 8080

# Establish a directory in the container to house our stuff
WORKDIR /toiletmap

# Copy the package.json from the api server package (this should be stable-ish)
COPY ./packages/api/package.json .

# We'd like to use a lockfile but our yarn workspace only has a global one
# COPY yarn.lock .

# Install only production dependencies and don't bother writing a lockfile
RUN yarn install --production=true --pure-lockfile --ignore-optional

# Copy the rest of the api server sources into place (we do this after the install to preserver the previous layers)
COPY ./packages/api .

# Copy the built explorer UI into the expected location for the static fileserver
COPY ./packages/explorer/build ./src/www-explorer

# Copy the built UI into the expected location for the static fileserver
COPY ./packages/ui/build ./src/www

# Run it. Is there a place here for PM2?
CMD ["node", "src/index.js"]

# At the end, set the user to use when running this image
USER node
