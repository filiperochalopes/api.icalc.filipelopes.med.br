#!/bin/sh

# Start the first process
yarn start &

# Start the second process
npx prisma studio &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?