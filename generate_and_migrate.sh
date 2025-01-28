!#/bin/bash
rm -rf migrations &&
	npx drizzle-kit generate &&
	npx drizzle-kit migrate &&
	npm run dev
